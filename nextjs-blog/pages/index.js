
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
          <h1 className="hero-title">Find Disc golf courses by state</h1>
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
    </>
  )
}
