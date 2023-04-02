import React from "react";

export interface AutocompleteProps<OptionType> {
  startIcon?: React.ReactNode;
  placeholder?: string;
  options: OptionType[];
  width?: string;
  inputValue: string;
  optionLabel?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>, newValue: any) => void;
  onInputChange?: (e: ChangeEvent<HTMLInputElement>, newValue: string) => void;
}

export interface ContainerProps {
  width?: string;
}

export interface InputProps {
  haveStartIcon?: boolean;
}

export interface OptionListProps {
  children?: React.ReactNode;
}

export interface StyledSpanProps {
  color: string;
  fontWeight: string | number;
}

export interface OptionItemProps<OptionType> {
  setSelectedOption: (args: OptionType) => void;
  selectedOption: OptionType;
  option: OptionType;
  optionLabel: string;
  inputValue: string;
  isSelected: boolean;
  onSelectOption: (
    event: KeyboardEvent | React.MouseEvent<HTMLDivElement, MouseEvent>,
    option: OptionType
  ) => void;
}

export interface StyledOptionItemProps extends React.HTMLProps<HTMLDivElement> {
  isSelected: boolean;
}
