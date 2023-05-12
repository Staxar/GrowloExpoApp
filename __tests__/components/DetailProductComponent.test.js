import { render } from "@testing-library/react-native";
import DetailProductComponent from "../../src/components/ui/DetailProductComponent";

describe("Detail Product Component", () => {
  //     const imageSrc = require("../../assets/Images/Banners/GrowloBanner.png");
  const props = {
    selectedImage: undefined,
    title: "test title",
    prize: 10,
    unit: "kg",
    description: "test description",
    id: 12345,
    pickedLocation: {
      lat: 37.7749,
      lng: -122.4194,
      address: "San Francisco, CA, USA",
    },
    sendMessage: jest.fn(),
    amount: 1,
  };

  it("renders the component correctly", () => {
    const { getByTestId, getByText } = render(
      <DetailProductComponent
        id={props.id}
        title={props.title}
        prize={props.prize}
        amount={props.amount}
        unit={props.unit}
        description={props.description}
        pickedLocation={props.pickedLocation}
        selectedImage={props.selectedImage}
        sendMessage={props.sendMessage}
      />
    );
    expect(getByTestId("detail-innerContainer")).toBeTruthy();
    expect(getByText("test title")).toBeTruthy();
    expect(getByText("Prize: $10")).toBeTruthy();
    expect(getByText("Amount: 1 [ kg ]")).toBeTruthy();
    expect(getByText("Description:")).toBeTruthy();
    expect(getByText("test description")).toBeTruthy();
    expect(getByText("ID: 12345")).toBeTruthy();
    expect(getByTestId("detail-mapPreview")).toBeTruthy();
  });
});
