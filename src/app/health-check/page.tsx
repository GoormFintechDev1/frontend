"use client";

import React, { useEffect, useState } from 'react'

const HealthCheck = () => {
  
  
  const [data, setData] = useState('');
  
  useEffect(() => {
    const enviroment = process.env.NODE_ENV;

    let url = "http://localhost:8080";
    if (enviroment === "production") {
      url = process.env.NEXT_PUBLIC_DOMAIN ? `${process.env.NEXT_PUBLIC_DOMAIN}` : `http://localhost:8080`;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/api/health-check`);
        const text = await response.text();
        setData(text);
      } catch (error) {
        console.error('Fetch failed:', error);
        setData('Fetch failed');
      }
    };

    fetchData();
  }, []);



  return (
    <div>{data}</div>
  )
}

export default HealthCheck;