import { writable } from "svelte/store";

export const user = writable({
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

export const isAuthenticated = writable(false); // Default to false
