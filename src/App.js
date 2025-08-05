import React, { useState, useEffect } from "react";

const PDFViewer = ({ pdfUrl, clientId }) => {
  useEffect(() => {
    if (window.AdobeDC && clientId) {
      const adobeDCView = new window.AdobeDC.View({
        clientId: clientId,
        divId: "adobe-dc-view",
      });

      adobeDCView.previewFile(
        {
          content: { location: { url: pdfUrl } },
          metaData: { fileName: "Uploaded.pdf" },
        },
        { embedMode: "FULL_WINDOW" }
      );
    }
  }, [pdfUrl, clientId]);

  return <div id="adobe-dc-view" style={{ height: "600px" }} />;
};

function App() {
  const [fileUrl, setFileUrl] = useState(null);
  const [fileType, setFileType] = useState("");
  const [clientId, setClientId] = useState("");
  const defaultId = "a57765b8f681431489d51f880d8e7820";
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const ext = file.name.split(".").pop().toLowerCase();

    setFileType(ext);
    setFileUrl(url);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload PDF and Enter Adobe API Key</h2>

      <input
        type="text"
        placeholder="Enter Adobe PDF Embed API Key"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
      />

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ display: "block", marginTop: "10px" }}
      />

      <div style={{ marginTop: "20px" }}>
        {fileUrl && fileType === "pdf" && (
          <PDFViewer pdfUrl={fileUrl} clientId={clientId || defaultId} />
        )}
      </div>
    </div>
  );
}

export default App;
