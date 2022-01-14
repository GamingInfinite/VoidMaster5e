<script>
  import {
    Container,
    Row,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
  } from "sveltestrap";

  let startModal = false;

  function toggleModal() {
    startModal = !startModal;
  }

  window.onload = function AppLoad() {
    toggleModal();
  };
</script>

<div class="App">
  <Container class="g-0 container-fluid">
    <Row class="align-items-center" style="height: 100vh;">
      <Col class="">
        <div class="d-flex justify-content-center align-items-center panel">
          Player
        </div>
      </Col>
      <Col class="">
        <div class="d-flex justify-content-center align-items-center panel">
          Dungeon Master
        </div>
      </Col>
    </Row>
    <Modal isOpen={startModal} {toggleModal}>
      <ModalHeader {toggleModal}>First Release</ModalHeader>
      <ModalBody>
        <p class="modal-logo">
          <img
            src="https://raw.githubusercontent.com/GamingInfinite/VoidMaster5e/main/public/voidmaster5elogo.png"
            alt="void master logo"
            width=400px
          />
        </p>
        <p class="modal-text">
          Uh technically not the first release yet, and this will be replaced
          with a changelog that I update on the GitHub that gets read into the
          app, and shown here.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" on:click={toggleModal}>Close</Button>
      </ModalFooter>
    </Modal>
  </Container>
</div>
