import React, { memo } from "react";
import { Wrapper, ButtonWrapper, Title } from "./styles";
import { object, string, ref } from "yup";
import { Formik, Form, FormikProps } from "formik";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { Select } from "antd";

const { Option } = Select;

const validationSchema = object().shape({
  company: string()
    .min(3, "Слишком короткое предприятие")
    .max(50, "Слишком длинное предприятие")
    .required("Введите предприятие"),
  name: string()
    .min(3, "Слишком короткое название инициативы")
    .max(50, "Слишком длинное название инициативы")
    .required("Введите название"),
  firstName: string()
    .min(3, "Слишком короткое имя")
    .max(50, "Слишком длинное имя")
    .required("Введите имя"),
  lastName: string()
    .min(3, "Слишком короткая фамилиия")
    .max(50, "Слишком длинное фамилия")
    .required("Введите фамилию"),
  email: string().email("Некорректный E-mail").required("Введите E-mail"),
  phone: string()
    .min(11, "Слишком короткий номер")
    .max(11, "Слишком длинный номер")
    .required("Введите номер телефона"),
  password: string()
    .matches(
      // @ts-ignore: Unreachable code error
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})",
      "Слишком легкий пароль"
    )
    .required("Введите пароль"),
});

export interface RegisterFormValues {
  company: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: "1" | "2" | "3";
}

interface RegisterFormProps {
  handleSubmit: (values: RegisterFormValues) => void;
}

const RegisterFormComponent: React.FC<RegisterFormProps> = ({
  handleSubmit,
}) => {
  return (
    <Wrapper>
      <Title>Введите данные</Title>
      <Formik
        initialValues={{
          company: "",
          name: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          role: "3",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          handleSubmit(values);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({
          values,
          dirty,
          isValid,
          setFieldValue,
        }: FormikProps<RegisterFormValues>) => (
          <Form>
            <Input type="text" name="name" placeholder="Название" />
            <Input type="text" name="company" placeholder="Предприятие" />
            <Input type="text" name="firstName" placeholder="Имя" />
            <Input type="text" name="lastName" placeholder="Фамилия" />
            <Input type="email" name="email" placeholder="E-mail" />
            <Input type="tel" name="phone" placeholder="Номер телефона" />
            <Input type="password" name="password" placeholder="Пароль" />
            <Select
              value={values.role}
              style={{ width: 300, marginBottom: "21px" }}
              onChange={(value) => setFieldValue("role", value)}
            >
              <Option value="1">Я стейкхолдер</Option>
              <Option value="2">Я заказчик</Option>
              <Option value="3">Я бизнец-инициатива</Option>
            </Select>
            <ButtonWrapper>
              <Button
                myType="blue"
                type="submit"
                width="218px"
                disabled={!(dirty && isValid)}
              >
                Зарегистрироваться
              </Button>
            </ButtonWrapper>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export const RegisterForm = memo(RegisterFormComponent);
