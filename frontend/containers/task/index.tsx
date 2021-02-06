import { Button } from "@/components/UI/Button";
import { Gant } from "@/components/Task/Gant";
import { TaskMain } from "@/components/Task/TaskMain";
import { useRouter } from "next/router";
import React from "react";
import { Wrapper } from "./styles";

export interface TaskContainerProps {}

export const TaskContainer: React.FC<TaskContainerProps> = ({}) => {
  const { push, query } = useRouter();

  const handleTask = () => {
    push({ pathname: `/command/${query.ID}` }, undefined, {
      shallow: true,
    });
  };

  return (
    <Wrapper>
      <Button onClick={handleTask} width="218px" myType="outline">
        Назад
      </Button>
      <Gant />
      <TaskMain />
    </Wrapper>
  );
};
