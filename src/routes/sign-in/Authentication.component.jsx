import { SignIn } from "../../components/sign-in-form/SignIn.component";
import { SignUp } from "../../components/sign-up-form/SignUp.component";
import "./authentication.styles.scss"

export const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignIn />
      <SignUp />
    </div>
  );
};
