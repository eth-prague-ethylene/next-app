'use client'

import { useActiveWallet } from "@lens-protocol/react-web";

export default function Home() {
  // authentication hooks
  const { data: wallet } = useActiveWallet();

  return (
    <>
      {
        wallet ? (
          <div>{wallet.address}</div>
        ) : (
          <div>No user</div>
        )
      }
    </>
  )
}
