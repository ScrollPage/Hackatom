import { Button } from "@/components/UI/Button";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper, Inner, Title } from "./styles";
import { exitCommand } from "@/store/actions/command";

export interface ExitCommandProps {
  commandId: number;
  membershipId: number;
}

interface IExitCommand extends ExitCommandProps {
  setClose: () => void;
}

const ExitCommandComponent: React.FC<IExitCommand> = ({
  setClose,
  commandId,
  membershipId,
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(exitCommand(commandId, membershipId));
    setClose();
  };

  return (
    <Wrapper>
      <Title>Вы действительно хотите выйти из команды?</Title>
      <Inner>
        <Button onClick={handleDelete} myType="outline">
          Выйти
        </Button>
        <Button onClick={setClose} myType="outline">
          Отменить
        </Button>
      </Inner>
    </Wrapper>
  );
};

export const ExitCommand = memo(ExitCommandComponent);
