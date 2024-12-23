<script>
  import { onMount } from "svelte";
  import { getCategories } from "$lib/pocketbase";

  let records = [];

  onMount(async () => {
    try {
      records = await getCategories();
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  });
</script>

<h1>Inventory</h1>

{#if records.length > 0}
  <ul>
    {#each records as record}
      <li>{record.name}</li>
      <li>{record.created}</li>
    {/each}
  </ul>
{:else}
  <p>No records found.</p>
{/if}
