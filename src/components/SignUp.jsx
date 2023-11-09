import { TextField, Flex, Text, Button, Theme, Card } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { signupUser } from "../API/Apis";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      if (data.status === 200) {
        console.log('success bro!')
        queryClient.invalidateQueries(["registration"]);
        navigate(`/`);
      }
    },
    onError: (err) => {
      console.log(err.response.data);
      setErrorMsg(err.response.data.map(i => i + '. '));
    },
  });

  const onSubmit = () => {
    console.log(formData);
    mutate(formData);
  };

  return (
    <div>
      <Theme>
        <Card size="4" style={{ maxWidth: 275 }}>
          <Flex direction="column" gap="1" style={{ maxWidth: 275 }}>
            <Text align="center" mb="4" size="5" weight="bold">
              Create a new account
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
            <Text>{ errorMsg }</Text>
            <Button color="crimson" mt="4" onClick={() => onSubmit()}>
              Create Account
            </Button>
            <Text align="center" mt="2" as="span">
              Already have an account? <Link to="/login">Sign In</Link>
            </Text>
          </Flex>
        </Card>
      </Theme>
    </div>
  );
}

export default SignUp;
