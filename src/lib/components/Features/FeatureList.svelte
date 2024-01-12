<script lang="ts">
  import { Feature, FeatureSet } from "$lib/FeatureTypes";

  export let features: Feature[] | Feature | FeatureSet;
  let open: boolean = false;
</script>

{#if Array.isArray(features)}
  {#each features as feature}
    <svelte:self features={feature}></svelte:self>
  {/each}
{:else if features.constructor === FeatureSet}
  {#if features.expandable}
    <div class="collapse">
      <input class="min-h-0" bind:checked={open} type="checkbox" />
      <div class="collapse-title p-0 min-h-0">
        <div class="flex flex-row gap-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="swap swap-rotate" class:swap-active={open}>
            <div class="swap-on">
              <svg class="w-6 h-6 fill-current rotate-180" viewBox="0 0 32 32"
                ><path
                  d="M18.221,7.206l9.585,9.585c0.879,0.879,0.879,2.317,0,3.195l-0.8,0.801c-0.877,0.878-2.316,0.878-3.194,0  l-7.315-7.315l-7.315,7.315c-0.878,0.878-2.317,0.878-3.194,0l-0.8-0.801c-0.879-0.878-0.879-2.316,0-3.195l9.587-9.585  c0.471-0.472,1.103-0.682,1.723-0.647C17.115,6.524,17.748,6.734,18.221,7.206z"
                /></svg
              >
            </div>
            <div class="swap-off">
              <svg class="w-6 h-6 fill-current rotate-90" viewBox="0 0 32 32"
                ><path
                  d="M18.221,7.206l9.585,9.585c0.879,0.879,0.879,2.317,0,3.195l-0.8,0.801c-0.877,0.878-2.316,0.878-3.194,0  l-7.315-7.315l-7.315,7.315c-0.878,0.878-2.317,0.878-3.194,0l-0.8-0.801c-0.879-0.878-0.879-2.316,0-3.195l9.587-9.585  c0.471-0.472,1.103-0.682,1.723-0.647C17.115,6.524,17.748,6.734,18.221,7.206z"
                /></svg
              >
            </div>
          </label>
          <p class="font-bold whitespace-nowrap">
            {features.name + "."}
          </p>
          <p class="truncate">
            {features.description}
          </p>
        </div>
      </div>
      <div class="collapse-content p-0">
        <div class="ml-8">
          <svelte:self features={features.features}></svelte:self>
        </div>
      </div>
    </div>
  {:else}
    <div class="flex flex-row gap-2">
      <p class="font-bold whitespace-nowrap">{features.name + "."}</p>
      <p class="truncate">{features.description}</p>
    </div>
  {/if}
{:else}
  <div class="flex flex-row gap-2">
    <p class="font-bold whitespace-nowrap">{features.name + "."}</p>
    <p class="truncate">{features.description}</p>
  </div>
{/if}
