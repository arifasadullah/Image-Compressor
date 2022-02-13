import React, { useState } from "react";
import Button from "./Button";
import heroImage from "../Images/hero1.svg";
import heroImage2 from "../Images/hero2.svg";
import heroImage3 from "../Images/hero3.svg";
import "./LandingPage.css";
import imageCompression from "browser-image-compression";
import { saveAs } from "file-saver";

const LandingPage = () => {
  const [originalImage, setOriginalImage] = useState("");
  const [originalImageFile, setOriginalImageFile] = useState("");
  const [compressedImage, setCompressedImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [orignalImageSize, setOrignalImageSize] = useState(0);
  const [compressedImageSize, setCompressedImageSize] = useState(0);

  let output;

  // targeting file input from upload button-------------------------------------------------------------------------->>
  const uploadImageHandler = () => {
    document.getElementById("select-file").click();
  };

  // handler for uploading file ---------------------------------------------------------------------------------------->>
  const handle = (e) => {
    const imageFile = e.target.files[0];

    let uploadImgSize = Math.ceil(imageFile.size / 1024);
    setOrignalImageSize(uploadImgSize);
    setOriginalImage(imageFile);
    setOriginalImageFile(URL.createObjectURL(imageFile));
    setFileName(imageFile.name);
  };
  //handler for compressed image----------------------------------------------------------------->>
  const handleCompressImage = (e) => {
    e.preventDefault();
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };
    //Check for very small size image---------------------------->>
    if (options.maxSizeMB >= originalImage / 1024) {
      alert("Image is too small, cant be compressed");
      return 0;
    }
    //function for compressing image----------------------------------------->>

    imageCompression(originalImage, options).then((x) => {
      output = x;
      let outImgSize = Math.ceil(output.size / 1024);

      setCompressedImageSize(outImgSize);
      const downloadLink = URL.createObjectURL(output); //Generating blob file--->
      setOriginalImageFile(false);
      setCompressedImage(downloadLink);
    });
  };

  // Download the imamge------------------------------------------------------------>>
  const downloadImage = () => {
    saveAs(compressedImage, "Compressed_" + fileName);
  };

  return (
    <div className="container">
      {/* Checking for Uploaded file------------------------------------------------------>> */}
      {originalImageFile ? (
        <>
          <div className="upload-container">
            <img className="uploaded_show" src={heroImage2} alt="Uploaded" />
            <img className="uploaded" src={originalImageFile} alt="Uploaded" />
          </div>
          <Button
            name="Compress Image"
            onClick={(e) => {
              handleCompressImage(e);
            }}
          />
          <p>Your image size is {orignalImageSize}kb</p>
        </>
      ) : // Checking for compressed file--------------------------------------------------------------->>
      compressedImage ? (
        <div className="compressed_container">
          <div className="compressed_box">
            <img className="uploaded" src={compressedImage} alt="compressed" />
            <Button name="Download" onClick={downloadImage}></Button>
            <p>Your compressed image size is {compressedImageSize}kb</p>
          </div>
          <div>
            <img className="compressed_show" src={heroImage3} alt="Uploaded" />
          </div>
        </div>
      ) : (
        // Default home page---------------------------------------------------->>
        <>
          <img className="hero" src={heroImage} alt="images" />
          <Button name="Upload Image" onClick={uploadImageHandler}>
            Upload Image
          </Button>
          <p>
            Compress JPG, PNG or JPEG with the best quality and compression.
            <br />
            Reducethe filesize of your images at once.
          </p>
        </>
      )}

      <input
        id="select-file"
        type="file"
        style={{ display: "none" }}
        accept="image/x-png,image/gif,image/jpeg"
        onChange={(e) => handle(e)}
      />
    </div>
  );
};

export default LandingPage;
