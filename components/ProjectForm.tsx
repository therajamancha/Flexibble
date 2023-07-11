"use client";
import Image from "next/image";
import FormField from "./FormField";
import CustomMenu from "./CustomMenu";
import { FormState, SessionInterface } from "@/common.types";
import { categoryFilters } from "@/constant";
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "./Button";
import { createNewProject, fetchToken } from "@/lib/action";
import { useRouter } from "next/router";

type ProjectFormProps = {
  type: "create" | "edit";
  session: SessionInterface;
};
const _form = {
  image: "",
  title: "",
  description: "",
  liveSiteUrl: "",
  githubUrl: "",
  category: "",
};

const ProjectForm = ({ type, session }: ProjectFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>({ ..._form });
  const router = useRouter()

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { token } = await fetchToken();
    try {
      if (type === "create") {
        await createNewProject(form, session?.user?.id, token);
        router.push("/")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      return alert("Please upload an image file");
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form.image}
            className="sm:p-10 object-contain z-20"
            alt="project poster"
            fill
          />
        )}
      </div>

      <FormField
        title={"Project title"}
        state={form.title}
        placeholder={"flexibble"}
        setState={(value) => {
          handleStateChange("title", value);
        }}
      />
      <FormField
        title={"Description"}
        state={form.description}
        placeholder={"Showcase and discover remakable developer projects."}
        setState={(value) => {
          handleStateChange("description", value);
        }}
      />
      <FormField
        type="url"
        title={"Website url"}
        state={form.liveSiteUrl}
        placeholder={"https://www.jsmastery.pro"}
        setState={(value) => {
          handleStateChange("liveSiteUrl", value);
        }}
      />
      <FormField
        type="url"
        title={"Github url"}
        state={form.githubUrl}
        placeholder={"https://github.com/therajamancha"}
        setState={(value) => {
          handleStateChange("githubUrl", value);
        }}
      />
      <CustomMenu
        title={"Category"}
        state={form.category}
        filters={categoryFilters}
        setState={(value) => {
          handleStateChange("category", value);
        }}
      />
      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? type === "create"
                ? "Creating"
                : "Editing"
              : type === "create"
              ? "Create"
              : "Edit"
          }
          type={"submit"}
          isSubmitting={isSubmitting}
          leftIcon={isSubmitting ? "" : "/plus.svg"}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
