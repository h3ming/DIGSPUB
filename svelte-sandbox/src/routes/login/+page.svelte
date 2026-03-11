<!--
  /login — Login System, Commented Out (Feature #10)
  
  COMPARE TO: login.html + login.js in the Vanilla JS version.
  
  The form UI is active but the authentication is simulated.
  Real auth requires a server-side component.
  
  In SvelteKit, real auth would use:
  - +page.server.js (or .ts) for server-side form handling
  - Form actions (SvelteKit's built-in pattern)
  - Cookies for session management
  
  This is a major SvelteKit advantage over Vanilla JS: the framework
  has built-in support for server-side logic, making auth patterns
  much more straightforward.
-->

<script>
  let email = $state('');
  let password = $state('');
  let isLoggedIn = $state(false);
  let statusMessage = $state('');
  let statusColor = $state('#64748b');

  async function handleLogin() {
    statusMessage = '⏳ Checking credentials...';
    statusColor = '#64748b';

    // Simulate server response delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // ============================================================
    // COMMENTED OUT: Real authentication with SvelteKit
    // ============================================================
    /*
    // In a real SvelteKit app, you'd use a FORM ACTION instead of fetch.
    // Create a file: src/routes/login/+page.server.js
    //
    // export const actions = {
    //   default: async ({ request, cookies }) => {
    //     const data = await request.formData();
    //     const email = data.get('email');
    //     const password = data.get('password');
    //
    //     // Check credentials against database
    //     const user = await db.getUserByEmail(email);
    //     if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    //       return fail(401, { message: 'Invalid credentials' });
    //     }
    //
    //     // Set a session cookie
    //     cookies.set('session', createSessionToken(user.id), {
    //       path: '/',
    //       httpOnly: true,   // JavaScript can't read this cookie (security!)
    //       secure: true,     // Only sent over HTTPS
    //       maxAge: 60 * 60 * 24 * 7  // 1 week
    //     });
    //
    //     throw redirect(303, '/dashboard');
    //   }
    // };
    //
    // And in the template, use SvelteKit's <form method="POST">:
    //   <form method="POST">
    //     <input name="email" type="email">
    //     <input name="password" type="password">
    //     <button type="submit">Log In</button>
    //   </form>
    //
    // SvelteKit handles the server communication automatically!
    // No fetch() calls needed. No manual JSON parsing.
    //
    // This is a HUGE advantage of SvelteKit over Vanilla JS:
    // - Form actions handle server logic
    // - Progressive enhancement (works without JavaScript!)
    // - Built-in CSRF protection
    // - Type-safe with TypeScript
    */
    // ============================================================

    // Simulated success
    statusMessage = '';
    isLoggedIn = true;
  }

  function handleLogout() {
    /*
    // Real logout:
    // In +page.server.js:
    //   export const actions = {
    //     logout: async ({ cookies }) => {
    //       cookies.delete('session', { path: '/' });
    //       throw redirect(303, '/login');
    //     }
    //   };
    */
    isLoggedIn = false;
    email = '';
    password = '';
  }
</script>


<h1>Login System (Feature 10 — Commented Out)</h1>
<p>Shows the <em>structure</em> of a login system. Real auth requires a server.</p>

<div class="warning-card">
  <p>⚠️ <strong>Important:</strong> Never do real authentication in client-side 
     JavaScript alone. Passwords must be verified on a server.</p>
</div>

<!-- 
  {#if isLoggedIn} / {:else} — Conditional rendering.
  Shows either the login form OR the "logged in" view.
  In Vanilla JS: manually toggle .hidden on two different elements.
  In Svelte: one {#if}/{:else} block.
-->
{#if !isLoggedIn}
  <div class="demo-section" style="max-width: 400px;">
    <h3>🔒 Log In</h3>
    <form onsubmit={(e) => { e.preventDefault(); handleLogin(); }}>
      <div class="form-group">
        <label for="loginEmail">Email:</label>
        <input type="email" id="loginEmail" placeholder="jane@example.com" required bind:value={email}>
      </div>
      <div class="form-group">
        <label for="loginPassword">Password:</label>
        <input type="password" id="loginPassword" placeholder="••••••••" required bind:value={password}>
      </div>
      <button type="submit" style="width:100%;">Log In</button>
    </form>
    {#if statusMessage}
      <p class="status" style:color={statusColor}>{statusMessage}</p>
    {/if}
  </div>
{:else}
  <div class="demo-section" style="max-width: 400px;">
    <h3>👋 Welcome, {email}!</h3>
    <p>You are logged in. (This is simulated.)</p>
    <button class="danger" onclick={handleLogout} style="width:100%;">Log Out</button>
  </div>
{/if}

<div class="compare-note">
  <strong>SvelteKit advantage:</strong> SvelteKit's form actions let you write 
  server-side auth logic in the same project. The form works WITHOUT JavaScript 
  (progressive enhancement). In Vanilla JS, you'd need to set up a completely 
  separate server (Express, Flask, etc.).
</div>

<h2>What Real Auth Looks Like</h2>
<pre>
// SvelteKit form action (in +page.server.js):
export const actions = {'{'}
  default: async ({'{'}request, cookies{'}'}) => {'{'}
    const data = await request.formData();
    const user = await db.getUserByEmail(data.get('email'));
    
    if (user && await bcrypt.compare(data.get('password'), user.hash)) {'{'}
      cookies.set('session', createToken(user.id), {'{'}
        httpOnly: true,  // JS can't read this (security!)
        secure: true,    // HTTPS only
      {'}'});
      throw redirect(303, '/dashboard');
    {'}'}
    
    return fail(401, {'{'}message: 'Invalid credentials'{'}'});
  {'}'}
{'}'};
</pre>


<style>
  h1 { font-size: 1.8rem; margin-bottom: 0.5rem; color: #0f172a; }
  h2 { font-size: 1.3rem; margin: 1.5rem 0 0.5rem; color: #334155; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.25rem; }
  h3 { margin-bottom: 0.5rem; }
  p { margin-bottom: 0.75rem; }
  pre { background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 8px; font-size: 0.85rem; overflow-x: auto; margin: 0.75rem 0; }
  .demo-section { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; margin: 1.25rem 0; }
  .form-group { margin-bottom: 1rem; }
  label { display: block; font-weight: 600; margin-bottom: 0.25rem; }
  input { width: 100%; padding: 0.5rem 0.75rem; border: 2px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem; font-family: inherit; }
  input:focus { outline: none; border-color: #3b82f6; }
  button { background-color: #3b82f6; color: white; border: none; padding: 0.5rem 1.25rem; border-radius: 6px; font-size: 0.95rem; cursor: pointer; }
  button:hover { background-color: #2563eb; }
  .danger { background-color: #ef4444; }
  .danger:hover { background-color: #dc2626; }
  .status { text-align: center; margin-top: 0.5rem; }
  .warning-card { background: white; border: 1px solid #e2e8f0; border-left: 4px solid #eab308; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; }
  .compare-note { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 0.75rem 1rem; margin: 1rem 0; font-size: 0.9rem; border-radius: 0 6px 6px 0; }
  .compare-note strong { color: #1d4ed8; }
</style>
