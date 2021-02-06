import { memo } from "react";
import { Wrapper } from "./styles";

const ButtonComponent = (props: any) => <Wrapper {...props} />;

export const Button = memo(ButtonComponent);
