import axios from "axios";
import { API_URL } from "../constants";

//Shopping list Crud
export const getShoppinglists = async () => {
    try{
        const result = await axios.get(`${API_URL}/shoppinglists`);
    return result.data;
    } catch (error) {
        // Handle error if needed
        console.error('Error fetching shoppinglists:', error);
        throw error; // Re-throw the error to handle it elsewhere, if necessary
      }
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
  export async function addShoppinglist(list) {
    try {
      const result = await axios.post(`${API_URL}/shoppinglists`, list, {
      });
      return result.data;
    } catch (error) {
      // Handle error if needed
      console.error("Error creating list:", error);
      throw error; // Re-throw the error to handle it elsewhere, if necessary
    }
  }