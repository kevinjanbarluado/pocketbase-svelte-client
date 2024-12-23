<script>
  import { onMount } from "svelte";
  import Button from "$lib/components/Button.svelte";
  import { capitalizeFirstLetter } from "$lib";
  import { DASHBOARD_LINKS } from "$lib/constants.js";
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import { writable } from "svelte/store";

  let pageTitle = $state("");
  let pageLoading = writable(true); // Add a loading state

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

  const user = writable(null); // Store to keep track of user state

  // Check if there's a stored user in localStorage or if it's available in a store
  onMount(() => {
    let storedUser = localStorage.getItem("user");

    if (storedUser) {
      user.set(JSON.parse(storedUser)); // If user exists in localStorage, set to store
    }

    // If no user, redirect to login page
    if (!storedUser) {
      goto("/");
    }

    // Set loading state to false after checking
    pageLoading.set(false);

    getPageOnLoad();
  });
</script>

{#if $pageLoading}
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <!-- Loading spinner or placeholder content while page is loading -->
    <div
      class="w-32 h-32 border-t-4 border-blue-500 rounded-full animate-spin"
    ></div>
  </div>
{:else}
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
        </div>
      </div>
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
{/if}
