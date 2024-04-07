// import GoogleForm from "@/components/GoogleForm";
// import React from "react";

// export default function Free() {
//   // Your code here

//   return (
//     <GoogleForm googleLink="https://docs.google.com/forms/d/e/1FAIpQLSeSTAoiEjIi2eBhMZfsMTdSTQoj8xQmI0FsqWCX-0gpW29Ixw/viewform?embedded=true" />
//   );
// }

"use client";

import React, { useState, useEffect } from "react";

export default function GoogleForm() {
  const [width, setWidth] = useState(700);
  const [height, setHeight] = useState(520);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    // window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ paddingTop: 50, backgroundColor: "white" }}>
      <iframe
        src={
          "https://docs.google.com/forms/d/e/1FAIpQLSfNLPgp42L62S8Ph3VaMOZe5JJc1zCug5QTtnCkJ9on-jUy2w/viewform?embedded=true"
        }
        width={width}
        height={height}
        frameBorder="0"
      >
        Loading…
      </iframe>
    </div>
  );
}
