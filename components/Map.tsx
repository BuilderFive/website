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
    <div
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      <img
        src="map.png"
        style={{
          display: "block",
          maxWidth: "100%",
          height: "auto",
        }}
        // useMap="#image-map"
        // className="h-screen object-cover"
      />
      <svg
        className="image-mapper-svg"
        viewBox="0 0 1200 700"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
      >
        <polygon
          points="148,97,136,105,144,115,158,104,152,97,149,99"
          className="image-mapper-shape"
          data-area-index="5"
          style={{
            fill: "rgb(102, 102, 102)",
            stroke: "rgb(51, 51, 51)",
            strokeWidth: 1,
            opacity: 0.6,
            cursor: "pointer",
          }}
        ></polygon>
        <polygon
          points="102,58,106,63,104,64,107,66,114,75,119,81,122,79,126,74,121,69,118,71,116,69,116,67,109,59,107,60,104,56"
          className="image-mapper-shape"
          data-area-index="4"
          style={{
            fill: "rgb(102, 102, 102)",
            stroke: "rgb(51, 51, 51)",
            strokeWidth: 1,
            opacity: 0.6,
            cursor: "pointer",
          }}
        ></polygon>
        <polygon
          points="132,82,125,89,125,92,133,101,136,97,130,90,135,86"
          className="image-mapper-shape"
          data-area-index="3"
          style={{
            fill: "rgb(102, 102, 102)",
            stroke: "rgb(51, 51, 51)",
            strokeWidth: 1,
            opacity: 0.6,
            cursor: "pointer",
          }}
        ></polygon>
        <polygon
          points="141,75,143,75,145,77,145,79,138,85,134,80"
          className="image-mapper-shape"
          data-area-index="2"
          style={{
            fill: "rgb(102, 102, 102)",
            stroke: "rgb(51, 51, 51)",
            strokeWidth: 1,
            opacity: 0.6,
            cursor: "pointer",
          }}
        ></polygon>
        <polygon
          points="134,62,138,68,129,74,126,69"
          className="image-mapper-shape"
          data-area-index="1"
          style={{
            fill: "rgb(102, 102, 102)",
            stroke: "rgb(51, 51, 51)",
            strokeWidth: 1,
            opacity: 0.6,
            cursor: "pointer",
          }}
        ></polygon>
        <polygon
          points="153,66,151,69,148,67,146,69,148,71,145,74,157,89,165,82,165,82,164,79"
          className="image-mapper-shape"
          data-area-index="0"
          style={{
            fill: "rgb(102, 102, 102)",
            stroke: "rgb(51, 51, 51)",
            strokeWidth: 1,
            opacity: 0.6,
            cursor: "pointer",
          }}
        ></polygon>
      </svg>

      {/* <map name="image-map">
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
      </map> */}
    </div>
  );
}
