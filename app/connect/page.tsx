"use client"

import { useState } from "react";
import { Footer } from "./(components)/Footer";
import MapComponent from "./(components)/GoogleMap";

export default function Page() {
    const [radius, setRadius] = useState(1000)

    return <>
        <MapComponent rad={radius} setRad={setRadius} />
        <Footer rad={radius}/>
    </>;
}