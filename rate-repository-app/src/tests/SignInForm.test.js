import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { FormikForm } from "../components/SignIn";
// ...

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      const { getByTestId } = render(<FormikForm onSubmit={onSubmit} />);
      fireEvent.changeText(getByTestId("username"), "kalle");
      fireEvent.changeText(getByTestId("password"), "password");
      fireEvent.press(getByTestId("submitButton"));
      await waitFor(() => {
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
        // expect the onSubmit function to have been called once and with a correct first argument
      });
    });
  });
});
