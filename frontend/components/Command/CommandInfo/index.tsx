import { Rating } from "@/components/UI/Rating";
import { Avatar } from "@/components/UI/Avatar";
import { Button } from "@/components/UI/Button";
import React, { memo, useCallback, useContext, useState } from "react";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { CommandContext, CommandProps } from "@/pages/command/[ID]";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { modalShow } from "@/store/actions/modal";
import { accessCommand } from "@/store/actions/command";
import { DeleteCommandProps } from "@/components/Modal/DeleteCommand";
import { ChangeCommandProps } from "@/components/Modal/ChangeCommand";
import { JoinCommandProps } from "@/components/Modal/JoinCommand";
import { RequestList } from "../RequestList";
import { ICommand } from "@/types/command";
import {
  Wrapper,
  Main,
  Bottom,
  Title,
  SubTitle,
  Change,
  ButtonsWrapper,
  RequestBtn,
  Inner,
} from "./styles";
import { ExitCommandProps } from "@/components/Modal/ExitCommand";

const renderButtons = (data: ICommand) => {
  const dispatch = useDispatch();
  const { push, query } = useRouter();

  const handleDelete = () => {
    if (data) {
      dispatch(
        modalShow<DeleteCommandProps>("DELETE_COMMAND", { id: data.info.id })
      );
    }
  };

  const handleChange = () => {
    if (data) {
      dispatch(
        modalShow<ChangeCommandProps>("CHANGE_COMMAND", {
          id: data.info.id,
          command: data,
        })
      );
    }
  };

  const handleJoin = () => {
    if (data) {
      dispatch(
        modalShow<JoinCommandProps>("JOIN_COMMAND", {
          id: data.info.id,
        })
      );
    }
  };

  const handleAccess = () => {
    if (data) {
      dispatch(accessCommand(data.info.id));
    }
  };

  const handleExit = () => {
    if (data) {
      dispatch(
        modalShow<ExitCommandProps>("EXIT_COMMAND", {
          commandId: data.info.id,
          membershipId: data.membership_id,
        })
      );
    }
  };

  const handleChat = () => {
    if (data) {
      push({ pathname: "/im", query: { id: data.chat_id } }, undefined, {
        shallow: true,
      });
    }
  };

  const handleTask = () => {
    push({ pathname: `/command/${query.ID}/task` }, undefined, {
      shallow: true,
    });
  };

  return (
    <ButtonsWrapper>
      {data.is_initiator ? (
        <>
          <Button width="100%" myType="outline" onClick={handleChange}>
            Редактировать
          </Button>
          <Button width="100%" myType="outline" onClick={handleTask}>
            План команды
          </Button>
          <Button width="100%" myType="outline" onClick={handleChat}>
            Перейти к диалогу команды
          </Button>
          <Button width="100%" myType="outline" onClick={handleDelete}>
            Распустить команду
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={handleJoin}
            width="100%"
            myType="outline"
            disabled={data.is_sent_join || data.joined}
          >
            {data.joined
              ? "Вы участник"
              : data.is_sent_join
              ? "Заявка на добавление отправлена"
              : "Вступить"}
          </Button>
          <Button
            onClick={handleAccess}
            width="100%"
            myType="outline"
            disabled={data.is_sent_access || data.joined}
          >
            {data.joined
              ? "У вас есть доступ к документам"
              : data.is_sent_access
              ? "Заявка на доступ к документам отправлена"
              : "Запросить доступ к документам"}
          </Button>
          {data.joined && (
            <>
              <Button width="100%" myType="outline" onClick={handleTask}>
                План команды
              </Button>
              <Button width="100%" myType="outline" onClick={handleChat}>
                Перейти к диалогу команды
              </Button>
              <Button width="100%" myType="outline" onClick={handleExit}>
                Покинуть команду
              </Button>
            </>
          )}
        </>
      )}
    </ButtonsWrapper>
  );
};

const CommandInfoComponent = () => {
  const { command } = useContext(CommandContext) as CommandProps;
  const { query } = useRouter();
  const [isShowReq, setIsShowReq] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleShowReq = () => {
    setIsShowReq((req) => !req);
  };

  const handleClose = useCallback(() => {
    setIsShowReq(false);
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  }, [isShowReq, setIsShowReq]);

  const { data, error } = useSWR(`/api/command/${query.ID}/`, {
    initialData: command,
  });

  if (error) {
    return (
      <Wrapper>
        <ErrorMessage message="Ошибка загрузки информации о команде" />
      </Wrapper>
    );
  }

  if (!data) {
    return (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        {data.is_initiator && (
          <RequestBtn onClick={handleShowReq} disabled={disabled}>
            <img src="/request.svg" alt="Запросы команды" />
            {isShowReq && <RequestList onClose={handleClose} />}
          </RequestBtn>
        )}
        <Main>
          <Inner>
            <Avatar size={80} />
            <Title>{data.name}</Title>
            <SubTitle>
              Участников: <span>{data.num_members}</span>
            </SubTitle>
          </Inner>
          <Rating defaultRate={data.rate ?? "0"} disabled />
        </Main>
        <Bottom>{renderButtons(data)}</Bottom>
      </Wrapper>
    );
  }
};

export const CommandInfo = memo(CommandInfoComponent);
