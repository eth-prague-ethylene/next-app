'use client'

import { useEffect } from "react";
import { CreatePostForm } from "../components/CreatePost/CreatePostForm";
import { ListOfPosts } from "../components/Posts/ListOfPosts";
import { useActiveProfile, useActiveWallet } from '@lens-protocol/react-web';

export default function Home() {
  const { data, error, loading } = useActiveProfile();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      {/* <CreatePostForm publisher={null} /> */}
      <ListOfPosts />
    </>
  )
}
