"use client";

import BlogItem from "@/components/blog-item";
import prismadb from "@/lib/prismadb";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { Posts } from "@prisma/client";
import { SessionProvider } from "next-auth/react";
import { cache, useEffect, useState } from "react";
import axios from "axios";

const AllPost = () => {
  const [postData, setPostData] = useState<Posts[]>();
  useEffect(() => {
    const handlePostData = cache(async () => {
      const posts = await axios.get(`/api/posts`);
      setPostData(posts.data);
    });
    handlePostData();
  });
  return (
    <SessionProvider>
      <div className="flex text-6xl p-6 border-b-2 pb-10 w-full">
        <div className="whitespace-nowrap flex-shrink">All Posts</div>
      </div>
      <div>
        {postData !== undefined &&
          postData.map((post) => <BlogItem initialData={post} key={post.id} />)}
      </div>
    </SessionProvider>
  );
};

export default AllPost;
