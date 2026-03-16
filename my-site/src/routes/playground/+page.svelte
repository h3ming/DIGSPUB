<script>
// The API playground is guarded by a magic 8 ball! 

    import {Input} from "$lib/components/ui/input/index";
    import {Button} from "$lib/components/ui/button/index";

    let question = $state("");
    let reading = $state(null);
    let loading = $state(false);
    let error = $state(null)
    let isPositive = $state(false);
    let worthy = $state(false);
    let shaking = $state(false);

    function getRandomCategory() {
        const categories = ["positive", "negative", "neutral"];
        return categories[Math.floor(Math.random() * categories.length)];
        }

    async function ask8ball() {
        error = null;
        loading = true;
        shaking = true;
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            let category = getRandomCategory();
            // corsproxy didn't work anymore after vercel deployment, so I asked claude what to do and it helped me make my own API route in src/routes/api/eightball/+server.ts 
            //const url = `https://corsproxy.io/?https://eightballapi.com/api/${category}?question=${question}`; // 
            const url = `/api/eightball?category=${category}&question=${encodeURIComponent(question)}`;
            const response = await fetch(url);
            const data = await response.json();
            reading = data.reading
            isPositive = data.category === "positive";
        } catch (e) {
            console.log(e);
            error = 'Reading failed.';
        }
        loading = false;
        shaking = false;
    }
    
  function handleEnter(event) {
    if (event.key == 'Enter') {
        ask8ball();
    }
  }
</script>

<!-- Title -->
<div class="flex justify-center mb-6">
  <h1 class="text-white text-4xl text-center" style="font-family: serif;">
    Are You Worthy to Enter?
  </h1>
  <Button class="bg-purple-900 translate-x-4" onclick={() => { 
    worthy = true;
    question = "Am I worthy to enter?";
    ask8ball();
    question = "";}}>
    Find out
  </Button>
</div>

{#if worthy}
  <p class="text-purple-300 text-center italic" style="font-family: serif;">
    Am I worthy?
  </p>
{/if}


<!-- 8 ball -->
<div class="flex justify-center items-center">
  <div class="relative w-140 h-140 {shaking ? 'shake' : ''}"> 
    <img src="/orb.png" alt="A purple orb" class="w-full h-full object-contain" />
    <p style="font-family: serif;" class="italic text-2xl absolute inset-0 flex items-center justify-center text-center text-purple-900 font-bold -mt-1 -translate-x-2">
      {reading}
    </p>
  </div>
</div>

<!-- Get your own Fortune Input and Button  -->
<div class="flex justify-center gap-2 mt-6">
  <Input aria-label="Ask the ball" bind:value={question} placeholder="What's my fortune..." onclick={handleEnter}class="w-64" />
  <Button onclick={ask8ball}>Ask!</Button>
</div>

{#if loading}<p class="text-center text-gray-500 mt-2">Loading...</p>{/if}
{#if error}<p role="alert" class="text-center text-red-600 mt-2">{error}</p>{/if}

{#if isPositive}
  <div class="flex justify-center mt-6">
    <a href="/weather" class="text-purple-300 font-bold hover:underline">Enter the playground →</a>
  </div>
{/if}

