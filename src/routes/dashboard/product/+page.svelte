<script>
  import { onMount } from "svelte";
  import { getProduct } from "$lib/pocketbase";

  let records = [];

  onMount(async () => {
    try {
      records = await getProduct();
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  });
</script>

<h1>Products</h1>

{#if records.length > 0}
  <ul>
    {#each records as record}
      <li>{record.id}</li>
      <li>{record.name}</li>
    {/each}
  </ul>
{:else}
  <p>No records found.</p>
{/if}
