import React, { memo } from "react";
import { Wrapper, Inner, Title } from "./styles";
import { object, string } from "yup";
import { Formik, Form, FormikProps } from "formik";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { User } from "@/types/user";

const validationSchema = object().shape({
  name: string()
    .min(3, "Слишком короткое название компанни")
    .max(50, "Слишком длинное название компании")
    .required("Введите имя"),
});

export interface CommandFormValues {
  name: string;
}

interface CommandFormProps {
  handleSubmit: (values: CommandFormValues) => void;
  initialValues?: User;
}

const CommandFormComponent: React.FC<CommandFormProps> = ({
  handleSubmit,
  initialValues,
}) => {
  return (
    <Wrapper>
      <Title>Создание команды</Title>
      <Formik
        initialValues={{
          name: initialValues?.name ?? "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          handleSubmit(values);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ dirty, isValid }: FormikProps<CommandFormValues>) => (
          <Form>
            <Inner>
              <Input type="text" name="name" placeholder="Название команды" />
              <Button
                myType="outline"
                type="submit"
                width="218px"
                disabled={!(dirty && isValid)}
              >
                Подтвердить
              </Button>
            </Inner>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export const CommandForm = memo(CommandFormComponent);
