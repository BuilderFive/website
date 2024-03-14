"use client";

import React from "react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function Map() {
  function handleClick(name: string) {
    console.log(name);
  }
  return (
    // <TransformWrapper
    //   initialScale={1}
    //   initialPositionX={0}
    //   initialPositionY={0}
    // >
    //   <TransformComponent>
    //     <img src={"/map.png"} alt="Map" />
    //   </TransformComponent>
    // </TransformWrapper>\
    <>
      <img
        src="map.png"
        useMap="#image-map"
        // className="h-screen object-cover"
      />

      <map name="image-map">
        <area
          target=""
          alt="library"
          title="library"
          href=""
          coords="624,271,615,282,605,274,597,281,603,290,593,300,643,363,676,335,676,333,668,321"
          shape="poly"
          onClick={(e) => {
            e.preventDefault();
            handleClick("library");
          }}
        />
        <area
          target=""
          alt="mchu"
          title="mchu"
          href=""
          coords="548,254,565,276,528,303,515,281"
          shape="poly"
          onClick={(e) => {
            e.preventDefault();
            handleClick("mchu");
          }}
        />
        <area
          target=""
          alt="ite"
          title="ite"
          href=""
          coords="576,304,586,307,593,314,594,321,565,347,548,326"
          shape="poly"
          onClick={(e) => {
            e.preventDefault();
            handleClick("ite");
          }}
        />
        <area
          target=""
          alt="business"
          title="business"
          href=""
          coords="539,334,510,361,511,375,542,410,556,394,531,368,553,350"
          shape="poly"
          onClick={(e) => {
            e.preventDefault();
            handleClick("business");
          }}
        />
        <area
          target=""
          alt="su"
          title="su"
          href=""
          coords="415,238,431,255,426,261,438,269,465,306,485,331,497,321,515,302,494,283,482,289,474,281,475,273,446,241,438,245,424,228"
          shape="poly"
          onClick={(e) => {
            e.preventDefault();
            handleClick("su");
          }}
        />
        <area
          target=""
          alt="rec"
          title="rec"
          href=""
          coords="603,396,557,430,589,468,644,423,621,396,610,405"
          shape="poly"
          onClick={(e) => {
            e.preventDefault();
            handleClick("rec");
          }}
        />
      </map>
    </>
  );
}
