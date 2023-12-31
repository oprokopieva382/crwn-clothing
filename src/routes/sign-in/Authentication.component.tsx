import { SignIn } from "../../components/sign-in-form/SignIn.component";
import { SignUp } from "../../components/sign-up-form/SignUp.component";
import { AuthenticationContainer } from "./authentication.styles";

const Authentication = () => {
  return (
    <AuthenticationContainer>
        <SignIn />
        <SignUp />
    </AuthenticationContainer>
  );
};

export default Authentication;