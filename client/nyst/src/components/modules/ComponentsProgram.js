import React from "react";
import ComponentsItem from "./ComponentsItem";

export default function SecurityProgram() {
  let services = [
    {
      mar: 12,
      title: "1. AI-based Note Taking",
      content: "Automated Note Generation intertwined with Visual Aids and Bullet Points",
    },
    {
      mar: 10,
      title: "2. Video Querier Powered By Semantic Search",
      content: "Translate Your Questions to Pinpointed Lecture Locations",
    },
    {
      mar: 8,
      title: "3. Automatic Review Question Generation",
      content: "High Quality, Customizable Quizzes based on Your Lecture",
    },
    {
      mar: 8,
      title: "4. Beyond the Lecture",
      content: "Translate Your Lecture Insights to Practical Applications using Data-Driven Analytics",
    },
  ];

  return (
    <div>
      {services.map((service, i) => (
        <ComponentsItem
          key={i}
          title={service.title}
          content={service.content}
          mar={service.mar}
        />
      ))}
    </div>
  );
}
