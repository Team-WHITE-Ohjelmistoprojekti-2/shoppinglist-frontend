import { TextField, Flex, Text, Button, Theme, Card } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../API/Apis";
import PropTypes from 'prop-types';

function Login({ setAuthenticated }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Sends login form to backend
  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (result) => {
      const jwtToken = result.headers.authorization;
      if (jwtToken !== null) {
        sessionStorage.setItem("jwt", jwtToken);
        setAuthenticated(true);

        console.log('success bro!')
        queryClient.invalidateQueries(["registration"]);
        navigate(`/`);
        return
      }

      setErrorMsg("Failed to login");
    },
    onError: (err) => {
      console.log(err.response.data);
      setErrorMsg(`Failed to login: ${err.response.data}`);
    },
  });

  const handleLogin = () => {
    mutate(formData);
  }

  return (
    <div>
      <Theme>
        <Card size="4" style={{ maxWidth: 275 }}>
          <Flex direction="column" gap="1" style={{ maxWidth: 275 }}>
            <Text align="center" mb="4" size="5" weight="bold">
              Login to your account
            </Text>
            <Text align="left" size="2" weight="bold">
              Username
            </Text>
            <TextField.Input
              size="2"
              placeholder=""
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <Text align="left" size="2" weight="bold">
              Password
            </Text>
            <TextField.Input
              size="2"
              placeholder=""
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <Text>{errorMsg}</Text>
            <Button color="crimson" mt="4" onClick={() => handleLogin()}>
              Login
            </Button>
            <Text align="center" mt="2" as="span">
              No account? <Link to="/signup">Create Account</Link>
            </Text>
          </Flex>
        </Card>
      </Theme>
    </div>
  );
}

Login.propTypes = {
  setAuthenticated: PropTypes.func.isRequired
}

export default Login;