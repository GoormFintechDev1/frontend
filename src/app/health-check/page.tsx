import React from 'react'

const HealthCheck = async () => {
  const response = await fetch(`http://localhost:8080/api/health-check`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });



  return (
    <div>{response.text()}</div>
  )
}

export default HealthCheck;