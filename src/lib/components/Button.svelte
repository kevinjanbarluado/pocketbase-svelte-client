<script>
  import { goto } from "$app/navigation";

  export let title;
  export let url;
  export let updateTitle;

  const handleNavigation = () => {
    goto(url);
    updateTitle(title);
  };
</script>

<button
  onclick={handleNavigation}
  class="text-gray-900 transition duration-200 hover:text-blue-600"
>
  {title}
</button>
