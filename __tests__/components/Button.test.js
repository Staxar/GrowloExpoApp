import { fireEvent, render } from "@testing-library/react-native";
import Button from "../../src/components/ui/Button";

describe("button", () => {
  const onPressMock = jest.fn();

  it("render component correctly", () => {
    const { getByTestId } = render(
      <Button onPress={onPressMock}>Press me</Button>
    );
    expect(getByTestId("button-pressable")).toBeTruthy();
    expect(getByTestId("button-text")).toBeTruthy();
    expect(getByTestId("button-text").props.children).toEqual("Press me");
  });

  it("call on Press func when pressed", () => {
    const { getByTestId } = render(
      <Button onPress={onPressMock}>Press me</Button>
    );

    const btn = getByTestId("button-pressable");
    fireEvent.press(btn);
    expect(onPressMock).toHaveBeenCalled();
  });
});
