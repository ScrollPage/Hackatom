import { Button } from "@/components/UI/Button";
import { deleteComment } from "@/store/actions/comment";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper, Inner, Title } from "./styles";

export interface DeleteCommentProps {
  commentId: number;
  postId: number;
}

interface IDeleteComment extends DeleteCommentProps {
  setClose: () => void;
}

const DeleteCommentComponent: React.FC<IDeleteComment> = ({
  setClose,
  commentId,
  postId,
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteComment(commentId, postId));
    setClose();
  };

  return (
    <Wrapper>
      <Title>Вы действительно хотите удалить комментарий?</Title>
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

export const DeleteComment = memo(DeleteCommentComponent);
