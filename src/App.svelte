<script>
  import { Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "sveltestrap";

  let startModal = false;
  const toggleModal = () => (startModal = !startModal);

  window.onload = function AppLoad() {
    toggleModal
  }
</script>

<div class="App">
  <Container class="g-0 container-fluid">
    <Row class="align-items-center" style="height: 100vh;">
      <Col class="">
        <div class="d-flex justify-content-center align-items-center panel" on:click={toggleModal}>Player</div>
      </Col>
      <Col class="">
        <div class="d-flex justify-content-center align-items-center panel">Dungeon Master</div>
      </Col>
    </Row>
    <Modal isOpen={startModal} {toggleModal}>
      <ModalHeader {toggleModal}>
        Funny Modal
      </ModalHeader>
      <ModalBody>
        We game sometimes.
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" on:click={toggleModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  </Container>
</div>
