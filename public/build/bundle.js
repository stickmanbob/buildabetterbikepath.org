
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.2' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/components/mobile_modal.svelte generated by Svelte v3.44.2 */

    const file$4 = "src/components/mobile_modal.svelte";

    function create_fragment$5(ctx) {
    	let section;
    	let img;
    	let img_src_value;
    	let t0;
    	let div;
    	let h10;
    	let a0;
    	let t2;
    	let h11;
    	let a1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			section = element("section");
    			img = element("img");
    			t0 = space();
    			div = element("div");
    			h10 = element("h1");
    			a0 = element("a");
    			a0.textContent = "Sign the Petition";
    			t2 = space();
    			h11 = element("h1");
    			a1 = element("a");
    			a1.textContent = "Attend a Council Meeting";
    			attr_dev(img, "class", "x-button svelte-ug27q");
    			if (!src_url_equal(img.src, img_src_value = "/assets/img/x_icon.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "close menu");
    			add_location(img, file$4, 8, 4, 102);
    			add_location(a0, file$4, 10, 12, 212);
    			attr_dev(h10, "class", "svelte-ug27q");
    			add_location(h10, file$4, 10, 8, 208);
    			add_location(a1, file$4, 11, 12, 254);
    			attr_dev(h11, "class", "svelte-ug27q");
    			add_location(h11, file$4, 11, 8, 250);
    			attr_dev(div, "class", "svelte-ug27q");
    			add_location(div, file$4, 9, 4, 194);
    			attr_dev(section, "class", "svelte-ug27q");
    			add_location(section, file$4, 7, 0, 88);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, img);
    			append_dev(section, t0);
    			append_dev(section, div);
    			append_dev(div, h10);
    			append_dev(h10, a0);
    			append_dev(div, t2);
    			append_dev(div, h11);
    			append_dev(h11, a1);

    			if (!mounted) {
    				dispose = listen_dev(
    					img,
    					"click",
    					function () {
    						if (is_function(/*dismiss*/ ctx[0])) /*dismiss*/ ctx[0].apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Mobile_modal', slots, []);
    	let { dismiss } = $$props;
    	const writable_props = ['dismiss'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Mobile_modal> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('dismiss' in $$props) $$invalidate(0, dismiss = $$props.dismiss);
    	};

    	$$self.$capture_state = () => ({ dismiss });

    	$$self.$inject_state = $$props => {
    		if ('dismiss' in $$props) $$invalidate(0, dismiss = $$props.dismiss);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [dismiss];
    }

    class Mobile_modal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { dismiss: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Mobile_modal",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*dismiss*/ ctx[0] === undefined && !('dismiss' in props)) {
    			console.warn("<Mobile_modal> was created without expected prop 'dismiss'");
    		}
    	}

    	get dismiss() {
    		throw new Error("<Mobile_modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dismiss(value) {
    		throw new Error("<Mobile_modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Header.svelte generated by Svelte v3.44.2 */

    const { console: console_1 } = globals;
    const file$3 = "src/components/Header.svelte";

    // (82:2) {:else}
    function create_else_block(ctx) {
    	let img;
    	let img_src_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = "assets/img/hamburger_icon.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "menu");
    			add_location(img, file$3, 82, 3, 1186);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);

    			if (!mounted) {
    				dispose = listen_dev(img, "click", /*clickMenu*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(82:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (77:2) {#if !mobile}
    function create_if_block_1(ctx) {
    	let div;
    	let h20;
    	let t1;
    	let h21;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h20 = element("h2");
    			h20.textContent = "Sign the Petition";
    			t1 = space();
    			h21 = element("h2");
    			h21.textContent = "Attend a Council Meeting";
    			attr_dev(h20, "class", "nav-button svelte-9cepk");
    			add_location(h20, file$3, 78, 4, 1060);
    			attr_dev(h21, "class", "nav-button svelte-9cepk");
    			add_location(h21, file$3, 79, 4, 1110);
    			attr_dev(div, "class", "buttons-wrapper svelte-9cepk");
    			add_location(div, file$3, 77, 3, 1026);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h20);
    			append_dev(div, t1);
    			append_dev(div, h21);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(77:2) {#if !mobile}",
    		ctx
    	});

    	return block;
    }

    // (88:0) {#if showButtons}
    function create_if_block(ctx) {
    	let buttonsmodal;
    	let current;

    	buttonsmodal = new Mobile_modal({
    			props: { dismiss: /*clickMenu*/ ctx[2] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(buttonsmodal.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(buttonsmodal, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(buttonsmodal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(buttonsmodal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(buttonsmodal, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(88:0) {#if showButtons}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let header;
    	let div1;
    	let div0;
    	let h1;
    	let t1;
    	let t2;
    	let if_block1_anchor;
    	let current;

    	function select_block_type(ctx, dirty) {
    		if (!/*mobile*/ ctx[1]) return create_if_block_1;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);
    	let if_block1 = /*showButtons*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			header = element("header");
    			div1 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Build a Better Bike Path";
    			t1 = space();
    			if_block0.c();
    			t2 = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    			attr_dev(h1, "class", "svelte-9cepk");
    			add_location(h1, file$3, 71, 3, 954);
    			add_location(div0, file$3, 70, 2, 945);
    			attr_dev(div1, "class", "header-inner svelte-9cepk");
    			add_location(div1, file$3, 69, 1, 916);
    			attr_dev(header, "class", "header svelte-9cepk");
    			add_location(header, file$3, 68, 0, 891);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h1);
    			append_dev(div1, t1);
    			if_block0.m(div1, null);
    			insert_dev(target, t2, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if_block0.p(ctx, dirty);

    			if (/*showButtons*/ ctx[0]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*showButtons*/ 1) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block(ctx);
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
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			if_block0.d();
    			if (detaching) detach_dev(t2);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	let mobile = window.innerWidth <= 600;

    	// Setup the hamburger
    	let showButtons = false;

    	function clickMenu(e) {
    		e.preventDefault();
    		console.log("here!");
    		$$invalidate(0, showButtons = !showButtons);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		ButtonsModal: Mobile_modal,
    		mobile,
    		showButtons,
    		clickMenu
    	});

    	$$self.$inject_state = $$props => {
    		if ('mobile' in $$props) $$invalidate(1, mobile = $$props.mobile);
    		if ('showButtons' in $$props) $$invalidate(0, showButtons = $$props.showButtons);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [showButtons, mobile, clickMenu];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/components/main_panel_1.svelte generated by Svelte v3.44.2 */

    const file$2 = "src/components/main_panel_1.svelte";

    function create_fragment$3(ctx) {
    	let section;
    	let div1;
    	let div0;
    	let h1;
    	let t1;
    	let a;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div1 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Re-route the Rincon bike path to preserve our coastal bluffs!";
    			t1 = space();
    			a = element("a");
    			a.textContent = "Sign the Petition!";
    			attr_dev(h1, "class", "svelte-tgjjss");
    			add_location(h1, file$2, 7, 12, 190);
    			attr_dev(a, "href", "about:blank");
    			attr_dev(a, "class", "link-button svelte-tgjjss");
    			add_location(a, file$2, 8, 12, 273);
    			attr_dev(div0, "class", "info-box-inner svelte-tgjjss");
    			add_location(div0, file$2, 6, 8, 149);
    			attr_dev(div1, "class", "info-box svelte-tgjjss");
    			add_location(div1, file$2, 5, 4, 118);
    			attr_dev(section, "class", "svelte-tgjjss");
    			add_location(section, file$2, 4, 0, 104);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h1);
    			append_dev(div0, t1);
    			append_dev(div0, a);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Main_panel_1', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Main_panel_1> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Main_panel_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Main_panel_1",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/components/two_col_panel.svelte generated by Svelte v3.44.2 */

    const file$1 = "src/components/two_col_panel.svelte";
    const get_col2_slot_changes = dirty => ({});
    const get_col2_slot_context = ctx => ({});
    const get_col1_slot_changes = dirty => ({});
    const get_col1_slot_context = ctx => ({});

    function create_fragment$2(ctx) {
    	let section;
    	let div0;
    	let t;
    	let div1;
    	let current;
    	const col1_slot_template = /*#slots*/ ctx[1].col1;
    	const col1_slot = create_slot(col1_slot_template, ctx, /*$$scope*/ ctx[0], get_col1_slot_context);
    	const col2_slot_template = /*#slots*/ ctx[1].col2;
    	const col2_slot = create_slot(col2_slot_template, ctx, /*$$scope*/ ctx[0], get_col2_slot_context);

    	const block = {
    		c: function create() {
    			section = element("section");
    			div0 = element("div");
    			if (col1_slot) col1_slot.c();
    			t = space();
    			div1 = element("div");
    			if (col2_slot) col2_slot.c();
    			attr_dev(div0, "class", "column svelte-hcp29w");
    			add_location(div0, file$1, 5, 4, 105);
    			attr_dev(div1, "class", "column svelte-hcp29w");
    			add_location(div1, file$1, 9, 4, 176);
    			attr_dev(section, "class", "svelte-hcp29w");
    			add_location(section, file$1, 4, 0, 91);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div0);

    			if (col1_slot) {
    				col1_slot.m(div0, null);
    			}

    			append_dev(section, t);
    			append_dev(section, div1);

    			if (col2_slot) {
    				col2_slot.m(div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (col1_slot) {
    				if (col1_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						col1_slot,
    						col1_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(col1_slot_template, /*$$scope*/ ctx[0], dirty, get_col1_slot_changes),
    						get_col1_slot_context
    					);
    				}
    			}

    			if (col2_slot) {
    				if (col2_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						col2_slot,
    						col2_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(col2_slot_template, /*$$scope*/ ctx[0], dirty, get_col2_slot_changes),
    						get_col2_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col1_slot, local);
    			transition_in(col2_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col1_slot, local);
    			transition_out(col2_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if (col1_slot) col1_slot.d(detaching);
    			if (col2_slot) col2_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Two_col_panel', slots, ['col1','col2']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Two_col_panel> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Two_col_panel extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Two_col_panel",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/components/main_panel_2.svelte generated by Svelte v3.44.2 */
    const file = "src/components/main_panel_2.svelte";

    // (21:12) 
    function create_col1_slot(ctx) {
    	let div;
    	let h2;
    	let t1;
    	let img;
    	let img_src_value;
    	let t2;
    	let ul;
    	let li0;
    	let t4;
    	let li1;
    	let t6;
    	let li2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			h2.textContent = "Current Bike Path Design";
    			t1 = space();
    			img = element("img");
    			t2 = space();
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "Disadvantage of path";
    			t4 = space();
    			li1 = element("li");
    			li1.textContent = "Disadvantage of path";
    			t6 = space();
    			li2 = element("li");
    			li2.textContent = "Disadvantage of path";
    			add_location(h2, file, 21, 16, 978);
    			if (!src_url_equal(img.src, img_src_value = "")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "route-image svelte-o5we51");
    			add_location(img, file, 22, 16, 1028);
    			add_location(li0, file, 24, 20, 1109);
    			add_location(li1, file, 25, 20, 1159);
    			add_location(li2, file, 26, 20, 1209);
    			add_location(ul, file, 23, 16, 1084);
    			attr_dev(div, "class", "column-inner svelte-o5we51");
    			attr_dev(div, "slot", "col1");
    			add_location(div, file, 20, 12, 923);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			append_dev(div, t1);
    			append_dev(div, img);
    			append_dev(div, t2);
    			append_dev(div, ul);
    			append_dev(ul, li0);
    			append_dev(ul, t4);
    			append_dev(ul, li1);
    			append_dev(ul, t6);
    			append_dev(ul, li2);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_col1_slot.name,
    		type: "slot",
    		source: "(21:12) ",
    		ctx
    	});

    	return block;
    }

    // (31:12) 
    function create_col2_slot(ctx) {
    	let div;
    	let h2;
    	let t1;
    	let img;
    	let img_src_value;
    	let t2;
    	let ul;
    	let li0;
    	let t4;
    	let li1;
    	let t6;
    	let li2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			h2.textContent = "Alternate # 4 (preferred route)";
    			t1 = space();
    			img = element("img");
    			t2 = space();
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "advantage of path";
    			t4 = space();
    			li1 = element("li");
    			li1.textContent = "advantage of path";
    			t6 = space();
    			li2 = element("li");
    			li2.textContent = "advantage of path";
    			add_location(h2, file, 31, 16, 1348);
    			if (!src_url_equal(img.src, img_src_value = "")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "route-image svelte-o5we51");
    			add_location(img, file, 32, 16, 1405);
    			add_location(li0, file, 34, 20, 1486);
    			add_location(li1, file, 35, 20, 1533);
    			add_location(li2, file, 36, 20, 1580);
    			add_location(ul, file, 33, 16, 1461);
    			attr_dev(div, "class", "column-inner svelte-o5we51");
    			attr_dev(div, "slot", "col2");
    			add_location(div, file, 30, 12, 1293);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			append_dev(div, t1);
    			append_dev(div, img);
    			append_dev(div, t2);
    			append_dev(div, ul);
    			append_dev(ul, li0);
    			append_dev(ul, t4);
    			append_dev(ul, li1);
    			append_dev(ul, t6);
    			append_dev(ul, li2);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_col2_slot.name,
    		type: "slot",
    		source: "(31:12) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let section;
    	let div;
    	let h1;
    	let t1;
    	let ul;
    	let li0;
    	let t3;
    	let li1;
    	let t5;
    	let li2;
    	let t7;
    	let li3;
    	let t9;
    	let twocol;
    	let current;

    	twocol = new Two_col_panel({
    			props: {
    				$$slots: {
    					col2: [create_col2_slot],
    					col1: [create_col1_slot]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			section = element("section");
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "The Rincon Bike Path";
    			t1 = space();
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "This bike path will connect carpineteria avenue with rincon beach and the rest of the coastal trail, however the current design has some serious drawbacks";
    			t3 = space();
    			li1 = element("li");
    			li1.textContent = "The bike path is planned to be routed across a gap in the bluffs, requiring a bridge and tons of earthwork (over 40,000 truckloads!)";
    			t5 = space();
    			li2 = element("li");
    			li2.textContent = "Reason why the path needs to be changed";
    			t7 = space();
    			li3 = element("li");
    			li3.textContent = "Reason wny the path needs to be changed";
    			t9 = space();
    			create_component(twocol.$$.fragment);
    			attr_dev(h1, "class", "svelte-o5we51");
    			add_location(h1, file, 10, 12, 321);
    			add_location(li0, file, 12, 20, 392);
    			add_location(li1, file, 13, 20, 576);
    			add_location(li2, file, 14, 20, 738);
    			add_location(li3, file, 15, 20, 807);
    			add_location(ul, file, 11, 16, 367);
    			attr_dev(div, "class", "text-block svelte-o5we51");
    			add_location(div, file, 9, 8, 284);
    			attr_dev(section, "class", "svelte-o5we51");
    			add_location(section, file, 8, 0, 266);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, ul);
    			append_dev(ul, li0);
    			append_dev(ul, t3);
    			append_dev(ul, li1);
    			append_dev(ul, t5);
    			append_dev(ul, li2);
    			append_dev(ul, t7);
    			append_dev(ul, li3);
    			append_dev(section, t9);
    			mount_component(twocol, section, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const twocol_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				twocol_changes.$$scope = { dirty, ctx };
    			}

    			twocol.$set(twocol_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(twocol.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(twocol.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(twocol);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Main_panel_2', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Main_panel_2> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ TwoCol: Two_col_panel });
    	return [];
    }

    class Main_panel_2 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Main_panel_2",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.44.2 */

    function create_fragment(ctx) {
    	let header;
    	let t0;
    	let panel1;
    	let t1;
    	let panel2;
    	let current;
    	header = new Header({ $$inline: true });
    	panel1 = new Main_panel_1({ $$inline: true });
    	panel2 = new Main_panel_2({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    			t0 = space();
    			create_component(panel1.$$.fragment);
    			t1 = space();
    			create_component(panel2.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(panel1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(panel2, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(panel1.$$.fragment, local);
    			transition_in(panel2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(panel1.$$.fragment, local);
    			transition_out(panel2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(panel1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(panel2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Header, Panel1: Main_panel_1, Panel2: Main_panel_2 });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    var app = new App({
    	target: document.body
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
