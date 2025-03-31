import axios from "axios";
import { removeAddressService } from "./removeAddressService";

jest.mock("axios");

describe("removeAddressService", () => {
  const mockToken = "mockToken";
  const mockAddress = { _id: "address123", name: "Test Address" };

  it("should remove an address successfully", async () => {
    axios.delete.mockResolvedValue({ status: 200, data: { addressList: [] } });
    const result = await removeAddressService(mockAddress, mockToken);
    expect(axios.delete).toHaveBeenCalledWith(
      `/api/user/address/${mockAddress._id}`,
      { headers: { authorization: mockToken } },
    );
    expect(result.status).toBe(200);
  });

  it("should handle errors during address removal", async () => {
    const errorMessage = "Failed to remove address";
    axios.delete.mockRejectedValue(new Error(errorMessage));

    await expect(removeAddressService(mockAddress, mockToken)).rejects.toThrow(
      errorMessage,
    );
  });
});
