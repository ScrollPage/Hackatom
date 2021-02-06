import { DeleteChatProps } from "@/components/Modal/DeleteChat";
import { Avatar } from "@/components/UI/Avatar";
import { useUser } from "@/hooks/useUser";
import { modalShow } from "@/store/actions/modal";
import { IChatMember } from "@/types/chat";
import { getAsString } from "@/utils/getAsString";
import { useRouter } from "next/router";
import React, { memo, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper, Hero, Name, Close } from "./styles";

interface DialogItemProps {
  isChat: boolean;
  name: string;
  members: IChatMember[];
  id: number;
}

const DialogItemComponent: React.FC<DialogItemProps> = ({
  id,
  isChat,
  name,
  members,
}) => {
  const dispatch = useDispatch();
  const { push, query } = useRouter();
  const currentChatId = Number(getAsString(query.id));
  const { userId } = useUser();

  const handleChange = () => {
    if (currentChatId === id) {
      return;
    }
    push({ pathname: "/im", query: { id } }, undefined, {
      shallow: true,
    });
  };

  const dialogName = useMemo(() => {
    if (isChat) {
      if (Number(userId) === members[0].id) {
        return members[1].company;
      } else {
        return members[0].company;
      }
    } else {
      return name;
    }
  }, [isChat, members, name]);

  const handleOpen = () => {
    dispatch(
      modalShow<DeleteChatProps>("DELETE_CHAT", { id })
    );
  };

  return (
    <Wrapper onClick={handleChange} isActive={currentChatId === id}>
      {isChat && <Close onClick={handleOpen} />}
      <Hero>
        <Avatar />
        <Name>{dialogName}</Name>
      </Hero>
    </Wrapper>
  );
};

export const DialogItem = memo(DialogItemComponent);
