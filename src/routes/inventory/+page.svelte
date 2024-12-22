<script>
  import { onMount } from "svelte";
  import { getInventory } from "$lib/pocketbase";
  let records = [];

  onMount(async () => {
    try {
      records = await getInventory();
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  });
</script>

<h1>Inventory</h1>

{#if records.length > 0}
  <ul>
    {#each records as record}
      <li>Product ID: {record.product_Id}</li>
      <li>
        Product Name: {record.expand?.product_Id?.name || "Unknown"}
      </li>
      <li>Minimum Quantity: {record.minimum_quantity}</li>
    {/each}
  </ul>
{:else}
  <p>No records found.</p>
{/if}
