'use client'

import { useActiveProfile } from "@lens-protocol/react-web";
import { useEffect } from "react";

export default function Home() {
  // authentication hooks
  const { data: wallet } = useActiveProfile();

  useEffect(() => {
    console.log(wallet);
  }, [wallet])

  return (
    <>
      {
        wallet ? (
          <div>{wallet.handle}</div>
        ) : (
          <div>No user</div>
        )
      }
    </>
  )
}
