import React, { Fragment, useState, useEffect } from "react";

import Footer from "../layouts/Footer";

import {
   Form,
   FormItem,
   FormGroup,
   Input,
   Button,
   MessageStrip,
   Toolbar,
   ToolbarSpacer,
   Icon,
} from "@ui5/webcomponents-react";

import {
   PUBLIC_VAPID_KEY,
   NODE_BASE_URL,
   SUBSCRIPTION_PATH,
   USERS_PATH,
} from "../../utils/constants";

import {
   getUsersFromClientStorage,
   addUsersToClientStorage,
} from "../../utils/clientStorage";

const MyAccount = ({ screenSize }) => {
   const [networkStatus, setNetworkStatus] = useState(
      "Network connection is OK, showing latest results"
   );
   const [users, setUsers] = useState([]);

   const getUsersFromBackend = async () => {
      const requestUrl = `${NODE_BASE_URL}${USERS_PATH}`;
      const response = await fetch(requestUrl);
      const data = await response.json();

      let modifiedUsers = data.data.map((user) => {
         return {
            key: user._id,
            value: user,
         };
      });

      await addUsersToClientStorage(modifiedUsers);
      setUsers(modifiedUsers);
   };

   useEffect(() => {
      console.log("From MyAccount - useEffect is called");

      const getUsers = async () => {
         try {
            await getUsersFromBackend();
            return "Network connection is OK, showing latest results";
         } catch (err) {
            let users = await getUsersFromClientStorage();
            setUsers(users);
            return "No network connection, showing offline results";
         }
      };

      const asyncFetchPromise = async () => {
         let status = await getUsers();

         console.log("Setting network status: ", status);
         setNetworkStatus(status);
      };

      asyncFetchPromise();
   }, []);

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
         .replace(/-/g, "+")
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

      console.log("Configure Push Subscription...");

      let registration;

      try {
         let sw = await navigator.serviceWorker.ready;

         console.log("Service worker is ready...");

         registration = sw;
         let subscription = await sw.pushManager.getSubscription();

         if (!subscription) {
            console.log(
               "Subscription not found - Creating new subscription..."
            );
            let newSubscription = await registration.pushManager.subscribe({
               userVisibleOnly: true,
               applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
            });

            let newSubscriptionString = JSON.stringify(newSubscription);

            let response = await fetch(`${NODE_BASE_URL}${SUBSCRIPTION_PATH}`, {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
               },
               body: newSubscriptionString,
            });

            if (response.ok) displayConfirmNotification();
         }
      } catch (err) {
         console.log("From MyAccount - Error: ", err);
      }
   };

   const displayConfirmNotification = async () => {
      if ("serviceWorker" in navigator) {
         let options = {
            body: "You successfully subscribed to our Notification Service...",
            icon: "/images/app-icon-96x96.png",
            vibrate: [100, 50, 200],
            badge: "/images/app-icon-96x96.png",
         };

         let sw = await navigator.serviceWorker.ready;
         sw.showNotification("Successfully subscribed !!", options);
      }
   };

   return (
      <Fragment>
         <section>
            <h1>My Account</h1>
            <MessageStrip
               className="myusers-controls"
               hideCloseButton="true"
               design={
                  networkStatus ===
                  "Network connection is OK, showing latest results"
                     ? "Information"
                     : "Negative"
               }
            >
               {networkStatus}
            </MessageStrip>
            <Toolbar className="myusers-controls">
               <ToolbarSpacer />
               <Button onClick={btnClickHandler}>Enable Notification</Button>
               <Icon name="settings" />
               <Icon name="download" />
            </Toolbar>
            {users && users.length > 0 && (
               <Form titleText="Account Details">
                  <FormGroup titleText="Personal Data">
                     <FormItem label="First Name">
                        <Input
                           readonly="true"
                           value={users[0].value.firstName}
                        ></Input>
                     </FormItem>
                     <FormItem label="Last Name">
                        <Input
                           readonly="true"
                           value={users[0].value.lastName}
                        ></Input>
                     </FormItem>
                     <FormItem label="Address">
                        <Input
                           readonly="true"
                           value={users[0].value.address}
                        ></Input>
                     </FormItem>
                     <FormItem label="Email">
                        <Input
                           readonly="true"
                           value={users[0].value.email}
                        ></Input>
                     </FormItem>
                     <FormItem label="Phone">
                        <Input
                           readonly="true"
                           value={users[0].value.phone}
                        ></Input>
                     </FormItem>
                  </FormGroup>
               </Form>
            )}
         </section>
         {screenSize > 480 && <Footer></Footer>}
      </Fragment>
   );
};

export default MyAccount;
