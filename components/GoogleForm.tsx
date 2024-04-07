'use client'

import React, { useState, useEffect } from "react";

export default function GoogleForm(googleLink: string | undefined) {
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
    <div style={{paddingTop: 50, backgroundColor: "white"}}>
      <iframe
        src={googleLink}
        width={width}
        height={height}
        frameBorder="0"
      >
        Loading…
      </iframe>
    </div>
  );
}
