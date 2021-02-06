import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { GetServerSideProps } from "next";
import { ensureAuth } from "@/utils/ensure";
import { CommandContainer } from "@/containers/command";
import { instanceWithSSR } from "@/api";
import { getAsString } from "@/utils/getAsString";
import { ICommand } from "@/types/command";
import { createContext } from "react";
import { IRole } from "@/types/member";
import { IPost } from "@/types/post";
import { IDoc } from "@/types/doc";

export interface CommandProps {
  command: ICommand | null;
  roles: IRole[] | null;
  posts: IPost[] | null;
  docs: IDoc[] | null;
}

export const CommandContext = createContext<CommandProps | undefined>(
  undefined
);

export default function Command({ command, roles, posts, docs }: CommandProps) {
  return (
    <MainLayout>
      <Head>
        <title>BNET / Команда</title>
      </Head>
      <CommandContext.Provider value={{ command, roles, posts, docs }}>
        <CommandContainer />
      </CommandContext.Provider>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<CommandProps> = async (
  ctx
) => {
  ensureAuth(ctx);
  const pageCommandId = getAsString(ctx?.params?.ID);

  let command: ICommand | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/command/${pageCommandId}/`)
    .then((response) => {
      command = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  let roles: IRole[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/command/${pageCommandId}/members/`)
    .then((response) => {
      roles = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  let posts: IPost[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/command/${pageCommandId}/post/`)
    .then((response) => {
      posts = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  let docs: IDoc[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/command/${pageCommandId}/doc/`)
    .then((response) => {
      docs = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      command,
      roles,
      posts,
      docs,
    },
  };
};
