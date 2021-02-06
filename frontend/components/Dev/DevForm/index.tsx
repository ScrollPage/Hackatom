import React, { memo, useMemo } from "react";
import { Wrapper, Inner, Text, Title, Small, FakeLink } from "./styles";
import { object, string } from "yup";
import { Formik, Form } from "formik";
import { Button } from "@/components/UI/Button";
import { useRouter } from "next/router";
import { getAsString } from "@/utils/getAsString";
import { IDev } from "@/types/dev";
import { TextArea } from "@/components/UI/TextArea";
import { useDispatch } from "react-redux";
import { authChangeDev } from "@/store/actions/auth";
import { useUser } from "@/hooks/useUser";
import { devList } from "@/utils/devList";

interface DevFormProps {
  initialValues: IDev;
}

const DevFormComponent: React.FC<DevFormProps> = ({ initialValues }) => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { userId } = useUser();

  const stage = useMemo(() => {
    return getAsString(query.stage);
  }, [query]);

  if (!stage) {
    return null;
  }

  const validationSchema = object().shape({
    [stage]: string()
      .min(50, "Слишком короткое описание этапа (> 50 символов)")
      .max(2000, "Слишком длинное описание этапа (> 2000 символов)")
      .required("Введите описание этапа"),
  });

  const initialValue = useMemo(() => {
    const obj = Object.keys(initialValues).find((value) => value === stage);
    if (!obj) {
      return "";
    } else {
      // @ts-ignore
      return initialValues[obj];
    }
  }, [stage, initialValues]);

  const renderInfo = useMemo(() => {
    const nameObj = devList.find((item) => item.eng === stage);
    if (!nameObj) {
      return devList[0];
    }
    return nameObj;
  }, [stage, devList]);

  console.log(userId, query.ID);

  if (userId != query.ID) {
    return (
      <Wrapper>
        <Title>{renderInfo.name}</Title>
        <Text>{initialValue}</Text>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Formik
          enableReinitialize={true}
          initialValues={{
            [stage]: initialValue ?? "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            dispatch(authChangeDev(stage, values[stage]));
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ dirty, isValid }) => (
            <Form>
              <Title>{renderInfo.name}</Title>
              <Text>{renderInfo.subtitle}</Text>
              <Inner>
                <TextArea
                  minHeight="100px"
                  maxHeight="300px"
                  name={stage}
                  placeholder="Введите описание этапа"
                />
                <Small>{renderInfo.small}</Small>
                <FakeLink>{renderInfo.link}</FakeLink>
                <Button myType="outline" width="218px">
                  Добавить документ
                </Button>
                <Button
                  myType="outline"
                  type="submit"
                  width="218px"
                  disabled={!(dirty && isValid)}
                >
                  Сохранить
                </Button>
              </Inner>
            </Form>
          )}
        </Formik>
      </Wrapper>
    );
  }
};

export const DevForm = memo(DevFormComponent);
