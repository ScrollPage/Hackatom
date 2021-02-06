import {
  ChangeCommandForm,
  ChangeCommandFormValues,
} from "@/components/Auth/ChangeCommandForm";
import { commandChange, commandChangeInfo } from "@/store/actions/command";
import { ICommand } from "@/types/command";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper } from "./styles";

export interface ChangeCommandProps {
  id: number;
  command: ICommand;
}

interface IChangCommande extends ChangeCommandProps {
  setClose: () => void;
}

const ChangeCommandComponent: React.FC<IChangCommande> = ({
  setClose,
  id,
  command,
}) => {
  const dispatch = useDispatch();

  const onSubmit = (values: ChangeCommandFormValues) => {
    dispatch(commandChange(values, id));
    if (
      values.description ||
      values.idea ||
      values.categories ||
      values.requirenments
    ) {
      dispatch(commandChangeInfo(values, id));
    }
    setClose();
  };

  return (
    <Wrapper>
      <ChangeCommandForm initialValues={command} handleSubmit={onSubmit} />
    </Wrapper>
  );
};

export const ChangeCommand = memo(ChangeCommandComponent);
