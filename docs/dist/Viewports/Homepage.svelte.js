/* src/Viewports/Homepage.svelte generated by Svelte v3.46.1 */
import {
	SvelteComponent,
	attr,
	create_component,
	destroy_component,
	detach,
	element,
	init,
	insert,
	listen,
	mount_component,
	noop,
	safe_not_equal,
	space,
	text,
	transition_in,
	transition_out
} from "../../snowpack/pkg/svelte/internal.js";

import {
	Container,
	Row,
	Col,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button
} from "../../snowpack/pkg/sveltestrap.js";

import { startModal, viewport } from "../stores.js";
import "../../pagecss/Homepage.css.proxy.js";

function create_default_slot_8(ctx) {
	let div;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");

			div.innerHTML = `<img src="https://raw.githubusercontent.com/GamingInfinite/VoidMaster5e/main/public/player.svg" alt="player" class="panel-svg"/> 
        <p class="panel-text">Player</p>`;

			attr(div, "class", "d-flex justify-content-center align-items-center panel");
			attr(div, "id", "Player");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (!mounted) {
				dispose = listen(div, "click", /*click_handler*/ ctx[3]);
				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

// (87:4) <Col class="">
function create_default_slot_7(ctx) {
	let div;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			div.innerHTML = `<img src="https://raw.githubusercontent.com/GamingInfinite/VoidMaster5e/5f737668a5df15bdf88f49a791ccf76f635b8969/public/dm.svg" alt="Dungeon Master" class="panel-svg"/>`;
			attr(div, "class", "d-flex justify-content-center align-items-center panel");
			attr(div, "id", "DungeonMaster");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (!mounted) {
				dispose = listen(div, "click", /*click_handler_1*/ ctx[4]);
				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

// (72:2) <Row class="align-items-center" style="height: 100vh;">
function create_default_slot_6(ctx) {
	let col0;
	let t;
	let col1;
	let current;

	col0 = new Col({
			props: {
				class: "",
				id: "fun",
				$$slots: { default: [create_default_slot_8] },
				$$scope: { ctx }
			}
		});

	col1 = new Col({
			props: {
				class: "",
				$$slots: { default: [create_default_slot_7] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(col0.$$.fragment);
			t = space();
			create_component(col1.$$.fragment);
		},
		m(target, anchor) {
			mount_component(col0, target, anchor);
			insert(target, t, anchor);
			mount_component(col1, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const col0_changes = {};

			if (dirty & /*$$scope*/ 64) {
				col0_changes.$$scope = { dirty, ctx };
			}

			col0.$set(col0_changes);
			const col1_changes = {};

			if (dirty & /*$$scope*/ 64) {
				col1_changes.$$scope = { dirty, ctx };
			}

			col1.$set(col1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(col0.$$.fragment, local);
			transition_in(col1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(col0.$$.fragment, local);
			transition_out(col1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(col0, detaching);
			if (detaching) detach(t);
			destroy_component(col1, detaching);
		}
	};
}

// (102:4) <ModalHeader {toggleModal}>
function create_default_slot_5(ctx) {
	let t;

	return {
		c() {
			t = text("First Release");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (103:4) <ModalBody>
function create_default_slot_4(ctx) {
	let p0;
	let t0;
	let p1;

	return {
		c() {
			p0 = element("p");
			p0.innerHTML = `<img src="https://raw.githubusercontent.com/GamingInfinite/VoidMaster5e/main/public/voidmaster5elogo.png" alt="void master logo" width="400px"/>`;
			t0 = space();
			p1 = element("p");
			p1.textContent = "Uh technically not the first release yet, and this will be replaced with\n        a changelog that I update on the GitHub that gets read into the app, and\n        shown here.";
			attr(p0, "class", "modal-logo");
			attr(p1, "class", "modal-text");
		},
		m(target, anchor) {
			insert(target, p0, anchor);
			insert(target, t0, anchor);
			insert(target, p1, anchor);
		},
		d(detaching) {
			if (detaching) detach(p0);
			if (detaching) detach(t0);
			if (detaching) detach(p1);
		}
	};
}

// (118:6) <Button color="secondary" on:click={toggleModal}>
function create_default_slot_3(ctx) {
	let t;

	return {
		c() {
			t = text("Close");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (117:4) <ModalFooter>
function create_default_slot_2(ctx) {
	let button;
	let current;

	button = new Button({
			props: {
				color: "secondary",
				$$slots: { default: [create_default_slot_3] },
				$$scope: { ctx }
			}
		});

	button.$on("click", /*toggleModal*/ ctx[1]);

	return {
		c() {
			create_component(button.$$.fragment);
		},
		m(target, anchor) {
			mount_component(button, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const button_changes = {};

			if (dirty & /*$$scope*/ 64) {
				button_changes.$$scope = { dirty, ctx };
			}

			button.$set(button_changes);
		},
		i(local) {
			if (current) return;
			transition_in(button.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(button.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(button, detaching);
		}
	};
}

// (101:2) <Modal isOpen={modalToggle} {toggleModal}>
function create_default_slot_1(ctx) {
	let modalheader;
	let t0;
	let modalbody;
	let t1;
	let modalfooter;
	let current;

	modalheader = new ModalHeader({
			props: {
				toggleModal: /*toggleModal*/ ctx[1],
				$$slots: { default: [create_default_slot_5] },
				$$scope: { ctx }
			}
		});

	modalbody = new ModalBody({
			props: {
				$$slots: { default: [create_default_slot_4] },
				$$scope: { ctx }
			}
		});

	modalfooter = new ModalFooter({
			props: {
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(modalheader.$$.fragment);
			t0 = space();
			create_component(modalbody.$$.fragment);
			t1 = space();
			create_component(modalfooter.$$.fragment);
		},
		m(target, anchor) {
			mount_component(modalheader, target, anchor);
			insert(target, t0, anchor);
			mount_component(modalbody, target, anchor);
			insert(target, t1, anchor);
			mount_component(modalfooter, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const modalheader_changes = {};

			if (dirty & /*$$scope*/ 64) {
				modalheader_changes.$$scope = { dirty, ctx };
			}

			modalheader.$set(modalheader_changes);
			const modalbody_changes = {};

			if (dirty & /*$$scope*/ 64) {
				modalbody_changes.$$scope = { dirty, ctx };
			}

			modalbody.$set(modalbody_changes);
			const modalfooter_changes = {};

			if (dirty & /*$$scope*/ 64) {
				modalfooter_changes.$$scope = { dirty, ctx };
			}

			modalfooter.$set(modalfooter_changes);
		},
		i(local) {
			if (current) return;
			transition_in(modalheader.$$.fragment, local);
			transition_in(modalbody.$$.fragment, local);
			transition_in(modalfooter.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(modalheader.$$.fragment, local);
			transition_out(modalbody.$$.fragment, local);
			transition_out(modalfooter.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(modalheader, detaching);
			if (detaching) detach(t0);
			destroy_component(modalbody, detaching);
			if (detaching) detach(t1);
			destroy_component(modalfooter, detaching);
		}
	};
}

// (71:0) <Container class="g-0 container-fluid">
function create_default_slot(ctx) {
	let row;
	let t;
	let modal;
	let current;

	row = new Row({
			props: {
				class: "align-items-center",
				style: "height: 100vh;",
				$$slots: { default: [create_default_slot_6] },
				$$scope: { ctx }
			}
		});

	modal = new Modal({
			props: {
				isOpen: /*modalToggle*/ ctx[0],
				toggleModal: /*toggleModal*/ ctx[1],
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(row.$$.fragment);
			t = space();
			create_component(modal.$$.fragment);
		},
		m(target, anchor) {
			mount_component(row, target, anchor);
			insert(target, t, anchor);
			mount_component(modal, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const row_changes = {};

			if (dirty & /*$$scope*/ 64) {
				row_changes.$$scope = { dirty, ctx };
			}

			row.$set(row_changes);
			const modal_changes = {};
			if (dirty & /*modalToggle*/ 1) modal_changes.isOpen = /*modalToggle*/ ctx[0];

			if (dirty & /*$$scope*/ 64) {
				modal_changes.$$scope = { dirty, ctx };
			}

			modal.$set(modal_changes);
		},
		i(local) {
			if (current) return;
			transition_in(row.$$.fragment, local);
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(row.$$.fragment, local);
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(row, detaching);
			if (detaching) detach(t);
			destroy_component(modal, detaching);
		}
	};
}

function create_fragment(ctx) {
	let container;
	let current;

	container = new Container({
			props: {
				class: "g-0 container-fluid",
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(container.$$.fragment);
		},
		m(target, anchor) {
			mount_component(container, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const container_changes = {};

			if (dirty & /*$$scope, modalToggle*/ 65) {
				container_changes.$$scope = { dirty, ctx };
			}

			container.$set(container_changes);
		},
		i(local) {
			if (current) return;
			transition_in(container.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(container.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(container, detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	var modalToggle;
	var elementTransition = false;

	startModal.subscribe(value => {
		$$invalidate(0, modalToggle = value);
	});

	function toggleModal() {
		startModal.update(value => !value);
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

	const click_handler = () => selectOption("DungeonMaster", "Player");
	const click_handler_1 = () => selectOption("Player", "DungeonMaster");
	return [modalToggle, toggleModal, selectOption, click_handler, click_handler_1];
}

class Homepage extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Homepage;