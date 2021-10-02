import App from 'App/App'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import express from 'express'
import { renderToString } from 'react-dom/server'
import paymentRouter from 'helpers/paymentRouter'
import getDeviceSize from 'helpers/getDeviceSize'
import { configureStore } from 'reducers/index'
import { Provider } from 'react-redux'
import serialize from 'serialize-javascript'
import bot from './bot'
import cookieParser from 'cookie-parser'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint] ? assets[entrypoint].css
    ? assets[entrypoint].css.map(asset =>
    `<link rel="stylesheet" href="${asset}">`
    ).join('') : '' : ''
}

const jsScriptTagsFromAssets = (assets, entrypoint, ...extra) => {
  return assets[entrypoint] ? assets[entrypoint].js
    ? assets[entrypoint].js.map(asset =>
    `<script src="${asset}" ${extra.join(' ')}></script>`
    ).join('') : '' : ''
}

export const renderApp = (req, res) => {
  const context = {}
  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App />
    </StaticRouter>
  )
  const html = `<!doctype html>
  <html lang="">
  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <title>Welcome to Razzle</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${cssLinksFromAssets(assets, 'client')}
  </head>
  <body>
      <div id="root">${markup}</div>
      ${jsScriptTagsFromAssets(assets, 'client', 'defer', 'crossorigin')}
  </body>
</html>`
  return { context, html }
}

const server = express()
server
  .disable('x-powered-by')
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use('/payment', paymentRouter)
  .use('/bot', bot)
  .get('/*', (req, res) => {
    const context = {}
    const device = getDeviceSize(req)

    const reduxInitialState = {
      device
    }

    const store = configureStore(reduxInitialState)

    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </Provider>
    )

    if (context.url) {
      res.redirect(context.url)
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Наша пекарня</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
          window.__PRELOADED_STATE__ = ${serialize(reduxInitialState)}
        </script>
    </body>
</html>`
      )
    }
  })

export default server
