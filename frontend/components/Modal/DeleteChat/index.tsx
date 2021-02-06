import { Button } from "@/components/UI/Button";
import { deleteChat } from "@/store/actions/chat";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper, Inner, Title } from "./styles";

export interface DeleteChatProps {
  id: number;
}

interface IDeleteChat extends DeleteChatProps {
  setClose: () => void;
}

const DeleteChatComponent: React.FC<IDeleteChat> = ({ setClose, id }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteChat(id));
    setClose();
  };

  return (
    <Wrapper>
      <Title>Вы действительно хотите удалить чат?</Title>
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

export const DeleteChat = memo(DeleteChatComponent);
