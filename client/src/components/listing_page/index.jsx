import React, { useState } from "react";

function App() {
  const [file, setFile] = useState();

  const [base64Image, setBase64Image] = useState("");

  function handleChange(e) {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(URL.createObjectURL(selectedFile));
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }
  console.log(base64Image, "base64Image");
  return (
    <div className="image_wrapper">
      <h2>Upload Image to get text:</h2>

      {file && (
        <img
          className="prev_img"
          style={{ height: "auto" }}
          src={file}
          alt="Uploaded"
        />
      )}
      <div className="extrected_text">
        Extracted text:
      </div>
    </div>
  );
}

export default App;

<h2>Upload Image to get text:</h2>;
