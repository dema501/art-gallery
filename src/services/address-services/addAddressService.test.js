import { addAddressService } from "./addAddressService";
import api from "../../api/api";

jest.mock("../../api/api");

describe("addAddressService", () => {
  const mockToken = "mockToken";
  const mockAddress = { _id: "address123", name: "Test Address" };

  it("should add an address successfully", async () => {
    const mockPost = jest
      .fn()
      .mockResolvedValue({ status: 200, data: { addressList: [mockAddress] } });
    api.post = mockPost;
    const result = await addAddressService(mockAddress, mockToken);
    expect(api.post).toHaveBeenCalledWith(
      "/api/user/address/",
      { address: mockAddress },
      { headers: { authorization: mockToken } },
    );
    expect(result.status).toBe(200);
  });

  it("should handle errors during address addition", async () => {
    const errorMessage = "Failed to add address";
    const mockPost = jest.fn().mockRejectedValue(new Error(errorMessage));
    api.post = mockPost;
    await expect(addAddressService(mockAddress, mockToken)).rejects.toThrow(
      errorMessage,
    );
  });
});
