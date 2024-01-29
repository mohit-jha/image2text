import React, { useState } from "react";
import axios from "axios";
import { ProgressBar } from "react-loader-spinner";

function App() {
  const [file, setFile] = useState();
  const [imgText, setImgText] = useState();
  const [loading, setLoading] = useState(false);
  const [base64Image, setBase64Image] = useState("");
  const [fileName, setFileName] = useState("");
  const token = sessionStorage.getItem('token')
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

  const adjustImage = (base64Image) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = base64Image;
  
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
  
        canvas.width = image.width;
        canvas.height = image.height;
  
        // Draw the original image on the canvas
        context.drawImage(image, 0, 0, image.width, image.height);
  
        // Get image data
        const imageData = context.getImageData(0, 0, image.width, image.height);
        const data = imageData.data;
  
        // Adjust pixel values
        for (let i = 0; i < data.length; i += 4) {
          // Adjust whites
          data[i] += 220; // red channel
          data[i + 1] += 100; // green channel
          data[i + 2] += 100; // blue channel
  
          // Adjust blacks
          data[i] -= 140; // red channel
          data[i + 1] -= 100; // green channel
          data[i + 2] -= 100; // blue channel
  
          // Adjust contrast
          data[i] -= 100; // red channel
          data[i + 1] -= 100; // green channel
          data[i + 2] -= 100; // blue channel
  
          // Adjust highlight
          data[i] += 100; // red channel
          data[i + 1] += 100; // green channel
          data[i + 2] += 100; // blue channel
  
          // Adjust shadow
          data[i] += 100; // red channel
          data[i + 1] += 100; // green channel
          data[i + 2] += 100; // blue channel
        }
  
        // Put the updated pixel data back on the canvas
        context.putImageData(imageData, 0, 0);
  
        // Convert the canvas content to base64
        const updatedBase64 = canvas.toDataURL('image/png');
  
        // Resolve the promise with the updated base64 image
        resolve(updatedBase64);
      };
    });
  };
  

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const saveDataToDB = async () => {
    try {

      // const piii = await adjustImage(base64Image);
     
      setLoading(true);
      const url = "http://127.0.0.1:8000/api/upload-image/";
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
            {imgText &&
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
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

<h2>Upload Image to get text:</h2>;
