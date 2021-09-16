import React, { useState } from "react";

import MyCamera from "../camera/MyCamera";
import { Button } from "@ui5/webcomponents-react";

const MyReviews = () => {
   const [isHidden, setIsHidden] = useState(true);

   const btnClickHandler = (event) => {
      setIsHidden(!isHidden);
   };

   return (
      <div>
         <h1>My Reviews</h1>
         <Button onClick={btnClickHandler}>Use Camera to capture photo</Button>

         {!isHidden && <MyCamera></MyCamera>}
      </div>
   );
};

export default MyReviews;
