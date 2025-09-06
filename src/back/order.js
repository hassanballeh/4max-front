import api from "../api";
import apiSecurity from "../../apiSecurity";
import apiToken from "../../apiToken";
export const createOrder = async (data) => {
  try {
    console.log("nown", data);
    const res = await apiToken.post("/api/orders", data);
    console.log("e: ", res);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
