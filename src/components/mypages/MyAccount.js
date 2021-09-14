import React from "react";

import { Button } from "@ui5/webcomponents-react";

const MyAccount = () => {
   const btnClickHandler = (event) => {
      console.log("From MyAccount - Button click handler ");

      Notification.requestPermission((result) => {
         if (result !== "granted") {
            console.log("Notification permission not granted...");
         } else {
            console.log("Notification permission granted...");
            displayConfirmNotification();
         }
      });
   };

   const displayConfirmNotification = () => {
      new Notification("Successfully subscribed !!");
   };

   return (
      <div>
         <h1>My Account</h1>
         <Button onClick={btnClickHandler}>Enable Notification</Button>
      </div>
   );
};

export default MyAccount;
