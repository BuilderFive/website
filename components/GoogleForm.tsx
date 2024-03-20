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
      src="https://docs.google.com/forms/d/e/1FAIpQLScm0YYfHM4Qi1Ig-V31YSRJIOAXVWQRz30KwSwLshVn-zZO1A/viewform?embedded=true"
      width={width}
      height={height}
      frameBorder="0"
    >
      Loading…
    </iframe>
  );
}
