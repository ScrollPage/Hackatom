import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { CommandContext, CommandProps } from "@/pages/command/[ID]";
import { IRole } from "@/types/member";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo, useContext } from "react";
import useSWR from "swr";
import { Wrapper, Title, Stroke, Label, Info } from "./styles";

const renderRoles = (roles: IRole[]) => {
  return roles.map((role, index) => {
    return (
      <Stroke key={`roleitem__key__${index}`}>
        <Label>{role.role}:</Label>
        <Info>
          <Link href={`/profile/${role.initiative.id}`}>
            <a>{role.initiative.company}</a>
          </Link>
        </Info>
      </Stroke>
    );
  });
};

const RolesComponent = () => {
  const { roles } = useContext(CommandContext) as CommandProps;
  const { query } = useRouter();

  const { data: rolesData, error: rolesError } = useSWR(
    `/api/command/${query.ID}/members/`,
    {
      initialData: roles,
    }
  );

  return (
    <Wrapper>
      <Title>Роли</Title>
      {rolesError ? (
        <ErrorMessage message="Ошибка загрузки ролей" />
      ) : !rolesData ? (
        <LoadingSpinner />
      ) : rolesData.length === 0 ? (
        <EmptyMessage message="Нет ролей" />
      ) : (
        renderRoles(rolesData)
      )}
    </Wrapper>
  );
};

export const Roles = memo(RolesComponent);
