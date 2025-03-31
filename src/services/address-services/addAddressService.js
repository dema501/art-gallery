import api from "../../api/api";

export const addAddressService = async (address, token) => {
  return await api.post(
    "/api/user/address/",
    { address },
    { headers: { authorization: token } },
  );
};
