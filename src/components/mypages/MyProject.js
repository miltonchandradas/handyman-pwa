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
            marginTop: "30px",
            marginRight: "30px",
         }}
      >
         <div>
            <Label>{`Description: ${
               project.description ? project.description : ""
            }`}</Label>
            <Label>{`Cost: ${project.estimatedCost}`}</Label>
            <Label>{`Start Date: ${Date.parse(
               project.projectedStartDate
            ).toLocaleDateString()}`}</Label>
            <Label>{`End Date: ${Date.parse(
               project.projectedEndDate
            ).toLocaleDateString()}`}</Label>
         </div>
         <Button>Rehire Handyman</Button>
      </Card>
   );
};

export default MyProject;
