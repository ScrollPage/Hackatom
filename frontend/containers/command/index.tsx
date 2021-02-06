import { CommandCard } from "@/components/Command/CommandCard";
import { CommandInfo } from "@/components/Command/CommandInfo";
import { Roles } from "@/components/Command/Roles";
import React, { useContext } from "react";
import { Wrapper, Main, Side } from "./styles";
import { CommandContext, CommandProps } from "@/pages/command/[ID]";
import { Posts } from "@/components/Post/Posts";
import { useRouter } from "next/router";
import useSWR from "swr";

export const CommandContainer = () => {
  const { posts, command } = useContext(CommandContext) as CommandProps;

  const { query } = useRouter();

  const { data, error } = useSWR(`/api/command/${query.ID}/`, {
    initialData: command,
  });

  return (
    <Wrapper>
      <Main>
        <CommandCard />
        <Posts
          posts={posts}
          where="command"
          isAdmin={!error && data ? data.is_initiator : false}
        />
      </Main>
      <Side>
        <CommandInfo />
        <Roles />
      </Side>
    </Wrapper>
  );
};
