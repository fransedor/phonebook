import React from "react";
import InputContainer, { StyledInput } from "./index.styles";

interface FormInputProps {
  label?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  pattern?: string;
	patternMessage?: string;
}
const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ name, label, onChange, pattern, patternMessage }, ref) => {
    return (
      <InputContainer>
        {label && <label htmlFor={name} data-testid={`form-label-${name}`}>{label}</label>}
        <StyledInput
          type="text"
          id={name}
          name={name}
					data-testid={`form-input-${name}`}
          onChange={onChange}
          ref={ref}
					title={patternMessage}
          pattern={pattern}
        />
      </InputContainer>
    );
  }
);

export default FormInput;
