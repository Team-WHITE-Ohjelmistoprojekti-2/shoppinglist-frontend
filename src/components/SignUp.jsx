import { TextField, Flex, Text, Button, Theme, Card } from "@radix-ui/themes";

function SignUp() {
  return (
    <div>
      <Theme>
        <Card size="4" style={{ maxWidth: 400 }}>
          <Flex direction="column" gap="1" style={{ maxWidth: 400 }}>
            <Text as="div" align="left" size="2" weight="bold">
              Username
            </Text>
            <TextField.Input size="2" placeholder="" />
            <Text as="div" align="left" size="2" weight="bold">
              Password
            </Text>
            <TextField.Input size="2" placeholder="" type="password" />
            <Text as="div" align="left" size="2" weight="bold">
              Confirm Password
            </Text>
            <TextField.Input size="2" placeholder="" type="password" />
            <Button mt="4">Sign up</Button>
          </Flex>
        </Card>
      </Theme>
    </div>
  );
}

export default SignUp;
