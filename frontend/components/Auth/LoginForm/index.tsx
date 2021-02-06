import React, { memo } from "react";
import { Wrapper, ButtonWrapper, Title } from "./styles";
import { object, string } from "yup";
import { Formik, Form, FormikProps } from "formik";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";

const validationSchema = object().shape({
  email: string().email("Некорректный E-mail").required("Введите E-mail"),
  password: string().required("Введите пароль"),
});

export interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  handleSubmit: (values: LoginFormValues) => void;
}

const LoginFormComponent: React.FC<LoginFormProps> = ({ handleSubmit }) => {
  return (
    <Wrapper>
      <Title>Введите данные</Title>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          handleSubmit(values);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ dirty, isValid }: FormikProps<LoginFormValues>) => (
          <Form>
            <Input type="email" name="email" placeholder="E-mail" />
            <Input type="password" name="password" placeholder="Пароль" />
            <ButtonWrapper>
              <Button
                myType="blue"
                type="submit"
                width="218px"
                disabled={!(dirty && isValid)}
              >
                Войти
              </Button>
            </ButtonWrapper>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export const LoginForm = memo(LoginFormComponent);
