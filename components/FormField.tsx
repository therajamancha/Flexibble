import React from "react";

interface FormFieldProps {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
}
const FormField = ({
  type,
  title,
  state,
  placeholder,
  isTextArea,
  setState,
}: FormFieldProps) => {
  return (
    <div className="flexStart flex-col w-full gap-4">
      <label className="w-full text-gray-100" htmlFor={title.toLowerCase()}>
        {title}:
      </label>
      {isTextArea ? (
        <textarea
          id={title.toLowerCase()}
          placeholder={placeholder}
          value={state}
          required
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          id={title.toLowerCase()}
          type={type || "text"}
          placeholder={placeholder}
          value={state}
          required
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  );
};

export default FormField;
