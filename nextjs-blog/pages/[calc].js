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
      <h2>How Many Kilograms are in a Pound?</h2>
      <p>
        The history of the pound is long and complicated, dating back to the Roman Empire. 
        The pound is a unit of measurement that has been used in many different ways throughout history. 
        The pound has also been a part of the United States' standard system of weights and measures since 1858. 
        The pound is currently defined as 0.45359237 kilograms. This means that there are approximately 2.20462262 pounds in a kilogram. 
      </p>
      <h2>The History of the Pound</h2>
      <p>
        The pound is a unit of measurement that has been used in many different ways throughout history. 
        The pound has its origins in the Roman Empire, where it was originally used as a unit of weight. 
        The pound was also used as a unit of currency in the Middle Ages. 
        The pound is currently defined as 0.45359237 kilograms. This means that there are approximately 2.20462262 pounds in a kilogram. 
      </p>
      <p>
        The pound is still used today as a unit of measurement, though it has largely been replaced by the metric system. 
        The pound is most commonly used in the United States, where it is used to measure a variety of things, including weight, height, and even fabric.
      </p>
      <h2>The Evolution of the Pound</h2>
      <p>
        The pound has undergone a number of changes throughout its history. In the Middle Ages, the pound was a unit of currency. 
        In the 18th century, the pound was redefined as a unit of weight. The current definition of the pound was established in 1858. 
        The pound is currently defined as 0.45359237 kilograms. This means that there are approximately 2.20462262 pounds in a kilogram.
      </p>
      <p>
        The pound is a unit of measurement that is used in a variety of different ways. In the United Kingdom, the pound is used as a unit of currency. 
        In the United States, the pound is used as a unit of weight. The pound is also used as a unit of measurement in a variety of other countries.
      </p>
      <h2>The current value of the Pound</h2>
      <p>
        The value of the pound has fluctuated throughout its history. 
        The pound is currently worth approximately 0.45359237 kilograms. This means that there are approximately 2.20462262 pounds in a kilogram.
      </p>
      <p>
        The value of the pound has been affected by many factors over the years. These include inflation, the strength of the economy, and political stability. 
        The value of the pound is also affected by the values of other currencies. When the value of the pound goes up, it means that it is worth more than other currencies. 
        When the value of the pound goes down, it means that it is worth less than other currencies. </p><p>The value of the pound is important to many people. 
        It can affect the price of imported goods, the cost of travel, and the amount of money that people can send abroad. 
        The value of the pound can also affect the economy of a country. A strong pound can help to create jobs and attract investment. 
        A weak pound can cause inflation and make it difficult for businesses to compete.
      </p>
      <h2>How to Convert Kilograms to Pounds</h2>
      <p>
        There are a number of ways to convert kilograms to pounds. One way to do this is to use a calculator. Another way to do this is to use a conversion chart. 
        A conversion chart can be found online or in a variety of books and other publications. </p><p>To use a conversion chart, simply find the conversion factor for kilograms to pounds. 
        This can be done by finding the number of pounds in one kilogram. Once the conversion factor is known, simply multiply the number of kilograms by the conversion factor to 
        find the number of pounds.
      </p>
      <h2>How to Convert Pounds to Kilograms</h2>
      <p>
        There are a number of ways to convert pounds to kilograms. One way to do this is to use a calculator. Another way to do this is to use a conversion chart. 
        A conversion chart can be found online or in a variety of books and other publications.
      </p>
      <p>
        To use a conversion chart, simply find the pounds value on the left hand side of the chart and follow the line over to the right hand side to find the 
        corresponding kilograms value. For example, if the chart lists a value of 1 pound as 0.45 kilograms, this means that 1 pound is equal to 0.45 kilograms.
      </p>
      <h2>The Benefits of Converting Kilograms to Pounds</h2>
      <p>
        There are a number of benefits to converting kilograms to pounds. One benefit is that it makes it easier to compare weights between different systems. 
        Another benefit is that it can help to make calculations more accurate.
      </p>
      <p>
        Another benefit of converting kilograms to pounds is that it allows you to easily convert between the two units of measurement. 
        This can be helpful when you are trying to figure out how much something weighs in either unit of measurement.
      </p>
      <h2>The Benefits of Converting Pounds to Kilograms</h2>
      <p>
        There are a number of benefits to converting pounds to kilograms. One benefit is that it makes it easier to compare weights between different systems. 
        Another benefit is that it can help to make calculations more accurate.
      </p>
      <p>
        Another benefit of converting pounds to kilograms is that it allows for more consistent measurements. When using the same system of measurement, there is less room for error. 
        This can be especially important when measuring things like medication or chemicals.
      </p>
      <div>
        <h2>Alternative spellings</h2>
      </div>
      <p>
        150 lb to kg, 150 lb in kg, 150 lb to Kilogram, 150 lb in Kilogram, 150 lb to Kilograms, 
        150 lb in Kilograms, 150 Pounds to Kilogram, 150 Pounds in Kilogram, 150 Pounds to kg, 
        150 Pounds in kg, 150 Pound to Kilogram, 150 Pound in Kilogram, 150 lbs to kg, 
        150 lbs in kg, 150 lbs to Kilograms, 150 lbs in Kilograms, 150 lbs to Kilogram, 150 lbs in Kilogram
      </p>
    </div>
    
  )
}
