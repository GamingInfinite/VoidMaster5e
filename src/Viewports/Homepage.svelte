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

  import { startModal, viewport } from "../stores.js";

  import "../../public/pagecss/Homepage.less";

  var modalToggle;
  var elementTransition = false;

  startModal.subscribe((value) => {
    modalToggle = value;
  });

  function toggleModal() {
    startModal.update((value) => !value);
  }

  function selectOption(element, callElement) {
    var sel = document.getElementById(element);

    if (sel == null || elementTransition) {
      return;
    }

    elementTransition = true;

    sel.classList.add("fade");

    var call = document.getElementById(callElement);
    var callx = call.getBoundingClientRect().left - 20;
    var cally = call.getBoundingClientRect().top;
    var callw = call.getBoundingClientRect().width;
    var callh = call.getBoundingClientRect().height;

    call.style.left = callx + "px";
    call.style.top = cally + "px";
    call.style.height = callh + "px";
    call.style.width = callw + "px";
    call.style.zIndex = 1;
    call.style.position = "absolute";

    sel.addEventListener("transitionstart", function () {
      call.classList.add("full");
    });

    call.addEventListener("transitionend", function (event) {
      if (event.propertyName != "width") {
        return;
      }
      switch (callElement) {
        case "Player":
          viewport.set(1);
          break;
        default:
          break;
      }
    });
  }
</script>

<Container class="g-0 container-fluid">
  <Row class="align-items-center" style="height: 100vh;">
    <Col class="" id="fun">
      <div
        class="d-flex justify-content-center align-items-center panel"
        id="Player"
        on:click={() => selectOption("DungeonMaster", "Player")}
      >
        <img
          src="https://raw.githubusercontent.com/GamingInfinite/VoidMaster5e/main/public/player.svg"
          alt="player"
          class="panel-svg"
        />
        <p class="panel-text">Player</p>
      </div>
    </Col>
    <Col class="">
      <div
        class="d-flex justify-content-center align-items-center panel"
        id="DungeonMaster"
        on:click={() => selectOption("Player", "DungeonMaster")}
      >
        <img
          src="https://raw.githubusercontent.com/GamingInfinite/VoidMaster5e/5f737668a5df15bdf88f49a791ccf76f635b8969/public/dm.svg"
          alt="Dungeon Master"
          class="panel-svg"
        />
      </div>
    </Col>
  </Row>
  <Modal isOpen={modalToggle} {toggleModal}>
    <ModalHeader {toggleModal}>First Release</ModalHeader>
    <ModalBody>
      <p class="modal-logo">
        <img
          src="https://raw.githubusercontent.com/GamingInfinite/VoidMaster5e/main/public/voidmaster5elogo.png"
          alt="void master logo"
          width="400px"
        />
      </p>
      <p class="modal-text">
        Uh technically not the first release yet, and this will be replaced with
        a changelog that I update on the GitHub that gets read into the app, and
        shown here.
      </p>
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" on:click={toggleModal}>Close</Button>
    </ModalFooter>
  </Modal>
</Container>
