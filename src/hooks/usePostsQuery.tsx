"use client";

import { fetchUsers } from "@/app/post/page";
import { getPostList } from "@/lib/postApi"
import { usePostsStore } from "@/stores/usePostsStore";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useEffect } from "react";

interface PostType {
  id: number;
  title: string;
  price: number;
  time: string;
}

export interface Users {
  id: number;
  name: string;
  userId: number;
}

export interface UserQuery {
  pageSize: number;
}

export const usePostsQuery = () => {
  const setPosts = usePostsStore((state) => state.setPosts);
  const {data} = useQuery<PostType[]>({
    queryKey: ["productList"],
    queryFn: getPostList,
    // staleTime: 1000 * 60 * 5, // 쿼리 데이터가 최신 데이터로 간주되는 시간
  })
  // data가 있을 때만 setPosts 호출
  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data, setPosts]);

  return data;
}

export const useUsers = () =>
  useInfiniteQuery<Users[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    initialPageParam: 1,
    getNextPageParam(lastPage, allPages) {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });