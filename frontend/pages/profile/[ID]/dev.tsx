import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { GetServerSideProps } from "next";
import { ensureAuth } from "@/utils/ensure";
import { DevContainer } from "@/containers/dev";
import { instanceWithSSR } from "@/api";
import { getAsString } from "@/utils/getAsString";
import { createContext } from "react";
import { IDev } from "@/types/dev";

export interface DevProps {
  dev: IDev | null;
}

export const DevContext = createContext<DevProps | undefined>(undefined);

export default function Dev({ dev }: DevProps) {
  return (
    <MainLayout>
      <Head>
        <title>BNET / Проработка</title>
      </Head>
      <DevContainer dev={dev} />
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<DevProps> = async (ctx) => {
  ensureAuth(ctx);
  const pageUserId = getAsString(ctx?.params?.ID);

  let dev: IDev | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/initiative/${pageUserId}/construct/`)
    .then((response) => {
      dev = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      dev,
    },
  };
};
