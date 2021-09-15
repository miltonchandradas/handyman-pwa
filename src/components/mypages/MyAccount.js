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
      if ("serviceWorker" in navigator) {
         let options = {
            body: "You successfully subscribed to our Notification Service...",
            icon: "/images/app-icon-96x96.png",
            vibrate: [100, 50, 200],
            badge: "/images/app-icon-96x96.png",
         };

         navigator.serviceWorker.ready.then((sw) => {
            sw.showNotification("Successfully subscribed !!", options);
         });
      }
   };

   return (
      <div>
         <h1>My Account</h1>
         <Button onClick={btnClickHandler}>Enable Notification</Button>
      </div>
   );
};

export default MyAccount;
