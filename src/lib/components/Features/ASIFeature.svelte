<svelte:options accessors={true} />

<script lang="ts">
  import { StatNames } from "$lib/Enums";

  export let stat;
  export let value;
</script>

<div class="flex flex-row gap-2 items-center">
  <p class="font-bold">Ability Score Increase.</p>
  {#if stat == "all"}
    <p>Your ability scores each increase by 1.</p>
  {:else if stat == "any"}
    <p>You get {value} points to increase your stats.</p>
  {:else}
    <div class="flex flex-row gap-1 items-center">
      <p>
        Your
        {StatNames[stat]}
        score increases by {value + "."}
      </p>
    </div>
  {/if}
</div>
