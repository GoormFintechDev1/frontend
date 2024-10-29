const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8080/api/posts";
if (enviroment === "production") {
  url = "https://domain/api/posts";
}

export const getPostList = async () => {
  try {
    if (localStorage.getItem("post-storage")) {
      return localStorage.getItem("post-storage");
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