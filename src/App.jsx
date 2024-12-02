// App.js
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [cookieResponse, setCookieResponse] = useState(null);
  const [jsonResponse, setJsonResponse] = useState(null);

  const handleSetCookie = async () => {
    try {
      const response = await axios.get(
        "https://cookie-backend.vercel.app/set-cookie",
        {
          withCredentials: true,
        }
      );
      setCookieResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetCookie = async () => {
    try {
      const response = await axios.get(
        "https://cookie-backend.vercel.app/get-cookie",
        {
          withCredentials: true,
        }
      );
      setCookieResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleJsonResponse = async (code) => {
    try {
      const response = await axios.get(
        `https://cookie-backend.vercel.app/json-response/${code}`
      );
      setJsonResponse({ status: response.status, data: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cookie and JSON Demo</h1>

      <div>
        <h2>Cookie Handling</h2>
        <button onClick={handleSetCookie}>Set Cookie</button>
        <button onClick={handleGetCookie}>Get Cookie</button>
        {cookieResponse && <pre>{JSON.stringify(cookieResponse, null, 2)}</pre>}
      </div>

      <div>
        <h2>JSON Responses</h2>
        {[200, 201, 400, 404, 500].map((code) => (
          <button key={code} onClick={() => handleJsonResponse(code)}>
            Get {code} Response
          </button>
        ))}
        {jsonResponse && (
          <div>
            <h3>Status Code: {jsonResponse.status}</h3>
            <pre>{JSON.stringify(jsonResponse.data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
