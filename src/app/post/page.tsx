"use client";

import Card from "@/components/Card";
import { useUsers } from "@/hooks/usePostsQuery";
import React, { useCallback, useRef } from "react";

export const fetchUsers = async ({ pageParam }: { pageParam: unknown }) => {
  const url = new URL("https://jsonplaceholder.typicode.com/posts");
  url.searchParams.append("_page", pageParam + "");
  url.searchParams.append("_limit", "8");
  const response = await fetch(url.toString(), {
    method: "GET",
  });
  return response.json();
};

export default function PostPage() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useUsers();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;

      // 기존 observer가 있다면 해제
      if (observerRef.current) observerRef.current.disconnect()

      // 새로운 observer 생성
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      })

      // node가 유효하면 observer로 감시 시작
      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  )

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.map((project) => (
            <Card
              key={project.id}
              title={project.name}
              price={project.userId}
              time="2024-10-30"
            />
          ))}
        </React.Fragment>
      ))}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      {/* 마지막 요소에 ref 할당 */}
      <div ref={lastElementRef} style={{ height: '1px' }} />
    </>
  );
}
