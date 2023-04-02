import styled from "styled-components";
import type {
  ContainerProps,
  InputProps,
  StyledOptionItemProps,
  StyledSpanProps,
} from "./Autocomplete";

const AutocompleteContainer = styled.div`
  position: relative;
  width: ${(props: ContainerProps) => (props.width ? props.width : "300px")};
`;

export const StyledInput = styled.input`
  background-color: #f8f8f8;
  border: 1px solid #dedede;
  border-radius: 4px;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  font-size: 16px;
  height: 48px;
  padding: ${(props: InputProps) => (props.haveStartIcon ? "12px 56px 12px 56px" : "12px 16px")};
  &:focus {
    outline: none;
    background-color: white;
    filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.2));
  }
`;

export const StyledStartIcon = styled.div`
  position: absolute;
  top: 12px;
  left: 16px;
`;
export const OptionList = styled.div`
  position: absolute;
  z-index: 999;
  top: 52px;
  width: 100%;
  padding: 8px 0px;
  background-color: white;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  max-height: 256px;
  overflow-y: auto;
`;

export const StyledOptionItem = styled.div`
  background-color: ${(props: StyledOptionItemProps) => (props.isSelected ? "#f2fbf9" : "white")};
  &:focus {
    outline: none;
  }
`;

export const StyledTypography = styled.p`
  padding: 12px 16px;
  color: #666;
`;

export const StyledSpan = styled.span`
  color: ${(props: StyledSpanProps) => props.color};
  font-weight: ${(props: StyledSpanProps) => props.fontWeight};
`;

export const StyledCloseIcon = styled.div`
  position: absolute;
  top: 12px;
  right: 16px;
`;
export default AutocompleteContainer;
