import { TextField, Flex, Text, Button, Theme, Card } from "@radix-ui/themes";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div>
      <Theme>
        <Card size="4" style={{ maxWidth: 275 }}>
          <Flex direction="column" gap="1" style={{ maxWidth: 275 }}>
            <Text align="center" mb="4" size="5" weight="bold">Create a new account</Text>
            <Text align="left" size="2" weight="bold">
              Username
            </Text>
            <TextField.Input size="2" placeholder="" />
            <Text align="left" size="2" weight="bold">
              Password
            </Text>
            <TextField.Input size="2" placeholder="" type="password" />
            <Text>Maybe validation error here. For example: Username already taken</Text>
            <Button color="crimson" mt="4">Create Account</Button>
            <Text align="center" mt="2" as="span">Already have an account? <Link to="/login">Sign In</Link></Text>
          </Flex>
        </Card>
      </Theme>
    </div>
  );
}

export default SignUp;
