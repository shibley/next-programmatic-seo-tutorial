import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (<>
    <div id="purpleBar"></div>
    <div className="container">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
    </>
  )
}