"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const PUB_ID = 1025324;
const WEBSITE_ID = 75084;
const Ramp = () => {
   const [rampComponentLoaded, setRampComponentLoaded] = useState(false);
   const router = useRouter();

   useEffect(() => {
       if (!PUB_ID || !WEBSITE_ID) {
           console.log('Missing Publisher Id and Website Id');
           return;
       }

       if (!rampComponentLoaded) {
           setRampComponentLoaded(true);
           window.ramp = window.ramp || {};
           window.ramp.que = window.ramp.que || [];
           window.ramp.passiveMode = true;

           const configScript = document.createElement("script");
           configScript.src = `https://cdn.intergient.com/${PUB_ID}/${WEBSITE_ID}/ramp.js`;
           document.body.appendChild(configScript); // Insert before closing </body> tag

           configScript.onload = window.ramp.spaNewPage;
       }

       // cleanUp function to remove units on component unmount
       window.ramp.que.push(() => {
           window.ramp.spaNewPage(router.asPath);
       });
   }, [rampComponentLoaded, router.asPath]);

   return null;
};

export default Ramp;