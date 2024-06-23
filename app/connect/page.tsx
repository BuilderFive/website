"use client"

import { useEffect, useState } from "react";
import { Footer } from "./(components)/Footer";
import MapComponent from "./(components)/GoogleMap";
import { useGroup } from "~/util/GroupProvider";
import { Sidebar } from "./(components)/Sidebar";
import { useConnectionState, useRoomContext } from "@livekit/components-react";
import { ConnectionState } from 'livekit-client';
import Modal from '~/components/ui/modal-auth';
import { useSession } from "~/util/AuthProvider";

export default function Page() {
  const { packagedGroup } = useGroup();
  const { user } = useSession();
  const [showModal, setShowModal] = useState(false);
  
  useEffect(()=> {
    if (!user) {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  },[user])

  return (<div className="flex flex-row w-screen h-screen">
      <Sidebar/>
      <MapComponent>
        {packagedGroup && <Footer />}
      </MapComponent>
      <Modal showModal={showModal} setShowModal={setShowModal}/>
    </div>
  );
};