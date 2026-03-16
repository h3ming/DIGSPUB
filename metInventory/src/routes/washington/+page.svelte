<script>
let {data} = $props();
let isPublicDomain = $state(data.isPublicDomain);
</script>

<h2>{data.title}</h2>

<a href={data.primaryImageSmall} target="_blank">
    <img src={data.primaryImageSmall} alt={data.title} class="artwork-image" />
</a>
<div class="artwork-details">
    <p><strong>Artist:</strong> {data.artistDisplayName}</p>
    <p><strong>Artist Bio:</strong> {data.artistDisplayBio}</p>
    <p><strong>Date:</strong> {data.objectDate}</p>    
    <p><strong>Medium:</strong> {data.medium}</p>
    <p><strong>Dimensions:</strong> {data.dimensions}</p>
    <p><strong>Department:</strong> {data.department}</p>
    {#if isPublicDomain}
        <img src="http://i.creativecommons.org/p/mark/1.0/88x31.png" alt="Public Domain Mark" target="_blank">
    {:else}
        <p><strong>Public Domain:</strong> Not a part of public domain.</p>
    {/if}
</div>

<style> 
    .artwork-image {
        float: left;
        max-width: 40%;
        height: auto;
        display: block;
        margin: 0 20px 20px 0;
    }
    
    .artwork-details {
        overflow: hidden;
        max-width: 600px;
        font-family: Arial, sans-serif;
    }
    
    .artwork-details p {
        margin: 5px 0;
    }
</style>
