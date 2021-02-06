import { Button } from "@/components/UI/Button";
import { deleteReview } from "@/store/actions/review";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper, Inner, Title } from "./styles";

export interface DeleteReviewProps {
  reviewId: number;
}

interface IDeleteReview extends DeleteReviewProps {
  setClose: () => void;
}

const DeleteReviewComponent: React.FC<IDeleteReview> = ({
  setClose,
  reviewId,
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteReview(reviewId));
    setClose();
  };

  return (
    <Wrapper>
      <Title>Вы действительно хотите удалить отзыв?</Title>
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

export const DeleteReview = memo(DeleteReviewComponent);
