import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { IReview } from "@/types/review";
import React, { memo, useContext, useMemo, useState } from "react";
import useSWR from "swr";
import { Wrapper, Title, Main, Header, Span } from "./styles";
import { ReviewItem } from "../ReviewItem";
import { MessageAdd } from "@/components/UI/MessageAdd";
import { useDispatch } from "react-redux";
import { useIsYour } from "@/hooks/useIsYour";
import { addReview } from "@/store/actions/review";
import { useRouter } from "next/router";
import { getAsString } from "@/utils/getAsString";
import { ProfileContext, ProfileProps } from "@/pages/profile/[ID]";

export const renderReviews = (reviews: IReview[]) => {
  return reviews.map((review) => {
    return (
      <ReviewItem
        key={`reviewItem__key__${review.id}`}
        id={review.id}
        name={review.initiative.company}
        commentUserId={review.initiative.id}
        timestamp={review.timestamp}
        content={review.content}
      />
    );
  });
};

interface ReviewsProps {}

const ReviewsComponent: React.FC<ReviewsProps> = () => {
  const { user } = useContext(ProfileContext) as ProfileProps;
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const { query } = useRouter();
  const isYourPage = useIsYour();

  const { error, data } = useSWR<IReview[]>(
    `/api/initiative/${query.ID}/review/`
  );

  const { data: userData, error: userError } = useSWR(
    `/api/initiative/${query.ID}/`,
    {
      initialData: user,
    }
  );

  const numReview = useMemo(
    () => (!userError && userData ? userData.num_reviews : 0),
    [userData, userError]
  );

  const hanldeSubmit = (text: string) => {
    dispatch(addReview(text));
  };

  const handleShow = () => {
    setIsShow((e) => !e);
  };

  return (
    <Wrapper>
      <Header>
        <Title>Отзывы ({numReview})</Title>
        <Span onClick={handleShow}>{isShow ? "Свернуть" : "Развернуть"}</Span>
      </Header>
      {isShow && (
        <Main>
          {error ? (
            <ErrorMessage message="Ошибка загрузки отзывов" />
          ) : !data ? (
            <LoadingSpinner />
          ) : data.length === 0 ? (
            <EmptyMessage message="Нет отзывов" />
          ) : (
            renderReviews(data)
          )}
          {!isYourPage && <MessageAdd onSubmit={hanldeSubmit} />}
        </Main>
      )}
    </Wrapper>
  );
};

export const Reviews = memo(ReviewsComponent);
