import { testSaga } from "redux-saga-test-plan";
import {
  isUserAuthenticated,
  onCheckUserSession,
  onEmailSignInStart,
  onGoogleSignInStart,
  onSignOutStart,
  onSignUpStart,
  onSignUpSuccess,
  signInAfterSignUp,
  signInWithEmailAnsPassword,
  signInWithGoogle,
  signOut,
  signUp,
  userSaga,
} from "../user.saga";
import { call } from "typed-redux-saga/macro";
import { USER_ACTION_TYPE } from "../user.types";

describe("User sagas", () => {
  test("userSagas", () => {
    testSaga(userSaga)
      .next()
      .all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
      ])
      .next()
      .isDone();
  });

  test("onGoogleSignInStart saga should takeLatest GOOGLE_SIGN_IN_START and call signInWithGoogle", () => {
    testSaga(onGoogleSignInStart)
      .next()
      .takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START, signInWithGoogle)
      .next()
      .isDone();
  });

  test("onSignUpStart saga should takeLatest SIGN_UP_START and call signUp", () => {
    testSaga(onSignUpStart)
      .next()
      .takeLatest(USER_ACTION_TYPE.SIGN_UP_START, signUp)
      .next()
      .isDone();
  });

  test("onSignUpSuccess saga should takeLatest SIGN_UP_SUCCESS and call signInAfterSignUp", () => {
    testSaga(onSignUpSuccess)
      .next()
      .takeLatest(USER_ACTION_TYPE.SIGN_UP_SUCCESS, signInAfterSignUp)
      .next()
      .isDone();
  });

  test("onSignOutStart saga should takeLatest SIGN_OUT_START and call signOut", () => {
    testSaga(onSignOutStart)
      .next()
      .takeLatest(USER_ACTION_TYPE.SIGN_OUT_START, signOut)
      .next()
      .isDone();
  });

  test("onCheckUserSession saga should takeLatest CHECK_USER_SESSION and call isUserAuthenticated", () => {
    testSaga(onCheckUserSession)
      .next()
      .takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuthenticated)
      .next()
      .isDone();
  });

  test("onEmailSignInStart saga should takeLatest EMAIL_SIGN_IN_START and call signInWithEmailAnsPassword", () => {
    testSaga(onEmailSignInStart)
      .next()
      .takeLatest(
        USER_ACTION_TYPE.EMAIL_SIGN_IN_START,
        signInWithEmailAnsPassword
      )
      .next()
      .isDone();
  });
});
