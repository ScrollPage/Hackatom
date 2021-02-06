import { Avatar } from "@/components/UI/Avatar";
import { Button } from "@/components/UI/Button";
import {
  deleteAcceptDocCommand,
  acceptDocCommand,
} from "@/store/actions/command";
import { IAccessRequest } from "@/types/request";
import Link from "next/link";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper, Name, Hero, Main, Bottom, Title } from "./styles";

interface AccessItemProps extends IAccessRequest {}

const AccessItemComponent: React.FC<AccessItemProps> = ({ id, initiative }) => {
  const dispatch = useDispatch();

  const handleDeleteAccpet = () => {
    dispatch(deleteAcceptDocCommand(id));
  };

  const handleAccept = () => {
    dispatch(acceptDocCommand(id));
  };

  return (
    <Wrapper>
      <Main>
        <Hero>
          <Avatar href={`/profile/${initiative.id}`} />
          <Name>
            <Link href={`/profile/${initiative.id}`}>
              <a>{initiative.company}</a>
            </Link>
          </Name>
        </Hero>
        <Title>Инициатива запрашивет доступ к документам</Title>
      </Main>
      <Bottom>
        <Button width="182px" myType="outline" onClick={handleAccept}>
          Принять
        </Button>
        <Button width="182px" myType="outline" onClick={handleDeleteAccpet}>
          Отклонить
        </Button>
      </Bottom>
    </Wrapper>
  );
};

export const AccessItem = memo(AccessItemComponent);
