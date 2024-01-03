<script lang="ts">
  import { toasts } from "../../stores";
</script>

{#each $toasts as toast}
  <div class="toast">
    <div
      class="flex flex-row bg-neutral text-neutral-content w-screen max-w-xs p-8 rounded-xl items-center gap-3"
      data-theme="dark"
    >
      {#if toast.dice}
        <div class="flex flex-col">
          <p class="font-black">{toast.dice}</p>
        </div>
      {/if}
      <div class="flex flex-col">
        <div class="flex flex-row">
          <p class="font-black">{toast.title}</p>
        </div>
        <div class="flex flex-row gap-4">
          {@html toast.body}
        </div>
      </div>
    </div>
  </div>
{/each}
