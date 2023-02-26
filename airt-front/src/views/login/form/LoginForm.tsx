import { StatusCodes } from "@/constants/status-codes";
import { useFormResolver } from "@/hooks/use-form-resolver";
import { Routes } from "@/routes";
import { useLogin } from "@/views/login/hooks/use-login";
import {
  Box,
  Button,
  createStyles,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { LoginFormSchema, loginFormSchema } from "./schema";

const useStyles = createStyles((theme) => ({
  wrapper: {
    flexDirection: "column",
    border: "1px solid",
    borderColor: theme.colors.gray[3],
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    minWidth: "clamp(300px, 40%, 100%)",
  },
  link: {
    marginTop: theme.spacing.md,
    color: theme.colors.gray[4],
    textAlign: "center",
    display: "block",
  },
}));

export const LoginForm = () => {
  const { classes } = useStyles();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useFormResolver<LoginFormSchema>(loginFormSchema);

  const { login } = useLogin({
    onError: (message, status) =>
      setError(status === StatusCodes.BAD_REQUEST ? "email" : "password", {
        message,
      }),
    redirectTo: Routes.Home,
  });

  const onSubmit = handleSubmit(login);

  return (
    <Box
      component="form"
      display={"flex"}
      onSubmit={onSubmit}
      className={classes.wrapper}
    >
      <Title align="center" size={"h2"} mb={"lg"}>
        Welcome back
      </Title>

      <TextInput
        error={errors.email?.message}
        {...register("email")}
        label="E-mail"
      />

      <PasswordInput
        error={errors.password?.message}
        {...register("password")}
        mt={"sm"}
        label="Password"
      />

      <Button
        loading={isSubmitting}
        disabled={!isValid}
        type="submit"
        mt={"xl"}
      >
        Sign in
      </Button>

      <Link href={Routes.Register} passHref className={classes.link}>
        Forgot password?
      </Link>
    </Box>
  );
};
