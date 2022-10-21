
import { NextSeo } from 'next-seo';

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
      <NextSeo
        title={`5-Letter Words by Middle Letter`}
        description={`5-Letter Words by middle letter to help you solve today's Wordle or any other word puzzle you might be trying to figure out.`}
      />
      <div className="container">      
        <h1 className="title">5-Letter Words by Middle Letter - Solve Today's Wordle</h1>
        <p>
          It may be difficult to reach the Wordle answer if you are running low on attempts. 
          Players can struggle even more when they only have one green letter and no idea how to move on from there. 
          For example, players may get stuck with a single green A in the middle of the five-letter word.
        </p>
        <p>If this is the case for you, check out this list of five-letter words with the letter placed in the middle. The list is in alphabetical order.</p>
      </div>
      <hr></hr>
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
