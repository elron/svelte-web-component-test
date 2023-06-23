// Thanks
// enyo/web-components.ts
// https://gist.github.com/enyo/cf5e31d822338f979cb7a85b86a1a8fb

import CustomAlert from './src/lib/CustomAlert.svelte';
import type { SvelteComponent } from 'svelte';

const dev = true;
const tag = 'my-shadow-dom-custom-element';

customElements.define(
	// I recommend prefixing your custom elements, but for this example
	// I'm keeping it simple.
	tag,
	class MyElement extends HTMLElement {
		// By adding the ! after the property declaration,
		// you're telling TypeScript that you will handle the
		// initialization elsewhere and it shouldn't raise an error.
		_element!: SvelteComponent;

		constructor() {
			super();
		}

		connectedCallback(): void {
			const text = this.getAttribute('text');
			console.log('text:', text);

			// Create a shadow root for the custom element
			const shadow = this.attachShadow({ mode: 'open' });

			//   // Instantiate the Svelte Component
			this._element = new CustomAlert({
				// Tell it that it lives in the shadow root
				target: shadow,
				// Pass any props
				props: {
					text: text
					// This is the place where you do any conversion between
					// the native string attributes and the types you expect
					// in your svelte components
					//   items: this.getAttribute('items').split(','),
				}
			});
		}
		disconnectedCallback(): void {
			// Destroy the Svelte component when this web component gets
			// disconnected. If this web component is expected to be moved
			// in the DOM, then you need to use `connectedCallback()` and
			// set it up again if necessary.
			this._element?.$destroy();
		}
	}
);

if (dev) console.log('starting...');
const scripts = document.querySelectorAll('script[data-text]');
scripts.forEach((script) => {
	if (script.getAttribute('popped') === '') return;
	script.setAttribute('popped', '');

	if (dev) console.log('script...', script);
	const text = script.getAttribute('data-text');
	if (dev) console.log('text...', text);

	if (!text) {
		throw 'error, text is:' + text;
	}

	requestAnimationFrame(() => {
		const myElement = document.createElement(tag);
		myElement.setAttribute('text', text);
		console.log('myElement', myElement);
		console.log('document.body', document.body);
		document.body.appendChild(myElement);
	});

	if (dev) console.log('done...');
});
