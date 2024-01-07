<script lang="ts">
  import { Archetype, Feature } from "$lib/Character";
  import { FeatureType } from "$lib/Enums";
  import AsiFeature from "./Features/ASIFeature.svelte";

  export let list: Feature[] | Feature[][] | Archetype[];
  export let level = 20;
  let dropdownOn = [];
</script>

{#each list as feature, levelIndex}
  {#if !Array.isArray(feature)}
    {#if feature.type == FeatureType.ASI}
      {#each Object.entries(feature.feature) as [key, value]}
        <AsiFeature stat={key} {value}></AsiFeature>
      {/each}
    {:else if feature.type == FeatureType.Set || feature.type == FeatureType.Archetype}
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <div class="collapse">
        <input
          class="min-h-0"
          bind:checked={dropdownOn[levelIndex]}
          type="checkbox"
        />
        <div class="collapse-title p-0 min-h-0 group">
          <div class="flex flex-row gap-2">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label
              class="swap swap-rotate"
              class:swap-active={dropdownOn[levelIndex]}
            >
              <div class="swap-on">
                <svg
                  class="w-6 h-6 fill-current rotate-180"
                  viewBox="0 0 32 32"
                  ><path
                    d="M18.221,7.206l9.585,9.585c0.879,0.879,0.879,2.317,0,3.195l-0.8,0.801c-0.877,0.878-2.316,0.878-3.194,0  l-7.315-7.315l-7.315,7.315c-0.878,0.878-2.317,0.878-3.194,0l-0.8-0.801c-0.879-0.878-0.879-2.316,0-3.195l9.587-9.585  c0.471-0.472,1.103-0.682,1.723-0.647C17.115,6.524,17.748,6.734,18.221,7.206z"
                  /></svg
                >
              </div>
              <div class="swap-off">
                <svg
                  class="w-6 h-6 fill-current rotate-90"
                  viewBox="0 0 32 32"
                  ><path
                    d="M18.221,7.206l9.585,9.585c0.879,0.879,0.879,2.317,0,3.195l-0.8,0.801c-0.877,0.878-2.316,0.878-3.194,0  l-7.315-7.315l-7.315,7.315c-0.878,0.878-2.317,0.878-3.194,0l-0.8-0.801c-0.879-0.878-0.879-2.316,0-3.195l9.587-9.585  c0.471-0.472,1.103-0.682,1.723-0.647C17.115,6.524,17.748,6.734,18.221,7.206z"
                  /></svg
                >
              </div>
            </label>
            <p class="font-bold whitespace-nowrap">
              {feature.name}.
            </p>
            <p class="truncate mr-8">
              {feature.description}
            </p>
          </div>
        </div>
        <div class="collapse-content p-0">
          <div class="ml-8">
            {#if feature.type == FeatureType.Archetype && feature.constructor === Archetype}
              <svelte:self list={feature.feature} level={feature.level} />
            {:else}
              <svelte:self list={feature.feature} />
            {/if}
          </div>
        </div>
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
