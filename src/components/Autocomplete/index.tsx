import React, { useCallback, useEffect, useState } from "react";
import AutocompleteContainer, {
  StyledTypography,
  OptionList,
  StyledInput,
  StyledSpan,
  StyledStartIcon,
  StyledCloseIcon,
  StyledOptionItem,
} from "./index.styles";
import type { AutocompleteProps, OptionItemProps } from "./Autocomplete";
import { ReactComponent as CloseIcon } from "../../assets/close_icon.svg";
import { findObjectInArray } from "../../helpers/helper";

const OptionItem: React.FC<OptionItemProps<Record<string, any>>> = ({
  setSelectedOption,
  isSelected,
  option,
  optionLabel,
  inputValue,
  onSelectOption,
}) => (
  <StyledOptionItem
    onMouseEnter={() => setSelectedOption(option)}
    key={option[optionLabel]}
    data-testid={`option-item-container-${option[optionLabel]?.replace(/\s+/g, "")}`}
    onClick={(e) => {
      onSelectOption(e, option);
    }}
    isSelected={isSelected}
    tabIndex={-1}
  >
    <StyledTypography data-testid={`option-item-${option[optionLabel]}`}>
      {option[optionLabel]
        .toString()
        .split("")
        .map((letter: string, index: number) => (
          <StyledSpan
            key={`${letter}-${index}-${Math.random() * 10}`}
            color={index < inputValue.length ? "#00B496" : "#666666"}
            fontWeight={index < inputValue.length ? 700 : 400}
          >
            {letter}
          </StyledSpan>
        ))}
    </StyledTypography>
  </StyledOptionItem>
);

const Autocomplete: React.FC<AutocompleteProps<any>> = ({
  optionLabel,
  onChange,
  onInputChange,
  options,
  ...props
}) => {
  const [openOptions, setOpenOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const autocompleteRef = React.createRef<HTMLDivElement>();
  const inputRef = React.createRef<HTMLInputElement>();

  useEffect(() => {
    setSelectedOption(options[0]);
  }, [options]);

  const handleUpAndDownKey = useCallback(
    (e: KeyboardEvent) => {
      const { index } = findObjectInArray(
        options,
        selectedOption,
        optionLabel,
      );
      if (index === null) return;
      const element = document.querySelector("#option-list")?.childNodes[
        index
      ] as HTMLElement;
      if (e.code === "ArrowUp") {
        if (index > 0) {
          setSelectedOption(options[index - 1]);
          const prevSibling = element.previousElementSibling as HTMLElement;
          prevSibling.focus();
        }
      }
      if (e.code === "ArrowDown") {
        if (index < options.length - 1) {
          setSelectedOption(options[index + 1]);
          const nextSibling = element.nextElementSibling as HTMLElement;
          nextSibling.focus();
        }
      }
    },
    [options, selectedOption, optionLabel],
  );

  const handleSubmit = useCallback(
    (
      event: KeyboardEvent | React.MouseEvent<HTMLDivElement, MouseEvent>,
      option: typeof options[0],
    ) => {
      if (onChange) {
        onChange(event, option);
      }
      setOpenOptions(false);
      if (onInputChange) {
        onInputChange(event, option[optionLabel || "label"].toString());
      }
    },
    [onChange, onInputChange, optionLabel],
  );

  const handleRemoveInput = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setOpenOptions(false);
    if (onInputChange) {
      onInputChange(e, "");
    }
    if (onChange) {
      onChange(e, undefined);
    }
  };

  const enterListener = useCallback(
    (event: KeyboardEvent) => {
      if (openOptions) {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
          event.preventDefault();
          handleSubmit(event, selectedOption);
        } else if (onInputChange) {
          inputRef.current?.focus();
        }
      }
    },
    [handleSubmit, openOptions, selectedOption, onInputChange, inputRef],
  );

  useEffect(() => {
    document.addEventListener("keydown", enterListener);
    document.addEventListener("keydown", handleUpAndDownKey);
    return () => {
      document.removeEventListener("keydown", enterListener);
      document.removeEventListener("keydown", handleUpAndDownKey);
    };
  }, [enterListener, handleUpAndDownKey]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        autocompleteRef.current
        && !autocompleteRef.current.contains(event.target as Node)
      ) {
        setOpenOptions(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [autocompleteRef]);

  useEffect(() => {
    const optionList = document.querySelector("#option-list");
    if (optionList) {
      // const firstChild = optionList.firstElementChild as HTMLElement;
      // firstChild.focus();
      const { children } = optionList;
      for (let i = 0; i < children.length; i += 1) {
        const childHTMLElement = children[i] as HTMLElement;
        childHTMLElement.addEventListener("mouseover", () => {
          childHTMLElement.focus();
        });
      }
    }
  }, [openOptions]);

  return (
    <AutocompleteContainer
      data-testid="autocomplete-container"
      width={props.width}
      ref={autocompleteRef}
    >
      <StyledInput
        type="text"
        placeholder={props.placeholder}
        haveStartIcon={Boolean(props.startIcon)}
        onChange={(e) => {
          if (onInputChange) {
            onInputChange(e, e.target.value);
          }
        }}
        ref={inputRef}
        value={props.inputValue}
        data-testid="autocomplete-input"
        onClick={() => {
          setOpenOptions(true);
        }}
      />
      {props.inputValue && props.inputValue.length ? (
        <StyledCloseIcon data-testid="close-icon" onClick={handleRemoveInput}>
          <CloseIcon />
        </StyledCloseIcon>
      ) : (
        <></>
      )}

      {props.startIcon ? (
        <StyledStartIcon data-testid="start-icon">
          {props.startIcon}
        </StyledStartIcon>
      ) : (
        <></>
      )}
      {options.length && openOptions ? (
        <OptionList data-testid="option-list" id="option-list">
          {options.map((option) => (
            <OptionItem
              key={option[optionLabel || "label"]}
              option={option}
              inputValue={props.inputValue}
              optionLabel={optionLabel || "label"}
              isSelected={selectedOption === option}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              onSelectOption={(e) => handleSubmit(e, option)}
            />
          ))}
        </OptionList>
      ) : (
        <></>
      )}
    </AutocompleteContainer>
  );
};

export default Autocomplete;
