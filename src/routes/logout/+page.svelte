<script>
  import { goto } from "$app/navigation";
  localStorage.removeItem("user");
  goto("/");
</script>
