import React, { useState, useEffect } from "react";

const PDFViewer = ({ pdfUrl }) => {
  useEffect(() => {
    if (window.AdobeDC) {
      const adobeDCView = new window.AdobeDC.View({
        clientId: "48dc7733eaac448a989c0930562636a6",
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
  }, [pdfUrl]);

  return <div id="adobe-dc-view" style={{ height: "600px" }} />;
};

function App() {
  const [fileUrl, setFileUrl] = useState(null);
  const [fileType, setFileType] = useState("");

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
      <h2>Upload and Preview File</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />

      <div style={{ marginTop: "20px" }}>
        {fileUrl && fileType === "pdf" && <PDFViewer pdfUrl={fileUrl} />}
      </div>
    </div>
  );
}

export default App;
