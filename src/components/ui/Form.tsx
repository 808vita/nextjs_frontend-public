import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";

interface FormProps {
  onSubmit: (data: any) => void;
  fields: {
    label: string;
    type: "text" | "password" | "email";
    name: string;
  }[];
  submitButtonText: string;
}

const Form: React.FC<FormProps> = ({ onSubmit, fields, submitButtonText }) => {
  const [formData, setFormData] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {fields.map((field) => (
        <Input
          key={field.name}
          type={field.type}
          label={field.label}
          name={field.name}
          onChange={handleChange}
          className="w-full"
        />
      ))}
      <Button color="primary" type="submit">
        {submitButtonText}
      </Button>
    </form>
  );
};

export default Form;
