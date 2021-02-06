import { Button } from "@/components/UI/Button";
import { joinCommand } from "@/store/actions/command";
import { RoleType } from "@/types/roles";
import { Select } from "antd";
import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { Wrapper, Title } from "./styles";

const { Option } = Select;

export interface JoinCommandProps {
  id: number;
}

interface JoinCommand extends JoinCommandProps {
  setClose: () => void;
}

const JoinCommandComponent: React.FC<JoinCommand> = ({ setClose, id }) => {
  const dispatch = useDispatch();
  const [role, setRole] = useState<RoleType>("Стейкхолдер");

  const handleChange = (value: RoleType) => {
    setRole(value);
  };

  const onSubmit = () => {
    dispatch(joinCommand(role, id));
    setClose();
  };

  return (
    <Wrapper>
      <Title>Выберите роль в команде</Title>
      <Select
        value={role}
        style={{ width: 300, marginBottom: "34px" }}
        onChange={handleChange}
      >
        <Option value="Стейкхолдер">Стейкхолдер</Option>
        <Option value="Администратор">Администратор</Option>
        <Option value="Помощник">Помощник</Option>
        <Option value="Куратор">Куратор</Option>
        <Option value="Заказчик">Заказчик</Option>
      </Select>
      <Button onClick={onSubmit} width="218px" myType="outline">
        Отправить заявку
      </Button>
    </Wrapper>
  );
};

export const JoinCommand = memo(JoinCommandComponent);
