
export async function getStaticProps({params}) {
  const res = await fetch('http://localhost:6400/letters')
  const letters = await res.json()

  return { 
    props: { letters },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

export default function Home(props) {
  const letters = props.letters;
  let i = 0;
  return (
    <>
      <div className="container">      
          <h1 className="hero-title">5-Letter Words by Middle Letter - Solve Today's Wordle</h1>
      </div>
      <div className="linkBox-content">
        <div className="container">
          <div className="row">
            {letters.map(letter => {
              return (
                <div className="col-md-4" style={{marginBottom:20}}>
                  <a href={`/5-letter-words-with-${letter}-in-the-middle`} key={i++}>
                    <div className="linkBox">
                        <h2 className="linkBox-title">{`5-Letter Words with '${letter}' in the Middle`}</h2>                       
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
