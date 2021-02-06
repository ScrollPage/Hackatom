import React, { memo, useState } from "react";
import { Rate } from "antd";
import { Wrapper, Title } from "./styles";
import { useDispatch } from "react-redux";
import { setUserRate } from "@/store/actions/auth";
import { useRouter } from "next/router";
import { getAsString } from "@/utils/getAsString";

interface RatingProps {
  defaultRate: string;
  disabled?: boolean;
}

const RatingComponent: React.FC<RatingProps> = ({
  defaultRate,
  disabled = false,
}) => {
  const dispatch = useDispatch();
  const [rate, setRate] = useState(parseFloat(defaultRate));
  const { query } = useRouter();

  const handleChange = (value: number) => {
    setRate(value);
    const pageUserId = getAsString(query.ID);
    if (pageUserId) {
      dispatch(setUserRate(parseInt(pageUserId), value));
    }
  };

  return (
    <Wrapper disabled={disabled}>
      <Rate disabled={disabled} value={rate} onChange={handleChange} />
      <Title>{defaultRate}</Title>
    </Wrapper>
  );
};

export const Rating = memo(RatingComponent);
