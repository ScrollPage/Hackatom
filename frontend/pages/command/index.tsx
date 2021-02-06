import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { GetServerSideProps } from "next";
import { ensureAuth } from "@/utils/ensure";
import { CommandsContainer } from "@/containers/commands";
import { instanceWithSSR } from "@/api";
import { ICommand } from "@/types/command";
import { createContext } from "react";
import { getAsString } from "@/utils/getAsString";

export interface CommandsProps {
  commands: ICommand[] | null;
}

export const CommandsContext = createContext<CommandsProps | undefined>(
  undefined
);

export default function Commands({ commands }: CommandsProps) {
  return (
    <MainLayout>
      <Head>
        <title>BNET / Команды</title>
      </Head>
      <CommandsContext.Provider value={{ commands }}>
        <CommandsContainer />
      </CommandsContext.Provider>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<CommandsProps> = async (
  ctx
) => {
  ensureAuth(ctx);

  const categories = getAsString(ctx?.query?.categories) ?? "";
  const requirenments = getAsString(ctx?.query?.requirenments) ?? "";
  const search = getAsString(ctx?.query?.search) ?? "";
  const rate = getAsString(ctx?.query?.rate) ?? "";

  const apiLink = `${
    categories && `&info__categories__id__in=${categories?.split(",")}`
  }${
    requirenments && `&info__requirenments__id__in=${requirenments?.split(",")}`
  }${search && `&name__contains=${search}`}${rate && "&sort=-rate"}`;

  let commands: ICommand[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/command/?${apiLink[0] === "&" ? apiLink.substr(1) : apiLink}`)
    .then((response) => {
      commands = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      commands,
    },
  };
};
