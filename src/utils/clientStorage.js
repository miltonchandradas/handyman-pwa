import localforage from "localforage";
import { extendPrototype } from "localforage-setitems";

extendPrototype(localforage);

const projectsInstance = localforage.createInstance({
   name: "projects",
});

const postsInstance = localforage.createInstance({
   name: "posts",
});

export const addPostToClientStorage = async (post) => {
   console.log(
      "From clientStorage - addPostToClientStorage: ",
      JSON.stringify(post)
   );
   await postsInstance.setItem(post.userId, post);
};

export const addProjectsToClientStorage = async (projects) => {
   console.log(
      "From clientStorage - addProjectsToClientStorage: ",
      JSON.stringify(projects)
   );
   await projectsInstance.setItems(projects);
};

export const getProjectsFromClientStorage = async () => {
   let projects = [];

   let promise = await new Promise((resolve, reject) => {
      projectsInstance
         .iterate(function (value, key) {
            projects.push({
               key,
               value,
            });
         })
         .then(function () {
            resolve(projects);
         })
         .catch(function (err) {
            reject([
               {
                  key: "-100",
                  value: { name: "Unable to read data from cache..." },
               },
            ]);
         });
   });

   return promise;
};

export const getPostsFromClientStorage = async () => {
   let posts = [];

   let promise = await new Promise((resolve, reject) => {
      postsInstance
         .iterate(function (value, key) {
            posts.push(value);
         })
         .then(function () {
            resolve(posts);
         })
         .catch(function (err) {
            reject([
               {
                  key: "-100",
                  value: { title: "Unable to read data from cache..." },
               },
            ]);
         });
   });

   return promise;
};

export const deletePostFromClientStorage = async (key) => {
   let promise = await new Promise((resolve, reject) => {
      postsInstance.removeItem(key).then(() => resolve());
   });

   return promise;
};
