import React from "react";
import ComponentsItem from "./ComponentsItem";

export default function SecurityProgram() {
  let services = [
    {
      mar: 12,
      title: "1. AI-based Note Taking",
      content:
        "some description",
    },
    {
      mar: 10,
      title: "2. Video Querier Powered By Semantic Search",
      content:
        "description",
    },
    {
      mar: 8,
      title: "3. Automatic Review Question Generation",
      content:
        "blub",
    },
    {
      mar: 8,
      title: "4. Valuenex BS",
      content:
        "blublublublub",
    },
  ];

  return (
    <div>
      {services.map((service) => (
        <ComponentsItem
          title={service.title}
          content={service.content}
          mar={service.mar}
        />
      ))}
    </div>
  );
}
