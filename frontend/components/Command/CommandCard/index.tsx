import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import React, { memo, useContext } from "react";
import { Wrapper, Stroke, SubTitle, Options, Label, Option } from "./styles";
import { CommandContext, CommandProps } from "@/pages/command/[ID]";
import { useRouter } from "next/router";
import useSWR from "swr";
import { IOption } from "@/types/option";
import { Docs } from "../Docs";

const renderOptions = (options: IOption[]) => {
  return options.map((option, index) => {
    return (
      <Option key={`OptionItem__key__${option.id}`}>
        {option.name}
        {index + 1 !== options.length && ", "}
      </Option>
    );
  });
};

const CommandCardComponent = () => {
  const { command } = useContext(CommandContext) as CommandProps;
  const { query } = useRouter();

  const { data, error } = useSWR(`/api/command/${query.ID}/`, {
    initialData: command,
  });

  if (error) {
    return (
      <Wrapper>
        <ErrorMessage message="Ошибка загрузки информации о команде" />
      </Wrapper>
    );
  }

  if (!data) {
    return (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        {data.info.description && (
          <Stroke>
            <SubTitle>Описание</SubTitle>
            <Label>{data.info.description}</Label>
          </Stroke>
        )}
        {data.info.idea && (
          <Stroke>
            <SubTitle>Идея</SubTitle>
            <Label>{data.info.idea}</Label>
          </Stroke>
        )}
        {data.info.categories.length !== 0 && (
          <Stroke>
            <SubTitle>Категории</SubTitle>
            {renderOptions(data.info.categories)}
          </Stroke>
        )}
        {data.info.requirenments.length !== 0 && (
          <Stroke>
            <SubTitle>Необходимости</SubTitle>
            {renderOptions(data.info.requirenments)}
          </Stroke>
        )}
        <Stroke>
          <SubTitle>Документы</SubTitle>
          {data.can_downolad || data.joined ? (
            <Docs />
          ) : (
            <Label>У вас нет доступа</Label>
          )}
        </Stroke>
      </Wrapper>
    );
  }
};

export const CommandCard = memo(CommandCardComponent);
