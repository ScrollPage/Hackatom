import { DeleteCommentProps } from "@/components/Modal/DeleteComment";
import { DeleteReviewProps } from "@/components/Modal/DeleteReview";
import { Avatar } from "@/components/UI/Avatar";
import { useUser } from "@/hooks/useUser";
import { modalShow } from "@/store/actions/modal";
import { renderTimestamp } from "@/utils/renderTimestamp";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper, Hero, Name, Close, Header, Content, Time } from "./styles";

interface ReviewItemProps {
  name: string;
  timestamp: string;
  content: string;
  id: number;
  commentUserId: number;
}

const ReviewItemComponent: React.FC<ReviewItemProps> = ({
  name,
  content,
  id,
  commentUserId,
  timestamp,
}) => {
  const dispatch = useDispatch();
  const { userId } = useUser();

  const handleOpen = () => {
    dispatch(
      modalShow<DeleteReviewProps>("DELETE_REVIEW", { reviewId: id })
    );
  };

  return (
    <Wrapper>
      {commentUserId === Number(userId) && <Close onClick={handleOpen} />}
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

export const ReviewItem = memo(ReviewItemComponent);
