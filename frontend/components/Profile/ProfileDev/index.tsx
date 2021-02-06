import { ProfileContext, ProfileProps } from "@/pages/profile/[ID]";
import { useRouter } from "next/router";
import React, { memo, useContext, useMemo } from "react";
import useSWR from "swr";
import { Wrapper, Title, Percent } from "./styles";

const ProfileDevComponent = () => {
  const { dev } = useContext(ProfileContext) as ProfileProps;
  const { query } = useRouter();

  const { data, error } = useSWR(`/api/initiative/${query.ID}/construct/`, {
    initialData: dev,
  });

  const percent = useMemo(() => {
    if (!error && data) {
      const length = Object.keys(data).length;
      const numberOfFilled = Object.keys(data).reduce<number>((acc, val) => {
        // @ts-ignore
        if (data[val]) {
          return ++acc;
        } else {
          return acc;
        }
      }, 0);
      return Math.round(((numberOfFilled - 1) / (length - 1)) * 100);
    } else {
      return 0;
    }
  }, [data, error]);

  return (
    <Wrapper percent={percent}>
      <Title>Проработка проекта</Title>
      <Percent>{percent}%</Percent>
    </Wrapper>
  );
};

export const ProfileDev = memo(ProfileDevComponent);
