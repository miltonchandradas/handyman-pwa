import React, { Fragment, useState } from "react";

import Footer from "../layouts/Footer";

import MyCamera from "../camera/MyCamera";
import {
   Button,
   MessageStrip,
   Toolbar,
   ToolbarSpacer,
   Icon,
   Timeline,
   TimelineItem,
} from "@ui5/webcomponents-react";

const MyReviews = ({ screenSize }) => {
   const [isHidden, setIsHidden] = useState(true);
   const [btnText, setBtnText] = useState("Use camera to capture photo");

   const btnClickHandler = (event) => {
      setIsHidden(!isHidden);
      btnText === "Use camera to capture photo"
         ? setBtnText("Stop camera")
         : setBtnText("Use camera to capture photo");
   };

   return (
      <Fragment>
         <section>
            <h1>My Reviews</h1>
            <MessageStrip
               className="myprojects-controls"
               hideCloseButton="true"
            >
               Access Native Device Features !!
            </MessageStrip>
            <Toolbar className="myreviews-controls">
               <ToolbarSpacer />
               <Button onClick={btnClickHandler}>{btnText}</Button>
               <Icon name="settings" />
               <Icon name="download" />
            </Toolbar>
            <div className="myreviews-container">
               <div>
                  {screenSize > 480 && (
                     <Timeline>
                        <TimelineItem
                           icon="calendar"
                           name="John Smith"
                           subtitleText="2019/01/01"
                           titleText="Great plumber !!"
                        />
                        <TimelineItem
                           icon="calendar"
                           name="Harold Ryan"
                           subtitleText="2019/01/02"
                           titleText="Very efficient"
                        ></TimelineItem>
                     </Timeline>
                  )}
               </div>
               <div>{!isHidden && <MyCamera></MyCamera>}</div>
            </div>
         </section>
         {screenSize > 480 && <Footer></Footer>}
      </Fragment>
   );
};

export default MyReviews;
