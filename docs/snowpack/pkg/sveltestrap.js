import { S as SvelteComponent, i as init, s as safe_not_equal, r as empty, h as insert, g as group_outros, j as transition_out, c as check_outros, t as transition_in, e as detach, u as compute_rest_props, v as assign, w as exclude_internal_props, x as bubble, y as binding_callbacks, z as create_slot, f as element, A as set_attributes, q as listen, B as update_slot_base, C as get_all_dirty_from_scope, D as get_slot_changes, E as get_spread_update, p as text, l as set_data, n as noop, F as toggle_class, G as add_render_callback, H as create_in_transition, I as create_out_transition, J as onMount, a as attr, K as is_function, o as space, k as append, L as onDestroy, M as append_styles, d as destroy_component, b as create_component, m as mount_component, N as createEventDispatcher, O as afterUpdate, P as run_all } from './common/index-6dbf1cee.js';

function getOriginalBodyPadding() {
  const style = window ? window.getComputedStyle(document.body, null) : {};

  return parseInt((style && style.getPropertyValue('padding-right')) || 0, 10);
}

function getScrollbarWidth() {
  let scrollDiv = document.createElement('div');
  // .modal-scrollbar-measure styles // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/scss/_modal.scss#L106-L113
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}

function setScrollbarWidth(padding) {
  document.body.style.paddingRight = padding > 0 ? `${padding}px` : null;
}

function isBodyOverflowing() {
  return window ? document.body.clientWidth < window.innerWidth : false;
}

function isObject(value) {
  const type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

function conditionallyUpdateScrollbar() {
  const scrollbarWidth = getScrollbarWidth();
  // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.6/js/src/modal.js#L433
  const fixedContent = document.querySelectorAll(
    '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'
  )[0];
  const bodyPadding = fixedContent
    ? parseInt(fixedContent.style.paddingRight || 0, 10)
    : 0;

  if (isBodyOverflowing()) {
    setScrollbarWidth(bodyPadding + scrollbarWidth);
  }
}

function getColumnSizeClass(isXs, colWidth, colSize) {
  if (colSize === true || colSize === '') {
    return isXs ? 'col' : `col-${colWidth}`;
  } else if (colSize === 'auto') {
    return isXs ? 'col-auto' : `col-${colWidth}-auto`;
  }

  return isXs ? `col-${colSize}` : `col-${colWidth}-${colSize}`;
}

function browserEvent(target, ...args) {
  target.addEventListener(...args);

  return () => target.removeEventListener(...args);
}

function toClassName(value) {
  let result = '';

  if (typeof value === 'string' || typeof value === 'number') {
    result += value;
  } else if (typeof value === 'object') {
    if (Array.isArray(value)) {
      result = value.map(toClassName).filter(Boolean).join(' ');
    } else {
      for (let key in value) {
        if (value[key]) {
          result && (result += ' ');
          result += key;
        }
      }
    }
  }

  return result;
}

function classnames(...args) {
  return args.map(toClassName).filter(Boolean).join(' ');
}

function getTransitionDuration(element) {
  if (!element) return 0;

  // Get transition-duration of the element
  let { transitionDuration, transitionDelay } =
    window.getComputedStyle(element);

  const floatTransitionDuration = Number.parseFloat(transitionDuration);
  const floatTransitionDelay = Number.parseFloat(transitionDelay);

  // Return 0 if element or transition duration is not found
  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0;
  }

  // If multiple durations are defined, take the first
  transitionDuration = transitionDuration.split(',')[0];
  transitionDelay = transitionDelay.split(',')[0];

  return (
    (Number.parseFloat(transitionDuration) +
      Number.parseFloat(transitionDelay)) *
    1000
  );
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function backdropIn(node) {
  node.style.display = 'block';

  const duration = getTransitionDuration(node);

  return {
    duration,
    tick: (t) => {
      if (t === 0) {
        node.classList.add('show');
      }
    }
  };
}

function backdropOut(node) {
  node.classList.remove('show');
  const duration = getTransitionDuration(node);

  return {
    duration,
    tick: (t) => {
      if (t === 0) {
        node.style.display = 'none';
      }
    }
  };
}

function modalIn(node) {
  node.style.display = 'block';
  const duration = getTransitionDuration(node);

  return {
    duration,
    tick: (t) => {
      if (t > 0) {
        node.classList.add('show');
      }
    }
  };
}

function modalOut(node) {
  node.classList.remove('show');
  const duration = getTransitionDuration(node);

  return {
    duration,
    tick: (t) => {
      if (t === 1) {
        node.style.display = 'none';
      }
    }
  };
}

/* node_modules/sveltestrap/src/Button.svelte generated by Svelte v3.46.1 */

function create_else_block_1(ctx) {
	let button;
	let button_aria_label_value;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[19].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);
	const default_slot_or_fallback = default_slot || fallback_block(ctx);

	let button_levels = [
		/*$$restProps*/ ctx[9],
		{ class: /*classes*/ ctx[7] },
		{ disabled: /*disabled*/ ctx[2] },
		{ value: /*value*/ ctx[5] },
		{
			"aria-label": button_aria_label_value = /*ariaLabel*/ ctx[8] || /*defaultAriaLabel*/ ctx[6]
		},
		{ style: /*style*/ ctx[4] }
	];

	let button_data = {};

	for (let i = 0; i < button_levels.length; i += 1) {
		button_data = assign(button_data, button_levels[i]);
	}

	return {
		c() {
			button = element("button");
			if (default_slot_or_fallback) default_slot_or_fallback.c();
			set_attributes(button, button_data);
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (default_slot_or_fallback) {
				default_slot_or_fallback.m(button, null);
			}

			if (button.autofocus) button.focus();
			/*button_binding*/ ctx[23](button);
			current = true;

			if (!mounted) {
				dispose = listen(button, "click", /*click_handler_1*/ ctx[21]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 262144)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[18],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[18])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[18], dirty, null),
						null
					);
				}
			} else {
				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*children, $$scope*/ 262146)) {
					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
				}
			}

			set_attributes(button, button_data = get_spread_update(button_levels, [
				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9],
				(!current || dirty & /*classes*/ 128) && { class: /*classes*/ ctx[7] },
				(!current || dirty & /*disabled*/ 4) && { disabled: /*disabled*/ ctx[2] },
				(!current || dirty & /*value*/ 32) && { value: /*value*/ ctx[5] },
				(!current || dirty & /*ariaLabel, defaultAriaLabel*/ 320 && button_aria_label_value !== (button_aria_label_value = /*ariaLabel*/ ctx[8] || /*defaultAriaLabel*/ ctx[6])) && { "aria-label": button_aria_label_value },
				(!current || dirty & /*style*/ 16) && { style: /*style*/ ctx[4] }
			]));
		},
		i(local) {
			if (current) return;
			transition_in(default_slot_or_fallback, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot_or_fallback, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(button);
			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
			/*button_binding*/ ctx[23](null);
			mounted = false;
			dispose();
		}
	};
}

// (37:0) {#if href}
function create_if_block(ctx) {
	let a;
	let current_block_type_index;
	let if_block;
	let a_aria_label_value;
	let current;
	let mounted;
	let dispose;
	const if_block_creators = [create_if_block_1, create_else_block];
	const if_blocks = [];

	function select_block_type_1(ctx, dirty) {
		if (/*children*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_1(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	let a_levels = [
		/*$$restProps*/ ctx[9],
		{ class: /*classes*/ ctx[7] },
		{ disabled: /*disabled*/ ctx[2] },
		{ href: /*href*/ ctx[3] },
		{
			"aria-label": a_aria_label_value = /*ariaLabel*/ ctx[8] || /*defaultAriaLabel*/ ctx[6]
		},
		{ style: /*style*/ ctx[4] }
	];

	let a_data = {};

	for (let i = 0; i < a_levels.length; i += 1) {
		a_data = assign(a_data, a_levels[i]);
	}

	return {
		c() {
			a = element("a");
			if_block.c();
			set_attributes(a, a_data);
		},
		m(target, anchor) {
			insert(target, a, anchor);
			if_blocks[current_block_type_index].m(a, null);
			/*a_binding*/ ctx[22](a);
			current = true;

			if (!mounted) {
				dispose = listen(a, "click", /*click_handler*/ ctx[20]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_1(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(a, null);
			}

			set_attributes(a, a_data = get_spread_update(a_levels, [
				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9],
				(!current || dirty & /*classes*/ 128) && { class: /*classes*/ ctx[7] },
				(!current || dirty & /*disabled*/ 4) && { disabled: /*disabled*/ ctx[2] },
				(!current || dirty & /*href*/ 8) && { href: /*href*/ ctx[3] },
				(!current || dirty & /*ariaLabel, defaultAriaLabel*/ 320 && a_aria_label_value !== (a_aria_label_value = /*ariaLabel*/ ctx[8] || /*defaultAriaLabel*/ ctx[6])) && { "aria-label": a_aria_label_value },
				(!current || dirty & /*style*/ 16) && { style: /*style*/ ctx[4] }
			]));
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(a);
			if_blocks[current_block_type_index].d();
			/*a_binding*/ ctx[22](null);
			mounted = false;
			dispose();
		}
	};
}

// (68:6) {:else}
function create_else_block_2(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[19].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 262144)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[18],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[18])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[18], dirty, null),
						null
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

// (66:6) {#if children}
function create_if_block_2(ctx) {
	let t;

	return {
		c() {
			t = text(/*children*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*children*/ 2) set_data(t, /*children*/ ctx[1]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (65:10)        
function fallback_block(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_2, create_else_block_2];
	const if_blocks = [];

	function select_block_type_2(ctx, dirty) {
		if (/*children*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_2(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_2(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (50:4) {:else}
function create_else_block(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[19].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 262144)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[18],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[18])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[18], dirty, null),
						null
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

// (48:4) {#if children}
function create_if_block_1(ctx) {
	let t;

	return {
		c() {
			t = text(/*children*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*children*/ 2) set_data(t, /*children*/ ctx[1]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

function create_fragment(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_else_block_1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*href*/ ctx[3]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let ariaLabel;
	let classes;
	let defaultAriaLabel;

	const omit_props_names = [
		"class","active","block","children","close","color","disabled","href","inner","outline","size","style","value","white"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	let { class: className = '' } = $$props;
	let { active = false } = $$props;
	let { block = false } = $$props;
	let { children = undefined } = $$props;
	let { close = false } = $$props;
	let { color = 'secondary' } = $$props;
	let { disabled = false } = $$props;
	let { href = '' } = $$props;
	let { inner = undefined } = $$props;
	let { outline = false } = $$props;
	let { size = null } = $$props;
	let { style = '' } = $$props;
	let { value = '' } = $$props;
	let { white = false } = $$props;

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	function click_handler_1(event) {
		bubble.call(this, $$self, event);
	}

	function a_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			inner = $$value;
			$$invalidate(0, inner);
		});
	}

	function button_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			inner = $$value;
			$$invalidate(0, inner);
		});
	}

	$$self.$$set = $$new_props => {
		$$invalidate(24, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
		$$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(10, className = $$new_props.class);
		if ('active' in $$new_props) $$invalidate(11, active = $$new_props.active);
		if ('block' in $$new_props) $$invalidate(12, block = $$new_props.block);
		if ('children' in $$new_props) $$invalidate(1, children = $$new_props.children);
		if ('close' in $$new_props) $$invalidate(13, close = $$new_props.close);
		if ('color' in $$new_props) $$invalidate(14, color = $$new_props.color);
		if ('disabled' in $$new_props) $$invalidate(2, disabled = $$new_props.disabled);
		if ('href' in $$new_props) $$invalidate(3, href = $$new_props.href);
		if ('inner' in $$new_props) $$invalidate(0, inner = $$new_props.inner);
		if ('outline' in $$new_props) $$invalidate(15, outline = $$new_props.outline);
		if ('size' in $$new_props) $$invalidate(16, size = $$new_props.size);
		if ('style' in $$new_props) $$invalidate(4, style = $$new_props.style);
		if ('value' in $$new_props) $$invalidate(5, value = $$new_props.value);
		if ('white' in $$new_props) $$invalidate(17, white = $$new_props.white);
		if ('$$scope' in $$new_props) $$invalidate(18, $$scope = $$new_props.$$scope);
	};

	$$self.$$.update = () => {
		 $$invalidate(8, ariaLabel = $$props['aria-label']);

		if ($$self.$$.dirty & /*className, close, outline, color, size, block, active, white*/ 261120) {
			 $$invalidate(7, classes = classnames(className, close ? 'btn-close' : 'btn', close || `btn${outline ? '-outline' : ''}-${color}`, size ? `btn-${size}` : false, block ? 'd-block w-100' : false, {
				active,
				'btn-close-white': close && white
			}));
		}

		if ($$self.$$.dirty & /*close*/ 8192) {
			 $$invalidate(6, defaultAriaLabel = close ? 'Close' : null);
		}
	};

	$$props = exclude_internal_props($$props);

	return [
		inner,
		children,
		disabled,
		href,
		style,
		value,
		defaultAriaLabel,
		classes,
		ariaLabel,
		$$restProps,
		className,
		active,
		block,
		close,
		color,
		outline,
		size,
		white,
		$$scope,
		slots,
		click_handler,
		click_handler_1,
		a_binding,
		button_binding
	];
}

class Button extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			class: 10,
			active: 11,
			block: 12,
			children: 1,
			close: 13,
			color: 14,
			disabled: 2,
			href: 3,
			inner: 0,
			outline: 15,
			size: 16,
			style: 4,
			value: 5,
			white: 17
		});
	}
}

/* node_modules/sveltestrap/src/Col.svelte generated by Svelte v3.46.1 */

function create_fragment$1(ctx) {
	let div;
	let div_class_value;
	let current;
	const default_slot_template = /*#slots*/ ctx[10].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], null);

	let div_levels = [
		/*$$restProps*/ ctx[1],
		{
			class: div_class_value = /*colClasses*/ ctx[0].join(' ')
		}
	];

	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	return {
		c() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 512)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[9],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, null),
						null
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1],
				{ class: div_class_value }
			]));
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	const omit_props_names = ["class","xs","sm","md","lg","xl","xxl"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	let { class: className = '' } = $$props;
	let { xs = undefined } = $$props;
	let { sm = undefined } = $$props;
	let { md = undefined } = $$props;
	let { lg = undefined } = $$props;
	let { xl = undefined } = $$props;
	let { xxl = undefined } = $$props;
	const colClasses = [];
	const lookup = { xs, sm, md, lg, xl, xxl };

	Object.keys(lookup).forEach(colWidth => {
		const columnProp = lookup[colWidth];

		if (!columnProp && columnProp !== '') {
			return; //no value for this width
		}

		const isXs = colWidth === 'xs';

		if (isObject(columnProp)) {
			const colSizeInterfix = isXs ? '-' : `-${colWidth}-`;
			const colClass = getColumnSizeClass(isXs, colWidth, columnProp.size);

			if (columnProp.size || columnProp.size === '') {
				colClasses.push(colClass);
			}

			if (columnProp.push) {
				colClasses.push(`push${colSizeInterfix}${columnProp.push}`);
			}

			if (columnProp.pull) {
				colClasses.push(`pull${colSizeInterfix}${columnProp.pull}`);
			}

			if (columnProp.offset) {
				colClasses.push(`offset${colSizeInterfix}${columnProp.offset}`);
			}

			if (columnProp.order) {
				colClasses.push(`order${colSizeInterfix}${columnProp.order}`);
			}
		} else {
			colClasses.push(getColumnSizeClass(isXs, colWidth, columnProp));
		}
	});

	if (!colClasses.length) {
		colClasses.push('col');
	}

	if (className) {
		colClasses.push(className);
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
		if ('xs' in $$new_props) $$invalidate(3, xs = $$new_props.xs);
		if ('sm' in $$new_props) $$invalidate(4, sm = $$new_props.sm);
		if ('md' in $$new_props) $$invalidate(5, md = $$new_props.md);
		if ('lg' in $$new_props) $$invalidate(6, lg = $$new_props.lg);
		if ('xl' in $$new_props) $$invalidate(7, xl = $$new_props.xl);
		if ('xxl' in $$new_props) $$invalidate(8, xxl = $$new_props.xxl);
		if ('$$scope' in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
	};

	return [colClasses, $$restProps, className, xs, sm, md, lg, xl, xxl, $$scope, slots];
}

class Col extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
			class: 2,
			xs: 3,
			sm: 4,
			md: 5,
			lg: 6,
			xl: 7,
			xxl: 8
		});
	}
}

/* node_modules/sveltestrap/src/Container.svelte generated by Svelte v3.46.1 */

function create_fragment$2(ctx) {
	let div;
	let current;
	const default_slot_template = /*#slots*/ ctx[10].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], null);
	let div_levels = [/*$$restProps*/ ctx[1], { class: /*classes*/ ctx[0] }];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	return {
		c() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 512)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[9],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, null),
						null
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1],
				(!current || dirty & /*classes*/ 1) && { class: /*classes*/ ctx[0] }
			]));
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	let classes;
	const omit_props_names = ["class","sm","md","lg","xl","xxl","fluid"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	let { class: className = '' } = $$props;
	let { sm = undefined } = $$props;
	let { md = undefined } = $$props;
	let { lg = undefined } = $$props;
	let { xl = undefined } = $$props;
	let { xxl = undefined } = $$props;
	let { fluid = false } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
		if ('sm' in $$new_props) $$invalidate(3, sm = $$new_props.sm);
		if ('md' in $$new_props) $$invalidate(4, md = $$new_props.md);
		if ('lg' in $$new_props) $$invalidate(5, lg = $$new_props.lg);
		if ('xl' in $$new_props) $$invalidate(6, xl = $$new_props.xl);
		if ('xxl' in $$new_props) $$invalidate(7, xxl = $$new_props.xxl);
		if ('fluid' in $$new_props) $$invalidate(8, fluid = $$new_props.fluid);
		if ('$$scope' in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*className, sm, md, lg, xl, xxl, fluid*/ 508) {
			 $$invalidate(0, classes = classnames(className, {
				'container-sm': sm,
				'container-md': md,
				'container-lg': lg,
				'container-xl': xl,
				'container-xxl': xxl,
				'container-fluid': fluid,
				container: !sm && !md && !lg && !xl && !xxl && !fluid
			}));
		}
	};

	return [classes, $$restProps, className, sm, md, lg, xl, xxl, fluid, $$scope, slots];
}

class Container extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
			class: 2,
			sm: 3,
			md: 4,
			lg: 5,
			xl: 6,
			xxl: 7,
			fluid: 8
		});
	}
}

/* node_modules/sveltestrap/src/InlineContainer.svelte generated by Svelte v3.46.1 */

function create_fragment$3(ctx) {
	let div;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	return {
		c() {
			div = element("div");
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[0],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
						null
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function instance$3($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class InlineContainer extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});
	}
}

/* node_modules/sveltestrap/src/ModalBackdrop.svelte generated by Svelte v3.46.1 */

function create_if_block$1(ctx) {
	let div;
	let div_intro;
	let div_outro;
	let current;
	let mounted;
	let dispose;
	let div_levels = [/*$$restProps*/ ctx[4], { class: /*classes*/ ctx[3] }];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	return {
		c() {
			div = element("div");
			set_attributes(div, div_data);
			toggle_class(div, "fade", /*fade*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			current = true;

			if (!mounted) {
				dispose = listen(div, "click", /*click_handler*/ ctx[6]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty & /*$$restProps*/ 16 && /*$$restProps*/ ctx[4],
				(!current || dirty & /*classes*/ 8) && { class: /*classes*/ ctx[3] }
			]));

			toggle_class(div, "fade", /*fade*/ ctx[1]);
		},
		i(local) {
			if (current) return;

			add_render_callback(() => {
				if (div_outro) div_outro.end(1);
				div_intro = create_in_transition(div, backdropIn, {});
				div_intro.start();
			});

			current = true;
		},
		o(local) {
			if (div_intro) div_intro.invalidate();
			div_outro = create_out_transition(div, backdropOut, {});
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (detaching && div_outro) div_outro.end();
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$4(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*isOpen*/ ctx[0] && /*loaded*/ ctx[2] && create_if_block$1(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*isOpen*/ ctx[0] && /*loaded*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*isOpen, loaded*/ 5) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$4($$self, $$props, $$invalidate) {
	let classes;
	const omit_props_names = ["class","isOpen","fade"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { class: className = '' } = $$props;
	let { isOpen = false } = $$props;
	let { fade = true } = $$props;
	let loaded = false;

	onMount(() => {
		$$invalidate(2, loaded = true);
	});

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(5, className = $$new_props.class);
		if ('isOpen' in $$new_props) $$invalidate(0, isOpen = $$new_props.isOpen);
		if ('fade' in $$new_props) $$invalidate(1, fade = $$new_props.fade);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*className*/ 32) {
			 $$invalidate(3, classes = classnames(className, 'modal-backdrop'));
		}
	};

	return [isOpen, fade, loaded, classes, $$restProps, className, click_handler];
}

class ModalBackdrop extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$4, create_fragment$4, safe_not_equal, { class: 5, isOpen: 0, fade: 1 });
	}
}

/* node_modules/sveltestrap/src/ModalBody.svelte generated by Svelte v3.46.1 */

function create_fragment$5(ctx) {
	let div;
	let current;
	const default_slot_template = /*#slots*/ ctx[4].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);
	let div_levels = [/*$$restProps*/ ctx[1], { class: /*classes*/ ctx[0] }];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	return {
		c() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[3],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
						null
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1],
				(!current || dirty & /*classes*/ 1) && { class: /*classes*/ ctx[0] }
			]));
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function instance$5($$self, $$props, $$invalidate) {
	let classes;
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	let { class: className = '' } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*className*/ 4) {
			 $$invalidate(0, classes = classnames(className, 'modal-body'));
		}
	};

	return [classes, $$restProps, className, $$scope, slots];
}

class ModalBody extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$5, create_fragment$5, safe_not_equal, { class: 2 });
	}
}

/* node_modules/sveltestrap/src/ModalHeader.svelte generated by Svelte v3.46.1 */
const get_close_slot_changes = dirty => ({});
const get_close_slot_context = ctx => ({});

// (18:4) {:else}
function create_else_block$1(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 128)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[7],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, null),
						null
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

// (16:4) {#if children}
function create_if_block_1$1(ctx) {
	let t;

	return {
		c() {
			t = text(/*children*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*children*/ 4) set_data(t, /*children*/ ctx[2]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (23:4) {#if typeof toggle === 'function'}
function create_if_block$2(ctx) {
	let button;
	let mounted;
	let dispose;

	return {
		c() {
			button = element("button");
			attr(button, "type", "button");
			attr(button, "class", "btn-close");
			attr(button, "aria-label", /*closeAriaLabel*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (!mounted) {
				dispose = listen(button, "click", function () {
					if (is_function(/*toggle*/ ctx[0])) /*toggle*/ ctx[0].apply(this, arguments);
				});

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*closeAriaLabel*/ 2) {
				attr(button, "aria-label", /*closeAriaLabel*/ ctx[1]);
			}
		},
		d(detaching) {
			if (detaching) detach(button);
			mounted = false;
			dispose();
		}
	};
}

// (22:21)      
function fallback_block$1(ctx) {
	let if_block_anchor;
	let if_block = typeof /*toggle*/ ctx[0] === 'function' && create_if_block$2(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, dirty) {
			if (typeof /*toggle*/ ctx[0] === 'function') {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$2(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function create_fragment$6(ctx) {
	let div;
	let h5;
	let current_block_type_index;
	let if_block;
	let t;
	let current;
	const if_block_creators = [create_if_block_1$1, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*children*/ ctx[2]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	const close_slot_template = /*#slots*/ ctx[8].close;
	const close_slot = create_slot(close_slot_template, ctx, /*$$scope*/ ctx[7], get_close_slot_context);
	const close_slot_or_fallback = close_slot || fallback_block$1(ctx);
	let div_levels = [/*$$restProps*/ ctx[5], { class: /*classes*/ ctx[4] }];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	return {
		c() {
			div = element("div");
			h5 = element("h5");
			if_block.c();
			t = space();
			if (close_slot_or_fallback) close_slot_or_fallback.c();
			attr(h5, "class", "modal-title");
			attr(h5, "id", /*id*/ ctx[3]);
			set_attributes(div, div_data);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, h5);
			if_blocks[current_block_type_index].m(h5, null);
			append(div, t);

			if (close_slot_or_fallback) {
				close_slot_or_fallback.m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(h5, null);
			}

			if (!current || dirty & /*id*/ 8) {
				attr(h5, "id", /*id*/ ctx[3]);
			}

			if (close_slot) {
				if (close_slot.p && (!current || dirty & /*$$scope*/ 128)) {
					update_slot_base(
						close_slot,
						close_slot_template,
						ctx,
						/*$$scope*/ ctx[7],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
						: get_slot_changes(close_slot_template, /*$$scope*/ ctx[7], dirty, get_close_slot_changes),
						get_close_slot_context
					);
				}
			} else {
				if (close_slot_or_fallback && close_slot_or_fallback.p && (!current || dirty & /*closeAriaLabel, toggle*/ 3)) {
					close_slot_or_fallback.p(ctx, !current ? -1 : dirty);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty & /*$$restProps*/ 32 && /*$$restProps*/ ctx[5],
				(!current || dirty & /*classes*/ 16) && { class: /*classes*/ ctx[4] }
			]));
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			transition_in(close_slot_or_fallback, local);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			transition_out(close_slot_or_fallback, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if_blocks[current_block_type_index].d();
			if (close_slot_or_fallback) close_slot_or_fallback.d(detaching);
		}
	};
}

function instance$6($$self, $$props, $$invalidate) {
	let classes;
	const omit_props_names = ["class","toggle","closeAriaLabel","children","id"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	let { class: className = '' } = $$props;
	let { toggle = undefined } = $$props;
	let { closeAriaLabel = 'Close' } = $$props;
	let { children = undefined } = $$props;
	let { id = undefined } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(6, className = $$new_props.class);
		if ('toggle' in $$new_props) $$invalidate(0, toggle = $$new_props.toggle);
		if ('closeAriaLabel' in $$new_props) $$invalidate(1, closeAriaLabel = $$new_props.closeAriaLabel);
		if ('children' in $$new_props) $$invalidate(2, children = $$new_props.children);
		if ('id' in $$new_props) $$invalidate(3, id = $$new_props.id);
		if ('$$scope' in $$new_props) $$invalidate(7, $$scope = $$new_props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*className*/ 64) {
			 $$invalidate(4, classes = classnames(className, 'modal-header'));
		}
	};

	return [
		toggle,
		closeAriaLabel,
		children,
		id,
		classes,
		$$restProps,
		className,
		$$scope,
		slots
	];
}

class ModalHeader extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
			class: 6,
			toggle: 0,
			closeAriaLabel: 1,
			children: 2,
			id: 3
		});
	}
}

/* node_modules/sveltestrap/src/Portal.svelte generated by Svelte v3.46.1 */

function create_fragment$7(ctx) {
	let div;
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);
	let div_levels = [/*$$restProps*/ ctx[1]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	return {
		c() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding*/ ctx[4](div);
			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]]));
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
			/*div_binding*/ ctx[4](null);
		}
	};
}

function instance$7($$self, $$props, $$invalidate) {
	const omit_props_names = [];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	let ref;
	let portal;

	onMount(() => {
		portal = document.createElement('div');
		document.body.appendChild(portal);
		portal.appendChild(ref);
	});

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.body.removeChild(portal);
		}
	});

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			ref = $$value;
			$$invalidate(0, ref);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
	};

	return [ref, $$restProps, $$scope, slots, div_binding];
}

class Portal extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});
	}
}

/* node_modules/sveltestrap/src/Modal.svelte generated by Svelte v3.46.1 */

function add_css(target) {
	append_styles(target, "svelte-d87gpn", ".modal-open{overflow:hidden;padding-right:0}");
}

const get_external_slot_changes = dirty => ({});
const get_external_slot_context = ctx => ({});

// (223:0) {#if _isMounted}
function create_if_block_1$2(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*outer*/ ctx[13];

	function switch_props(ctx) {
		return {
			props: {
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			}
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	return {
		c() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert(target, switch_instance_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const switch_instance_changes = {};

			if (dirty[0] & /*wrapClassName, $$restProps, labelledBy, modalClassName, fade, staticModal, classes, _dialog, contentClassName, body, toggle, header, isOpen*/ 2119615 | dirty[1] & /*$$scope*/ 8) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (switch_value !== (switch_value = /*outer*/ ctx[13])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};
}

// (226:6) {#if isOpen}
function create_if_block_2$1(ctx) {
	let div2;
	let t0;
	let div1;
	let div0;
	let t1;
	let current_block_type_index;
	let if_block1;
	let div0_class_value;
	let div2_class_value;
	let div2_intro;
	let div2_outro;
	let current;
	let mounted;
	let dispose;
	const external_slot_template = /*#slots*/ ctx[31].external;
	const external_slot = create_slot(external_slot_template, ctx, /*$$scope*/ ctx[34], get_external_slot_context);
	let if_block0 = /*header*/ ctx[3] && create_if_block_4(ctx);
	const if_block_creators = [create_if_block_3, create_else_block$2];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*body*/ ctx[2]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			div2 = element("div");
			if (external_slot) external_slot.c();
			t0 = space();
			div1 = element("div");
			div0 = element("div");
			if (if_block0) if_block0.c();
			t1 = space();
			if_block1.c();
			attr(div0, "class", div0_class_value = classnames('modal-content', /*contentClassName*/ ctx[9]));
			attr(div1, "class", /*classes*/ ctx[14]);
			attr(div1, "role", "document");
			attr(div2, "aria-labelledby", /*labelledBy*/ ctx[5]);

			attr(div2, "class", div2_class_value = classnames('modal', /*modalClassName*/ ctx[8], {
				fade: /*fade*/ ctx[10],
				'position-static': /*staticModal*/ ctx[0]
			}));

			attr(div2, "role", "dialog");
		},
		m(target, anchor) {
			insert(target, div2, anchor);

			if (external_slot) {
				external_slot.m(div2, null);
			}

			append(div2, t0);
			append(div2, div1);
			append(div1, div0);
			if (if_block0) if_block0.m(div0, null);
			append(div0, t1);
			if_blocks[current_block_type_index].m(div0, null);
			/*div1_binding*/ ctx[32](div1);
			current = true;

			if (!mounted) {
				dispose = [
					listen(div2, "introstart", /*introstart_handler*/ ctx[33]),
					listen(div2, "introend", /*onModalOpened*/ ctx[17]),
					listen(div2, "outrostart", /*onModalClosing*/ ctx[18]),
					listen(div2, "outroend", /*onModalClosed*/ ctx[19]),
					listen(div2, "click", /*handleBackdropClick*/ ctx[16]),
					listen(div2, "mousedown", /*handleBackdropMouseDown*/ ctx[20])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (external_slot) {
				if (external_slot.p && (!current || dirty[1] & /*$$scope*/ 8)) {
					update_slot_base(
						external_slot,
						external_slot_template,
						ctx,
						/*$$scope*/ ctx[34],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[34])
						: get_slot_changes(external_slot_template, /*$$scope*/ ctx[34], dirty, get_external_slot_changes),
						get_external_slot_context
					);
				}
			}

			if (/*header*/ ctx[3]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*header*/ 8) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_4(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(div0, t1);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block1 = if_blocks[current_block_type_index];

				if (!if_block1) {
					if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block1.c();
				} else {
					if_block1.p(ctx, dirty);
				}

				transition_in(if_block1, 1);
				if_block1.m(div0, null);
			}

			if (!current || dirty[0] & /*contentClassName*/ 512 && div0_class_value !== (div0_class_value = classnames('modal-content', /*contentClassName*/ ctx[9]))) {
				attr(div0, "class", div0_class_value);
			}

			if (!current || dirty[0] & /*classes*/ 16384) {
				attr(div1, "class", /*classes*/ ctx[14]);
			}

			if (!current || dirty[0] & /*labelledBy*/ 32) {
				attr(div2, "aria-labelledby", /*labelledBy*/ ctx[5]);
			}

			if (!current || dirty[0] & /*modalClassName, fade, staticModal*/ 1281 && div2_class_value !== (div2_class_value = classnames('modal', /*modalClassName*/ ctx[8], {
				fade: /*fade*/ ctx[10],
				'position-static': /*staticModal*/ ctx[0]
			}))) {
				attr(div2, "class", div2_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(external_slot, local);
			transition_in(if_block0);
			transition_in(if_block1);

			add_render_callback(() => {
				if (div2_outro) div2_outro.end(1);
				div2_intro = create_in_transition(div2, modalIn, {});
				div2_intro.start();
			});

			current = true;
		},
		o(local) {
			transition_out(external_slot, local);
			transition_out(if_block0);
			transition_out(if_block1);
			if (div2_intro) div2_intro.invalidate();
			div2_outro = create_out_transition(div2, modalOut, {});
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div2);
			if (external_slot) external_slot.d(detaching);
			if (if_block0) if_block0.d();
			if_blocks[current_block_type_index].d();
			/*div1_binding*/ ctx[32](null);
			if (detaching && div2_outro) div2_outro.end();
			mounted = false;
			run_all(dispose);
		}
	};
}

// (246:14) {#if header}
function create_if_block_4(ctx) {
	let modalheader;
	let current;

	modalheader = new ModalHeader({
			props: {
				toggle: /*toggle*/ ctx[4],
				id: /*labelledBy*/ ctx[5],
				$$slots: { default: [create_default_slot_3] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(modalheader.$$.fragment);
		},
		m(target, anchor) {
			mount_component(modalheader, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const modalheader_changes = {};
			if (dirty[0] & /*toggle*/ 16) modalheader_changes.toggle = /*toggle*/ ctx[4];
			if (dirty[0] & /*labelledBy*/ 32) modalheader_changes.id = /*labelledBy*/ ctx[5];

			if (dirty[0] & /*header*/ 8 | dirty[1] & /*$$scope*/ 8) {
				modalheader_changes.$$scope = { dirty, ctx };
			}

			modalheader.$set(modalheader_changes);
		},
		i(local) {
			if (current) return;
			transition_in(modalheader.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(modalheader.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(modalheader, detaching);
		}
	};
}

// (247:16) <ModalHeader {toggle} id={labelledBy}>
function create_default_slot_3(ctx) {
	let t;

	return {
		c() {
			t = text(/*header*/ ctx[3]);
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*header*/ 8) set_data(t, /*header*/ ctx[3]);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (255:14) {:else}
function create_else_block$2(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[31].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[34], null);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 8)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[34],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[34])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[34], dirty, null),
						null
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

// (251:14) {#if body}
function create_if_block_3(ctx) {
	let modalbody;
	let current;

	modalbody = new ModalBody({
			props: {
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(modalbody.$$.fragment);
		},
		m(target, anchor) {
			mount_component(modalbody, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const modalbody_changes = {};

			if (dirty[1] & /*$$scope*/ 8) {
				modalbody_changes.$$scope = { dirty, ctx };
			}

			modalbody.$set(modalbody_changes);
		},
		i(local) {
			if (current) return;
			transition_in(modalbody.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(modalbody.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(modalbody, detaching);
		}
	};
}

// (252:16) <ModalBody>
function create_default_slot_2(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[31].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[34], null);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 8)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[34],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[34])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[34], dirty, null),
						null
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

// (224:2) <svelte:component this={outer}>
function create_default_slot_1(ctx) {
	let div;
	let current;
	let if_block = /*isOpen*/ ctx[1] && create_if_block_2$1(ctx);

	let div_levels = [
		{ class: /*wrapClassName*/ ctx[7] },
		{ tabindex: "-1" },
		/*$$restProps*/ ctx[21]
	];

	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	return {
		c() {
			div = element("div");
			if (if_block) if_block.c();
			set_attributes(div, div_data);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block) if_block.m(div, null);
			current = true;
		},
		p(ctx, dirty) {
			if (/*isOpen*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty[0] & /*isOpen*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_2$1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				(!current || dirty[0] & /*wrapClassName*/ 128) && { class: /*wrapClassName*/ ctx[7] },
				{ tabindex: "-1" },
				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21]
			]));
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (if_block) if_block.d();
		}
	};
}

// (265:0) {#if backdrop && !staticModal}
function create_if_block$3(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*outer*/ ctx[13];

	function switch_props(ctx) {
		return {
			props: {
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	return {
		c() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert(target, switch_instance_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const switch_instance_changes = {};

			if (dirty[0] & /*fade, isOpen*/ 1026 | dirty[1] & /*$$scope*/ 8) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (switch_value !== (switch_value = /*outer*/ ctx[13])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};
}

// (266:2) <svelte:component this={outer}>
function create_default_slot(ctx) {
	let modalbackdrop;
	let current;

	modalbackdrop = new ModalBackdrop({
			props: {
				fade: /*fade*/ ctx[10],
				isOpen: /*isOpen*/ ctx[1]
			}
		});

	return {
		c() {
			create_component(modalbackdrop.$$.fragment);
		},
		m(target, anchor) {
			mount_component(modalbackdrop, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const modalbackdrop_changes = {};
			if (dirty[0] & /*fade*/ 1024) modalbackdrop_changes.fade = /*fade*/ ctx[10];
			if (dirty[0] & /*isOpen*/ 2) modalbackdrop_changes.isOpen = /*isOpen*/ ctx[1];
			modalbackdrop.$set(modalbackdrop_changes);
		},
		i(local) {
			if (current) return;
			transition_in(modalbackdrop.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(modalbackdrop.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(modalbackdrop, detaching);
		}
	};
}

function create_fragment$8(ctx) {
	let t;
	let if_block1_anchor;
	let current;
	let if_block0 = /*_isMounted*/ ctx[11] && create_if_block_1$2(ctx);
	let if_block1 = /*backdrop*/ ctx[6] && !/*staticModal*/ ctx[0] && create_if_block$3(ctx);

	return {
		c() {
			if (if_block0) if_block0.c();
			t = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, if_block1_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (/*_isMounted*/ ctx[11]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*_isMounted*/ 2048) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_1$2(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t.parentNode, t);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*backdrop*/ ctx[6] && !/*staticModal*/ ctx[0]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[0] & /*backdrop, staticModal*/ 65) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block$3(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach(if_block1_anchor);
		}
	};
}

let openCount = 0;
const dialogBaseClass = 'modal-dialog';

function instance$8($$self, $$props, $$invalidate) {
	let classes;
	let outer;

	const omit_props_names = [
		"class","static","isOpen","autoFocus","body","centered","container","fullscreen","header","scrollable","size","toggle","labelledBy","backdrop","wrapClassName","modalClassName","contentClassName","fade","unmountOnClose","returnFocusAfterClose"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	const dispatch = createEventDispatcher();
	let { class: className = '' } = $$props;
	let { static: staticModal = false } = $$props;
	let { isOpen = false } = $$props;
	let { autoFocus = true } = $$props;
	let { body = false } = $$props;
	let { centered = false } = $$props;
	let { container = undefined } = $$props;
	let { fullscreen = false } = $$props;
	let { header = undefined } = $$props;
	let { scrollable = false } = $$props;
	let { size = '' } = $$props;
	let { toggle = undefined } = $$props;
	let { labelledBy = header ? `modal-${uuid()}` : undefined } = $$props;
	let { backdrop = true } = $$props;
	let { wrapClassName = '' } = $$props;
	let { modalClassName = '' } = $$props;
	let { contentClassName = '' } = $$props;
	let { fade = true } = $$props;
	let { unmountOnClose = true } = $$props;
	let { returnFocusAfterClose = true } = $$props;
	let hasOpened = false;
	let _isMounted = false;
	let _triggeringElement;
	let _originalBodyPadding;
	let _lastIsOpen = isOpen;
	let _lastHasOpened = hasOpened;
	let _dialog;
	let _mouseDownElement;
	let _removeEscListener;

	onMount(() => {
		if (isOpen) {
			init();
			hasOpened = true;
		}

		if (hasOpened && autoFocus) {
			setFocus();
		}
	});

	onDestroy(() => {
		destroy();

		if (hasOpened) {
			close();
		}
	});

	afterUpdate(() => {
		if (isOpen && !_lastIsOpen) {
			init();
			hasOpened = true;
		}

		if (autoFocus && hasOpened && !_lastHasOpened) {
			setFocus();
		}

		_lastIsOpen = isOpen;
		_lastHasOpened = hasOpened;
	});

	function setFocus() {
		if (_dialog && _dialog.parentNode && typeof _dialog.parentNode.focus === 'function') {
			_dialog.parentNode.focus();
		}
	}

	function init() {
		try {
			_triggeringElement = document.activeElement;
		} catch(err) {
			_triggeringElement = null;
		}

		if (!staticModal) {
			_originalBodyPadding = getOriginalBodyPadding();
			conditionallyUpdateScrollbar();

			if (openCount === 0) {
				document.body.className = classnames(document.body.className, 'modal-open');
			}

			++openCount;
		}

		$$invalidate(11, _isMounted = true);
	}

	function manageFocusAfterClose() {
		if (_triggeringElement) {
			if (typeof _triggeringElement.focus === 'function' && returnFocusAfterClose) {
				_triggeringElement.focus();
			}

			_triggeringElement = null;
		}
	}

	function destroy() {
		manageFocusAfterClose();
	}

	function close() {
		if (openCount <= 1) {
			document.body.classList.remove('modal-open');
		}

		manageFocusAfterClose();
		openCount = Math.max(0, openCount - 1);
		setScrollbarWidth(_originalBodyPadding);
	}

	function handleBackdropClick(e) {
		if (e.target === _mouseDownElement) {
			e.stopPropagation();

			if (!isOpen || !backdrop) {
				return;
			}

			const backdropElem = _dialog ? _dialog.parentNode : null;

			if (backdrop === true && backdropElem && e.target === backdropElem && toggle) {
				toggle(e);
			}
		}
	}

	function onModalOpened() {
		dispatch('open');

		_removeEscListener = browserEvent(document, 'keydown', event => {
			if (event.key && event.key === 'Escape') {
				if (toggle && backdrop === true) {
					if (_removeEscListener) _removeEscListener();
					toggle(event);
				}
			}
		});
	}

	function onModalClosing() {
		dispatch('closing');

		if (_removeEscListener) {
			_removeEscListener();
		}
	}

	function onModalClosed() {
		dispatch('close');

		if (unmountOnClose) {
			destroy();
		}

		close();

		if (_isMounted) {
			hasOpened = false;
		}

		$$invalidate(11, _isMounted = false);
	}

	function handleBackdropMouseDown(e) {
		_mouseDownElement = e.target;
	}

	function div1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			_dialog = $$value;
			$$invalidate(12, _dialog);
		});
	}

	const introstart_handler = () => dispatch('opening');

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(21, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(22, className = $$new_props.class);
		if ('static' in $$new_props) $$invalidate(0, staticModal = $$new_props.static);
		if ('isOpen' in $$new_props) $$invalidate(1, isOpen = $$new_props.isOpen);
		if ('autoFocus' in $$new_props) $$invalidate(23, autoFocus = $$new_props.autoFocus);
		if ('body' in $$new_props) $$invalidate(2, body = $$new_props.body);
		if ('centered' in $$new_props) $$invalidate(24, centered = $$new_props.centered);
		if ('container' in $$new_props) $$invalidate(25, container = $$new_props.container);
		if ('fullscreen' in $$new_props) $$invalidate(26, fullscreen = $$new_props.fullscreen);
		if ('header' in $$new_props) $$invalidate(3, header = $$new_props.header);
		if ('scrollable' in $$new_props) $$invalidate(27, scrollable = $$new_props.scrollable);
		if ('size' in $$new_props) $$invalidate(28, size = $$new_props.size);
		if ('toggle' in $$new_props) $$invalidate(4, toggle = $$new_props.toggle);
		if ('labelledBy' in $$new_props) $$invalidate(5, labelledBy = $$new_props.labelledBy);
		if ('backdrop' in $$new_props) $$invalidate(6, backdrop = $$new_props.backdrop);
		if ('wrapClassName' in $$new_props) $$invalidate(7, wrapClassName = $$new_props.wrapClassName);
		if ('modalClassName' in $$new_props) $$invalidate(8, modalClassName = $$new_props.modalClassName);
		if ('contentClassName' in $$new_props) $$invalidate(9, contentClassName = $$new_props.contentClassName);
		if ('fade' in $$new_props) $$invalidate(10, fade = $$new_props.fade);
		if ('unmountOnClose' in $$new_props) $$invalidate(29, unmountOnClose = $$new_props.unmountOnClose);
		if ('returnFocusAfterClose' in $$new_props) $$invalidate(30, returnFocusAfterClose = $$new_props.returnFocusAfterClose);
		if ('$$scope' in $$new_props) $$invalidate(34, $$scope = $$new_props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*className, size, fullscreen, centered, scrollable*/ 490733568) {
			 $$invalidate(14, classes = classnames(dialogBaseClass, className, {
				[`modal-${size}`]: size,
				'modal-fullscreen': fullscreen === true,
				[`modal-fullscreen-${fullscreen}-down`]: fullscreen && typeof fullscreen === 'string',
				[`${dialogBaseClass}-centered`]: centered,
				[`${dialogBaseClass}-scrollable`]: scrollable
			}));
		}

		if ($$self.$$.dirty[0] & /*container, staticModal*/ 33554433) {
			 $$invalidate(13, outer = container === 'inline' || staticModal
			? InlineContainer
			: Portal);
		}
	};

	return [
		staticModal,
		isOpen,
		body,
		header,
		toggle,
		labelledBy,
		backdrop,
		wrapClassName,
		modalClassName,
		contentClassName,
		fade,
		_isMounted,
		_dialog,
		outer,
		classes,
		dispatch,
		handleBackdropClick,
		onModalOpened,
		onModalClosing,
		onModalClosed,
		handleBackdropMouseDown,
		$$restProps,
		className,
		autoFocus,
		centered,
		container,
		fullscreen,
		scrollable,
		size,
		unmountOnClose,
		returnFocusAfterClose,
		slots,
		div1_binding,
		introstart_handler,
		$$scope
	];
}

class Modal extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$8,
			create_fragment$8,
			safe_not_equal,
			{
				class: 22,
				static: 0,
				isOpen: 1,
				autoFocus: 23,
				body: 2,
				centered: 24,
				container: 25,
				fullscreen: 26,
				header: 3,
				scrollable: 27,
				size: 28,
				toggle: 4,
				labelledBy: 5,
				backdrop: 6,
				wrapClassName: 7,
				modalClassName: 8,
				contentClassName: 9,
				fade: 10,
				unmountOnClose: 29,
				returnFocusAfterClose: 30
			},
			add_css,
			[-1, -1]
		);
	}
}

/* node_modules/sveltestrap/src/ModalFooter.svelte generated by Svelte v3.46.1 */

function create_fragment$9(ctx) {
	let div;
	let current;
	const default_slot_template = /*#slots*/ ctx[4].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);
	let div_levels = [/*$$restProps*/ ctx[1], { class: /*classes*/ ctx[0] }];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	return {
		c() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[3],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
						null
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1],
				(!current || dirty & /*classes*/ 1) && { class: /*classes*/ ctx[0] }
			]));
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function instance$9($$self, $$props, $$invalidate) {
	let classes;
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	let { class: className = '' } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*className*/ 4) {
			 $$invalidate(0, classes = classnames(className, 'modal-footer'));
		}
	};

	return [classes, $$restProps, className, $$scope, slots];
}

class ModalFooter extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$9, create_fragment$9, safe_not_equal, { class: 2 });
	}
}

/* node_modules/sveltestrap/src/Row.svelte generated by Svelte v3.46.1 */

function create_fragment$a(ctx) {
	let div;
	let current;
	const default_slot_template = /*#slots*/ ctx[7].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);
	let div_levels = [/*$$restProps*/ ctx[1], { class: /*classes*/ ctx[0] }];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	return {
		c() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 64)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[6],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[6])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[6], dirty, null),
						null
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1],
				(!current || dirty & /*classes*/ 1) && { class: /*classes*/ ctx[0] }
			]));
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function getCols(cols) {
	const colsValue = parseInt(cols);

	if (!isNaN(colsValue)) {
		if (colsValue > 0) {
			return [`row-cols-${colsValue}`];
		}
	} else if (typeof cols === 'object') {
		return ['xs', 'sm', 'md', 'lg', 'xl'].map(colWidth => {
			const isXs = colWidth === 'xs';
			const colSizeInterfix = isXs ? '-' : `-${colWidth}-`;
			const value = cols[colWidth];

			if (typeof value === 'number' && value > 0) {
				return `row-cols${colSizeInterfix}${value}`;
			}

			return null;
		}).filter(value => !!value);
	}

	return [];
}

function instance$a($$self, $$props, $$invalidate) {
	let classes;
	const omit_props_names = ["class","noGutters","form","cols"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	let { class: className = '' } = $$props;
	let { noGutters = false } = $$props;
	let { form = false } = $$props;
	let { cols = 0 } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
		if ('noGutters' in $$new_props) $$invalidate(3, noGutters = $$new_props.noGutters);
		if ('form' in $$new_props) $$invalidate(4, form = $$new_props.form);
		if ('cols' in $$new_props) $$invalidate(5, cols = $$new_props.cols);
		if ('$$scope' in $$new_props) $$invalidate(6, $$scope = $$new_props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*className, noGutters, form, cols*/ 60) {
			 $$invalidate(0, classes = classnames(className, noGutters ? 'gx-0' : null, form ? 'form-row' : 'row', ...getCols(cols)));
		}
	};

	return [classes, $$restProps, className, noGutters, form, cols, $$scope, slots];
}

class Row extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$a, create_fragment$a, safe_not_equal, { class: 2, noGutters: 3, form: 4, cols: 5 });
	}
}

export { Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row };
