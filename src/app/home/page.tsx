'use client'

import { useActiveWallet } from "@lens-protocol/react-web";
import { CreatePostForm } from "../components/CreatePost/CreatePostForm";

export default function Home() {
  // authentication hooks
  const { data: wallet } = useActiveWallet();

  return (
    <>
    <CreatePostForm />
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
