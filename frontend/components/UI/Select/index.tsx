import React, { memo, useMemo } from "react";
import { Wrapper } from "./styles";
import { Select as AntdSelect } from "antd";
import { IOption } from "@/types/option";
import useSWR from "swr";

const { Option } = AntdSelect;

const renderOptions = (options: IOption[]) => {
  return options.map((option) => {
    return (
      <Option key={`categoryOption__key__${option.id}`} value={option.id}>
        {option.name}
      </Option>
    );
  });
};

interface SelectProps {
  onChange: (field: string, value: any, shouldValidate?: boolean) => void;
  name: string;
  placeholder: string;
  value: number[];
  width?: string;
}

const SelectComponent: React.FC<SelectProps> = ({
  onChange,
  name,
  placeholder,
  value,
  width,
}) => {
  const apiLink = useMemo(() => {
    if (name === "categories") {
      return "/api/category/";
    }
    if (name === "requirenments") {
      return "/api/requirenment/";
    }
    return null;
  }, [name]);

  const { error, data } = useSWR<IOption[]>(apiLink);

  const options = useMemo(() => (!error && data ? data : []), [data, error]);

  const handleChange = (value: number[]) => {
    onChange(name, value);
  };

  return (
    <Wrapper width={width}>
      <AntdSelect
        optionFilterProp="children"
        mode="multiple"
        size="large"
        allowClear
        style={{ width: "100%" }}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      >
        {renderOptions(options)}
      </AntdSelect>
    </Wrapper>
  );
};

export const Select = memo(SelectComponent);
