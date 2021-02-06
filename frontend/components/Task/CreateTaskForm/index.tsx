import React, { memo, useContext } from "react";
import { Wrapper, Inner, Col, SelectWrapper, PickerWrapper } from "./styles";
import { object, string } from "yup";
import { Formik, Form, FormikProps, useField, useFormikContext } from "formik";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import moment from "moment";
import { DatePicker, Select } from "antd";
import { formatDate } from "@/utils/formatDate";
import { useUser } from "@/hooks/useUser";
import useSWR from "swr";
import { useRouter } from "next/router";
import { TaskContext, TaskProps } from "@/pages/command/[ID]/task";
import { useDispatch } from "react-redux";
import { addTask } from "@/store/actions/task";

const { RangePicker } = DatePicker;
const { Option } = Select;

const dateFormat = "YYYY-MM-DD";

const validationSchema = object().shape({
  name: string()
    .min(3, "Слишком короткое задача")
    .max(50, "Слишком длинная задача")
    .required("Введите задачу"),
  description: string()
    .min(3, "Слишком короткое описание")
    .max(400, "Слишком длинное описание")
    .required("Введите описание"),
});

export interface CreateTaskFormValues {
  beginDate: string;
  endDate: string;
  description: string;
  initiativeId: number;
  name: string;
}

const getTomorrowDate = () => {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  return formatDate(date);
};

function disabledDate(current: any) {
  return current && current < moment().endOf("day");
}

interface CreateTaskFormProps {}

const CreateTaskFormComponent: React.FC<CreateTaskFormProps> = ({}) => {
  const { userId } = useUser();
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Formik
        initialValues={{
          beginDate: formatDate(new Date()),
          endDate: getTomorrowDate(),
          description: "",
          initiativeId: Number(userId),
          name: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          dispatch(addTask(values));
          setSubmitting(false);
          resetForm();
        }}
      >
        {({
          dirty,
          isValid,
          setFieldValue,
          values,
        }: FormikProps<CreateTaskFormValues>) => {
          function dataChange(date: any, dateString: [string, string]) {
            setFieldValue("beginDate", dateString[0]);
            setFieldValue("endDate", dateString[1]);
          }
          return (
            <Form>
              <Inner>
                <Col>
                  <Input type="text" name="name" placeholder="Задача" />
                  <Input
                    type="text"
                    name="description"
                    placeholder="Описание"
                  />
                </Col>
                <Col>
                  <InitiativeSelect
                    initiativeId={values.initiativeId}
                    name="initiativeId"
                  />
                </Col>
                <Col>
                  <PickerWrapper>
                    <RangePicker
                      disabledDate={disabledDate}
                      value={[
                        moment(values.beginDate, dateFormat),
                        moment(values.endDate, dateFormat),
                      ]}
                      format={dateFormat}
                      onChange={dataChange}
                    />
                  </PickerWrapper>

                  <Button
                    myType="outline"
                    type="submit"
                    width="218px"
                    disabled={!(dirty && isValid)}
                  >
                    Добавить задачу
                  </Button>
                </Col>
              </Inner>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export const CreateTaskForm = memo(CreateTaskFormComponent);

interface InitiativeSelectProps {
  initiativeId: number;
  name: string;
}

const InitiativeSelect: React.FC<InitiativeSelectProps> = ({
  initiativeId,
  ...props
}) => {
  const { roles } = useContext(TaskContext) as TaskProps;
  const { setFieldValue } = useFormikContext();
  const [field] = useField({
    name: props.name,
  });

  const { query } = useRouter();
  const pageCommandId = query.ID;

  const { error, data } = useSWR(`/api/command/${pageCommandId}/members/`, {
    initialData: roles,
  });

  const rolesData = !error && data ? data : [];

  return (
    <SelectWrapper>
      <Select
        {...field}
        {...props}
        onChange={(value) => setFieldValue("initiativeId", value)}
        optionFilterProp="children"
        showSearch
        placeholder="Задача"
      >
        {rolesData.map((role) => (
          <Option
            key={`initiativeIdItem__key__${role.initiative.id}`}
            value={role.initiative.id}
          >
            {role.initiative.company}
          </Option>
        ))}
      </Select>
    </SelectWrapper>
  );
};
