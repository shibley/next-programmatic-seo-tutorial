import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:6400/letters`)
  const letters = await res.json()

  // We need to adhere to the Next.js getStaticPaths structure
  // https://nextjs.org/docs/basic-features/data-fetching/get-static-paths

  const paths = letters.map((letter) => ({
    params: { position: '0', letter: '5-letter-words-with-' + letter + '-in-the-middle' },
  }))

  //console.log(paths);
  // For blocking see: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-blocking
  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({params}) {
  //console.log(params);
  var myString = params.letter;
  var myRegexp = /(-.-)/gm;
  //var myRegexp = new RegExp("(?:^|\s)format_(.*?)(?:\s|$)", "g");
  var match = myRegexp.exec(myString);
  var letterMatch = '';
  if(match != undefined){
    letterMatch = match[1].replace('-', '').replace('-', '');
  }

  // Let's fetch the latest top ranking items in a category from our DB
  const res = await fetch(`http://localhost:6400/words?letter=${letterMatch}&position=2`)
  const words = await res.json()

  const res2 = await fetch(`http://localhost:6400/letters`)
  const letters = await res2.json()

  // Every time we statically generate this page we will have the time-stamped.
  const stats = new Date().toString()

  return { 
    props: { stats: stats, words, letterMatch, letters },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

export default function Letter(props) {
  const router = useRouter();
  const  slug  = router.query.letter;
  const stats = props.stats;
  const words = props.words;
  const letter = props.letterMatch;
  const letters = props.letters;
  console.log(letter);
  let i = 0;

  return (
    <div className="container">
      <Head>
        <title></title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextSeo
        title={`5 Letter Words with '${letter}' in the Middle, Solve Today's Wordle`}
        description={`List of 5-letter words with '${letter}' in the middle to help you solve today's Wordle or any other word puzzle you might be trying to figure out.`}
      />
        <h1 className="title">
          5-Letter Words with '{letter}' in the Middle
          {/* - Solve Today's Wordle */}
        </h1>
        <p className="description">
           List of 5-letter words with '{letter}' in the middle to help you solve today's Wordle or any other word puzzle you might be trying to figure out for the day!
          {/* , <br /> Updated at: {stats} */}
        </p>
        <p>
          There are a ton of fun word games to play, like the very popular game Wordle, which involves solving for five-letter words. 
          If you're having a hard time finding the right 5 letter word, we've created this list of 5-letter words with '{letter}' in the middle that 
          should help you figure out the solution and help you win!
        </p>
        <hr></hr>
        <div className="container">
            <div className="row">
              {words.map(word => {
                return (
                  <div className="col-md-2" style={{marginBottom:20}}>
                      <h5>{word.word}</h5>
                  </div>
                  )
              })}
            </div>
            <div className="row">
              <div className="col-md-12">
                <hr></hr>
                <h2>Other middle letters:</h2>
                <ul>
                  {letters.map(innerLetter => {
                    if(letter !== innerLetter)
                    {
                      return (
                        <li>
                            <h5><a href={`5-letter-words-with-${innerLetter}-in-the-middle`}>5 letter words with '{innerLetter}' in the middle</a></h5>
                        </li>
                        )
                      }
                  })}
                </ul>
              </div>
            </div>
        </div>
    </div>
    
  )
}
