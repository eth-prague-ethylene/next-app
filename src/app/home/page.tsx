'use client'

import { useEffect } from "react";
import { CreatePostForm } from "../components/CreatePost/CreatePostForm";
import { ListOfPosts } from "../components/Posts/ListOfPosts";
import { useActiveProfile, useActiveWallet } from '@lens-protocol/react-web';

export default function Home() {
  const { data } = useActiveProfile();

  return (
    <>
      {
        data != null && <CreatePostForm publisher={data} />
      }
      <ListOfPosts />
    </>
  )
}
