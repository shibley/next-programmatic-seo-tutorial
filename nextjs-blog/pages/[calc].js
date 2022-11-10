import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import Image from 'next/image'
import pic from '../assets/poundstokilograms.jpeg'

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:6400/kgs`)
  const data = await res.json()

  // We need to adhere to the Next.js getStaticPaths structure
  // https://nextjs.org/docs/basic-features/data-fetching/get-static-paths

  const paths = data.map((calc) => ({
    params: { calc: 'calc' },
  }))

  //console.log(paths);
  // For blocking see: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-blocking
  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({params}) {
  console.log(params);
  var myString = params.calc;
  var myRegexp = /(-.-)/gm;
  //var myRegexp = new RegExp("(?:^|\s)format_(.*?)(?:\s|$)", "g");
  var match = myRegexp.exec(myString);
  var letterMatch = '';
  if(match != undefined){
    letterMatch = match[1].replace('-', '').replace('-', '');
  }

  // // Let's fetch the latest top ranking items in a category from our DB
  // const res = await fetch(`http://localhost:6400/words?letter=${letterMatch}&position=2`)
  // const words = await res.json()

  // Every time we statically generate this page we will have the time-stamped.
  const stats = new Date().toString()

  return { 
    props: { stats: stats, letterMatch },// words,
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

export default function Calc(props) {
  const router = useRouter();
  const  slug  = router.query.letter;
  const letter = props.letterMatch;
  //console.log(letter);
  let i = 0;

  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextSeo
        title={`150 Pounds To Kilograms Conversion | 150 lbs To kg Conversion`}
        description={`150 lbs to kg (150 pounds to kilograms) converter. Convert 150 Pound to Kilogram with formula.`}
      />
      <div className="title">
        <h1>How to convert 150 pounds to kilograms?</h1>
      </div>
      <p className="description">
        <br></br>
        <Image
          src={pic}
          alt="Picture of the author"
          width="400px"
          height="250px"
        />
        <hr></hr>
        <table>
            <tr>
              <td className="right" rowSpan="2">150&nbsp;lbs&nbsp; * &nbsp;</td>
              <td className="underline">0.45359237&nbsp;kg</td>
              <td className="left" rowspan="2"><strong>&nbsp;=&nbsp;68.0388555&nbsp;kg</strong></td>
            </tr>
            <tr>
              <td>1 lbs</td>
            </tr>
        </table>
      </p>
      <div className="text">
        <p className="description">
        <iframe width="400" height="250" src="https://www.youtube.com/embed/NLNiWS4rPQ0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </p>
        
      </div>
      <hr></hr>
      <div>
        <h2>How much is 150 pounds in kilograms?</h2>
      </div>
      <p>
        150 pounds equal 68.0388555 kilograms (150lbs = 68.0388555kg). Converting 150 lb to kg is easy. 
        Formula: for an approximate result, divide the mass value by 2.205
      </p>
      <p>
        Question: How many pounds in 150 kilograms? And the answer is 330.693393277 lbs in 150 kg. 
        Likewise the question how many kilogram in 150 pound has the answer of 68.0388555 kg in 150 lbs.
      </p>
      <hr></hr>
      <div>
        <h2>Alternative spellings</h2>
      </div>
      <p>
        150 lb to kg, 150 lb in kg, 150 lb to Kilogram, 150 lb in Kilogram, 150 lb to Kilograms, 
        150 lb in Kilograms, 150 Pounds to Kilogram, 150 Pounds in Kilogram, 150 Pounds to kg, 
        150 Pounds in kg, 150 Pound to Kilogram, 150 Pound in Kilogram, 150 lbs to kg, 
        150 lbs in kg, 150 lbs to Kilograms, 150 lbs in Kilograms, 150 lbs to Kilogram, 150 lbs in Kilogram
      </p>
        {/* <div className="container">
            <div className="row">
              {words.map(word => {
                return (
                  <div className="col-md-2" style={{marginBottom:20}}>
                      <h5>{word.word}</h5>
                  </div>
                  )
              })}
            </div>
        </div> */}
    </div>
    
  )
}
