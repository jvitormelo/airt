import { LoginForm } from "@/views/login/form/LoginForm";
import { Button, Box, Flex } from "@mantine/core";
import { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <Box h={"100vh"}>
      <Flex justify="center" align="center" h="100%" direction="column">
        <LoginForm />

        <Button variant="subtle" mt={"md"}>
          Create an account{" "}
        </Button>
      </Flex>
    </Box>
  );
};
export default Login;
