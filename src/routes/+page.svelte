<script>
  import { login } from "$lib/pocketbase";  // Import login function from pocketbase.js
  import { writable } from "svelte/store";

  // Svelte stores for user and error handling
  const user = writable(null);
  const error = writable(null);

  let email = "";
  let password = "";

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    error.set(null);

    try {
      const authData = await login(email, password);  // Use the login function

      user.set(authData.record);  // Store the authenticated user
      console.log("Logged in successfully:", authData.record);

      // Optionally store the user data in localStorage or sessionStorage
      localStorage.setItem("user", JSON.stringify(authData.record));

      // You can also redirect the user after successful login if needed
      // Example:
      // navigate('/dashboard');
    } catch (err) {
      error.set(err.message);  // Display the error message
      console.error("Error during login:", err);
    }
  }
</script>

<div class="flex items-center justify-center min-h-screen">
  <form class="max-w-md mx-auto mt-8 space-y-6" on:submit={handleSubmit}>
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
      <input
        id="email"
        name="email"
        type="email"
        bind:value={email}
        autocomplete="email"
        required
        class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        bind:value={password}
        autocomplete="current-password"
        required
        class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>

    {#if $error}
      <div class="mt-2 text-sm text-red-500">{ $error }</div>
    {/if}

    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input
          id="remember_me"
          name="remember_me"
          type="checkbox"
          class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label for="remember_me" class="block ml-2 text-sm text-gray-900">Remember me</label>
      </div>
      <div class="text-sm">
        <a href="#" class="font-medium text-blue-600 hover:text-blue-500">Forgot your password?</a>
      </div>
    </div>

    <div>
      <button
        type="submit"
        class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Sign in
      </button>
    </div>
  </form>
</div>
