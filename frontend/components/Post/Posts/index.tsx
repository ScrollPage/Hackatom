import React, { createContext, memo, useMemo } from "react";
import { Wrapper, Inner, Title } from "./styles";
import { PostItem } from "@/components/Post/PostItem";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import useSWR from "swr";
import { useRouter } from "next/router";
import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { IPost } from "@/types/post";
import { PostAdd } from "../PostAdd";
import { useUser } from "@/hooks/useUser";

const renderPosts = (posts: IPost[]) => {
  return posts.map((post) => {
    return (
      <PostItem
        key={`postitem__key__${post.id}`}
        id={post.id}
        title={post.title}
        initiative={post.initiative}
        picture={post.picture}
        num_likes={post.num_likes}
        is_liked={post.is_liked}
        post_time={post.post_time}
        last_comment={post.last_comment}
        num_comments={post.num_comments}
      />
    );
  });
};

interface PostsProps {
  where: "profile" | "command" | "feed";
  isAdmin?: boolean;
  posts: IPost[] | null;
}

export interface PostsContextProps {
  triggerUrl: string;
}

export const PostsContext = createContext<PostsContextProps | undefined>(
  undefined
);

const PostsComponent: React.FC<PostsProps> = ({ where, isAdmin, posts }) => {
  const { query } = useRouter();
  const { userId } = useUser();

  const [isCanEverything, apiLink] = useMemo(() => {
    if (where === "feed") {
      return [false, `/api/post/feed/`];
    }
    if (where === "profile") {
      return [userId === query.ID, `/api/initiative/${query.ID}/post/`];
    }
    if (where === "command") {
      return [isAdmin, `/api/command/${query.ID}/post/`];
    }
    return [false, ""];
  }, [query, userId, where, isAdmin]);

  const { data, error } = useSWR(apiLink, {
    initialData: posts,
  });

  return (
    <PostsContext.Provider
      value={{
        triggerUrl: apiLink,
      }}
    >
      <Wrapper>
        <Title>Объявления</Title>
        {/* @ts-ignore */}
        {isCanEverything && <PostAdd where={where} />}
        <Inner>
          {error ? (
            <ErrorMessage message="Ошибка загрузки объявлений" />
          ) : !data ? (
            <LoadingSpinner />
          ) : data.length === 0 ? (
            <EmptyMessage message="Нет объявлений" />
          ) : (
            renderPosts(data)
          )}
        </Inner>
      </Wrapper>
    </PostsContext.Provider>
  );
};

export const Posts = memo(PostsComponent);
