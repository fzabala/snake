import axios from "axios";

export const productsIndexService = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_HOST}/products`);
  return response.data;
}
