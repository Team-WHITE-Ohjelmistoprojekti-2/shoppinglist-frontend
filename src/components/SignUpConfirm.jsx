import { Text, Theme, Flex } from "@radix-ui/themes";
import { CheckIcon } from '@radix-ui/react-icons'
import { Link } from "react-router-dom";

// User will be forwarded to this after creating account
function SignUpConfirm() {
  return (
    <div>
      <Theme>
        <Flex direction="column" gap="1">
          <Text align="center">
            <CheckIcon width="64" height="64" color="green" />
          </Text>
          <Text align="center" size="7" weight="bold">
            Account created successfully
          </Text>
          <Text align="center" mt="3" size="3">
            <Link to="/login" style={{ textDecoration: 'underline' }}>Login</Link> to your account
          </Text>
        </Flex>
      </Theme>
    </div>
  );
}

export default SignUpConfirm;