<script>
  import { Container, Row, Col } from "sveltestrap";
  import PlayerPreviewCard from "../Components/PlayerPreviewCard.svelte";
</script>

<Container class="g-0 container-fluid">
  <Row class="" style="height: 100vh;">
    <Col>
      <div class="d-flex justify-content-center mt-5">
        <PlayerPreviewCard characterName="Astariel" characterRace="Elf" characterClasses={["Barbarian"]} />
      </div>
    </Col>
  </Row>
</Container>
