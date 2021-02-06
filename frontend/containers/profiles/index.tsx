import { Profiles } from "@/components/Profile/Profiles";
import { Filter } from "@/components/UI/Filter";
import React from "react";
import { Wrapper, Main, Side } from "./styles";

export interface ProfilesContainerProps {}

export const ProfilesContainer: React.FC<ProfilesContainerProps> = ({}) => {
  return (
    <Wrapper>
      <Main>
        <Profiles />
      </Main>
      <Side>
        <Filter />
      </Side>
    </Wrapper>
  );
};
