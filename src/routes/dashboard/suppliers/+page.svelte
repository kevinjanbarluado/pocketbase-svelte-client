<script>
  import { onMount } from "svelte";
  import { getSuppliers } from "$lib/pocketbase";

  let records = [];

  onMount(async () => {
    try {
      records = await getSuppliers();
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  });
</script>

{#if records.length > 0}
  <ul>
    {#each records as record}
      <li>{record.company_name}</li>
      <li>{record.contact_name}</li>
    {/each}
  </ul>
{:else}
  <p>No records found.</p>
{/if}
