import { render } from "@testing-library/react-native";
import Message from "../../src/components/ui/Message";
import { Colors } from "../../src/constans/styles";

describe("message", () => {
  const message = "some test message";

  it("should render component correctly", () => {
    const { getByTestId } = render(<Message />);

    expect(getByTestId("message-container")).toBeTruthy();
    expect(getByTestId("message-innerContainer")).toBeTruthy();
  });

  it("should have right styles properties", () => {
    const { getByTestId, getByText } = render(
      <Message right={true} message={message} />
    );

    expect(getByTestId("message-container")).toBeTruthy();
    expect(getByTestId("message-rightContainer").props.style).toEqual([
      { padding: 8, borderRadius: 8 },
      { backgroundColor: Colors.primary100 },
    ]);
    expect(getByText("some test message")).toBeTruthy();
  });
  it("should have left styles properties", () => {
    const { getByTestId, getByText } = render(
      <Message left={true} message={message} />
    );

    expect(getByTestId("message-container")).toBeTruthy();
    expect(getByTestId("message-leftContainer").props.style).toEqual([
      { padding: 8, borderRadius: 8 },
      { backgroundColor: Colors.primary800 },
    ]);
    expect(getByText("some test message")).toBeTruthy();
  });
});
