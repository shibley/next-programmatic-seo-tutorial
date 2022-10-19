import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

export async function getStaticPaths() {

  // We need to fetch all of the words from our DB
  const res = await fetch('http://localhost:6400/letters')
  const letters = await res.json()

  // We need to adhere to the Next.js getStaticPaths structure
  // https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
  let paths = letters.map((x)=>{return{'params': {'slug': x}}})
console.log(paths);
  // For blocking see: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-blocking
  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({params}) {

  // Let's fetch the latest top ranking items in a category from our DB
  const res = await fetch(`http://localhost:6400/words?letter=${params.slug}&position=0`)
  const words = await res.json()

  // Let's pick the 50 best ranked ones
  //const topCourses = courses.sort((a,b) => b.rating - a.rating).sort((a,b) => b.name - a.name).slice(0, 50);

  // Every time we statically generate this page we will have the time-stamped.
  const stats = new Date().toString()

  return { 
    props: { stats: stats, words },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

export default function Slug(props) {
  const router = useRouter()
  const { slug } = router.query
  const stats = props.stats;
  const words = props.words;
  let i = 0;

  return (
    <div className="container">
      <Head>
        <title></title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextSeo
        title={``}
        description={``}
      />
        <h1 className="title">
          {slug} - Solve Today's Wordle
        </h1>
        <p className="description">
          {slug}
          {/* , <br /> Updated at: {stats} */}
        </p>
        <div className="container">
          <div className="linkBox-content">
            <div className="row">
              {words.map(word => {
                return (
                  <div className="col-md-4" style={{marginBottom:20}}>
                      <h5>{word.name}</h5>
                  </div>
                  )
              })}
            </div>
          </div>
        </div>
    </div>
    
  )
}
