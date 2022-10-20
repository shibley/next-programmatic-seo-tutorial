import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (<>
    {/* <div id="purpleBar"></div> */}
    <div className="page-container-welcome">
        <div className="content-wrap">
          <Navbar />  
        </div>
    </div>
      
    {children}
    <Footer />
    </>
  )
}