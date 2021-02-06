import { DocForm, DocFormValues } from "@/components/Command/DocForm";
import { addDocCommand } from "@/store/actions/command";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper } from "./styles";

export interface AddDocProps {}

interface AddDoc extends AddDocProps {
  setClose: () => void;
}

const AddDocComponent: React.FC<AddDoc> = ({ setClose }) => {
  const dispatch = useDispatch();

  const onSubmit = (values: DocFormValues) => {
    dispatch(addDocCommand(values));
    setClose();
  };

  return (
    <Wrapper>
      <DocForm handleSubmit={onSubmit} />
    </Wrapper>
  );
};

export const AddDoc = memo(AddDocComponent);
