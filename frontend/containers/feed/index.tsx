import { Posts } from "@/components/Post/Posts";
import { IPost } from "@/types/post";
import React, { memo } from "react";
import { Wrapper } from "./styles";

interface FeedContainerProps {
  posts: IPost[] | null;
}

const FeedContainerComponent = ({ posts }: FeedContainerProps) => {
  return (
    <Wrapper>
      <Posts where="feed" posts={posts} />
    </Wrapper>
  );
};

export const FeedContainer = memo(FeedContainerComponent);
