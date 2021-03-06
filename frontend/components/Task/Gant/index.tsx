import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { TaskContext, TaskProps } from "@/pages/command/[ID]/task";
import { ITask } from "@/types/task";
import { getAsString } from "@/utils/getAsString";
import { useRouter } from "next/router";
import React, { memo, useContext } from "react";
import Chart from "react-google-charts";
import useSWR from "swr";
import { Wrapper } from "./styles";

interface GantProps {}

const format = (task: ITask) => {
  return [
    String(task.id),
    task.name,
    task.initiative.company,
    new Date(task.begin_time),
    new Date(task.end_time),
    null,
    task.percentage,
    null,
  ];
};

const GantComponent = ({}: GantProps) => {
  const { tasks } = useContext(TaskContext) as TaskProps;
  const { query } = useRouter();
  const commandId = getAsString(query.ID);

  const { error, data } = useSWR(`/api/command/${commandId}/diagram/`, {
    initialData: tasks,
  });

  return (
    <Wrapper>
      {error ? (
        <ErrorMessage message="Ошибка загрузки задач" />
      ) : !data ? (
        <LoadingSpinner />
      ) : data?.tasks.length === 0 ? (
        <EmptyMessage message="В вашей команде нет задач" />
      ) : (
        <Chart
          width={"100%"}
          height={"100%"}
          chartType="Gantt"
          loader={<LoadingSpinner />}
          data={[
            [
              { type: "string", label: "Id" },
              { type: "string", label: "Задача" },
              { type: "string", label: "Исполнитель" },
              { type: "date", label: "Начальная дата" },
              { type: "date", label: "Конечная дата" },
              { type: "number", label: "Длительность" },
              { type: "number", label: "Процент выполнения" },
              { type: "string", label: "Взимодействие" },
            ],
            ...data.tasks.map((task) => format(task)),
          ]}
          rootProps={{ "data-testid": "1" }}
        />
      )}
    </Wrapper>
  );
};

export const Gant = memo(GantComponent);
