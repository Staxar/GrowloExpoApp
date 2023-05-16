import { render } from "@testing-library/react-native";
import FlagItem from "../../src/components/ui/FlagItem";

describe("flagitem", () => {
  const isoCode = "af";
  const dial = "+93";
  const countryName = "Afghanistan";

  it("render component correctly", () => {
    const { getByTestId } = render(
      <FlagItem isoCode={isoCode} dial={dial} countryName={countryName} />
    );
    expect(getByTestId("flag-container")).toBeTruthy();
    expect(getByTestId("flat-text-dial")).toBeTruthy();
    expect(getByTestId("flat-text-countryName")).toBeTruthy();
  });
  it("component values should be equals to props", () => {
    const { getByTestId } = render(
      <FlagItem isoCode={isoCode} dial={dial} countryName={countryName} />
    );

    expect(getByTestId("flat-text-dial").children).toEqual(["+93"]);
    expect(getByTestId("flat-text-countryName").children).toEqual([
      "Afghanistan",
    ]);
  });
});
