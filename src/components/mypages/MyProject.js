import React from "react";

import { Card, CardHeader, Button, Label } from "@ui5/webcomponents-react";

const MyProject = ({ project }) => {
   return (
      <Card
         header={
            <CardHeader
               titleText={project.title}
               subtitleText={`Rating: ${project.rating}`}
            />
         }
         style={{
            width: "300px",
            marginRight: "30px",
         }}
      >
         <div>
            <Label>{`Description: ${
               project.description ? project.description : ""
            }`}</Label>
            <Label>{`Cost: ${project.estimatedCost}`}</Label>
            <Label>{`Start Date: ${project.projectedStartDate.toLocaleDateString(
               "en-US"
            )}`}</Label>
            <Label>{`End Date: ${project.projectedEndDate.toLocaleDateString(
               "en-US"
            )}`}</Label>
         </div>
         <Button>Rehire Handyman</Button>
      </Card>
   );
};

export default MyProject;
