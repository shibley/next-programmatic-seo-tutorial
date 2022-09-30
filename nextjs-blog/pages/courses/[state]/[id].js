import Head from 'next/head';
import axios from "axios";
import { useRouter } from 'next/router';
import { NextSeo, ProductJsonLd } from 'next-seo';
//const linkPreviewGenerator = require("link-preview-generator");

export async function getStaticPaths() {

  // We need to fetch all of the items from our DB by category
  const res = await fetch(`http://localhost:6400/courses`)
  const courses = await res.json()

  // We need to adhere to the Next.js getStaticPaths structure
  // https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
  //let paths = products.map((x)=>{return{'params': {'product': [x.slug]}}})
  const paths = courses.map((course) => ({
    params: { state: course.state, id: course.id },
  }))

  // For blocking see: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-blocking
  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({params}) {
  const { state, id } = params
  //console.log({params});
  // Let's fetch the latest top ranking items in a category from our DB
  const res = await fetch(`http://localhost:6400/courses/${id}`)
  const course = await res.json()

  //get image if none found
  if(course.photoreference == null)
  {
    //console.log(process.env.REACT_APP_PLACES_API_KEY);
    const placesRequestUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${course.name + "," + course.state}&key=${process.env.REACT_APP_PLACES_API_KEY}&inputtype=textquery&fields=name,photos`;
    const initialPlacesRequest = await axios
    .get(placesRequestUrl)
    .catch(console.error);

    var photoRef = initialPlacesRequest?.data?.candidates?.[0]?.photos?.[0]?.photo_reference;
    //console.log(photoRef);

    if (typeof photoRef == undefined || photoRef == null)
    {
        //lets try city only
        const placesRequestUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${course.city + "," + course.state}&key=${process.env.REACT_APP_PLACES_API_KEY}&inputtype=textquery&fields=name,photos`;
        const initialPlacesRequest = await axios
        .get(placesRequestUrl)
        .catch(console.error);
    
        photoRef = initialPlacesRequest?.data?.candidates?.[0]?.photos?.[0]?.photo_reference;
    }
    if(photoRef)
    {
      const imageLookupURL = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef}&key=${process.env.REACT_APP_PLACES_API_KEY}&maxwidth=700&maxheight=700`;
      const imageURLQuery = await fetch(imageLookupURL)
      .then(r => r.url)
      .catch(console.error);

      //console.log(imageURLQuery);
      //const image = URL.createObjectURL(imageURLQuery); //declared earlier
      //console.log(image);
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoreference: photoRef, image: imageURLQuery })
      };
      const response = await fetch(`http://localhost:6400/courses/${id}`, requestOptions)
      .then(response => response.json())
      console.log(response);
    }
  }

  // Let's pick the 5 best ranked ones
  //const topProducts = products.sort((a,b) => b.rating - a.rating).slice(0, 5);

  // Every time we statically generate this page we will have the time-stamped.
  const stats = new Date().toString()

  return { 
    props: { stats: stats, course },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

export default function Id(props) {
  // const router = useRouter()
  // const { productId } = router.query
  const stats = props.stats;
  const course = props.course;

  return (
    <div className="container">
      <Head>
        <title>{course}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextSeo
        title={`{course.name}`}
        description={`{course.name}`}
      />

      <main>
        <h1 className="title">
          {course.name}
        </h1>
        <h3><a href="/">Home</a></h3>
        <p className="description">
          {course.name} <br /> 
          <p><i>Rating: {course.rating}</i></p>
          <img src={course.image} alt={course.name} />
          {/* Updated at: {stats} */}
        </p>
      </main>
    </div>
  )
}
