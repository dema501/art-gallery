import axios from "axios";
import { updateAddressService } from "./updateAddressService";

jest.mock("axios");

describe("updateAddressService", () => {
  const mockToken = "mockToken";
  const mockAddress = { _id: "address123", name: "Test Address" };

  it("should update an address successfully", async () => {
    axios.post.mockResolvedValue({
      status: 200,
      data: { addressList: [mockAddress] },
    });
    const result = await updateAddressService(mockAddress, mockToken);
    expect(axios.post).toHaveBeenCalledWith(
      `/api/user/address/${mockAddress._id}`,
      { address: mockAddress },
      { headers: { authorization: mockToken } },
    );
    expect(result.status).toBe(200);
  });

  it("should handle errors during address update", async () => {
    const errorMessage = "Failed to update address";
    axios.post.mockRejectedValue(new Error(errorMessage));

    await expect(updateAddressService(mockAddress, mockToken)).rejects.toThrow(
      errorMessage,
    );
  });
});
