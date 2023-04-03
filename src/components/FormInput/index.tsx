import React from "react";
import InputContainer, { StyledInput } from "./index.styles";

interface FormInputProps {
  id: string;
  label?: string;
  value: string;
}
const FormInput: React.FC<FormInputProps> = ({ id, label, value }) => {
  return (
    <InputContainer>
      {label && <label htmlFor={id}>{label}</label>}
      <StyledInput type="text" id={id} />
    </InputContainer>
  );
};

export default FormInput;
