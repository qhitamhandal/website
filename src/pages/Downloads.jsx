import React, { useState, useEffect } from "react";
import "./Downloads.css";

function Downloads() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/files`)
      .then((response) => response.json())
      .then((data) => setFiles(data))
      .catch((error) => console.error("Error fetching files:", error));
  }, []);

  return (
    <div className="downloads-container">
      <h1>Downloads</h1>
      <div className="file-list">
        {files.map((file, index) => (
          <div className="file-card" key={index}>
            <h3>{file.name}</h3>
            <p>Size: {file.size}</p>
            <div className="download-options">
              {file.urls &&
                file.urls.map((urlInfo, i) => (
                  <a href={urlInfo.url} download key={i} title={`Download`}>
                    Download
                  </a>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Downloads;
