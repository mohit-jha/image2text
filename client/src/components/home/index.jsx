import React, { useState } from "react";
import axios from "axios";
import { ProgressBar } from "react-loader-spinner";
import apiConfig from "../../api/apiConfig";
import endpoints from "../../api/endpoints";
function App() {
  const [file, setFile] = useState();
  const [imgText, setImgText] = useState();
  const [loading, setLoading] = useState(false);
  const [base64Image, setBase64Image] = useState("");
  const [fileName, setFileName] = useState("");
  const token = sessionStorage.getItem("token");
  function handleChange(e) {
    const selectedFile = e.target.files[0];
    setFile(null);
    setImgText(null);

    if (selectedFile) {
      console.log(selectedFile, "selectedFile");
      setFileName(selectedFile.name);
      const reader = new FileReader();
      console.log(reader, "reader");
      reader.onloadend = () => {
        setFile(URL.createObjectURL(selectedFile));
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  const saveDataToDB = async () => {
    try {
      // const piii = await adjustImage(base64Image);

      setLoading(true);
      const url = apiConfig.baseURL + endpoints.getImgData;
      const authToken = token;
      const finalModifiedImage = base64Image;

      const data = { base64_text: finalModifiedImage };
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Token ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      setImgText(response.data);
      setLoading(false);

      console.log(response.data, "ressss");
      // console.log(modifiedImages.length,modifiedImages, "modifiedImages");
    } catch (error) {
      console.error("Error in one of the image modifications:", error);
    }
  };

  return (
    <div className="image_wrapper">
      <h2>Upload Image to get text:</h2>
      <div className="conatainer">
        <label htmlFor="custom-file-upload" className="filupp">
          <span className="filupp-file-name js-value">Browse Files</span>
          <input type="file" id="custom-file-upload" onChange={handleChange} />
        </label>
      </div>
      <div className="filename">{fileName}</div>
      {file && (
        <div className="result_container">
          <button onClick={saveDataToDB} className="generator_btn">
            Generate text from image
          </button>

          {/* <img
            className="prev_img"
            style={{ height: "auto" }}
            src={file}
            alt="Uploaded"
          /> */}

          {loading && (
            <div className="loader">
              <ProgressBar
                visible={true}
                color="#4fa94d"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
          <div className="img_text_wrapper" style={{ opacity: "1" }}>
            {imgText && (
              <>
                <img
                  className="prev_img"
                  style={{ height: "auto" }}
                  src={base64Image}
                  alt="Uploaded"
                />
                <div className="extrected_text">
                  <span>Extracted text:</span>
                  <div className="text_area">{imgText}</div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

