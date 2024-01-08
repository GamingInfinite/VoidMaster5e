<script lang="ts">
  import { Feature } from "$lib/FeatureTypes";

    export let features: Feature[] | Feature;
</script>

{#if Array.isArray(features)}
    {#each features as feature}
        <svelte:self features={feature}></svelte:self>
    {/each}
    {:else}
    <div class="flex flex-row gap-2">
        <p class="font-bold whitespace-nowrap">{features.name + "."}</p>
        <p class="truncate">{features.description}</p>
    </div>
{/if}