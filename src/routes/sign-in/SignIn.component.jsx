import { SignUp } from "../../components/sign-up-form/SignUp.component";
import {
  signInGooglePopup,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";

export const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInGooglePopup();
    const userDocRef = createUserDocFromAuth(user);
  };

  return (
    <>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign In with Google</button>
      <SignUp />
    </>
  );
};
