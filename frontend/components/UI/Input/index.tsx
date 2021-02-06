import { useField } from "formik";
import React, { memo } from "react";
import { InputHTMLAttributes } from "react";
import { Wrapper, Inner, Error } from "./styles";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  width?: string;
};

const InputComponent: React.FC<InputProps> = (props) => {
  const [field, meta] = useField(props);
  const isShowError = meta.touched && !!meta.error;
  return (
    <Wrapper width={props?.width}>
      <Inner {...field} {...props} isShowError={isShowError} />
      {isShowError && <Error data-testid="error">{meta.error}</Error>}
    </Wrapper>
  );
};

export const Input = memo(InputComponent);
