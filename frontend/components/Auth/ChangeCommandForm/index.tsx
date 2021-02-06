import React, { memo, useCallback } from "react";
import { Wrapper, Inner, Title } from "./styles";
import { object, string } from "yup";
import { Formik, Form, FormikProps } from "formik";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { ICommand } from "@/types/command";
import { IOption } from "@/types/option";
import { Select } from "@/components/UI/Select";

const validationSchema = object().shape({
  name: string()
    .min(3, "Слишком короткое название компанни")
    .max(50, "Слишком длинное название компании")
    .required("Введите имя"),
});

export interface ChangeCommandFormValues {
  name: string;
  idea: string;
  description: string;
  categories: number[];
  requirenments: number[];
}

interface ChangeCommandFormProps {
  handleSubmit: (values: ChangeCommandFormValues) => void;
  initialValues?: ICommand;
}

const ChangeCommandFormComponent: React.FC<ChangeCommandFormProps> = ({
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
      <Title>Изменение / Дополнение команды</Title>
      <Formik
        initialValues={{
          name: initialValues?.name ?? "",
          idea: initialValues?.info?.idea ?? "",
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
        }: FormikProps<ChangeCommandFormValues>) => (
          <Form>
            <Inner>
              <Input type="text" name="name" placeholder="Название команды" />
              <Input type="text" name="description" placeholder="Описание" />
              <Input type="text" name="idea" placeholder="Идея" />
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
        )}
      </Formik>
    </Wrapper>
  );
};

export const ChangeCommandForm = memo(ChangeCommandFormComponent);
