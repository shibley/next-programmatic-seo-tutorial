
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
    <div className="container">
      <main>
        <h1 className="title">
          DiscGolfSite.com
        </h1>

        <p className="description">
          Disc golf courses by state:
        </p>

        <div className="grid">
          {states.map(state => {
            return (<a href={`/courses/${state}`} key={i++} className="card">
              <h3>{state}</h3>
            </a>)
          })}
        </div>
      </main>
    </div>
  )
}
