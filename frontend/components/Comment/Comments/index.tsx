import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { IComment } from "@/types/comment";
import React, { memo } from "react";
import useSWR from "swr";
import { Wrapper } from "./styles";
import { CommentItem } from "../CommentItem";
import { MessageAdd } from "@/components/UI/MessageAdd";
import { useDispatch } from "react-redux";
import { addComment } from "@/store/actions/comment";

export const renderComments = (comments: IComment[], postId: number) => {
  return comments.map((comment) => {
    return (
      <CommentItem
        key={`commentItem__key__${comment.id}`}
        id={comment.id}
        name={comment.initiative.company}
        commentUserId={comment.initiative.id}
        timestamp={comment.timestamp}
        content={comment.content}
        postId={postId}
      />
    );
  });
};

interface CommentsProps {
  postId: number;
}

const CommentsComponent: React.FC<CommentsProps> = ({ postId }) => {
  const dispatch = useDispatch();

  const { error, data } = useSWR<IComment[]>(`/api/post/${postId}/comment/`);

  const hanldeSubmit = (text: string) => {
    dispatch(addComment(text, postId));
  };

  return (
    <Wrapper>
      {error ? (
        <ErrorMessage message="Ошибка загрузки комментариев" />
      ) : !data ? (
        <LoadingSpinner />
      ) : data.length === 0 ? (
        <EmptyMessage message="Нет комментариев" />
      ) : (
        renderComments(data, postId)
      )}
      <MessageAdd onSubmit={hanldeSubmit} />
    </Wrapper>
  );
};

export const Comments = memo(CommentsComponent);
