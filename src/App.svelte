<script>
  import Homepage from "./Viewports/Homepage.svelte";
  import CharacterSelect from "./Viewports/CharacterSelect.svelte";
  import "../public/index.less";

  import { viewport } from "./stores";

  const views = [Homepage, CharacterSelect, CharacterSelect];

  let viewportComponent = null;

  viewport.set(0);

  viewport.subscribe((value) => {
    updateViewportComponent(value);
  });

  function updateViewportComponent(currentView) {
    viewportComponent = views[currentView];
  }
  updateViewportComponent(0);
</script>

<div class="App" id="viewport">
  <svelte:component this={viewportComponent} />
</div>
