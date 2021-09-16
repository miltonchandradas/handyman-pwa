import React, { useState } from "react";

import ImagePreview from "./ImagePreview";

import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

const MyCamera = () => {
   const [dataUri, setDataUri] = useState("");

   const takePhotoHandler = (dataUri) => {
      // Do stuff with the photo...
      console.log("takePhoto");
      setDataUri(dataUri);
   };

   return (
      <div>
         {dataUri ? (
            <ImagePreview dataUri={dataUri} />
         ) : (
            <Camera
               onTakePhoto={(dataUri) => {
                  takePhotoHandler(dataUri);
               }}
            />
         )}
      </div>
   );
};

export default MyCamera;
