import { TextField, Flex, Text, Button, Theme, Card } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../API/Apis";
import * as validator from "../../utility/validator";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [usernameValidationMsg, setUsernameValidationMsg] = useState('');
  const [passwordValidationMsg, setPasswordValidationMsg] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Sends signup form to backend
  const { mutate } = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      if (data.status === 200) {
        console.log('success bro!')
        queryClient.invalidateQueries(["registration"]);
        navigate(`/signup/confirm`);
      }
    },
    onError: (err) => {
      console.log(err.response.data);
      setErrorMsg(err.response.data);
    },
  });

  // Checks if form data is valid.
  // Sets validation messages for all invalid fields.
  const isValidFormData = () => {
    let validForm = true;

    if (!validator.validateUsername(formData.username)) {
      setUsernameValidationMsg(validator.usernameInvalidMessage);
      validForm = false;
    } else setUsernameValidationMsg('');

    if (!validator.validatePassword(formData.password)) {
      setPasswordValidationMsg(validator.passwordInvalidMessage);
      validForm = false;
    } else setPasswordValidationMsg('');

    return validForm;
  }

  const onSubmit = () => {
    setErrorMsg('');
    if (isValidFormData()) mutate(formData);
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
            <Text style={{ color: 'red' }}>{ usernameValidationMsg }</Text>
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
            <Text style={{ color: 'red' }}>{ passwordValidationMsg }</Text>
            <Text>{ errorMsg }</Text>
            <Button color="crimson" mt="4" onClick={() => onSubmit()}>
              Create Account
            </Button>
            <Text align="center" mt="2" as="span">
              Already have an account? <Link to="/login">Login</Link>
            </Text>
            <Text align="center" mt="2" as="span">
              <Link to="/ ">Back to home page</Link>
            </Text>
          </Flex>
        </Card>
      </Theme>
    </div>
  );
}

export default SignUp;
