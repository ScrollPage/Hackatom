import { Posts } from "@/components/Post/Posts";
import { ProfileCard } from "@/components/Profile/ProfileCard";
import React, { useContext } from "react";
import { Wrapper, Info, Ads } from "./styles";
import { ProfileContext, ProfileProps } from "@/pages/profile/[ID]";
import { Reviews } from "@/components/Review/Reviews";
import { ProfileDev } from "@/components/Profile/ProfileDev";
import { useUser } from "@/hooks/useUser";

export const ProfileContainer = () => {
  const { posts } = useContext(ProfileContext) as ProfileProps;
  const { isSteakholder } = useUser();
  return (
    <Wrapper>
      <Info>
        <ProfileCard />
        <Reviews />
      </Info>
      <Ads>
        <ProfileDev />
        <Posts posts={posts} where="profile" />
      </Ads>
    </Wrapper>
  );
};
