"use client"

import { useEffect, useState } from "react";
import { Footer } from "./(components)/Footer";
import MapComponent from "./(components)/GoogleMap";
import { useRouter } from "next/router";

export default function Page() {

  return (<>
        <MapComponent />
        <Footer /> 
    </>
  );
};