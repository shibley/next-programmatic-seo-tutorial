import Layout from '../components/layout'
import Script from 'next/script';
import 'bootstrap/dist/css/bootstrap.css'
import '../styles.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-Y9WPD8262K"
            strategy="afterInteractive">
        </Script>
        <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-Y9WPD8262K');
            `}
        </Script>
        <Script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
            crossOrigin="anonymous" strategy="beforeInteractive">
        </Script> 
      <Component {...pageProps} />
    </Layout>
  )
}