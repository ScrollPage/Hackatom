import { Avatar } from "@/components/UI/Avatar";
import { Rating } from "@/components/UI/Rating";
import Link from "next/link";
import React, { memo } from "react";
import { Wrapper, Main, Label, Title } from "./styles";

interface CommandItemProps {
  id: number;
  rate: string;
  company: string;
  name: string;
  numMembers: number;
}

const CommandItemComponent = ({
  id,
  rate,
  company,
  name,
  numMembers,
}: CommandItemProps) => (
  <Wrapper>
    <Avatar size={80} href={`/command/${id}`} />
    <Main>
      <Title>
        <Link href={`/command/${id}`}>
          <a>{name}</a>
        </Link>
      </Title>
      <Rating defaultRate={rate} disabled />
      <Label>Инициатор: {company}</Label>
      <Label>Участников: {numMembers}</Label>
    </Main>
  </Wrapper>
);

export const CommandItem = memo(CommandItemComponent);
