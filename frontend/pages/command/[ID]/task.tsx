import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { GetServerSideProps } from "next";
import { ensureAuth } from "@/utils/ensure";
import { TaskContainer } from "@/containers/task";
import { instanceWithSSR } from "@/api";
import { getAsString } from "@/utils/getAsString";
import { createContext } from "react";
import { IRole } from "@/types/member";
import { IDiagram } from "@/types/diagram";

export interface TaskProps {
  tasks: IDiagram | null;
  roles: IRole[] | null;
}

export const TaskContext = createContext<TaskProps | undefined>(undefined);

export default function Task({ tasks, roles }: TaskProps) {
  return (
    <MainLayout>
      <Head>
        <title>BNET / План команды</title>
      </Head>
      <TaskContext.Provider value={{ tasks, roles }}>
        <TaskContainer />
      </TaskContext.Provider>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<TaskProps> = async (
  ctx
) => {
  ensureAuth(ctx);
  const pageCommandId = getAsString(ctx?.params?.ID);

  let tasks: IDiagram | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/command/${pageCommandId}/diagram/`)
    .then((response) => {
      tasks = response?.data ?? null;
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

  return {
    props: {
      tasks,
      roles,
    },
  };
};
