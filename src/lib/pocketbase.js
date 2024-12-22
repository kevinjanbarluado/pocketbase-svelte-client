import PocketBase from "pocketbase";

const pb = new PocketBase("http://localhost:8090");

export async function getCategories() {
  const categories = await pb.collection("categories").getFullList();
  return categories;
}

export async function getInventory() {
  const inventory = await pb.collection("inventory").getFullList({ expand: "product_Id"});
  console.log('inventory', inventory);
  return inventory;
}
