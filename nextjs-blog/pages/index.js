
export async function getStaticProps({params}) {
  // Let's fetch the latest top ranking items in a category
  const res = await fetch('http://localhost:6400/courses/states')
  const states = await res.json()

  return { 
    props: {  states },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

export default function Home(props) {
  const states = props.states;
  let i = 0;
  return (
    <>
      <div className="container">
      
        <div className="row banner">
          <div className="col-lg-12 col-md-12 col-12">
            <div className="row mb-4">
              <div className="col-lg-9 col-md-9 col-9">
                <header className="page-header">
                  <h1 className="banner-header mb-2">
                    <span>Discover top no-code products &amp; tools</span>
                  </h1>
                </header>
                <div className="banner-sub-header">
                  <span>No-code Tools is a curation of the best no-code products and top tips, guides &amp; how-tos surrounding them.</span>
                </div>
              </div>

              <div className="col-lg-3 col-3 col-md-3">
                <img className="banner-image" src="/all_things_remote-d6ee1ee9e0eff538c3abb5d6cb64bc7f1014330ec3422323447f63a4efd3721f.png" />
              </div>

            </div>

          </div>
        </div>
        <div className="linkBox-content">
          <div className="container">
            <div className="row">
              {states.map(state => {
                return (
                  <div className="col-md-4" style={{marginBottom:20}}>
                    <a href={`/courses/${state}`} key={i++}>
                      <div className="linkBox">
                          <h2 className="linkBox-title">{state}</h2>
                          See Courses
                      </div>
                    </a>
                  </div>
                  )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
