import {
  signInFailed,
  signInSuccess,
  signOutSuccess,
  signUpFailed,
} from "../user.action";
import { USER_INITIAL_STATE, userReducer } from "../userReducer";

describe("UserReducer tests", () => {
  test("signInSuccess", () => {
    const mockUser = {
      id: 1,
      email: "test",
    };

    const expectedState = {
      ...USER_INITIAL_STATE,
      currentUser: mockUser,
    };

    expect(userReducer(USER_INITIAL_STATE, signInSuccess(mockUser))).toEqual(
      expectedState
    );
  });

  test("signOutSuccess", () => {
    const expectedState = {
      ...USER_INITIAL_STATE,
      currentUser: null,
    };

    expect(userReducer(USER_INITIAL_STATE, signOutSuccess())).toEqual(
      expectedState
    );
  });

  test("signInFailed", () => {
    const mockError = new Error("Some error, sign In Failed");

    const expectedState = {
      ...USER_INITIAL_STATE,
      error: mockError,
    };

    expect(userReducer(USER_INITIAL_STATE, signInFailed(mockError))).toEqual(
      expectedState
    );
  });

  test("signUpFailed", () => {
    const mockError = new Error("Some error, sign Up Failed");

    const expectedState = {
      ...USER_INITIAL_STATE,
      error: mockError,
    };

    expect(userReducer(USER_INITIAL_STATE, signUpFailed(mockError))).toEqual(
      expectedState
    );
  });
});
