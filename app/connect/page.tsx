"use client"

import { useEffect, useState } from "react";
import { Footer } from "./(components)/Footer";
import MapComponent from "./(components)/GoogleMap";
import { cloneDeep } from "lodash";

import { MediaConnection } from "peerjs";
import { useGroup } from "~/util/GroupProvider";
import { useSocket } from "~/util/SocketProvider";

export default function Page() {
  const { socket } = useSocket()
  const { leaveGroup, systemProcessGroupJoin } = useGroup();
  const [users, setUsers] = useState<MediaConnection[]>([])

  console.log(socket)

  return (<>
        <MapComponent />
        <Footer/> 
    </>
  );
};