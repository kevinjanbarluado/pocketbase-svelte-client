<script>
  import { onMount } from "svelte";
  import Button from "$lib/components/Button.svelte";
  import { capitalizeFirstLetter } from "$lib";
  import { DASHBOARD_LINKS } from "$lib/constants.js";
  import { page } from "$app/state";

  let pageTitle = $state("");

  const updateTitle = (title = "") => {
    pageTitle = title;
  };

  const buttonLinks = Object.entries(DASHBOARD_LINKS).map(([key, url]) => ({
    title: capitalizeFirstLetter(key),
    url: url,
  }));

  // Fetch the page name on load
  const getPageOnLoad = () => {
    const pageRoute = page?.route?.id?.split("/");
    const pageName = pageRoute[pageRoute.length - 1];
    updateTitle(pageName);
  };

  onMount(() => {
    getPageOnLoad();
  });
</script>

<div class="flex flex-col min-h-screen bg-gray-100">
  <nav class="bg-white shadow-md">
    <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <div class="text-2xl font-bold text-gray-900">Kethel Inventory</div>
        <div class="hidden space-x-8 md:flex">
          {#each buttonLinks as { title, url }}
            <Button {title} {url} {updateTitle} />
          {/each}
        </div>
        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button class="text-gray-900 hover:text-blue-600 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- Mobile Menu (hidden on desktop) -->
    <!-- <div class="px-4 py-6 space-y-4 bg-white shadow-md md:hidden">
      <button
        on:click={() => handleNavigation("/", "Dashboard")}
        class="block text-gray-900 transition duration-200 hover:text-blue-600"
        >Home</button
      >
      <button
        on:click={() => handleNavigation("#", "About")}
        class="block text-gray-900 transition duration-200 hover:text-blue-600"
        >About</button
      >
      <button
        on:click={() => handleNavigation("#", "Contact")}
        class="block text-gray-900 transition duration-200 hover:text-blue-600"
        >Contact</button
      >
      <button
        on:click={() => handleNavigation("/inventory", "Inventory")}
        class="block text-gray-900 transition duration-200 hover:text-blue-600"
        >Inventory</button
      >
      <button
        on:click={() => handleNavigation("#", "Users")}
        class="block text-gray-900 transition duration-200 hover:text-blue-600"
        >Users</button
      >
      <button
        on:click={() => handleNavigation("#", "Logout")}
        class="block text-gray-900 transition duration-200 hover:text-blue-600"
        >Logout</button
      >
    </div> -->
  </nav>
  <header class="bg-white shadow">
    <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900">
        {capitalizeFirstLetter(pageTitle)}
      </h1>
    </div>
  </header>
  <main class="flex-grow">
    <div class="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="border-4 border-gray-200 border-dashed rounded-lg h-96">
          <slot />
        </div>
      </div>
    </div>
  </main>
</div>
