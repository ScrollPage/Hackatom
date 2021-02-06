import React, { memo } from "react";
import { Formik, Form, FormikProps } from "formik";
import { Wrapper, Inner, Button } from "./styles";
import { TextArea } from "../TextArea";

export interface MessageAddFormValues {
  text: string;
}

interface MessageAddProps {
  onSubmit: (text: string) => void;
}

const MessageAddComponent = ({ onSubmit }: MessageAddProps) => {
  return (
    <Wrapper>
      <Formik
        initialValues={{
          text: "",
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          onSubmit(values.text);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({}: FormikProps<MessageAddFormValues>) => (
          <Form>
            <Inner>
              <TextArea name="text" placeholder="Введите..." width="100%" />
              <Button type="submit">
                <img src="/enter.svg" alt="Submit" />
              </Button>
            </Inner>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export const MessageAdd = memo(MessageAddComponent);
