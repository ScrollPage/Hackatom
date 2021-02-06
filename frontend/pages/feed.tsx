import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { GetServerSideProps } from "next";
import { ensureAuth } from "@/utils/ensure";
import { instanceWithSSR } from "@/api";
import { IPost } from "@/types/post";
import { FeedContainer } from "@/containers/feed";

export interface FeedProps {
  posts: IPost[] | null;
}

export default function Feed({ posts }: FeedProps) {
  return (
    <MainLayout>
      <Head>
        <title>BNET / Лента объявлений</title>
      </Head>
      <FeedContainer posts={posts} />
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<FeedProps> = async (
  ctx
) => {
  ensureAuth(ctx);
  let posts: IPost[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/post/feed/`)
    .then((response) => {
      posts = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      posts,
    },
  };
};
