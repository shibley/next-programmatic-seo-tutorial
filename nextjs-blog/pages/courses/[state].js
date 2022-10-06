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
        <title>Top Courses in {state}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextSeo
        title={`Top Courses in ${state}`}
        description={`Top Courses in ${state}`}
      />
        <h4 className="title">
          Top Courses in {state}
        </h4>
        <p className="description">
          These are our best courses for {state} rated by the PDGA
          {/* , <br /> Updated at: {stats} */}
        </p>
        <div className="container">
          <div className="linkBox-content">
            <div className="row">
              {courses.map(course => {
                return (
                  <div className="col-md-4" style={{marginBottom:20}}>
                    <a href={`/courses/${state}/${course.id}`} key={i++} className="card">
                      <h5>{course.name}</h5>
                      <p>{course.city}, {course.state} {course.zip}</p>         
                      {/* <div className="row company-tile">
                        <div className="inner-triangle"></div>
                        <div className="company-tile-top">
                          <div className="company-features">
                            <div className="company-score">
                              <div className="company-score-bar">
                                <div className="company-score-tube" style={{"width" : (course.rating * 20) + "%"}}></div>
                              </div>                    
                            </div>
                          </div>
                          <div><span className="small">{course.rating} / 5</span></div>
                        </div>
                      </div> */}
                      <div>Rating: <span className="small">{course.rating}</span></div>
                    </a>
                  </div>
                  )
              })}
            </div>
          </div>
        </div>
    </div>
    
  )
}
