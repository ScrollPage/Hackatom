import { Button } from "@/components/UI/Button";
import { modalShow } from "@/store/actions/modal";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper } from "./styles";

const CommandAddComponent = () => {
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(modalShow<{}>("ADD_COMMAND", {}));
  };

  return (
    <Wrapper>
      <Button onClick={handleOpen} width="100%" myType="outline">
        Создать команду
      </Button>
    </Wrapper>
  );
};

export const CommandAdd = memo(CommandAddComponent);
