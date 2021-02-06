import React, { memo, useState } from "react";
import { CreateTaskForm } from "../CreateTaskForm";
import { EditTaskForm } from "../EditTaskForm";
import { Wrapper, Header, HeaderItem, Main, Title } from "./styles";

const TaskMainComponent = () => {
  const [isShow, setIsShow] = useState<"add" | "edit">("add");

  const handleShow = (variant: "add" | "edit") => {
    setIsShow(variant);
  };

  return (
    <Wrapper>
      <Header>
        <HeaderItem
          onClick={() => handleShow("add")}
          isActive={isShow === "add"}
        >
          <Title>Добавить задачу</Title>
        </HeaderItem>
        <HeaderItem
          onClick={() => handleShow("edit")}
          isActive={isShow === "edit"}
        >
          <Title>Редактировать задачу</Title>
        </HeaderItem>
      </Header>
      <Main>{isShow === "add" ? <CreateTaskForm /> : <EditTaskForm />}</Main>
    </Wrapper>
  );
};

export const TaskMain = memo(TaskMainComponent);
