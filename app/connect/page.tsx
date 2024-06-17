"use client"

import { useEffect, useState } from "react";
import { Footer } from "./(components)/Footer";
import MapComponent from "./(components)/GoogleMap";
import { cloneDeep } from "lodash";

import { MediaConnection } from "peerjs";
import { useGroup } from "~/util/GroupProvider";
import { useSocket } from "~/util/SocketProvider";
import usePeer from "~/util/calls/hooks/usePeer";
import useMediaStream from "~/util/calls/hooks/useMediaStream";
import usePlayer from "~/util/calls/hooks/usePlayer";
import { useRouter } from "next/router";

export default function Page() {

  return (<>
        <MapComponent />
        <Footer /> 
    </>
  );
};