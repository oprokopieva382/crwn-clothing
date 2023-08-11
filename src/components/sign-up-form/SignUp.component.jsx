import { useState} from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";
import { InputForm } from "../input-form/InputForm.component";
import { SignUpContainer } from "./sign-up";
import { Button } from "../button/Button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password should be match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocFromAuth(user, { displayName });
      resetFormFields();
    } catch (err) {
      err.code === "auth/email-already-in-use"
        ? alert("Email already in use")
        : console.log(err.message);
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <InputForm
          label="Display Name"
          required
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <InputForm
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <InputForm
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <InputForm
          label="Confirm password"
          required
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};
