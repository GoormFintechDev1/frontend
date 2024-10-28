"use client";

import { getPostList } from "@/lib/postApi"
import { usePostsStore } from "@/stores/usePostsStore";
import { useQuery } from "@tanstack/react-query"

interface PostType {
  id: number;
  title: string;
  price: number;
  time: string;
}

export const usePostsQuery = () => {
  const setPosts = usePostsStore((state) => state.setPosts);
  const {data} = useQuery<PostType[]>({
    queryKey: ["productList"],
    queryFn: getPostList,
    // staleTime: 1000 * 60 * 5, // 쿼리 데이터가 최신 데이터로 간주되는 시간
  })
  if (data) {
    setPosts(data);
  }
}