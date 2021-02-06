import { Button } from "@/components/UI/Button";
import { deleteCommand } from "@/store/actions/command";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper, Inner, Title } from "./styles";

export interface DeleteCommandProps {
  id: number;
}

interface IDeleteCommand extends DeleteCommandProps {
  setClose: () => void;
}

const DeleteCommandComponent: React.FC<IDeleteCommand> = ({ setClose, id }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteCommand(id));
    setClose();
  };

  return (
    <Wrapper>
      <Title>Вы действительно хотите удалить команду?</Title>
      <Inner>
        <Button onClick={handleDelete} myType="outline">
          Удалить
        </Button>
        <Button onClick={setClose} myType="outline">
          Отменить
        </Button>
      </Inner>
    </Wrapper>
  );
};

export const DeleteCommand = memo(DeleteCommandComponent);
