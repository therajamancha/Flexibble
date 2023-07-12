import { ProjectInterface } from "@/common.types";
import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { getProjectDetails } from "@/lib/action";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const EditProject = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  if (!session?.user) redirect("/");

  const { project } = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };

  return (
    <Modal>
      <h3 className="modal-head-text">Edit Project</h3>
      <ProjectForm type={"edit"} session={session} project={project} />
    </Modal>
  );
};

export default EditProject;
