import React, { Fragment, useState } from "react";

import Footer from "../layouts/Footer";

import MyCamera from "../camera/MyCamera";
import { Button } from "@ui5/webcomponents-react";

const MyReviews = () => {
   const [isHidden, setIsHidden] = useState(true);

   const btnClickHandler = (event) => {
      setIsHidden(!isHidden);
   };

   return (
      <Fragment>
         <section>
            <h1>My Reviews</h1>
            <Button onClick={btnClickHandler}>
               Use Camera to capture photo
            </Button>
            {!isHidden && <MyCamera></MyCamera>}
         </section>
         <Footer></Footer>
      </Fragment>
   );
};

export default MyReviews;
