import React from "react";
import { Hr, Wrapper, Header, Title, SubTitle, Main, Inner } from "./styles";
import { authSignup } from "@/store/actions/auth";
import { useDispatch } from "react-redux";
import {
  RegisterForm,
  RegisterFormValues,
} from "@/components/Auth/RegisterForm";
import Link from "next/link";

export const RegisterContainer = () => {
  const dispatch = useDispatch();

  const onSubmit = (values: RegisterFormValues) => {
    dispatch(authSignup(values));
  };

  return (
    <Wrapper>
      <Inner>
        <Header>
          <Title>Регистрация</Title>
          <SubTitle>
            Есть акаунт?{" "}
            <Link href="/">
              <a>Вход</a>
            </Link>
          </SubTitle>
        </Header>
        <Hr />
        <Main>
          <RegisterForm handleSubmit={onSubmit} />
        </Main>
      </Inner>
    </Wrapper>
  );
};
