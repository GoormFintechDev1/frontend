const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/posts";
if (enviroment === "production") {
  url = process.env.NEXT_PUBLIC_DOMAIN ? `/api/posts` : `http://localhost:8080/api/posts`;
}

export const getPostList = async () => {
  const testData = [
    { id: 1, title: "Test Post 1", price: 1000, time: "1초전" },
    { id: 2, title: "Test Post 2", price: 2000, time: "2초전" },
    { id: 3, title: "Test Post 3", price: 3000, time: "3초전" },
    { id: 4, title: "Test Post 4", price: 4000, time: "4초전" },
    { id: 5, title: "Test Post 5", price: 5000, time: "5초전" }
  ];
  
  localStorage.setItem('posts-storage', JSON.stringify(testData));

  try {
    if (localStorage.getItem("posts-storage")) {
      return JSON.parse(localStorage.getItem("posts-storage")!);
    }

    const response = await fetch(`${url}/list`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Posts Load Failed", error);
    throw error;
  }
}