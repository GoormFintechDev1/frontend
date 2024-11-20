const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8083/api/products";
if (enviroment === "production") {
  url = process.env.NEXT_PUBLIC_DOMAIN ? `http://${process.env.NEXT_PUBLIC_DOMAIN}/api` : `http://localhost:8083/api/products`;
}

export const getProduct = async () => {
    const response = await fetch(`${url}/all`, {
        method: 'GET',
        credentials: 'include'
    });

    const data = await response.json();

    // console.log(data);

    return data;
}