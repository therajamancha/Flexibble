import { SessionInterface } from "@/common.types";
import React from "react";

interface ProjectFormProps {
  type: string;
  session: SessionInterface;
}
const ProjectForm = ({ type, session }: ProjectFormProps) => {
  const handleFormSubmit = () => {};
  return <form onSubmit={handleFormSubmit}></form>;
};

export default ProjectForm;
