import { FormInputLabel, Input, Group } from "./form-input.styles";
import { FC, InputHTMLAttributes } from "react";

export type InputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputForm: FC<InputProps> = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel
          shrink={Boolean(
            otherProps.value &&
              typeof otherProps.value === "string" &&
              otherProps.value.length
          )}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};