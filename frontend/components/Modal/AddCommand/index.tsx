import { CommandForm, CommandFormValues } from "@/components/Auth/CommandForm";
import { addCommand } from "@/store/actions/command";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper } from "./styles";

export interface AddCommandProps {}

interface IAddCommand extends AddCommandProps {
  setClose: () => void;
}

const AddCommandComponent: React.FC<IAddCommand> = ({ setClose }) => {
  const dispatch = useDispatch();

  const onSubmit = (values: CommandFormValues) => {
    dispatch(addCommand(values));
    setClose();
  };

  return (
    <Wrapper>
      <CommandForm handleSubmit={onSubmit} />
    </Wrapper>
  );
};

export const AddCommand = memo(AddCommandComponent);
