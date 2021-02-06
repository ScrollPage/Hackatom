import { memo } from "react";
import { SLoadingSpinner } from "./styles";

const LoadingSpinnerComponent = (props: any) => <SLoadingSpinner {...props} />;

export const LoadingSpinner = memo(LoadingSpinnerComponent);
