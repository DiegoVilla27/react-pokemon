import { IForm } from "@/pages/home/components/search/hooks";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessageCustom } from "../error-message";

interface IProps {
  classes: string;
  name: keyof IForm;
  type: string;
  placeholder: string;
  errors: FieldErrors<IForm>;
  register: UseFormRegister<IForm>;
  label?: string;
}

export const Input = (props: IProps) => {
  const { classes, label, name, type, placeholder, errors, register } = props;

  return (
    <div className={classes}>
      {label ? <label>{label}</label> : null}
      <input
        className={errors["query"] ? "input-error" : ""}
        placeholder={placeholder}
        type={type}
        {...register(name)}
      />
      {ErrorMessageCustom(errors, name)}
    </div>
  );
};
