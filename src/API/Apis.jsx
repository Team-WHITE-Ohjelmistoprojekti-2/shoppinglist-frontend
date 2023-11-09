import axios from "axios";
import { API_URL } from "../constants";

//Shopping list Crud
export const getShoppinglistById = async (id) => {
  try {
    const result = await axios.get(`${API_URL}/shoppinglists/${id}`);
    return result.data;
  } catch (error) {
    // Handle error if needed
    console.error(`Error fetching shoppinglist with ID ${id}:`, error);
    throw error; // Re-throw the error to handle it elsewhere, if necessary
  }
};

export const getShoppinglists = async () => {
  try {
    const result = await axios.get(`${API_URL}/shoppinglists`);
    return result.data;
  } catch (error) {
    // Handle error if needed
    console.error("Error fetching shoppinglists:", error);
    throw error; // Re-throw the error to handle it elsewhere, if necessary
  }
};

export async function deleteShoppinglist(id) {
  try {
    const result = await axios.delete(`${API_URL}/shoppinglists/${id}`);
    return result.data;
  } catch (error) {
    // Handle error if needed
    console.error("Error deleting post:", error);
    throw error; // Re-throw the error to handle it elsewhere, if necessary
  }
}

export async function addShoppinglist(list) {
  try {
    const result = await axios.post(`${API_URL}/shoppinglists`, list, {});
    return result.data;
  } catch (error) {
    // Handle error if needed
    console.error("Error creating list:", error);
    throw error; // Re-throw the error to handle it elsewhere, if necessary
  }
}

/*
export async function editShoppinglist(updatedList) {
  try {
    const result = await axios.put(
      `${API_URL}/shoppinglists/${updatedList.id}`,
      { name: updatedList.updatedList.name }  // Only name needed when editing list
    );
    return result.data;
  } catch (error) {
    // Handle error if needed
    console.error("Error updating list:", error);
    throw error; // Re-throw the error to handle it elsewhere, if necessary
  }
}*/

export async function editShoppinglist(updatedList) {
  try {
    const result = await axios.put(
      `${API_URL}/shoppinglists/${updatedList.id}`,
      updatedList
    );
    return result.data;
  } catch (error) {
    // Handle error if needed
    console.error("Error updating list:", error);
    throw error; // Re-throw the error to handle it elsewhere, if necessary
  }
}

export async function signupUser(signupData) {
  try {
    const result = await axios.post(
      `${API_URL}/registration/register`,
      signupData
    );
    return result;
  } catch (error) {
    console.error("Failed to signup user:", error);
    throw error;
  }
}
