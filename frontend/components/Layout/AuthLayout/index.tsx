import Container from "@/components/UI/Container";
import React, { memo } from "react";
import { Wrapper, Header, Footer, Main } from "./styles";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayoutComponent: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Wrapper>
      <Header>
        <img src="/logo.svg" alt="Социальная сеть для бизнеса" />
      </Header>
      <Container>{children}</Container>
      <Footer>
        <img src="/auth_bottom.svg" alt="Синяя волна" />
      </Footer>
    </Wrapper>
  );
};

export const AuthLayout = memo(AuthLayoutComponent);
