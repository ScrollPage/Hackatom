import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  Wrapper,
  Header,
  Hero,
  HeaderMain,
  Logo,
  SideLink,
  SideBar,
  Main,
  Name,
  Flex,
  HeaderInner,
  HeaderSide,
  Notify,
} from "./styles";
import { useDispatch } from "react-redux";
import { authCheckState, logout } from "@/store/actions/auth";
import Container from "@/components/UI/Container";
import { Button } from "@/components/UI/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar } from "@/components/UI/Avatar";
import { useUser } from "@/hooks/useUser";
import { Search } from "@/components/UI/Search";
import { usePusher } from "@/hooks/usePusher";
import { mainLoyoutLinks } from "@/utils/mainLayoutLinks";
import { useSetupWebsokets } from "@/hooks/useSetupWebsokets";
import { NotifyList } from "../NotifyList";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayoutComponent: React.FC<MainLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { pathname } = useRouter();
  const { userId, company } = useUser();
  const [isShowNotify, setIsShowNotify] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const links = mainLoyoutLinks(Number(userId));

  useEffect(() => {
    dispatch(authCheckState());
  }, []);

  usePusher();

  useSetupWebsokets();

  const isShowSearch = useMemo(() => {
    return pathname === "/profile" || pathname === "/command";
  }, [pathname]);

  const logoutHandler = () => {
    dispatch(logout(true));
  };

  const handleShowNotify = () => {
    setIsShowNotify((e) => !e);
  };

  const handleClose = useCallback(() => {
    setIsShowNotify(false);
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  }, [isShowNotify, setIsShowNotify]);

  return (
    <Wrapper>
      <Header>
        <Container>
          <HeaderInner>
            <Logo>
              <Link href={`/profile/${userId}`}>
                <a>
                  <img src="/logo.svg" alt="Социальная сеть для бизнеса" />
                </a>
              </Link>
            </Logo>
            <HeaderMain>
              <Hero>
                <Avatar href={`/profile/${userId}`} />
                <Name>
                  <Link href={`/profile/${userId}`}>
                    <a>{company}</a>
                  </Link>
                </Name>
              </Hero>
              <HeaderSide>
                {isShowSearch && <Search />}
                <Notify onClick={handleShowNotify} disabled={disabled}>
                  <img src="/notify.svg" alt="Запросы команды" />
                  {isShowNotify && <NotifyList onClose={handleClose} />}
                </Notify>
                <Button onClick={logoutHandler} myType="outline" width="182px">
                  Выход
                </Button>
              </HeaderSide>
            </HeaderMain>
          </HeaderInner>
        </Container>
      </Header>
      <Container>
        <Flex>
          <SideBar>
            {links.map((link, index) => (
              <SideLink
                key={`sidelink__key__${index}`}
                isActive={pathname === link.pathname}
              >
                <Link href={link.href}>
                  <a>{link.label}</a>
                </Link>
              </SideLink>
            ))}
          </SideBar>
          <Main>{children}</Main>
        </Flex>
      </Container>
    </Wrapper>
  );
};

export const MainLayout = memo(MainLayoutComponent);
