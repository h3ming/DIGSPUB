<script lang="ts">
    import type { Poet } from '$lib';
    export let poetsList: Poet[] = [];
</script>

<h1>Welcome to Assignment 7: Interactive Poet Archive</h1>
<h2>Overview</h2>
<p> This site utilizes the OCHRE API to interactively explore poets and their works. </p>
<div class="poet-list">
    <h2>Poets</h2>
    <ul>
        {#each poetsList as Poet}
            <li>{poet.name} - {poet.poemCount} poems</li>
        {/each}
    </ul>