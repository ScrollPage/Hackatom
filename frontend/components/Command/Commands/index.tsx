import deepEqual from "fast-deep-equal";
import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import {
  CommandsContext,
  CommandsProps as ContextProps,
} from "@/pages/command";
import { ICommand } from "@/types/command";
import { getAsString } from "@/utils/getAsString";
import { useRouter } from "next/router";
import React, { memo, useContext, useMemo, useState } from "react";
import useSWR from "swr";
import { CommandItem } from "../CommandItem";
import { Wrapper } from "./styles";

const renderCommands = (commands: ICommand[]) => {
  return commands.map((command) => {
    return (
      <CommandItem
        key={`commanditem__key__${command.info.id}`}
        id={command.info.id}
        name={command.name}
        rate={command.rate ?? "0"}
        company={command.initiator.company}
        numMembers={command.num_members}
      />
    );
  });
};

interface CommandsProps {}

const CommandsComponent = ({}: CommandsProps) => {
  const { commands } = useContext(CommandsContext) as ContextProps;
  const { query } = useRouter();
  const [serverQuery] = useState(query);

  const categories = getAsString(query.categories) ?? "";
  const requirenments = getAsString(query.requirenments) ?? "";
  const search = getAsString(query.search) ?? "";
  const rate = getAsString(query.rate) ?? "";

  const apiLink = useMemo(() => {
    return `${
      categories && `&info__categories__id__in=${categories?.split(",")}`
    }${
      requirenments &&
      `&info__requirenments__id__in=${requirenments?.split(",")}`
    }${search && `&name__contains=${search}`}${rate && "&sort=-rate"}`;
  }, [query]);

  const { data, error } = useSWR(
    `/api/command/?${apiLink[0] === "&" ? apiLink.substr(1) : apiLink}`,
    {
      initialData: deepEqual(query, serverQuery) ? commands : undefined,
    }
  );

  return (
    <Wrapper>
      {error ? (
        <ErrorMessage message="Ошибка загрузки комманд" />
      ) : !data ? (
        <LoadingSpinner />
      ) : data.length === 0 ? (
        <EmptyMessage message="Нет комманд" />
      ) : (
        renderCommands(data)
      )}
    </Wrapper>
  );
};

export const Commands = memo(CommandsComponent);
