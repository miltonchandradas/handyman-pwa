import React from "react";

import { Card, CardHeader, Button, Label } from "@ui5/webcomponents-react";

const MyProject = ({ project }) => {
   return (
      <Card
         className="myproject-card"
         header={
            <CardHeader
               titleText={project.title}
               subtitleText={`Rating: ${project.rating}`}
            />
         }
      >
         <div className="myproject-div">
            <Label>{`Description: ${
               project.description ? project.description : ""
            }`}</Label>
            <br />
            <Label>{`Cost: ${project.estimatedCost}`}</Label>
            <br />
            <Label>{`Start Date: ${new Date(
               project.projectedStartDate
            ).toDateString()}`}</Label>
            <br />
            <Label>{`End Date: ${new Date(
               project.projectedEndDate
            ).toDateString()}`}</Label>
            <br />
         </div>
         <Button>Rehire Handyman</Button>
      </Card>
   );
};

export default MyProject;
