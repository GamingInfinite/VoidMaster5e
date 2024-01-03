<script lang="ts">
  import { Archetype, Feature } from "$lib/Character";
  import { FeatureType } from "$lib/Enums";
  import AsiFeature from "./Features/ASIFeature.svelte";

  export let list: Feature[] | Feature[][] | Archetype[];
  export let level = 20;
</script>

{#each list as feature, levelIndex}
  {#if !Array.isArray(feature)}
    {#if feature.type == FeatureType.ASI}
      {#each Object.entries(feature.feature) as [key, value]}
        <AsiFeature stat={key} {value}></AsiFeature>
      {/each}
    {:else if feature.type == FeatureType.Set || feature.type == FeatureType.Archetype}
      <div class="flex flex-row gap-2">
        <p class="font-bold whitespace-nowrap">
          {feature.name}.
        </p>
        <p class="truncate">
          {feature.description}
        </p>
      </div>
      <div class="ml-8">
        {#if feature.type == FeatureType.Archetype && feature.constructor === Archetype}
          <svelte:self list={feature.feature} level={feature.level}></svelte:self>
        {:else}
          <svelte:self list={feature.feature}></svelte:self>
        {/if}
      </div>
    {:else}
      <div class="flex flex-row gap-2">
        <p class="font-bold whitespace-nowrap">
          {feature.name}.
        </p>
        <p class="truncate">
          {feature.description}
        </p>
      </div>
    {/if}
  {:else if level - 1 >= levelIndex}
    <svelte:self list={feature}></svelte:self>
  {/if}
{/each}
