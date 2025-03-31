import axios from "axios";
import { getAddressListService } from "./getAddressListService";

jest.mock("axios");

describe("getAddressListService", () => {
  const mockToken = "mockToken";
  const mockAddress = { _id: "address123", name: "Test Address" };

  it("should get address list successfully", async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: { addressList: [mockAddress] },
    });
    const result = await getAddressListService(mockToken);
    expect(axios.get).toHaveBeenCalledWith("/api/user/address", {
      headers: { authorization: mockToken },
    });
    expect(result.status).toBe(200);
  });

  it("should handle errors when getting address list", async () => {
    const errorMessage = "Failed to get address list";
    axios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getAddressListService(mockToken)).rejects.toThrow(
      errorMessage,
    );
  });
});
