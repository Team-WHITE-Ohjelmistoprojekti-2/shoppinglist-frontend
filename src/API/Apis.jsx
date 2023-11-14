import axios from "axios";
import { API_URL } from "../constants";

//SHOPPINGLIST
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
//PRODUCT
export const getProductById = async (id) => {
  try {
    const result = await axios.get(`${API_URL}/products/${id}`);
    return result.data;
  } catch (error) {
    // Handle error if needed
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error; // Re-throw the error to handle it elsewhere, if necessary
  }
};

export async function addProduct(product) {
  try {
    const result = await axios.post(`${API_URL}/products`, product, {});
    return result.data;
  } catch (error) {
    // Handle error if needed
    console.error("Error creating Product:", error);
    throw error; // Re-throw the error to handle it elsewhere, if necessary
  }
}
export async function editProduct(updatedProduct) {
  try {
    const result = await axios.put(
      `${API_URL}/products/${updatedProduct.id}`,
      updatedProduct
    );
    return result.data;
  } catch (error) {
    // Handle error if needed
    console.error("Error updating Product:", error);
    throw error; // Re-throw the error to handle it elsewhere, if necessary
  }
}


//USER
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

export async function loginUser(signupData) {
  try {
    const result = await axios.post(
      `${API_URL}/registration/login`,
      signupData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return result;
  } catch (error) {
    console.error("Failed to login user:", error);
    throw error;
  }
}
