<!--
  /basics — Features 1-6 in Svelte
  
  COMPARE THIS FILE TO basics.html + basics.js in the Vanilla JS version.
  
  The BIG difference: 
    Vanilla JS: find element → change element → repeat
    Svelte:     change variable → page updates itself
-->

<script>
  // ============================================================
  // FEATURE 1: Using "let" with $state()
  //
  // Vanilla JS:  let count = 0;  (just a variable — DOM doesn't know about it)
  // Svelte:      let count = $state(0);  (reactive — Svelte watches for changes)
  //
  // $state() is a "rune" — Svelte 5's way of making variables reactive.
  // When a $state variable changes, any part of the template that uses 
  // it automatically re-renders. No getElementById needed.
  //
  // Python analogy: It's like a property with an observer pattern built in.
  // ============================================================
  let count = $state(0);

  function incrementCount() {
    count++;
    // That's it! No document.getElementById, no .textContent = ...
    // Svelte sees that "count" changed and updates the {count} in the HTML.
  }

  function resetCount() {
    count = 0;
  }


  // ============================================================
  // FEATURE 2: Updating Elements
  //
  // Vanilla JS: 
  //   document.getElementById('greetingText').textContent = 'New text';
  //   document.getElementById('greetingText').style.color = 'blue';
  //
  // Svelte:
  //   greeting = 'New text';   // Template auto-updates
  //   color = 'blue';          // style:color={color} auto-updates
  // ============================================================
  let greeting = $state('Hello! Click a button to change this text.');
  let greetingColor = $state('#1e293b');
  let greetingBold = $state(false);

  function changeText() {
    greeting = '🎉 The text has been changed by Svelte reactivity!';
  }

  function changeColor() {
    greetingColor = '#3b82f6';
    greetingBold = true;
  }

  function changeHTML() {
    // For raw HTML in Svelte, use {@html variable}
    // Same XSS warning as innerHTML — sanitize user input!
    greeting = 'This has <strong>bold</strong> and <em>italic</em> text via {@html}.';
  }


  // ============================================================
  // FEATURE 3: Rendering Images
  //
  // Vanilla JS: document.getElementById('img').src = newUrl;
  // Svelte:     <img src={imageUrl}> — just change the variable
  // ============================================================
  let imageCounter = $state(1);
  let imageUrl = $state('https://picsum.photos/seed/default/400/200');
  let imageAlt = $state('Random landscape photo');

  function loadRandomImage() {
    imageCounter++;
    imageUrl = `https://picsum.photos/seed/photo${imageCounter}/400/200`;
    imageAlt = `Random photo #${imageCounter}`;
  }


  // ============================================================
  // FEATURE 4: Buttons
  //
  // Vanilla JS: onclick="toggleButton()" + manual DOM updates
  // Svelte:     onclick={toggle} + template expressions
  //
  // The template uses {isOn ? 'ON' : 'OFF'} — a ternary expression.
  // Svelte evaluates this every time isOn changes.
  // ============================================================
  let isOn = $state(true);
  let totalClicks = $state(0);

  function toggleButton() {
    isOn = !isOn;
    totalClicks++;
    // In Vanilla JS, you'd also need to:
    //   btn.textContent = isOn ? 'ON' : 'OFF';
    //   btn.style.backgroundColor = isOn ? '#3b82f6' : '#ef4444';
    //   clickDisplay.textContent = totalClicks;
    // In Svelte: just change the variables. Done.
  }


  // ============================================================
  // FEATURE 5: Input Fields (Two-Way Binding)
  //
  // Vanilla JS:
  //   input.addEventListener('input', () => {
  //     namePreview.textContent = input.value;
  //   });
  //
  // Svelte:
  //   <input bind:value={name}>
  //   <p>Hello, {name || 'stranger'}!</p>
  //
  // "bind:value" creates TWO-WAY binding:
  //   - User types → variable updates
  //   - Variable changes in code → input updates
  // Both directions, automatically. This is Svelte's killer feature.
  // ============================================================
  let name = $state('');
  let pickedColor = $state('#3b82f6');


  // ============================================================
  // FEATURE 6: Forms
  //
  // The form logic is similar, but notice: we don't need to query
  // the DOM for input values. They're already in our variables
  // thanks to bind:value!
  // ============================================================
  let formName = $state('');
  let formEmail = $state('');
  let formMessage = $state('');
  let formResult = $state(null);

  function handleFormSubmit() {
    // No getElementById needed — values are already in variables!
    formResult = {
      name: formName,
      email: formEmail,
      message: formMessage,
      submittedAt: new Date().toLocaleTimeString()
    };
  }

  function clearForm() {
    formName = '';
    formEmail = '';
    formMessage = '';
    formResult = null;
  }
</script>


<!-- ============================================================
     THE TEMPLATE — Notice: no getElementById anywhere!
     
     Curly braces {variable} insert reactive values.
     When the variable changes, the display updates automatically.
     
     Compare each section below to basics.html in the Vanilla version.
     ============================================================ -->

<h1>Svelte Basics (Features 1–6)</h1>
<p>This page covers: <code>$state()</code> variables, reactivity, images, buttons, inputs, and forms.</p>


<!-- FEATURE 1: let / $state -->
<h2>Feature 1: Using <code>let</code> with <code>$state()</code></h2>
<div class="demo-section">
  <p>Current count: {count}</p>
  <!-- 
    onclick={incrementCount}  ← No quotes! No parentheses!
    Svelte passes the function reference directly.
    Vanilla: onclick="incrementCount()"  ← String with parens
  -->
  <button onclick={incrementCount}>Increment</button>
  <button class="secondary" onclick={resetCount}>Reset</button>

  <div class="compare-note">
    <strong>Vanilla JS needed:</strong> <code>document.getElementById('countDisplay').textContent = count;</code><br>
    <strong>Svelte needs:</strong> Just <code>{'{'}count{'}'}</code> in the HTML. That's it.
  </div>
</div>


<!-- FEATURE 2: Updating Elements -->
<h2>Feature 2: Updating Elements</h2>
<div class="demo-section">
  <!-- 
    style:color={greetingColor} — Svelte's reactive style binding.
    When greetingColor changes, the CSS color updates automatically.
    
    class:bold={greetingBold} — Conditional CSS class.
    Adds "bold" class when greetingBold is true.
  -->
  <p style:color={greetingColor} class:bold={greetingBold}>
    <!-- {@html greeting} renders raw HTML, like innerHTML.
         Use with caution — same XSS risk as innerHTML! -->
    {@html greeting}
  </p>
  <div class="flex gap-1 mt-1">
    <button onclick={changeText}>Change Text</button>
    <button class="secondary" onclick={changeColor}>Change Color</button>
    <button class="secondary" onclick={changeHTML}>Change with HTML</button>
  </div>
</div>


<!-- FEATURE 3: Images -->
<h2>Feature 3: Rendering Images</h2>
<div class="demo-section">
  <p>Click to load a random image:</p>
  <button onclick={loadRandomImage}>Load Random Image</button>
  <div class="mt-1">
    <!-- src={imageUrl} — when imageUrl changes, the image re-loads.
         No need to find the element and set .src manually. -->
    <img src={imageUrl} alt={imageAlt} 
         style="width:100%; max-width:400px; border-radius:8px; border:2px solid #e2e8f0;">
  </div>
  <p class="mt-1">Image alt text: "{imageAlt}"</p>
</div>


<!-- FEATURE 4: Buttons -->
<h2>Feature 4: Buttons</h2>
<div class="demo-section">
  <p>Toggle button state:</p>
  <!-- 
    {isOn ? 'ON' : 'OFF'} — Ternary expression right in the template.
    Svelte evaluates this every time isOn changes.
    
    style:background-color — reactive inline style.
    In Vanilla JS, you'd set element.style.backgroundColor manually.
  -->
  <button 
    onclick={toggleButton}
    style:background-color={isOn ? '#3b82f6' : '#ef4444'}
  >
    {isOn ? 'ON' : 'OFF'}
  </button>
  <p class="mt-1">Button has been clicked {totalClicks} time(s).</p>
</div>


<!-- FEATURE 5: Input Fields -->
<h2>Feature 5: Input Fields</h2>
<div class="demo-section">
  <div class="form-group">
    <label for="nameInput">Type your name:</label>
    <!-- bind:value={name} — THE magic of Svelte.
         As you type, "name" updates. Where {name} appears, it re-renders.
         In Vanilla JS, this required: addEventListener + getElementById + .textContent -->
    <input type="text" id="nameInput" placeholder="Your name here..." bind:value={name}>
  </div>
  <p>Hello, {name || 'stranger'}!</p>

  <div class="form-group mt-2">
    <label for="colorPicker">Pick a color:</label>
    <input type="text" id="colorPicker" placeholder="#3b82f6" bind:value={pickedColor}>
  </div>
  <div style="width:60px; height:60px; border-radius:8px; border:2px solid #e2e8f0; background-color:{pickedColor};"></div>
</div>


<!-- FEATURE 6: Forms -->
<h2>Feature 6: Forms</h2>
<div class="demo-section">
  <!-- onsubmit with preventDefault — same concept as Vanilla JS -->
  <form onsubmit={(e) => { e.preventDefault(); handleFormSubmit(); }}>
    <div class="form-group">
      <label for="formName">Name:</label>
      <input type="text" id="formName" placeholder="Jane Doe" required bind:value={formName}>
    </div>
    <div class="form-group">
      <label for="formEmail">Email:</label>
      <input type="email" id="formEmail" placeholder="jane@example.com" required bind:value={formEmail}>
    </div>
    <div class="form-group">
      <label for="formMessage">Message:</label>
      <textarea id="formMessage" rows="3" placeholder="Write something..." bind:value={formMessage}></textarea>
    </div>
    <button type="submit">Submit</button>
    <button type="button" class="secondary" onclick={clearForm}>Clear</button>
  </form>

  <!-- {#if formResult} — Conditional rendering!
       Only shows this block when formResult is not null.
       In Vanilla JS: element.classList.remove('hidden') -->
  {#if formResult}
    <div class="card mt-1">
      <h3>Form Data Received:</h3>
      <pre>{JSON.stringify(formResult, null, 2)}</pre>
    </div>
  {/if}

  <div class="compare-note">
    <strong>Count the lines saved:</strong> No getElementById calls. No .value reads. 
    No classList.add/remove('hidden'). Svelte's bind:value and {'{'}#if{'}'} handle it all.
  </div>
</div>


<style>
  h1 { font-size: 1.8rem; margin-bottom: 0.5rem; color: #0f172a; }
  h2 { font-size: 1.3rem; margin: 1.5rem 0 0.5rem; color: #334155; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.25rem; }
  p { margin-bottom: 0.75rem; }
  code { background: #f1f5f9; padding: 0.15rem 0.4rem; border-radius: 4px; font-family: "Consolas", monospace; font-size: 0.88rem; }
  pre { background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 8px; font-size: 0.85rem; overflow-x: auto; margin: 0.75rem 0; }
  .demo-section { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; margin: 1.25rem 0; }
  .card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; margin-bottom: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
  .compare-note { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 0.75rem 1rem; margin: 1rem 0; font-size: 0.9rem; border-radius: 0 6px 6px 0; }
  .compare-note strong { color: #1d4ed8; }
  button { background-color: #3b82f6; color: white; border: none; padding: 0.5rem 1.25rem; border-radius: 6px; font-size: 0.95rem; cursor: pointer; }
  button:hover { background-color: #2563eb; }
  .secondary { background-color: #64748b; }
  .secondary:hover { background-color: #475569; }
  .form-group { margin-bottom: 1rem; }
  label { display: block; font-weight: 600; margin-bottom: 0.25rem; font-size: 0.9rem; }
  input, textarea { width: 100%; padding: 0.5rem 0.75rem; border: 2px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem; font-family: inherit; }
  input:focus, textarea:focus { outline: none; border-color: #3b82f6; }
  .flex { display: flex; }
  .gap-1 { gap: 0.5rem; }
  .mt-1 { margin-top: 0.5rem; }
  .mt-2 { margin-top: 1rem; }
  .bold { font-weight: bold; }
</style>
