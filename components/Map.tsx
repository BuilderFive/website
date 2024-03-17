"use client";

// import React from "react";

// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// export default function Map() {
//   function handleClick(name: string) {
//     console.log(name);
//   }
//   return ();
// }

import React, { useState } from "react";
// import * as ReactDOM from "react-dom/client";
import { Map, Marker } from "react-canvas-map";

export default function UConnMap() {
  const [markerOneImage] = useState(() => {
    const image = new Image();
    image.src = "marker-blue.svg";
    return image;
  });
  const [markerTwoImage] = useState(() => {
    const image = new Image();
    image.src = "marker-blue.svg";
    return image;
  });
  const [markerOneCoords, setMarkerOneCoords] = useState({ x: 100, y: 200 });
  const [markerTwoCoords, setMarkerTwoCoords] = useState({ x: 150, y: 20 });
  return (
    <div
      style={{ height: "50vh", border: "1px solid #ddd"}}
    >
      <Map image="map.jpg">
        <Marker
          markerKey="marker-one"
          coords={markerOneCoords}
          onDragTick={setMarkerOneCoords}
          onDragEnd={setMarkerOneCoords}
          image={markerOneImage}
          onClick={() => {
            alert("You clicked marker one!");
          }}
        />
        <Marker
          markerKey="marker-two"
          coords={markerTwoCoords}
          onDragTick={setMarkerTwoCoords}
          onDragEnd={setMarkerTwoCoords}
          image={markerTwoImage}
          onClick={() => {
            alert("You clicked marker two!");
          }}
        />
      </Map>
    </div>
  );
}
