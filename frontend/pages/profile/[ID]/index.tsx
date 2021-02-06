import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { GetServerSideProps } from "next";
import { ensureAuth } from "@/utils/ensure";
import { ProfileContainer } from "@/containers/profile";
import { instanceWithSSR } from "@/api";
import { getAsString } from "@/utils/getAsString";
import { User } from "@/types/user";
import { createContext } from "react";
import { IPost } from "@/types/post";
import { IRole } from "@/types/member";
import { IDev } from "@/types/dev";

export interface ProfileProps {
  user: User | null;
  posts: IPost[] | null;
  roles: IRole[] | null;
  dev: IDev | null;
}

export const ProfileContext = createContext<ProfileProps | undefined>(
  undefined
);

export default function Profile({ user, posts, roles, dev }: ProfileProps) {
  return (
    <MainLayout>
      <Head>
        <title>BNET / {user ? user.company : "Профиль"} </title>
      </Head>
      <ProfileContext.Provider value={{ user, posts, roles, dev }}>
        <ProfileContainer />
      </ProfileContext.Provider>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (
  ctx
) => {
  ensureAuth(ctx);
  const pageUserId = getAsString(ctx?.params?.ID);

  let user: User | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/initiative/${pageUserId}/`)
    .then((response) => {
      user = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  let roles: IRole[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/initiative/${pageUserId}/command/`)
    .then((response) => {
      roles = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  let posts: IPost[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/initiative/${pageUserId}/post/`)
    .then((response) => {
      posts = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

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
      user,
      posts,
      roles,
      dev,
    },
  };
};
