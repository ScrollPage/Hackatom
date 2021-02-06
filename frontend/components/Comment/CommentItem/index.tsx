import { DeleteCommentProps } from "@/components/Modal/DeleteComment";
import { Avatar } from "@/components/UI/Avatar";
import { useUser } from "@/hooks/useUser";
import { modalShow } from "@/store/actions/modal";
import { renderTimestamp } from "@/utils/renderTimestamp";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper, Hero, Name, Close, Header, Content, Time } from "./styles";

interface CommentItemProps {
  name: string;
  timestamp: string;
  content: string;
  postId: number;
  id: number;
  isLast?: boolean;
  commentUserId: number;
}

const CommentItemComponent: React.FC<CommentItemProps> = ({
  name,
  content,
  postId,
  id,
  isLast,
  commentUserId,
  timestamp,
}) => {
  const dispatch = useDispatch();
  const { userId } = useUser();

  const handleOpen = () => {
    dispatch(
      modalShow<DeleteCommentProps>("DELETE_COMMENT", { commentId: id, postId })
    );
  };

  return (
    <Wrapper>
      {!isLast && commentUserId === Number(userId) && (
        <Close onClick={handleOpen} />
      )}
      <Header>
        <Hero>
          <Avatar size={30} />
          <Name>{name}</Name>
        </Hero>
        <Time>{renderTimestamp(timestamp)}</Time>
      </Header>
      <Content>{content}</Content>
    </Wrapper>
  );
};

export const CommentItem = memo(CommentItemComponent);
