import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

export async function getStaticPaths() {

  // We need to fetch all of the categories from our DB
  const res = await fetch('http://localhost:6400/courses/states')
  const states = await res.json()

  // We need to adhere to the Next.js getStaticPaths structure
  // https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
  let paths = states.map((x)=>{return{'params': {'state': x}}})

  // For blocking see: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-blocking
  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({params}) {

  // Let's fetch the latest top ranking items in a category from our DB
  const res = await fetch(`http://localhost:6400/courses/state/${params.state}`)
  const courses = await res.json()

  // Let's pick the 50 best ranked ones
  const topCourses = courses.sort((a,b) => b.rating - a.rating).sort((a,b) => b.name - a.name).slice(0, 50);

  // Every time we statically generate this page we will have the time-stamped.
  const stats = new Date().toString()

  return { 
    props: { stats: stats, topCourses },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

export default function State(props) {
  const router = useRouter()
  const { state } = router.query
  const stats = props.stats;
  const courses = props.topCourses;
  let i = 0;

  return (
    <div className="container">
      <Head>
        <title>10 Best {state} Courses</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextSeo
        title={`10 Best ${state} Products`}
        description={`10 Best ${state} Courses for discgolfsite.com updated daily.`}
      />

      <main>
        <h1 className="title">
          Best {state} Courses
        </h1>
        <h3><a href="/">Home</a></h3>
        <p className="description">
          These are our best courses for {state}
          {/* , <br /> Updated at: {stats} */}
        </p>

        <div className="grid">
          { courses.map(course => {
            return (<a href={`/courses/${state}/${course.id}`} key={i++} className="card">
              <div className="row company-tile show-hover inherited-styles-for-exported-element">
              <div className="inner-triangle"></div>
              <div className="company-tile-top">
                {/* <h3 className="company-tile-title">Close</h3> */}
                <div className="company-features">
                  <div className="company-score">
                    <div className="company-score-bar">
                      <div className="company-score-tube" style={{"width" : (course.rating * 20) + "%"}}></div>
                    </div>
                    <div className="company-score-number" data-tip="Work-life balance score based on criteria at top">{course.rating}<span className="small">/ 5</span></div>
                  </div>
                </div>
              </div>
              <div className="company-tile-middle">
                <p className="company-name-desc">{course.name}, {course.city} - {course.zip}</p>              
              </div>
              <div className="company-tile-bottom">
                <div className="company-tile-left">
                  {/* <ul className="row company-details">
                    <li className="green company-working-hours">32
                    </li>
                    <li className="company-num-employees">50-100
                    </li>
                    <li className="company-num-jobs">6
                    </li>
                    <li className="company-location">Remote, many locations</li>
                  </ul> */}
                </div>
                <div className="company-tile-right">
                  {/* <div className="company-fdw company-four-day-week">
                    <div>4 days @ 80% salary</div>
                  </div> */}
                </div>
              </div>
            </div>
            </a>)
          })}
        </div>
      </main>

      {/* <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer> */}

      <style jsx>{`
        body {
          background: #eee;
          /* This is just a helper in case the element has a transparent background or white colors. */
        }
        
        * {
          box-sizing: border-box;
          margin: 0;
        }
        
        .inherited-styles-for-exported-element {
          color: #070809;
          font-family: "source sans pro", Roboto, "helvetica neue", Arial, "noto sans", sans-serif, "apple color emoji", "segoe ui emoji", "segoe ui symbol", "noto color emoji";
          font-size: 10px;
          font-weight: 900;
          line-height: 1.42857;
          text-decoration: none;
        }
        
        h3 {
          font-family: inherit;
        }
        
        p {
          color: #282e34;
          font-weight: 500;
          text-align: left;
        }
        
        ul li {
          font-weight: 400;
          line-height: 2.688rem;
        }
        
        .small {
          font-size: 85%;
        }
        
        .row, h3, p {
          margin-left: 0;
          margin-right: 0;
          margin-top: 0;
        }
        
        p:last-child {
          margin-bottom: 0;
        }
        
        .row::after {
          clear: both;
          content: " ";
          display: table;
        }
        
        .company-tile {
          border: 1px solid #cedeef;
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          line-height: 1;
          margin-bottom: 20px;
          overflow: visible;
          padding: 20px 30px;
          position: relative;
          transition: opacity .18s ease-out, border .18s ease-out, background .18s ease-out, color .18s ease-out;
        }
        
        @media (max-width: 767px) {
          .company-tile {
            border-bottom-color: initial;
            border-bottom-style: none;
            border-bottom-width: initial;
            border-radius: 0;
            border-right-color: initial;
            border-right-style: none;
            border-right-width: initial;
            line-height: 1;
            margin-bottom: 0;
            padding: 30px 20px;
          }
        }
        
        .company-tile .company-tile-top {
          display: flex;
          flex-direction: row;
          padding-left: 0;
          width: 100%;
        }
        
        .company-tile .company-tile-bottom {
          display: flex;
          padding-top: 10px;
        }
        
        @media (max-width: 767px) {
          .company-tile .company-tile-bottom {
            padding-top: 5px;
          }
        }
        
        .company-tile .company-tile-middle p {
          font-size: 1.6rem;
          line-height: 1.5;
          margin-bottom: 0;
          padding: 7.5px 0;
        }
        
        .company-tile.show-hover:hover {
          background-color: #e9f0f8;
          border-color: #c6d9ec;
        }
        
        .company-tile .company-tile-top .company-features {
          width: 70%;
        }
        
        @media (max-width: 767px) {
          .company-tile .company-tile-top .company-features {
            width: 40%;
          }
        }
        
        .company-tile .company-tile-top .company-tile-title {
          align-self: flex-start;
          color: #191c20;
          font-size: 2.31rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 5px;
          padding-top: 0;
          text-align: left;
          width: 30%;
        }
        
        @media (max-width: 767px) {
          .company-tile .company-tile-top .company-tile-title {
            font-size: 2.1rem;
            padding-bottom: 5px;
            padding-left: 40px;
            white-space: normal;
            width: 80%;
          }
        }
        
        .company-tile .company-tile-middle .reduced_hours {
          color: #55616d;
          margin-bottom: 0;
        }
        
        @media (max-width: 767px) {
          .company-tile .company-tile-middle .reduced_hours {
            display: none;
          }
        }
        
        .company-tile .company-tile-bottom .company-tile-left {
          width: 70%;
        }
        
        @media (max-width: 767px) {
          .company-tile .company-tile-bottom .company-tile-left {
            width: 60%;
          }
        }
        
        .company-tile .company-tile-bottom .company-tile-right {
          align-items: center;
          display: flex;
          justify-content: flex-end;
          padding-left: 0;
          text-align: right;
          width: 30%;
        }
        
        @media (max-width: 767px) {
          .company-tile .company-tile-bottom .company-tile-right {
            align-items: center;
            width: 40%;
          }
        }
        
        .company-tile .company-tile-top .company-features .company-score {
          text-align: right;
        }
        
        .company-tile .company-tile-top .company-tile-title:hover {
          color: #e21752;
          text-decoration: none;
        }
        
        .company-tile .company-tile-bottom .company-tile-left .company-details {
          margin: 0;
          padding: 0;
        }
        
        .company-tile .company-tile-bottom .company-tile-right .company-fdw {
          color: #55616d;
          font-size: 1.6rem;
          font-weight: 500;
          line-height: 1.25;
          margin: 0;
          padding: 0;
          text-align: right;
        }
        
        @media (max-width: 767px) {
          .company-tile .company-tile-bottom .company-tile-right .company-fdw {
            font-size: 1.5rem;
          }
        }
        
        .company-tile .company-tile-bottom .company-tile-left .company-details li {
          color: #282e34;
          display: inline-block;
          font-size: 1.6rem;
          list-style: none;
          margin-bottom: 0;
          margin-right: 20px;
        }
        
        @media (max-width: 767px) {
          .company-tile .company-tile-bottom .company-tile-left .company-details li {
            display: block;
          }
        }
        
        .company-tile .company-tile-top .company-features .company-score .company-score-bar {
          border: 1px solid #b7cfe7;
          border-radius: 7.5px;
          display: inline-block;
          height: 15px;
          margin-right: 10px;
          max-width: 100%;
          padding: 2.5px;
          width: 140px;
        }
        
        @media (max-width: 767px) {
          .company-tile .company-tile-top .company-features .company-score .company-score-bar {
            display: none;
          }
        }
        
        .company-tile .company-tile-top .company-features .company-score .company-score-number {
          color: #191c20;
          display: inline-block;
          font-size: 2.25rem;
          font-weight: 400;
          margin-left: 10px;
        }
        
        @media (max-width: 767px) {
          .company-tile .company-tile-top .company-features .company-score .company-score-number {
            font-size: 2.5rem;
          }
        }
        
        .company-tile .company-tile-bottom .company-tile-left .company-details li:last-child {
          margin-right: 0;
        }
        
        @media (max-width: 767px) {
          .company-tile .company-tile-bottom .company-tile-left .company-details li.company-num-employees {
            display: none;
          }
        }
        
        .company-tile .company-tile-top .company-features .company-score .company-score-bar .company-score-tube {
          background-color: #00ac07;
          border-radius: 5px;
          border-style: none;
          height: 100%;
        }
        
        .company-tile .company-tile-top .company-features .company-score .company-score-number .small {
          padding-left: 2.5px;
        }
        
        :disabled {
          cursor: not-allowed !important;
        }
        
        :focus {
          outline: 0 !important;
        }
        
        .green {
          color: #007905 !important;
        }
        
        @media (max-width: 767px) {
          .company-tile {
            border-left-color: initial !important;
            border-left-style: none !important;
            border-left-width: initial !important;
          }
        }
        
        html {
          font-size: 10px;
          /* This is IMPORTANT since some copied values use "REM" units */
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
