import { expectSaga, testSaga } from "redux-saga-test-plan";
import {
  getSnapshotFromUserAuth,
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
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
  getCurrentUser,
  signInGooglePopup,
  signInUserWithEmailAndPassword,
  signOutUser,
} from "../../../utils/firebase/firebase.utils";
import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  signUpSuccess,
} from "../user.action";
import { throwError } from "redux-saga-test-plan/providers";

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

  test("signOut saga success path should call signOutUser and put signOutSuccess if succesful", () => {
    return expectSaga(signOut)
      .provide([[call(signOutUser)]])
      .put(signOutSuccess())
      .run();
  });

  test("signOut saga error path should call signOutUser and put signOutFailed if failed", () => {
    const mockUserError = new Error("Error in signOut");
    return expectSaga(signOut)
      .provide([[call(signOutUser), throwError(mockUserError)]])
      .put(signOutFailed(mockUserError))
      .run();
  });

  test("signInAfterSignUp saga should call getSnapshotFromUserAuth and signIn", () => {
    const mockUser = { id: 1, name: "test" };
    const mockAdditionalInfo = { displayName: "test" };
    const mockPayload = { user: mockUser, additionalInfo: mockAdditionalInfo };

    testSaga(signInAfterSignUp, { payload: mockPayload })
      .next()
      .call(getSnapshotFromUserAuth, mockUser, mockAdditionalInfo)
      .next()
      .isDone();
  });

  test("signUp saga success path should call signInAfterSignUp and put signUpSuccess if succesful", () => {
    const mockEmail = "test@gmail.com";
    const mockPassword = "test1234";
    const mockdisplayName = "TEST";
    const mockUser = {
      email: mockEmail,
      displayName: mockdisplayName,
    };
    const mockUserCredentials = { id: 1, user: mockUser };

    const mockPayload = {
      email: mockEmail,
      password: mockPassword,
      displayName: mockdisplayName,
    };

    return expectSaga(signUp, {
      payload: mockPayload,
    })
      .provide([
        [
          call(createAuthUserWithEmailAndPassword, mockEmail, mockPassword),
          mockUserCredentials,
        ],
      ])
      .put(
        signUpSuccess(mockUserCredentials.user, {
          displayName: mockdisplayName,
        })
      )
      .run();
  });

  test("signUp saga error path should call createAuthUserWithEmailAndPassword and put signUpFailure if failed", () => {
    const mockError = new Error("Error in signUp");
    const mockEmail = "test@gmail.com";
    const mockPassword = "test1234";
    return expectSaga(signUp, {
      payload: { email: mockEmail, password: mockPassword },
    })
      .provide([
        [
          call(createAuthUserWithEmailAndPassword, mockEmail, mockPassword),
          throwError(mockError),
        ],
      ])
      .put(signUpFailed(mockError))
      .run();
  });

  test("signInWithGoogle saga success path should call signInWithGooglePopup and call getSnapshotFromUserAuth", () => {
    const mockUser = { id: 1, name: "test" };
    const mockGoogleVal = { user: mockUser };

    return expectSaga(signInWithGoogle)
      .provide([[call(signInGooglePopup), mockGoogleVal]])
      .call(getSnapshotFromUserAuth, mockUser)
      .run();
  });

  test("signInWithGoogle saga error path should call signInWithGooglePopup and put signInFailed on error", () => {
    const mockError = new Error("Ops, some error");
    return expectSaga(signInWithGoogle)
      .provide([[call(signInGooglePopup), throwError(mockError)]])
      .put(signInFailed(mockError))
      .run();
  });

  test("signInWithEmail saga success path should call signInAuthUserWithEmailAndPassword and call getSnapshotFromUserAuth", () => {
    const mockEmail = "test@gmail.com";
    const mockPassword = "test1234";
    const mockUser = {
      id: 1,
      email: mockEmail,
      name: "test",
    };
    const mockUserCredentials = { id: 1, user: mockUser };
    return expectSaga(signInWithEmailAnsPassword, {
      payload: { email: mockEmail, password: mockPassword },
    })
      .provide([
        [
          call(signInUserWithEmailAndPassword, mockEmail, mockPassword),
          mockUserCredentials,
        ],
      ])
      .call(getSnapshotFromUserAuth, mockUser)
      .run();
  });

  test("signInWithEmail saga error path should call signInAuthUserWithEmailAndPassword and put signInFailed on error", () => {
    const mockEmail = "test@gmail.com";
    const mockPassword = "test1234";
    const mockError = new Error("Some error in signInWithEmail");

    return expectSaga(signInWithEmailAnsPassword, {
      payload: { email: mockEmail, password: mockPassword },
    })
      .provide([
        [
          call(signInUserWithEmailAndPassword, mockEmail, mockPassword),
          throwError(mockError),
        ],
      ])
      .put(signInFailed(mockError))
      .run();
  });

  test("isUserAuthenticated saga success path should call getSnapshotFromUserAuth and signIn if succesful", () => {
    const mockUserAuth = { id: 1, name: "test" };
    return expectSaga(isUserAuthenticated)
      .provide([[call(getCurrentUser), mockUserAuth]])
      .call(getSnapshotFromUserAuth, mockUserAuth)
      .run();
  });

  test("isUserAuthenticated saga error path should call getCurrentUser and put signInFailed if failed", () => {
    const mockError = new Error("Sorry, some error");

    return expectSaga(isUserAuthenticated)
      .provide([[call(getCurrentUser), throwError(mockError)]])
      .put(signInFailed(mockError))
      .run();
  });

  test("getSnapshotFromUserAuth saga should call createUserDocumentFromAuth and put signInSuccess", () => {
    const mockUserAuth = { id: 1, name: "test" };
    const mockAdditionalInfo = { displayName: "test" };
    const mockUserSnapshot = { id: 2, data: () => ({ displayName: "test" }) };

    return expectSaga(getSnapshotFromUserAuth, mockUserAuth, mockAdditionalInfo)
      .provide([
        [
          call(createUserDocFromAuth, mockUserAuth, mockAdditionalInfo),
          mockUserSnapshot,
        ],
      ])
      .put(
        signInSuccess({ id: mockUserSnapshot.id, ...mockUserSnapshot.data() })
      )
      .run();
  });

  test("getSnapshotFromUserAuth saga error path should put signInFailed on error", () => {
    const mockError = new Error("Sorry, some error");
    const mockUserAuth = { id: 1, name: "test" };
    const mockAdditionalInfo = { displayName: "test" };

    return expectSaga(getSnapshotFromUserAuth, mockUserAuth, mockAdditionalInfo)
      .provide([
        [
          call(createUserDocFromAuth, mockUserAuth, mockAdditionalInfo),
          throwError(mockError),
        ],
      ])
      .put(signInFailed(mockError))
      .run();
  });
});
