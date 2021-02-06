import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { GetServerSideProps } from "next";
import { ensureAuth } from "@/utils/ensure";
import { ProfilesContainer } from "@/containers/profiles";
import { instanceWithSSR } from "@/api";
import { createContext } from "react";
import { User } from "@/types/user";
import { getAsString } from "@/utils/getAsString";

export interface ProfilesProps {
  profiles: User[] | null;
}

export const ProfilesContext = createContext<ProfilesProps | undefined>(
  undefined
);

export default function Profiles({ profiles }: ProfilesProps) {
  return (
    <MainLayout>
      <Head>
        <title>BNET / Инициативы</title>
      </Head>
      <ProfilesContext.Provider value={{ profiles }}>
        <ProfilesContainer />
      </ProfilesContext.Provider>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<ProfilesProps> = async (
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
  }${search && `&company__contains=${search}`}${rate && "&sort=-rate"}`;

  let profiles: User[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/initiative/?${apiLink[0] === "&" ? apiLink.substr(1) : apiLink}`)
    .then((response) => {
      profiles = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      profiles,
    },
  };
};
