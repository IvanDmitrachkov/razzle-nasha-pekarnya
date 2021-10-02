import React from 'react'
import 'styles/index.scss'
import Routes from 'containers/Routes'
import Footer from 'containers/Footer/Footer'
import ScrollToTop from 'utils/ScrollToTop'
import Header from 'containers/Header/Header'

const App = () => (
  <ScrollToTop>
    <Header />
    <div style={{ minHeight: '100vh' }}>
      <Routes />
    </div>
    <Footer />
  </ScrollToTop>
)

export default App
