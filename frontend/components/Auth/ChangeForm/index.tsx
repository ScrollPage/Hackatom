import React, { memo, useCallback } from "react";
import { Wrapper, Inner, Title } from "./styles";
import { object, string } from "yup";
import { Formik, Form, FormikProps } from "formik";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { User } from "@/types/user";
import { Select } from "@/components/UI/Select";
import { IOption } from "@/types/option";

const validationSchema = object().shape({
  company: string()
    .min(3, "Слишком короткое название компанни")
    .max(50, "Слишком длинное название компании")
    .required("Введите имя"),
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
});

export interface ChangeFormValues {
  company: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  name: string;
  description: string;
  categories: number[];
  requirenments: number[];
}

interface ChangeFormProps {
  handleSubmit: (values: ChangeFormValues) => void;
  initialValues?: User;
}

const ChangeFormComponent: React.FC<ChangeFormProps> = ({
  handleSubmit,
  initialValues,
}) => {
  const format = useCallback(
    (options?: IOption[]) => {
      return options?.map((option) => {
        return option.id;
      });
    },
    [initialValues]
  );

  return (
    <Wrapper>
      <Title>Дополните / Смените данные о себе</Title>
      <Formik
        initialValues={{
          company: initialValues?.company ?? "",
          firstName: initialValues?.first_name ?? "",
          lastName: initialValues?.last_name ?? "",
          email: initialValues?.email ?? "",
          phone: initialValues?.phone_number ?? "",
          name: initialValues?.name ?? "",
          description: initialValues?.info?.description ?? "",
          categories: format(initialValues?.info?.categories) ?? [],
          requirenments: format(initialValues?.info?.requirenments) ?? [],
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
          dirty,
          isValid,
          setFieldValue,
          values,
        }: FormikProps<ChangeFormValues>) => {
          return (
            <Form>
              <Inner>
                <Input type="text" name="name" placeholder="Название" />
                <Input type="text" name="company" placeholder="Предприятие" />
                <Input type="text" name="firstName" placeholder="Имя" />
                <Input type="text" name="lastName" placeholder="Фамилия" />
                <Input type="email" name="email" placeholder="E-mail" />
                <Input type="tel" name="phone" placeholder="Номер телефона" />
                <Input type="text" name="description" placeholder="Описание" />
                <Select
                  name="categories"
                  placeholder="Категории"
                  value={values.categories}
                  onChange={setFieldValue}
                />
                <Select
                  name="requirenments"
                  placeholder="Потребности"
                  value={values.requirenments}
                  onChange={setFieldValue}
                />
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
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export const ChangeForm = memo(ChangeFormComponent);
