import { NextSeo } from 'next-seo';
import React, {useEffect} from 'react';

export default function Home(props) {

  return (
    <>
      <NextSeo
        title={`Pounds To Kilograms Converter | lbs To kg Converter`}
        description={`lbs to kg (Pounds to Kilograms) converter. Convert Pounds to Kilograms with formula.`}
      />

      <div className="container">      
        <h1 className="title">Pounds To Kilograms</h1>
        <p>
          You can use the Pounds to Kilograms unit converter to convert from one measurement to another. To start simply enter Pound or Kilogram into the correct box below.
        </p>

        <hr></hr>
      
      </div>
    </>
  )
}
