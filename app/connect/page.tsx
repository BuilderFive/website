"use client"

import { useEffect, useState } from "react";
import { Footer } from "./(components)/Footer";
import MapComponent from "./(components)/GoogleMap";
import { useRouter } from "next/router";
import { useGroup } from "~/util/GroupProvider";
import { Sidebar } from "./(components)/Sidebar";

export default function Page() {

  const { packagedGroup } = useGroup();

  return (<div className="flex flex-row w-screen h-screen">
      <Sidebar/>
      <MapComponent>
        {packagedGroup && <Footer />}
      </MapComponent>
    </div>
  );
};