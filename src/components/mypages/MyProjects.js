import React, { useState, useEffect } from "react";

import { Button, Label, List } from "@ui5/webcomponents-react";
import { BASE_URL, PROJECTS_PATH } from "../../utils/constants";

import MyProject from "./MyProject";
import {
   getProjectsFromClientStorage,
   addProjectsToClientStorage,
   addPostToClientStorage,
} from "../../utils/clientStorage";

const MyProjects = ({ screenSize }) => {
   const [networkStatus, setNetworkStatus] = useState(
      "Network connection is OK, showing latest results"
   );
   const [projects, setProjects] = useState([]);

   const getProjectsFromBackend = async () => {
      const requestUrl = `${BASE_URL}${PROJECTS_PATH}`;
      const response = await fetch(requestUrl);
      const data = await response.json();

      let modifiedProjects = data.map((project) => {
         return {
            key: project.id,
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
            return "Network connection is OK, showing latest results";
         } catch (err) {
            let projects = await getProjectsFromClientStorage();
            setProjects(projects);
            return "No network connection, showing offline results";
         }
      };

      const asyncFetchPromise = async () => {
         let status = await getProjects();

         console.log("Setting network status: ", status);
         setNetworkStatus(status);
      };

      asyncFetchPromise();
   }, []);

   const btnClickHandler = (event) => {
      if ("serviceWorker" in navigator && "SyncManager" in window) {
         navigator.serviceWorker.ready.then(async (sw) => {
            console.log("From MyProjects - btnClickHandler:  Add new Project");

            let post = {
               title: "foo",
               body: "bar",
               userId: 101,
            };

            try {
               await addPostToClientStorage(post);
               await sw.sync.register("sync-new-post");
            } catch (err) {
               console.log("From MyProjects - btnClickHandler:  Error: ", err);
            }
         });
      }
   };

   return (
      <section>
         <h1>My Projects</h1>
         <Label>{networkStatus}</Label>
         <Button onClick={btnClickHandler}>Add new Project</Button>
         <List headerText="My Projects !!">
            {projects &&
               projects.map((project) => {
                  return (
                     <MyProject key={project.key} project={project.value} />
                  );
               })}
         </List>
      </section>
   );
};

export default MyProjects;
