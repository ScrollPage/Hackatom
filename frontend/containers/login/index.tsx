import React from "react";
import { Hr, Wrapper, Header, Title, SubTitle, Main, Inner } from "./styles";
import { useDispatch } from "react-redux";
import { authLogin } from "@/store/actions/auth";
import Link from "next/link";
import { LoginForm, LoginFormValues } from "@/components/Auth/LoginForm";

export const LoginContainer = () => {
  const dispatch = useDispatch();

  const onSubmit = (values: LoginFormValues) => {
    dispatch(authLogin(values));
  };

  return (
    <Wrapper>
      <Inner>
        <Header>
          <Title>Вход</Title>
          <SubTitle>
            Нет аккаунта?{" "}
            <Link href="/register">
              <a>Регистрация</a>
            </Link>
          </SubTitle>
        </Header>
        <Hr />
        <Main>
          <LoginForm handleSubmit={onSubmit} />
        </Main>
      </Inner>
    </Wrapper>
  );
};
