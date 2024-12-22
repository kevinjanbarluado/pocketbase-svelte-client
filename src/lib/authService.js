import { user, isAuthenticated } from "../stores/auth";
import PocketBase from "pocketbase";
import { get } from "svelte/store";  // Import the get function

const pb = new PocketBase("http://localhost:8090");

export async function login(email, password) {
  try {
    const authData = await pb.collection("users").authWithPassword(email, password);
    
    // Update the stores after a successful login
    user.set({
      avatar: authData.record.avatar || "",
      email: authData.record.email,
      name: authData.record.name,
      role: authData.record.role,
      status: authData.record.status,
      verified: authData.record.verified,
      id: authData.record.id,
      created: authData.record.created,
      updated: authData.record.updated,
    });
    isAuthenticated.set(true); // Mark the user as authenticated
    return authData; // Returns auth data on success
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login failed, please check your credentials.");
  }
}

export function logout() {
  // Reset the user store and authentication state on logout
  user.set({
    avatar: "",
    email: "",
    name: "",
    role: null,
    status: null,
    verified: false,
    id: "",
    created: "",
    updated: "",
  });
  isAuthenticated.set(false); // Mark the user as logged out
}

export async function updateUserProfile(newProfileData) {
  try {
    const currentUser = get(user); // Get the current user from the store
    
    if (!currentUser.id) {
      throw new Error("User is not authenticated.");
    }

    const updatedData = await pb.collection("users").update(currentUser.id, newProfileData);
    
    // Update the store with the new profile data
    user.set({
      avatar: updatedData.record.avatar || "",
      email: updatedData.record.email,
      name: updatedData.record.name,
      role: updatedData.record.role,
      status: updatedData.record.status,
      verified: updatedData.record.verified,
      id: updatedData.record.id,
      created: updatedData.record.created,
      updated: updatedData.record.updated,
    });
  } catch (error) {
    console.error("Profile update failed:", error);
    throw new Error("Failed to update profile.");
  }
}
