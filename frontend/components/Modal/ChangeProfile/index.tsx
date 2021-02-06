import { ChangeForm, ChangeFormValues } from "@/components/Auth/ChangeForm";
import { authChange, authChangeInfo } from "@/store/actions/auth";
import { User } from "@/types/user";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper } from "./styles";

export interface ChangeProfileProps {
  user: User;
}

interface IChangeProfile extends ChangeProfileProps {
  setClose: () => void;
}

const ChangeProfileComponent: React.FC<IChangeProfile> = ({
  setClose,
  user,
}) => {
  const dispatch = useDispatch();

  const onSubmit = (values: ChangeFormValues) => {
    dispatch(authChange(values));
    if (values.description || values.categories || values.requirenments) {
      dispatch(authChangeInfo(values));
    }
    setClose();
  };

  return (
    <Wrapper>
      <ChangeForm initialValues={user} handleSubmit={onSubmit} />
    </Wrapper>
  );
};

export const ChangeProfile = memo(ChangeProfileComponent);
