/* src/Viewports/CharacterSelect.svelte generated by Svelte v3.46.1 */
import {
	SvelteComponent,
	attr,
	create_component,
	destroy_component,
	detach,
	element,
	init,
	insert,
	mount_component,
	noop,
	safe_not_equal,
	transition_in,
	transition_out
} from "../../snowpack/pkg/svelte/internal.js";

import { Container, Row, Col } from "../../snowpack/pkg/sveltestrap.js";
import PlayerPreviewCard from "../Components/PlayerPreviewCard.svelte.js";

function create_default_slot_2(ctx) {
	let div;
	let playerpreviewcard;
	let current;

	playerpreviewcard = new PlayerPreviewCard({
			props: {
				characterName: "Astariel",
				characterRace: "Elf",
				characterClasses: ["Barbarian"]
			}
		});

	return {
		c() {
			div = element("div");
			create_component(playerpreviewcard.$$.fragment);
			attr(div, "class", "d-flex justify-content-center mt-5");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(playerpreviewcard, div, null);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(playerpreviewcard.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(playerpreviewcard.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(playerpreviewcard);
		}
	};
}

// (7:2) <Row class="" style="height: 100vh;">
function create_default_slot_1(ctx) {
	let col;
	let current;

	col = new Col({
			props: {
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(col.$$.fragment);
		},
		m(target, anchor) {
			mount_component(col, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const col_changes = {};

			if (dirty & /*$$scope*/ 1) {
				col_changes.$$scope = { dirty, ctx };
			}

			col.$set(col_changes);
		},
		i(local) {
			if (current) return;
			transition_in(col.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(col.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(col, detaching);
		}
	};
}

// (6:0) <Container class="g-0 container-fluid">
function create_default_slot(ctx) {
	let row;
	let current;

	row = new Row({
			props: {
				class: "",
				style: "height: 100vh;",
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(row.$$.fragment);
		},
		m(target, anchor) {
			mount_component(row, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const row_changes = {};

			if (dirty & /*$$scope*/ 1) {
				row_changes.$$scope = { dirty, ctx };
			}

			row.$set(row_changes);
		},
		i(local) {
			if (current) return;
			transition_in(row.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(row.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(row, detaching);
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

			if (dirty & /*$$scope*/ 1) {
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

class CharacterSelect extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment, safe_not_equal, {});
	}
}

export default CharacterSelect;