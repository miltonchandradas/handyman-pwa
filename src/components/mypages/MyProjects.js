import React, { Fragment, useRef, useState, useEffect } from "react";
import Footer from "../layouts/Footer";
import { ObjectID } from "bson";

import {
   FlexBox,
   Button,
   MessageStrip,
   Toolbar,
   ToolbarSpacer,
   Icon,
   Toast,
} from "@ui5/webcomponents-react";
import { NODE_BASE_URL, PROJECTS_PATH } from "../../utils/constants";

import MyProject from "./MyProject";
import {
   getProjectsFromClientStorage,
   addProjectsToClientStorage,
   addNewPostToClientStorage,
} from "../../utils/clientStorage";

const MyProjects = ({ screenSize }) => {
   const toast = useRef();

   const [networkStatus, setNetworkStatus] = useState(1);
   const [projects, setProjects] = useState([]);

   const getProjectsFromBackend = async () => {
      const requestUrl = `${NODE_BASE_URL}${PROJECTS_PATH}`;
      const response = await fetch(requestUrl);
      const data = await response.json();

      let modifiedProjects = data.data.map((project) => {
         return {
            key: project._id,
            value: project,
         };
      });

      await addProjectsToClientStorage(modifiedProjects);
      setProjects(modifiedProjects);
   };

   useEffect(() => {
      console.log("From MyProjects - useEffect is called");

      const getProjects = async () => {
         try {
            await getProjectsFromBackend();
            return 1;
         } catch (err) {
            let projects = await getProjectsFromClientStorage();
            setProjects(projects);
            return -1;
         }
      };

      const asyncFetchPromise = async () => {
         let status = await getProjects();

         console.log("Setting network status: ", status);
         setNetworkStatus(status);
      };

      asyncFetchPromise();
   }, []);

   const btnClickHandler = async (event) => {
      console.log("From MyProjects - btnClickHandler:  Add new Project");

      console.log("From MyProjects - btnClickHandler:  Show Toast...");
      toast.current.show();

      if ("serviceWorker" in navigator && "SyncManager" in window) {
         let sw = await navigator.serviceWorker.ready;

         let project = {
            _id: ObjectID().toString(),
            title: "foo",
            subTitleText: "bar",
            description:
               "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus totam dignissimos accusamus neque velit fuga quos vel voluptate voluptas. Placeat nihil asperiores eius quaerat saepe. Odio aliquid iste optio est.",
            estimatedCost: 95,
            handyman: "Mike Jones",
            rating: 5,
         };

         try {
            await addNewPostToClientStorage(project);
            await sw.sync.register("sync-new-post");
         } catch (err) {
            console.log("From MyProjects - btnClickHandler:  Error: ", err);
         }
      }
   };

   return (
      <Fragment>
         <section>
            <h1>My Projects</h1>
            <MessageStrip
               className="myprojects-controls"
               hideCloseButton="true"
               design={networkStatus === 1 ? "Information" : "Negative"}
            >
               {networkStatus === 1
                  ? "Network connection is OK, showing latest results"
                  : "No network connection, showing offline results"}
            </MessageStrip>
            <Toolbar className="myprojects-controls">
               <ToolbarSpacer />
               <Button onClick={btnClickHandler}>Add new Project</Button>
               <Icon name="settings" />
               <Icon name="download" />
            </Toolbar>

            <Toast ref={toast}>Preconfigured project has been added...</Toast>

            <FlexBox
               direction={screenSize > 480 ? "Row" : "Column"}
               justifyContent="Center"
            >
               {projects &&
                  projects.map((project) => {
                     return (
                        <MyProject key={project.key} project={project.value} />
                     );
                  })}
            </FlexBox>
         </section>
         {screenSize > 480 && <Footer></Footer>}
      </Fragment>
   );
};

export default MyProjects;
