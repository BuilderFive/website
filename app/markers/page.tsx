"use client"

import { useGroup } from "~/util/GroupProvider";
import { Sidebar } from "../connect/(components)/Sidebar";
import Globe from "./Globe";
import { Footer } from "../connect/(components)/Footer";
import { useEffect, useState } from "react";

export default function Page() {
  const { packagedGroup } = useGroup()

  return (<div className="flex flex-row w-screen h-screen">
      <Sidebar/>
      
      <Globe>
        {packagedGroup && <Footer/>}
      </Globe>
    </div>
  );
}
