import { IForm } from "@/pages/home/components/search/hooks";
import { ErrorMessage } from "@hookform/error-message";
import { ReactNode } from "react";
import { FieldErrors, ValidateResult } from "react-hook-form";

const HTMLError: (type: string, message: ValidateResult) => ReactNode = (
  type: string,
  message: ValidateResult
) => {
  return (
    <small
      className="error-msg"
      key={type}
    >
      {message}
    </small>
  );
};

export const ErrorMessageCustom = (
  errors: FieldErrors<IForm>,
  name: keyof IForm
) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ messages }) => {
        return messages
          ? Object.entries(messages).map(
              ([type, message]: [string, ValidateResult]) =>
                HTMLError(type, message)
            )
          : null;
      }}
    />
  );
};
