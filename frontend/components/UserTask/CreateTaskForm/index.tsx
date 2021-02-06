import React, { memo } from "react";
import { Wrapper, Inner, Col, PickerWrapper } from "./styles";
import { object, string } from "yup";
import { Formik, Form, FormikProps } from "formik";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import moment from "moment";
import { DatePicker } from "antd";
import { formatDate } from "@/utils/formatDate";
import { useDispatch } from "react-redux";
import { addUserTask } from "@/store/actions/task";

const { RangePicker } = DatePicker;

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
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Formik
        initialValues={{
          beginDate: formatDate(new Date()),
          endDate: getTomorrowDate(),
          description: "",
          name: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          dispatch(addUserTask(values));
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
