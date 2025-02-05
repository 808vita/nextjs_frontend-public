import { Input, Button } from "@nextui-org/react";
import React, { useState } from "react";

interface SettingsInputProps {
  label: string;
  initialValue: string | number;
  onSave: (value: string | number) => Promise<void>;
  type?: "number" | "text";
}

export const SettingsInput: React.FC<SettingsInputProps> = ({
  label,
  initialValue,
  onSave,
  type,
}) => {
  const [value, setValue] = useState(initialValue);
  const handleSave = async () => {
    await onSave(value);
  };
  return (
    <div className="flex flex-col gap-4 w-80">
      <Input
        type={type}
        label={label}
        value={value}
        onChange={(e) =>
          setValue(
            type === "number" ? Number(e.target.value) : String(e.target.value)
          )
        }
      />
      <Button color="primary" onClick={handleSave}>
        Save
      </Button>
      <hr />
    </div>
  );
};
