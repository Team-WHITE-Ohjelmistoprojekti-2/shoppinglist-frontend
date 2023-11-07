import axios from "axios";
import { API_URL } from "../constants";

export const getShoppinglists = async () => {
    const result = await axios.get(`${API_URL}/shoppinglists`);
    return result.data;
}

export async function deleteShoppinglist(shoppinglistId) {
    try {
      const result =  await axios.delete(`${API_URL}/shoppinglists/${shoppinglistId}`);
      return result.data;
    } catch (error) {
      // Handle error if needed
      console.error('Error deleting post:', error);
      throw error; // Re-throw the error to handle it elsewhere, if necessary
    }
  }