const { render } = require("@testing-library/react-native");
const { default: Banner } = require("../../src/components/ui/Banner");

describe("Banner", () => {
  const imageSrc = require("../../assets/Images/Banners/GrowloBanner.png");

  it("renders the component correctly", () => {
    const { getByTestId } = render(<Banner imageSrc={imageSrc} />);
    expect(getByTestId("banner-container")).toBeTruthy();
    expect(getByTestId("banner-image")).toBeTruthy();
  });

  it("display correct image", () => {
    const { getByTestId } = render(<Banner imageSrc={imageSrc} />);
    const image = getByTestId("banner-image");
    expect(image.props.source).toEqual(imageSrc);
  });
});
