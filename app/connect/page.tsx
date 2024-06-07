"use client"

import { useState } from "react";
import { Footer } from "./(components)/Footer";
import MapComponent from "./(components)/GoogleMap";

export default function Page() {

    return <>
        <MapComponent />
        <Footer/>
    </>;
}