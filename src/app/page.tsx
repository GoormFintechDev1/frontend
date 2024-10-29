"use client";

import Navbar from "@/components/Navbar";

// import Card from "@/components/Card";
// import Navbar from "@/components/Navbar";
// import { usePostsQuery } from "@/hooks/usePostsQuery";
// import { usePostsStore } from "@/stores/usePostsStore";

export default function Home() {
  const testData = [
    { id: 1, title: "Test Post 1", price: 1000, time: "1초전" },
    { id: 2, title: "Test Post 2", price: 2000, time: "2초전" },
    { id: 3, title: "Test Post 3", price: 3000, time: "3초전" },
    { id: 4, title: "Test Post 4", price: 4000, time: "4초전" },
    { id: 5, title: "Test Post 5", price: 5000, time: "5초전" }
  ];
  
  // localStorage.setItem('post-storage', JSON.stringify(testData));

  // usePostsQuery();
  // const result = usePostsStore((state) => state.posts)
  // const data = JSON.parse(result);
  
  return (
    <>
      {/* <div className="mb-4">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="grid gap-4">
        {data.map((item) => (
          <>
            <Card
              key={item.id}
              title={item.title}
              price={item.price}
              time={item.time}
            />
          </>
        ))}
      </div>*/}
      <Navbar/> 
    </>
    
  );
}
