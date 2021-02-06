import React, { memo } from "react";
import { Formik, Form, FormikProps } from "formik";
import { Wrapper, Inner, Button } from "./styles";
import { TextArea } from "../TextArea";
import { Upload, Button as AntdButton } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { show } from "@/store/actions/alert";

export interface ChatAddFormValues {
  text: string;
  file: Array<any>;
}

interface ChatAddProps {
  onSubmit: (text: string, file: any) => void;
}

const ChatAddComponent = ({ onSubmit }: ChatAddProps) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Formik
        initialValues={{
          text: "",
          file: [],
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          onSubmit(values.text, values.file);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ setFieldValue }: FormikProps<ChatAddFormValues>) => (
          <Form>
            <Inner>
              <Upload
                name="file"
                multiple={false}
                onRemove={(info) => setFieldValue("file", [])}
                beforeUpload={(info) => {
                  setFieldValue("file", [info]);
                  return false;
                }}
                showUploadList={false}
                onChange={(info: any) => {
                  if (info.file.status !== "uploading") {
                    console.log(info.file, info.fileList);
                  }
                  if (info.file.status === "done") {
                    dispatch(show("Файл успешно загружен!", "success"));
                    setFieldValue("file", info);
                  } else if (info.file.status === "error") {
                    dispatch(show("Ошибка при загрузке файла!", "warning"));
                  }
                }}
              >
                <AntdButton icon={<UploadOutlined />} size="large" />
              </Upload>
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

export const ChatAdd = memo(ChatAddComponent);
