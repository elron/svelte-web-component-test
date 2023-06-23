import CustomAlert from './src/lib/CustomAlert.svelte';

// Thanks
// https://www.colorglare.com/svelte-components-as-web-components-b400d1253504

const dev = true;

// <script src="" data-text="Hello!"></script>

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

	const div = document.createElement('div');
	if (document.body) {
		document.body.append(div);
	} else {
		document.addEventListener('DOMContentLoaded', () => {
			document.body.append(div);
		});
	}

	new CustomAlert({
		target: div,
		props: { text }
	});
	if (dev) console.log('done...');
});
