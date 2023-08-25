import { selectCurrentUser } from "../user.selector";

const mockState = {
  user: {
    currentUser: {
      createdAt: "01.10.2020",
      displayName: "Test",
      email: "test@gmail.com",
    },
    isLoading: false,
    error: null,
  },
};

describe("User selector", () => {
  test("selectCurrentUser should return currentUser", () => {
    const userSlice = selectCurrentUser(mockState);
    expect(userSlice).toEqual(mockState.user.currentUser);
  });
});
