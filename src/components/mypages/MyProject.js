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
            <Label>{`<b>Description:</b> ${
               project.description ? project.description : ""
            }`}</Label>
            <br></br>
            <Label>{`Cost: ${project.estimatedCost}`}</Label>
            <br></br>
            <Label>{`Start Date: ${new Date(
               project.projectedStartDate
            ).toDateString()}`}</Label>
            <br></br>
            <Label>{`End Date: ${new Date(
               project.projectedEndDate
            ).toDateString()}`}</Label>
            <br></br>
         </div>
         <Button>Rehire Handyman</Button>
      </Card>
   );
};

export default MyProject;
