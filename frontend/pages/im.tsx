import React, { createContext } from "react";
import { ensureAuth } from "@/utils/ensure";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { ImContainer } from "@/containers/im";
import { MainLayout } from "@/components/Layout/MainLayout";
import { instanceWithSSR } from "@/api";
import { IChat } from "@/types/chat";
import { getAsString } from "@/utils/getAsString";

export interface ImProps {
  chats: IChat[] | null;
  currentChat: IChat | null;
}

export const ImContext = createContext<ImProps | undefined>(undefined);

export default function Im({ chats, currentChat }: ImProps) {
  return (
    <MainLayout>
      <Head>
        <title>BNET / Мессенджер</title>
      </Head>
      <ImContext.Provider value={{ chats, currentChat }}>
        <ImContainer />
      </ImContext.Provider>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<ImProps> = async (ctx) => {
  ensureAuth(ctx);
  let chats: IChat[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/chat/`)
    .then((response) => {
      chats = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  const currentChatId = getAsString(ctx?.params?.id);
  let currentChat: IChat | null = null;
  if (currentChatId) {
    await instanceWithSSR(ctx)
      .get(`/api/chat/${currentChatId}`)
      .then((response) => {
        currentChat = response?.data ?? null;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return {
    props: {
      chats,
      currentChat,
    },
  };
};
