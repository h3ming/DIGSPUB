<!--
  /validation — Form Validation (Feature #11)
  
  COMPARE TO: validation.html + validation.js in the Vanilla JS version.
  
  In Svelte, validation is dramatically cleaner because:
  1. bind:value gives us live input values (no addEventListener)
  2. $derived() computes errors reactively (no manual DOM updates)
  3. {#if error} shows/hides messages (no classList toggling)
  
  The VALIDATION LOGIC (regex, length checks) is identical JavaScript.
  What changes is the wiring between logic and display.
-->

<script>
  // Input values — all bound to inputs via bind:value
  let username = $state('');
  let email = $state('');
  let age = $state('');
  let url = $state('');
  let password = $state('');

  // ============================================================
  // Validation functions — IDENTICAL to validation.js!
  // These are pure JavaScript. No framework-specific code.
  // ============================================================
  function validateUsername(val) {
    if (!val) return 'Username is required';
    if (val.length < 3) return 'Must be at least 3 characters';
    if (val.length > 20) return 'Must be 20 characters or fewer';
    if (!/^[a-zA-Z0-9]+$/.test(val)) return 'Letters and numbers only';
    return '';
  }

  function validateEmail(val) {
    if (!val) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Enter a valid email';
    return '';
  }

  function validateAge(val) {
    if (!val) return 'Age is required';
    const num = parseInt(val, 10);
    if (isNaN(num)) return 'Must be a number';
    if (num < 18) return 'Must be 18 or older';
    if (num > 120) return 'Please enter a realistic age';
    return '';
  }

  function validateUrl(val) {
    if (!val) return '';
    try { new URL(val); return ''; }
    catch { return 'Enter a valid URL (e.g., https://example.com)'; }
  }

  function validatePassword(val) {
    if (!val) return 'Password is required';
    if (val.length < 8) return 'Must be at least 8 characters';
    if (!/[A-Z]/.test(val)) return 'Needs an uppercase letter';
    if (!/[a-z]/.test(val)) return 'Needs a lowercase letter';
    if (!/[0-9]/.test(val)) return 'Needs a number';
    return '';
  }

  // ============================================================
  // $derived — REACTIVE computed values
  //
  // These recalculate automatically whenever their dependencies change.
  // When "username" changes → usernameError recalculates → template updates.
  //
  // Compare to Vanilla JS where we had to:
  //   1. input.addEventListener('input', () => { ... })
  //   2. const error = validateFn(input.value);
  //   3. errorEl.textContent = error;
  //   4. errorEl.classList.add/remove('visible');
  //   5. input.classList.add/remove('invalid');
  //
  // In Svelte, $derived replaces ALL of that:
  // ============================================================
  let usernameError = $derived(username ? validateUsername(username) : '');
  let emailError = $derived(email ? validateEmail(email) : '');
  let ageError = $derived(age ? validateAge(age) : '');
  let urlError = $derived(url ? validateUrl(url) : '');
  let passwordError = $derived(password ? validatePassword(password) : '');

  // Are all required fields valid?
  let allValid = $derived(
    username && !usernameError &&
    email && !emailError &&
    age && !ageError &&
    !urlError &&
    password && !passwordError
  );

  // Password strength — also a $derived value
  let passwordStrength = $derived(() => {
    if (!password) return { label: '', color: '#94a3b8' };
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    if (score <= 2) return { label: '🔴 Weak', color: '#ef4444' };
    if (score <= 3) return { label: '🟡 Fair', color: '#eab308' };
    if (score <= 4) return { label: '🟢 Strong', color: '#22c55e' };
    return { label: '💪 Very Strong', color: '#16a34a' };
  });

  let formResult = $state(null);

  function submitForm() {
    if (!allValid) return;
    formResult = {
      username,
      email,
      age: parseInt(age, 10),
      url: url || null,
      passwordLength: password.length,
    };
  }
</script>


<h1>Form Validation (Feature 11)</h1>
<p>Real-time validation as you type. The validation logic is identical JavaScript — Svelte just makes the display reactive.</p>

<form onsubmit={(e) => { e.preventDefault(); submitForm(); }}>
  
  <!-- Each field follows the same pattern:
       1. bind:value={variable}          — two-way binding
       2. class:invalid={error}          — conditional CSS class
       3. {#if error}<p>{error}</p>{/if} — conditional error display
       
       In Vanilla JS, each of these required ~10 lines of event listener code.
       In Svelte, it's built into the template syntax. -->

  <div class="form-group">
    <label for="valUsername">Username (3-20 chars, letters/numbers):</label>
    <input type="text" id="valUsername" placeholder="janedoe42"
           bind:value={username} class:invalid={usernameError} class:valid={username && !usernameError}>
    {#if usernameError}<p class="error">{usernameError}</p>{/if}
  </div>

  <div class="form-group">
    <label for="valEmail">Email:</label>
    <input type="text" id="valEmail" placeholder="jane@example.com"
           bind:value={email} class:invalid={emailError} class:valid={email && !emailError}>
    {#if emailError}<p class="error">{emailError}</p>{/if}
  </div>

  <div class="form-group">
    <label for="valAge">Age (18-120):</label>
    <input type="number" id="valAge" placeholder="25"
           bind:value={age} class:invalid={ageError} class:valid={age && !ageError}>
    {#if ageError}<p class="error">{ageError}</p>{/if}
  </div>

  <div class="form-group">
    <label for="valUrl">Website URL (optional):</label>
    <input type="text" id="valUrl" placeholder="https://example.com"
           bind:value={url} class:invalid={urlError} class:valid={url && !urlError}>
    {#if urlError}<p class="error">{urlError}</p>{/if}
  </div>

  <div class="form-group">
    <label for="valPassword">Password (8+ chars, mixed case + number):</label>
    <input type="password" id="valPassword" placeholder="••••••••"
           bind:value={password} class:invalid={passwordError} class:valid={password && !passwordError}>
    {#if passwordError}<p class="error">{passwordError}</p>{/if}
    {#if password}
      <p class="strength" style:color={passwordStrength().color}>{passwordStrength().label}</p>
    {/if}
  </div>

  <button type="submit" disabled={!allValid}>
    {allValid ? 'Submit' : 'Fix errors to submit'}
  </button>
</form>

{#if formResult}
  <div class="card mt-1">
    <h3>✅ All validations passed!</h3>
    <pre>{JSON.stringify(formResult, null, 2)}</pre>
  </div>
{/if}

<div class="compare-note">
  <strong>The magic of $derived:</strong> Each error is a computed value that 
  recalculates when its input changes. No event listeners, no manual DOM updates.
  The button's disabled state is <em>also</em> a $derived value — when all errors 
  clear, the button enables itself automatically.
</div>


<style>
  h1 { font-size: 1.8rem; margin-bottom: 0.5rem; color: #0f172a; }
  h3 { margin-bottom: 0.25rem; }
  p { margin-bottom: 0.75rem; }
  pre { background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 8px; font-size: 0.85rem; }
  .form-group { margin-bottom: 1rem; }
  label { display: block; font-weight: 600; margin-bottom: 0.25rem; font-size: 0.9rem; }
  input { width: 100%; padding: 0.5rem 0.75rem; border: 2px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem; font-family: inherit; transition: border-color 0.2s; }
  input:focus { outline: none; border-color: #3b82f6; }
  input.invalid { border-color: #ef4444; }
  input.valid { border-color: #22c55e; }
  .error { color: #ef4444; font-size: 0.8rem; margin-top: 0.25rem; }
  .strength { font-size: 0.85rem; margin-top: 0.25rem; }
  button { background-color: #3b82f6; color: white; border: none; padding: 0.5rem 1.25rem; border-radius: 6px; font-size: 0.95rem; cursor: pointer; }
  button:hover:not(:disabled) { background-color: #2563eb; }
  button:disabled { opacity: 0.5; cursor: not-allowed; }
  .card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; }
  .mt-1 { margin-top: 0.5rem; }
  .compare-note { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 0.75rem 1rem; margin: 1rem 0; font-size: 0.9rem; border-radius: 0 6px 6px 0; }
  .compare-note strong { color: #1d4ed8; }
</style>
