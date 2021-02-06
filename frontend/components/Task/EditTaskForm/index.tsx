import React, { memo, useContext } from "react";
import { Wrapper, Inner, SelectWrapper } from "./styles";
import { object, string } from "yup";
import { Formik, Form, FormikProps, useField, useFormikContext } from "formik";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { Select } from "antd";
import useSWR from "swr";
import { useRouter } from "next/router";
import { TaskContext, TaskProps } from "@/pages/command/[ID]/task";
import { useDispatch } from "react-redux";
import { getAsString } from "@/utils/getAsString";
import { editTask } from "@/store/actions/task";

const { Option } = Select;

const validationSchema = object().shape({
  name: string().required("Введите задачу"),
});

export interface EditTaskFormValues {
  name: string;
  percentage: string;
}

interface EditTaskFormProps {}

const EditTaskFormComponent: React.FC<EditTaskFormProps> = ({}) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Formik
        initialValues={{
          name: "",
          percentage: "0",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          dispatch(editTask(values));
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ dirty, isValid }: FormikProps<EditTaskFormValues>) => {
          return (
            <Form>
              <Inner>
                <InitiativeSelect name="name" />
                <Input
                  type="text"
                  name="percentage"
                  placeholder="Процент от 0 до 100"
                />
                <Button
                  myType="outline"
                  type="submit"
                  width="218px"
                  disabled={!(dirty && isValid)}
                >
                  Изменить задачу
                </Button>
              </Inner>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export const EditTaskForm = memo(EditTaskFormComponent);

interface InitiativeSelectProps {
  name: string;
}

const InitiativeSelect: React.FC<InitiativeSelectProps> = ({ ...props }) => {
  const { tasks } = useContext(TaskContext) as TaskProps;
  const { setFieldValue } = useFormikContext();
  const [field] = useField({
    name: props.name,
  });

  const { query } = useRouter();
  const commandId = getAsString(query.ID);

  const { error, data } = useSWR(`/api/command/${commandId}/diagram/`, {
    initialData: tasks,
  });

  const tasksData = !error && data ? data.tasks : [];

  return (
    <SelectWrapper>
      <Select
        {...field}
        {...props}
        onChange={(value) => setFieldValue("name", value)}
        optionFilterProp="children"
        showSearch
        placeholder="Задача"
      >
        {tasksData.map((task) => (
          <Option key={`taskItem__key__${task.id}`} value={task.id}>
            {task.name}
          </Option>
        ))}
      </Select>
    </SelectWrapper>
  );
};
