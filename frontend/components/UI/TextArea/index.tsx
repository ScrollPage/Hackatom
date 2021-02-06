import { useField } from "formik";
import React, { memo, TextareaHTMLAttributes } from "react";
import { Wrapper, Inner, Error } from "./styles";

type InputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  width?: string;
  minHeight?: string;
  maxHeight?: string;
};

const TextAreaComponent: React.FC<InputProps> = ({
  width,
  minHeight = "50px",
  maxHeight = "300px",
  ...props
}) => {
  const [field, meta] = useField(props);
  const isShowError = meta.touched && !!meta.error;

  return (
    <Wrapper>
      <Inner
        min={minHeight}
        max={maxHeight}
        {...field}
        {...props}
        isShowError={isShowError}
        rows={1}
      />
      {isShowError && <Error>{meta.error}</Error>}
    </Wrapper>
  );
};

export const TextArea = memo(TextAreaComponent);
