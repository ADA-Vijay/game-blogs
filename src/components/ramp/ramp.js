"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // Replacing useRouter

const PUB_ID = 1025324;
const WEBSITE_ID = 75084;

const Ramp = () => {
   const [rampComponentLoaded, setRampComponentLoaded] = useState(false);
   const pathname = usePathname(); // Get current path

   useEffect(() => {
       // Ensure Publisher ID and Website ID are present
       if (!PUB_ID || !WEBSITE_ID) {
           console.log('Missing Publisher Id and Website Id');
           return;
       }

       // Load Ramp script only once
       if (!rampComponentLoaded) {
           setRampComponentLoaded(true);
           window.ramp = window.ramp || {};
           window.ramp.que = window.ramp.que || [];
           window.ramp.passiveMode = true;

           const configScript = document.createElement("script");
           configScript.src = `https://cdn.intergient.com/${PUB_ID}/${WEBSITE_ID}/ramp.js`;
           document.body.appendChild(configScript); // Append before closing </body> tag

           // Ensure ramp.spaNewPage runs only once on script load
           configScript.onload = () => {
               if (window.ramp && window.ramp.spaNewPage) {
                   window.ramp.spaNewPage(pathname); // Trigger on initial page load
               }
           };
       }

       // Call spaNewPage on every navigation change
       window.ramp.que.push(() => {
           if (window.ramp && window.ramp.spaNewPage) {
               window.ramp.spaNewPage(pathname); // Trigger on navigation
               console.log(`spaNewPage triggered for path: ${pathname}`);
           }
       });

   }, [pathname, rampComponentLoaded]); // Re-run on pathname change

   return null;
};

export default Ramp;
