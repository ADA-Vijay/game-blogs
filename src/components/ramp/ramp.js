"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; 

const PUB_ID = 1025324;
const WEBSITE_ID = 75084;

const Ramp = () => {
   const [rampComponentLoaded, setRampComponentLoaded] = useState(false);
   const pathname = usePathname(); 

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
           document.body.appendChild(configScript); 

           configScript.onload = () => {
               if (window.ramp && window.ramp.spaNewPage) {
                   window.ramp.spaNewPage(pathname); 
               }
           };
       }

       window.ramp.que.push(() => {
           if (window.ramp && window.ramp.spaNewPage) {
               window.ramp.spaNewPage(pathname); 
               console.log(`spaNewPage triggered for path: ${pathname}`);
           }
       });

   }, []); 

   return null;
};

export default Ramp;
