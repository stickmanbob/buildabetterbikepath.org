
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

    const file$6 = "src/components/mobile_modal.svelte";

    function create_fragment$7(ctx) {
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
    			attr_dev(img, "class", "x-button svelte-fn4sf6");
    			if (!src_url_equal(img.src, img_src_value = "assets/img/x_icon.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "close menu");
    			add_location(img, file$6, 8, 4, 102);
    			attr_dev(a0, "href", "https://www.change.org/p/carpinteria-city-council-save-bates-carpinteria-s-historic-flying-site-f1131508-0d82-4ded-802c-a1226c01e049?utm_content=cl_sharecopy_27790827_en-US%3A3&recruiter=26187358&utm_source=share_petition&utm_medium=copylink&utm_campaign=share_petition");
    			attr_dev(a0, "class", "svelte-fn4sf6");
    			add_location(a0, file$6, 10, 12, 211);
    			attr_dev(h10, "class", "svelte-fn4sf6");
    			add_location(h10, file$6, 10, 8, 207);
    			attr_dev(a1, "href", "#meetings");
    			attr_dev(a1, "class", "svelte-fn4sf6");
    			add_location(a1, file$6, 12, 12, 543);
    			attr_dev(h11, "class", "svelte-fn4sf6");
    			add_location(h11, file$6, 12, 8, 539);
    			attr_dev(div, "class", "svelte-fn4sf6");
    			add_location(div, file$6, 9, 4, 193);
    			attr_dev(section, "class", "svelte-fn4sf6");
    			add_location(section, file$6, 7, 0, 88);
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
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { dismiss: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Mobile_modal",
    			options,
    			id: create_fragment$7.name
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
    const file$5 = "src/components/Header.svelte";

    // (88:2) {:else}
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
    			add_location(img, file$5, 88, 3, 1539);
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
    		source: "(88:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (81:2) {#if !mobile}
    function create_if_block_1(ctx) {
    	let div;
    	let h20;
    	let a0;
    	let t1;
    	let h21;
    	let a1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h20 = element("h2");
    			a0 = element("a");
    			a0.textContent = "Sign the Petition";
    			t1 = space();
    			h21 = element("h2");
    			a1 = element("a");
    			a1.textContent = "Attend a Council Meeting";
    			attr_dev(a0, "href", "https://www.change.org/p/carpinteria-city-council-save-bates-carpinteria-s-historic-flying-site-f1131508-0d82-4ded-802c-a1226c01e049?utm_content=cl_sharecopy_27790827_en-US%3A3&recruiter=26187358&utm_source=share_petition&utm_medium=copylink&utm_campaign=share_petition");
    			attr_dev(a0, "class", "svelte-klws3g");
    			add_location(a0, file$5, 83, 5, 1120);
    			attr_dev(h20, "class", "nav-button svelte-klws3g");
    			add_location(h20, file$5, 82, 4, 1091);
    			attr_dev(a1, "href", "#meetings");
    			attr_dev(a1, "class", "svelte-klws3g");
    			add_location(a1, file$5, 85, 27, 1461);
    			attr_dev(h21, "class", "nav-button svelte-klws3g");
    			add_location(h21, file$5, 85, 4, 1438);
    			attr_dev(div, "class", "buttons-wrapper svelte-klws3g");
    			add_location(div, file$5, 81, 3, 1057);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h20);
    			append_dev(h20, a0);
    			append_dev(div, t1);
    			append_dev(div, h21);
    			append_dev(h21, a1);
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
    		source: "(81:2) {#if !mobile}",
    		ctx
    	});

    	return block;
    }

    // (94:0) {#if showButtons}
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
    		source: "(94:0) {#if showButtons}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
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
    			attr_dev(h1, "class", "svelte-klws3g");
    			add_location(h1, file$5, 75, 3, 985);
    			add_location(div0, file$5, 74, 2, 976);
    			attr_dev(div1, "class", "header-inner svelte-klws3g");
    			add_location(div1, file$5, 73, 1, 947);
    			attr_dev(header, "class", "header svelte-klws3g");
    			add_location(header, file$5, 72, 0, 922);
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
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/components/main_panel_1.svelte generated by Svelte v3.44.2 */

    const file$4 = "src/components/main_panel_1.svelte";

    function create_fragment$5(ctx) {
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
    			attr_dev(h1, "class", "svelte-qlkcpp");
    			add_location(h1, file$4, 7, 12, 190);
    			attr_dev(a, "href", "https://www.change.org/p/carpinteria-city-council-save-bates-carpinteria-s-historic-flying-site-f1131508-0d82-4ded-802c-a1226c01e049?utm_content=cl_sharecopy_27790827_en-US%3A3&recruiter=26187358&utm_source=share_petition&utm_medium=copylink&utm_campaign=share_petition");
    			attr_dev(a, "class", "link-button svelte-qlkcpp");
    			add_location(a, file$4, 8, 12, 273);
    			attr_dev(div0, "class", "info-box-inner svelte-qlkcpp");
    			add_location(div0, file$4, 6, 8, 149);
    			attr_dev(div1, "class", "info-box svelte-qlkcpp");
    			add_location(div1, file$4, 5, 4, 118);
    			attr_dev(section, "class", "svelte-qlkcpp");
    			add_location(section, file$4, 4, 0, 104);
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
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props) {
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
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Main_panel_1",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/components/two_col_panel.svelte generated by Svelte v3.44.2 */

    const file$3 = "src/components/two_col_panel.svelte";
    const get_col2_slot_changes = dirty => ({});
    const get_col2_slot_context = ctx => ({});
    const get_col1_slot_changes = dirty => ({});
    const get_col1_slot_context = ctx => ({});

    function create_fragment$4(ctx) {
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
    			attr_dev(div0, "class", "column svelte-14tg5js");
    			add_location(div0, file$3, 6, 4, 164);
    			attr_dev(div1, "class", "column svelte-14tg5js");
    			add_location(div1, file$3, 10, 4, 235);
    			attr_dev(section, "class", "svelte-14tg5js");
    			add_location(section, file$3, 5, 0, 150);
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
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Two_col_panel",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/components/main_panel_2.svelte generated by Svelte v3.44.2 */
    const file$2 = "src/components/main_panel_2.svelte";

    // (24:12) 
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
    			li0.textContent = "Requires the construction of a bridge over eroding and unstable soil";
    			t4 = space();
    			li1 = element("li");
    			li1.textContent = "Empties bikes into the crowded Rincon parking lot, a recipie for disaster";
    			t6 = space();
    			li2 = element("li");
    			li2.textContent = "Will cost over $14,000,000 of taxpayer money to fund construction of the bridge";
    			attr_dev(h2, "class", "svelte-jnt9z1");
    			add_location(h2, file$2, 24, 16, 1878);
    			if (!src_url_equal(img.src, img_src_value = "assets/img/path1.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Path over gap in bluffs, requiring bridge");
    			attr_dev(img, "class", "route-image svelte-jnt9z1");
    			add_location(img, file$2, 25, 16, 1928);
    			attr_dev(li0, "class", "svelte-jnt9z1");
    			add_location(li0, file$2, 27, 20, 2070);
    			attr_dev(li1, "class", "svelte-jnt9z1");
    			add_location(li1, file$2, 28, 20, 2168);
    			attr_dev(li2, "class", "svelte-jnt9z1");
    			add_location(li2, file$2, 29, 20, 2271);
    			attr_dev(ul, "class", "svelte-jnt9z1");
    			add_location(ul, file$2, 26, 16, 2045);
    			attr_dev(div, "class", "column-inner svelte-jnt9z1");
    			attr_dev(div, "slot", "col1");
    			add_location(div, file$2, 23, 12, 1823);
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
    		source: "(24:12) ",
    		ctx
    	});

    	return block;
    }

    // (34:12) 
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
    	let t8;
    	let li3;
    	let t10;
    	let li4;

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
    			li0.textContent = "On the North side of the freeway, on stable ground";
    			t4 = space();
    			li1 = element("li");
    			li1.textContent = "Will still connect with Rincon Beach and the rest of the Ventura trail";
    			t6 = space();
    			li2 = element("li");
    			li2.textContent = "Will preserve our coastal bluffs and avoid massive seaside erosion/pollution";
    			t8 = space();
    			li3 = element("li");
    			li3.textContent = "Will allow hang gliders and paragliders to continue to soar the historic Bates Bluff flying site";
    			t10 = space();
    			li4 = element("li");
    			li4.textContent = "Far fewer truckloads of earth that needs to be moved and a fraction of the cost";
    			attr_dev(h2, "class", "svelte-jnt9z1");
    			add_location(h2, file$2, 34, 16, 2469);
    			if (!src_url_equal(img.src, img_src_value = "assets/img/path-alt-4.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Path along existing bench in north side of freeway");
    			attr_dev(img, "class", "route-image svelte-jnt9z1");
    			add_location(img, file$2, 35, 16, 2526);
    			attr_dev(li0, "class", "svelte-jnt9z1");
    			add_location(li0, file$2, 37, 20, 2682);
    			attr_dev(li1, "class", "svelte-jnt9z1");
    			add_location(li1, file$2, 38, 20, 2762);
    			attr_dev(li2, "class", "svelte-jnt9z1");
    			add_location(li2, file$2, 39, 20, 2862);
    			attr_dev(li3, "class", "svelte-jnt9z1");
    			add_location(li3, file$2, 40, 20, 2968);
    			attr_dev(li4, "class", "svelte-jnt9z1");
    			add_location(li4, file$2, 41, 20, 3094);
    			attr_dev(ul, "class", "svelte-jnt9z1");
    			add_location(ul, file$2, 36, 16, 2657);
    			attr_dev(div, "class", "column-inner svelte-jnt9z1");
    			attr_dev(div, "slot", "col2");
    			add_location(div, file$2, 33, 12, 2414);
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
    			append_dev(ul, t8);
    			append_dev(ul, li3);
    			append_dev(ul, t10);
    			append_dev(ul, li4);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_col2_slot.name,
    		type: "slot",
    		source: "(34:12) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
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
    	let li4;
    	let t10;
    	let strong;
    	let t12;
    	let li5;
    	let t14;
    	let li6;
    	let t16;
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
    			h1.textContent = "The Rincon Bike Path - End of Carpinteria Avenue to Rincon Beach Parking Lot";
    			t1 = space();
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "This bike path will connect Carpinteria Avenue with Rincon Beach and the rest of the coastal trail, however the current design has some serious drawbacks";
    			t3 = space();
    			li1 = element("li");
    			li1.textContent = "The bike path is planned to be routed across a gap in the bluffs, requiring a bridge and tons of earthwork (over 40,000 truckloads!)";
    			t5 = space();
    			li2 = element("li");
    			li2.textContent = "Construction will require over 40,000 truckloads of dirt to be removed from the bluff, creating severe coastal erosion and greatly exascerbating traffic along the 101";
    			t7 = space();
    			li3 = element("li");
    			li3.textContent = "The current design has a steep (5%) slope and empties into the Rincon Beach parking lot. This will likely lead to many accidents as bikers collide with cars at high speed";
    			t9 = space();
    			li4 = element("li");
    			t10 = text("Better alternatives to this design exist, such as building the bike path on the north side of highway 101 and connecting it to the existing Ventura trail. However, ");
    			strong = element("strong");
    			strong.textContent = "they are not being considered by project planners or regulators";
    			t12 = space();
    			li5 = element("li");
    			li5.textContent = "This design would destroy the historic Bates Bluff hang gliding and paragliding site, which attracts pilots from all over the world";
    			t14 = space();
    			li6 = element("li");
    			li6.textContent = "Approving this design would open the doors for development of the rest of Carpinteria's beautiful, pristine coastal bluffs";
    			t16 = space();
    			create_component(twocol.$$.fragment);
    			attr_dev(h1, "class", "svelte-jnt9z1");
    			add_location(h1, file$2, 10, 12, 321);
    			attr_dev(li0, "class", "svelte-jnt9z1");
    			add_location(li0, file$2, 12, 20, 448);
    			attr_dev(li1, "class", "svelte-jnt9z1");
    			add_location(li1, file$2, 13, 20, 631);
    			attr_dev(li2, "class", "svelte-jnt9z1");
    			add_location(li2, file$2, 14, 20, 793);
    			attr_dev(li3, "class", "svelte-jnt9z1");
    			add_location(li3, file$2, 15, 20, 989);
    			attr_dev(strong, "class", "svelte-jnt9z1");
    			add_location(strong, file$2, 16, 188, 1357);
    			attr_dev(li4, "class", "svelte-jnt9z1");
    			add_location(li4, file$2, 16, 20, 1189);
    			attr_dev(li5, "class", "svelte-jnt9z1");
    			add_location(li5, file$2, 17, 20, 1463);
    			attr_dev(li6, "class", "svelte-jnt9z1");
    			add_location(li6, file$2, 18, 20, 1624);
    			attr_dev(ul, "class", "svelte-jnt9z1");
    			add_location(ul, file$2, 11, 16, 423);
    			attr_dev(div, "class", "text-block svelte-jnt9z1");
    			add_location(div, file$2, 9, 8, 284);
    			attr_dev(section, "class", "svelte-jnt9z1");
    			add_location(section, file$2, 8, 0, 266);
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
    			append_dev(ul, t9);
    			append_dev(ul, li4);
    			append_dev(li4, t10);
    			append_dev(li4, strong);
    			append_dev(ul, t12);
    			append_dev(ul, li5);
    			append_dev(ul, t14);
    			append_dev(ul, li6);
    			append_dev(section, t16);
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
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Main_panel_2",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/components/main_panel_3.svelte generated by Svelte v3.44.2 */

    const file$1 = "src/components/main_panel_3.svelte";

    function create_fragment$2(ctx) {
    	let section;
    	let h1;
    	let t1;
    	let div1;
    	let div0;
    	let h2;
    	let t3;
    	let ul1;
    	let li2;
    	let strong0;
    	let t5;
    	let ul0;
    	let li0;
    	let a0;
    	let t7;
    	let li1;
    	let t8;
    	let a1;
    	let t10;
    	let li3;
    	let strong1;
    	let t12;
    	let t13;
    	let li4;
    	let strong2;
    	let t15;

    	const block = {
    		c: function create() {
    			section = element("section");
    			h1 = element("h1");
    			h1.textContent = "Make Your Voice Heard";
    			t1 = space();
    			div1 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Upcoming Meetings:";
    			t3 = space();
    			ul1 = element("ul");
    			li2 = element("li");
    			strong0 = element("strong");
    			strong0.textContent = "January 18, 2022";
    			t5 = text(" - City of Carpinteria Planning Commission at  5:30 PM\n                    ");
    			ul0 = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "Agenda will post on January 13, 2022 here";
    			t7 = space();
    			li1 = element("li");
    			t8 = text("Email your support for a different bike path to ");
    			a1 = element("a");
    			a1.textContent = "PublicComment@ci.carpinteria.ca.us";
    			t10 = space();
    			li3 = element("li");
    			strong1 = element("strong");
    			strong1.textContent = "January 20, 2022";
    			t12 = text(" - Santa Barbara County Associated Governments hearing for project review");
    			t13 = space();
    			li4 = element("li");
    			strong2 = element("strong");
    			strong2.textContent = "March 2022";
    			t15 = text(" - Santa Barbara County Planning Comission hearing for project review, will determine if project will get a county coastal permit (date TBD)");
    			attr_dev(h1, "class", "svelte-16vyfci");
    			add_location(h1, file$1, 5, 4, 101);
    			attr_dev(h2, "class", "svelte-16vyfci");
    			add_location(h2, file$1, 9, 12, 209);
    			attr_dev(strong0, "class", "svelte-16vyfci");
    			add_location(strong0, file$1, 11, 20, 296);
    			attr_dev(a0, "href", "https://carpinteria.ca.us/city-hall/agendas-meetings ");
    			attr_dev(a0, "class", "svelte-16vyfci");
    			add_location(a0, file$1, 13, 28, 453);
    			add_location(li0, file$1, 13, 24, 449);
    			attr_dev(a1, "href", "mailto:PublicComment@ci.carpinteria.ca.us?subject=Rincon%20Multi%20Use%20Trail&body=Greetings%2C%0D%0A%0D%0AMy%20name%20is%20___%2C%20and%20I'm%20in%20support%20of%20the%20Rincon%20Multi%20Use%20Trail%20to%20allow%20cyclists%20to%20safely%20connect%20Carpinteria%20and%20the%20Ventura%20trail.%20However%2C%20I%20think%20the%20current%20design%20has%20some%20serious%20drawbacks%2C%20such%20as%20emptying%20bikes%20directly%20into%20the%20busy%20Rincon%20Beach%20parking%20lot%20at%20high%20speed%20and%20an%20alarmingly%20high%20cost.%20I%20would%20like%20to%20see%20the%20project%20planners%20propose%20an%20alternative%20route%20that%20does%20not%20cut%20into%20the%20coastal%20bluffs%20and%20which%20is%20cheaper%20and%20safe.%0D%0A%0D%0AThank%20You%2C%0D%0A");
    			attr_dev(a1, "class", "svelte-16vyfci");
    			add_location(a1, file$1, 14, 76, 644);
    			add_location(li1, file$1, 14, 24, 592);
    			attr_dev(ul0, "class", "sublist svelte-16vyfci");
    			add_location(ul0, file$1, 12, 20, 404);
    			add_location(li2, file$1, 11, 16, 292);
    			attr_dev(strong1, "class", "svelte-16vyfci");
    			add_location(strong1, file$1, 18, 20, 1558);
    			add_location(li3, file$1, 18, 16, 1554);
    			attr_dev(strong2, "class", "svelte-16vyfci");
    			add_location(strong2, file$1, 19, 20, 1691);
    			add_location(li4, file$1, 19, 16, 1687);
    			attr_dev(ul1, "class", "meetings-list svelte-16vyfci");
    			add_location(ul1, file$1, 10, 12, 249);
    			attr_dev(div0, "class", "info-box-inner");
    			add_location(div0, file$1, 8, 8, 168);
    			attr_dev(div1, "class", "info-box svelte-16vyfci");
    			add_location(div1, file$1, 7, 4, 137);
    			attr_dev(section, "id", "meetings");
    			attr_dev(section, "class", "svelte-16vyfci");
    			add_location(section, file$1, 4, 0, 73);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, h1);
    			append_dev(section, t1);
    			append_dev(section, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t3);
    			append_dev(div0, ul1);
    			append_dev(ul1, li2);
    			append_dev(li2, strong0);
    			append_dev(li2, t5);
    			append_dev(li2, ul0);
    			append_dev(ul0, li0);
    			append_dev(li0, a0);
    			append_dev(ul0, t7);
    			append_dev(ul0, li1);
    			append_dev(li1, t8);
    			append_dev(li1, a1);
    			append_dev(ul1, t10);
    			append_dev(ul1, li3);
    			append_dev(li3, strong1);
    			append_dev(li3, t12);
    			append_dev(ul1, t13);
    			append_dev(ul1, li4);
    			append_dev(li4, strong2);
    			append_dev(li4, t15);
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
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Main_panel_3', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Main_panel_3> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Main_panel_3 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Main_panel_3",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/components/footer.svelte generated by Svelte v3.44.2 */

    const file = "src/components/footer.svelte";

    function create_fragment$1(ctx) {
    	let section;
    	let div;
    	let h1;
    	let t1;
    	let h2;
    	let t3;
    	let ul;
    	let li0;
    	let t5;
    	let li1;
    	let t7;
    	let li2;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Contact Your Representatives";
    			t1 = space();
    			h2 = element("h2");
    			h2.textContent = "California Costal Commison";
    			t3 = space();
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "Meagan Harmon - Meagan.Harmon@coastal.ca.gov";
    			t5 = space();
    			li1 = element("li");
    			li1.textContent = "Roberto Uranga - Roberto.Uranga@coastal.ca.gov";
    			t7 = space();
    			li2 = element("li");
    			li2.textContent = "Rick Rivas - Rick.Rivas@coastal.ca.gov";
    			attr_dev(h1, "class", "svelte-h3jz0q");
    			add_location(h1, file, 6, 8, 76);
    			attr_dev(h2, "class", "svelte-h3jz0q");
    			add_location(h2, file, 7, 12, 126);
    			add_location(li0, file, 9, 16, 195);
    			add_location(li1, file, 10, 16, 265);
    			add_location(li2, file, 11, 16, 337);
    			attr_dev(ul, "class", "svelte-h3jz0q");
    			add_location(ul, file, 8, 12, 174);
    			attr_dev(div, "class", "inner");
    			add_location(div, file, 5, 4, 48);
    			attr_dev(section, "class", "svelte-h3jz0q");
    			add_location(section, file, 4, 0, 34);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, h2);
    			append_dev(div, t3);
    			append_dev(div, ul);
    			append_dev(ul, li0);
    			append_dev(ul, t5);
    			append_dev(ul, li1);
    			append_dev(ul, t7);
    			append_dev(ul, li2);
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
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
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
    	let t2;
    	let panel3;
    	let t3;
    	let footer;
    	let current;
    	header = new Header({ $$inline: true });
    	panel1 = new Main_panel_1({ $$inline: true });
    	panel2 = new Main_panel_2({ $$inline: true });
    	panel3 = new Main_panel_3({ $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    			t0 = space();
    			create_component(panel1.$$.fragment);
    			t1 = space();
    			create_component(panel2.$$.fragment);
    			t2 = space();
    			create_component(panel3.$$.fragment);
    			t3 = space();
    			create_component(footer.$$.fragment);
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
    			insert_dev(target, t2, anchor);
    			mount_component(panel3, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(panel1.$$.fragment, local);
    			transition_in(panel2.$$.fragment, local);
    			transition_in(panel3.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(panel1.$$.fragment, local);
    			transition_out(panel2.$$.fragment, local);
    			transition_out(panel3.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(panel1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(panel2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(panel3, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(footer, detaching);
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

    	$$self.$capture_state = () => ({ Header, Panel1: Main_panel_1, Panel2: Main_panel_2, Panel3: Main_panel_3, Footer });
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
