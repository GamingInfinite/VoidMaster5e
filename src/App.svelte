<script>
  import Homepage from "./Viewports/Homepage.svelte";
  import "../public/index.less"

  const views = [Homepage];

  let currentView = 0;
  let viewportComponent = null;

  function updateViewportComponent() {
    viewportComponent = views[currentView];
  }
  updateViewportComponent();
</script>

<div class="App" id="viewport">
  {#if viewportComponent == views[currentView]}
    <svelte:component this={viewportComponent} />
  {/if}
</div>
