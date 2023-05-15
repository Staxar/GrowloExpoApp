import { render } from "@testing-library/react-native";
import LoadingOverlay from "../../src/components/ui/LoadingOverlay";

describe("loadingOverlay", () => {
  const message = "some test message";

  it("should render correctly", () => {
    const { getByTestId, getByText } = render(
      <LoadingOverlay message={message} />
    );

    expect(getByTestId("loadingOverlay-container")).toBeTruthy();
    expect(getByText(message)).toBeTruthy();
    expect(getByTestId("loadingOverlay-indicator")).toBeTruthy();
  });
});
