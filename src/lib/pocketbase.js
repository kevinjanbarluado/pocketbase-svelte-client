import PocketBase from "pocketbase";

const pb = new PocketBase("http://localhost:8090");

export async function getCategories() {
  const categories = await pb.collection("categories").getFullList();
  return categories;
}

export async function getInventory() {
  const inventory = await pb
    .collection("inventory")
    .getFullList({ expand: "product_Id" });
  console.log("inventory", inventory);
  return inventory;
}

export async function login(email, password) {
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
