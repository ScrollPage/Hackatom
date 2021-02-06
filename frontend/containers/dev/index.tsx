import { DevForm } from "@/components/Dev/DevForm";
import { Button } from "@/components/UI/Button";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { IDev } from "@/types/dev";
import { devList } from "@/utils/devList";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import useSWR from "swr";
import { Wrapper, Stages, Title, Inner, Main, Stage } from "./styles";

const renderName = (key: string) => {
  const nameObj = devList.find((item) => item.eng === key);
  if (!nameObj) {
    return "Этап";
  }
  return nameObj.name;
};

const renderDevs = (dev: IDev, handleClick: (stage: string) => void) => {
  const { query } = useRouter();
  return Object.keys(dev).map((stage, index) => {
    if (index === 0) {
      return;
    }
    return (
      <Stage
        onClick={() => handleClick(stage)}
        key={`stageItem__key__${index}`}
        isActive={stage === query.stage}
      >{`${index}. ${renderName(stage)}`}</Stage>
    );
  });
};

export interface DevContainerProps {
  dev: IDev | null;
}

export const DevContainer: React.FC<DevContainerProps> = ({ dev }) => {
  const { query, push } = useRouter();

  const handleReturn = () => {
    push({ pathname: `/profile/${query.ID}` }, undefined, {
      shallow: true,
    });
  };

  const { error, data } = useSWR(`/api/initiative/${query.ID}/construct/`, {
    initialData: dev,
  });

  useEffect(() => {
    if (!query.stage && data) {
      const stage = Object.keys(data)[1];
      push(
        {
          pathname: `/profile/${query.ID}/dev`,
          query: {
            stage,
          },
        },
        undefined,
        {
          shallow: true,
        }
      );
    }
  }, [query, data]);

  const setStage = (stage: string) => {
    push(
      {
        pathname: `/profile/${query.ID}/dev`,
        query: {
          stage,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  return (
    <>
      <Button onClick={handleReturn} width="218px" myType="outline">
        Назад
      </Button>
      <Wrapper>
        <Stages>
          <Title>Этапы</Title>
          {error ? (
            <ErrorMessage message="Ошибка загрузки этапов" />
          ) : !data ? (
            <LoadingSpinner />
          ) : (
            renderDevs(data, setStage)
          )}
        </Stages>
        <Inner>
          <Main>
            {error ? (
              <ErrorMessage message="Ошибка загрузки изменения этапов" />
            ) : !data ? (
              <LoadingSpinner />
            ) : (
              query.stage && <DevForm initialValues={data} />
            )}
          </Main>
        </Inner>
      </Wrapper>
    </>
  );
};
