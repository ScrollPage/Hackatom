import { Avatar } from "@/components/UI/Avatar";
import { Button } from "@/components/UI/Button";
import { deleteAcceptCommand, acceptCommand } from "@/store/actions/command";
import { IJoinRequest } from "@/types/request";
import Link from "next/link";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper, Name, Hero, Main, Bottom, Title } from "./styles";

interface RequestItemProps extends IJoinRequest {}

const RequestItemComponent: React.FC<RequestItemProps> = ({
  id,
  initiative,
  role,
}) => {
  const dispatch = useDispatch();

  const handleDeleteAccpet = () => {
    dispatch(deleteAcceptCommand(id));
  };

  const handleAccept = () => {
    dispatch(acceptCommand(id));
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
        <Title>Заявка на роль: {role}</Title>
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

export const RequestItem = memo(RequestItemComponent);
