"use client";

import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import { usePostsQuery } from "@/hooks/usePostsQuery";
import { usePostsStore } from "@/stores/usePostsStore";

export default function Home() {
  usePostsQuery();
  
  const result = usePostsStore((state) => state.posts)
  
  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="grid gap-4">
        {result && result.map((item) => (
          <div key={item.id}>
            <Card
              title={item.title}
              price={item.price}
              time={item.time}
            />
          </div>
        ))}
      </div>
      <Navbar/>
    </>
    
  );
}
