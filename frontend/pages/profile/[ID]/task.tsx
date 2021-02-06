import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { GetServerSideProps } from "next";
import { ensureAuth } from "@/utils/ensure";
import { UserTaskContainer } from "@/containers/userTask";
import { instanceWithSSR } from "@/api";
import { getAsString } from "@/utils/getAsString";
import { createContext } from "react";
import { ITask } from "@/types/task";

export interface UserTaskProps {
  tasks: ITask[] | null;
}

export const UserTaskContext = createContext<UserTaskProps | undefined>(
  undefined
);

export default function UserTask({ tasks }: UserTaskProps) {
  return (
    <MainLayout>
      <Head>
        <title>BNET / План проекта</title>
      </Head>
      <UserTaskContext.Provider value={{ tasks }}>
        <UserTaskContainer />
      </UserTaskContext.Provider>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<UserTaskProps> = async (
  ctx
) => {
  ensureAuth(ctx);
  const pageUserId = getAsString(ctx?.params?.ID);

  let tasks: ITask[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/initiative/${pageUserId}/diagram/`)
    .then((response) => {
      tasks = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      tasks,
    },
  };
};
