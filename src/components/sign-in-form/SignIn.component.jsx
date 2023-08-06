import { useState } from "react";
import {
  signInUserWithEmailAndPassword,
  signInGooglePopup,
} from "../../utils/firebase/firebase.utils";
import { InputForm } from "../input-form/InputForm.component";
import { Button } from "../button/Button.component";
import "./sign-in.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

export const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const SignInWithGoogle = async () => {
    await signInGooglePopup();
   };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInUserWithEmailAndPassword(email, password);
          resetFormFields();
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user found");
          break;
        default:
          console.log(err);
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h1>Already have an account?</h1>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <InputForm
          label="email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <InputForm
          label="password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={SignInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};
