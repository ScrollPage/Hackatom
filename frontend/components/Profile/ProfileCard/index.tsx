import { ChangeProfileProps } from "@/components/Modal/ChangeProfile";
import { Avatar } from "@/components/UI/Avatar";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { useIsYour } from "@/hooks/useIsYour";
import { ProfileContext, ProfileProps } from "@/pages/profile/[ID]";
import { useRouter } from "next/router";
import React, { memo, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { Rating } from "../../UI/Rating";
import {
  TopMain,
  Wrapper,
  Top,
  Header,
  Title,
  Main,
  Stroke,
  Label,
  Info,
  Roles,
  SubTitle,
  Change,
  Option,
  Options,
  Hide,
  Span,
} from "./styles";
import { modalShow } from "@/store/actions/modal";
import { IRole } from "@/types/member";
import { EmptyMessage } from "@/components/UI/EmptyMessage";
import Link from "next/link";
import { IOption } from "@/types/option";
import { Button } from "@/components/UI/Button";
import { createChat } from "@/store/actions/chat";
import { useUser } from "@/hooks/useUser";

const renderRoles = (roles: IRole[]) => {
  return roles.map((role, index) => {
    return (
      <Stroke key={`roleitem__key__${index}`}>
        <Label>
          <Link href={`/command/${role.command.id}`}>
            <a>{role.command.name}</a>
          </Link>
        </Label>
        <Info>{role.role}</Info>
      </Stroke>
    );
  });
};

const renderOptions = (options: IOption[]) => {
  return options.map((option, index) => {
    return (
      <>
        <Option key={`OptionItem__key__${option.id}`}>{option.name}</Option>
        {index + 1 !== options.length && ", "}
      </>
    );
  });
};

const ProfileCardComponent = () => {
  const dispatch = useDispatch();
  const { user, roles } = useContext(ProfileContext) as ProfileProps;
  const { query, push } = useRouter();
  const [isShow, setIsShow] = useState(false);
  const { isSteakholder } = useUser();
  const isYourPage = useIsYour();

  const { data: userData, error: userError } = useSWR(
    `/api/initiative/${query.ID}/`,
    {
      initialData: user,
    }
  );

  const { data: rolesData, error: rolesError } = useSWR(
    `/api/initiative/${query.ID}/command/`,
    {
      initialData: roles,
    }
  );

  const handleChange = () => {
    if (userData) {
      dispatch(
        modalShow<ChangeProfileProps>("CHANGE_PROFILE", { user: userData })
      );
    }
  };

  const handleMessage = () => {
    if (userData) {
      if (userData.has_chat) {
        push({ pathname: "/im", query: { id: userData.chat_id } }, undefined, {
          shallow: true,
        });
      } else {
        dispatch(createChat());
      }
    }
  };

  const handleTask = () => {
    push({ pathname: `/profile/${query.ID}/task` }, undefined, {
      shallow: true,
    });
  };

  const handleDev = () => {
    push({ pathname: `/profile/${query.ID}/dev` }, undefined, {
      shallow: true,
    });
  };

  const hanldeShowInfo = () => {
    setIsShow(true);
  };

  if (userError) {
    return (
      <Wrapper>
        <ErrorMessage message="Ошибка загрузки информации о пользователе" />
      </Wrapper>
    );
  }

  if (!userData) {
    return (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Top>
          <TopMain>
            <Avatar size={60} href={`/profile/${userData.id}`} />
            <Header>
              <Title>{userData.company}</Title>
              <Rating
                defaultRate={userData.rate ?? "0"}
                disabled={isYourPage}
              />
            </Header>
          </TopMain>
          {isYourPage && (
            <Change onClick={handleChange}>
              <img src="/change.svg" alt="Изменить информацию" />
            </Change>
          )}
        </Top>
        <Main>
          {!isYourPage && (
            <Button onClick={handleMessage} width="100%" myType="outline">
              Написать сообщение
            </Button>
          )}
          <Button onClick={handleTask} width="100%" myType="outline">
            План проекта
          </Button>
          <Button onClick={handleDev} width="100%" myType="outline">
            Проработка
          </Button>
          <Stroke>
            <Label>Предприятие</Label>
            <Info>{userData.name}</Info>
          </Stroke>
          <Stroke>
            <Label>Владелец</Label>
            <Info>{`${userData.first_name} ${userData.last_name}`}</Info>
          </Stroke>
          {!isShow && <Span onClick={hanldeShowInfo}>Развернуть</Span>}
        </Main>
        {isShow && (
          <Hide>
            <Stroke>
              <Label>Описание</Label>
              <Info>{userData.info.description}</Info>
            </Stroke>
            <Stroke>
              <Label>Номер телефона</Label>
              <Info>{userData.phone_number}</Info>
            </Stroke>
            <Stroke>
              <Label>E - mail</Label>
              <Info>{userData.email}</Info>
            </Stroke>
            <Roles>
              <SubTitle>Роли в командах</SubTitle>
              {rolesError ? (
                <ErrorMessage message="Ошибка загрузки ролей пользователя" />
              ) : !rolesData ? (
                <LoadingSpinner />
              ) : rolesData.length === 0 ? (
                <EmptyMessage message="У вас нет команд" />
              ) : (
                renderRoles(rolesData)
              )}
            </Roles>
            {userData.info.categories.length !== 0 && (
              <Options>
                <SubTitle>Категории</SubTitle>
                {renderOptions(userData.info.categories)}
              </Options>
            )}
            {userData.info.requirenments.length !== 0 && (
              <Options>
                <SubTitle>Необходимости</SubTitle>
                {renderOptions(userData.info.requirenments)}
              </Options>
            )}
          </Hide>
        )}
      </Wrapper>
    );
  }
};

export const ProfileCard = memo(ProfileCardComponent);
