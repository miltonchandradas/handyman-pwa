import React from "react";

import {
   Card,
   CardHeader,
   Button,
   Label,
   Text,
   RatingIndicator,
} from "@ui5/webcomponents-react";

const MyProject = ({ project, networkStatus }) => {
   return (
      <Card
         className="myproject-card"
         header={
            <CardHeader
               titleText={project.title}
               subtitleText={`${project.subTitleText}`}
            />
         }
      >
         <div className="myproject-div">
            <Text>{`Description: ${
               project.description ? project.description : ""
            }`}</Text>
            <br />
            <br />
            <Label>{`Cost: $${project.estimatedCost}`}</Label>
            <br />
            <Label>{`Start Date: ${new Date(
               project.projectedStartDate
            ).toDateString()}`}</Label>
            <br />
            <Label>{`End Date: ${new Date(
               project.projectedEndDate
            ).toDateString()}`}</Label>
            <br />
            <RatingIndicator readonly="true" value={project.rating} />
            <br />
            <br />
            <Button>Rehire Handyman</Button>
         </div>
      </Card>
   );
};

export default MyProject;
