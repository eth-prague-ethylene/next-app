'use client'

import { CreatePostForm } from "../components/CreatePost/CreatePostForm";
import { ListOfPosts } from "../components/Posts/ListOfPosts";

export default function Home() {
  return (
    <>
      <CreatePostForm publisher={null} />
      <ListOfPosts />
    </>
  )
}
