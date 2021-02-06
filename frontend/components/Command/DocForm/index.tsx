import React, { memo } from "react";
import { Wrapper, Inner, Title, DocInput } from "./styles";
import { Formik, Form, FormikProps } from "formik";
import { Button } from "@/components/UI/Button";
import { Select } from "antd";

const { Option } = Select;

export interface DocFormValues {
  role: string[];
  file: any;
}

interface DocFormProps {
  handleSubmit: (values: DocFormValues) => void;
}

const DocFormComponent: React.FC<DocFormProps> = ({ handleSubmit }) => {
  return (
    <Wrapper>
      <Title>Загрузка документа</Title>
      <Formik
        initialValues={{
          role: ["Администратор"],
          file: null,
        }}
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
        }: FormikProps<DocFormValues>) => (
          <Form>
            <Inner>
              <DocInput
                id="file"
                name="file"
                type="file"
                onChange={(event) => {
                  // @ts-ignore
                  setFieldValue("file", event.currentTarget.files[0]);
                }}
              />
              <Select
                mode="multiple"
                size="large"
                value={values.role}
                style={{ width: 300, marginBottom: "34px" }}
                onChange={(value) => {
                  setFieldValue("role", value);
                }}
                placeholder="Предназначен для..."
              >
                <Option value="Стейкхолдер">Стейкхолдер</Option>
                <Option value="Администратор">Администратор</Option>
                <Option value="Помощник">Помощник</Option>
                <Option value="Куратор">Куратор</Option>
                <Option value="Заказчик">Заказчик</Option>
              </Select>
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

export const DocForm = memo(DocFormComponent);
