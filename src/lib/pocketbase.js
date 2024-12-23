import PocketBase from "pocketbase";

const pb = new PocketBase("http://localhost:8090");

async function getDataFromCollection(collectionName = "", expandParam = "") {
  try {
    const queryOptions = expandParam ? { expand: expandParam } : {};
    const data = await pb.collection(collectionName).getFullList(queryOptions);
    return data;
  } catch (error) {
    console.error(`Failed to fetch data from ${collectionName}:`, error);
    throw new Error(`Error fetching data from ${collectionName}`);
  }
}

export async function getCategories() {
  return getDataFromCollection("categories");
}

export async function getInventory() {
  return getDataFromCollection("inventory", "product_Id");
}

export async function getProduct() {
  return getDataFromCollection("products", "created_by_user");
}

export async function getSuppliers() {
  return getDataFromCollection("suppliers");
}

export async function getUsers() {
  return getDataFromCollection("users");
}

export async function login(email = "", password = "") {
  try {
    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);

    // after the above you can also access the auth data from the authStore
    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);

    return authData; // Returns auth data on success
  } catch (error) {
    throw new Error("Login failed: " + error); // Error handling
  }
}
