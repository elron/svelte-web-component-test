<script lang="ts">
	export let text: string;
</script>

<button on:click={() => alert(text)}>Alert this: {text}</button>
