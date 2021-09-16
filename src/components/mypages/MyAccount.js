import React from "react";

import {
   PUBLIC_VAPID_KEY,
   NODE_BASE_URL,
   SUBSCRIPTION_PATH,
} from "../../utils/constants";
import { Button } from "@ui5/webcomponents-react";

const MyAccount = () => {
   const btnClickHandler = (event) => {
      console.log("From MyAccount - Button click handler ");

      Notification.requestPermission((result) => {
         if (result !== "granted") {
            console.log("Notification permission not granted...");
         } else {
            console.log("Notification permission granted...");
            configurePushSubscription();
         }
      });
   };

   const urlBase64ToUint8Array = (base64String) => {
      var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
      var base64 = (base64String + padding)
         .replace(/\-/g, "+")
         .replace(/_/g, "/");

      var rawData = window.atob(base64);
      var outputArray = new Uint8Array(rawData.length);

      for (var i = 0; i < rawData.length; ++i) {
         outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
   };

   const configurePushSubscription = async () => {
      if (!("serviceWorker" in navigator)) {
         return;
      }

      let registration;

      try {
         let sw = await navigator.serviceWorker.ready();

         registration = sw;
         let subscription = await sw.pushManager.getSubscription();

         if (!subscription) {
            let newSubscription = await registration.pushManager.subscribe({
               userVisibleOnly: true,
               applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
            });

            let response = await fetch(`${NODE_BASE_URL}${SUBSCRIPTION_PATH}`, {
               method: "POST",
               headers: {
                  "Content-Type": "application-json",
                  Accept: "application-json",
               },
               body: JSON.stringify(newSubscription),
            });

            if (response.ok) displayConfirmNotification();
         } else {
         }
      } catch (err) {
         console.log("From MyAccount - Error: ", err);
      }
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
