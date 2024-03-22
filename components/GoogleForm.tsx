import React, { useState, useEffect } from "react";

export default function MyFunction() {
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
    <iframe
      src="https://docs.google.com/forms/d/e/1FAIpQLSes4HpmjGoCTdmsWZy7wr9eXONTTftLcdnQK2npUUr5tHLAGQ/viewform?embedded=true"
      width={width}
      height={height}
      frameBorder="0"
    >
      Loading…
    </iframe>
  );
}
