<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<!-- <svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head> -->

<nav>
  <span class="nav-title">The Met Inventory Pages</span>
  <a href="/">Home</a>
  <a href="/wheat-field">Wheat Field with Cypresses</a>
  <a href="/washington">Washington Crossing the Delaware</a>
</nav>

{@render children()}

<style>
	nav {
        display: flex;
		top: 0;
		width: 100%;
        align-items: center;
        background-color: #333;
        padding: 10px;
    }
    
    .nav-title {
        color: white;
        font-size: 1.5em;
        margin-right: 20px;
    }
    
    nav a {
        color: white;
        text-decoration: none;
        margin-right: 15px;
    }
    
    nav a:hover {
        text-decoration: underline;
    }
</style>