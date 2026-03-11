<!--
  /comments — Comments Section with Hash IDs (Feature #12)
  
  COMPARE TO: comments.html + comments.js in the Vanilla JS version.
  
  This is where Svelte's {#each} REALLY shines compared to Vanilla JS.
  
  Vanilla JS approach:
    1. Create a <div> with document.createElement
    2. Set innerHTML with template literal
    3. Prepend to the container
    4. To delete: find element by ID, call .remove(), filter array
  
  Svelte approach:
    1. Push to array → {#each} re-renders automatically
    2. Filter array → removed items disappear from DOM automatically
-->

<!--
  ╔═══════════════════════════════════════════════════════════════╗
  ║  TYPESCRIPT VERSION — COMMENTED OUT                          ║
  ║                                                              ║
  ║  In SvelteKit, TypeScript is a first-class citizen.          ║
  ║  Just change <script> to <script lang="ts"> and add types.   ║
  ║                                                              ║
  ║  SETUP: When creating your project with                      ║
  ║    pnpm dlx sv create my-app                                 ║
  ║  select "Yes, using TypeScript syntax" when prompted.        ║
  ║                                                              ║
  ║  No extra compile step — SvelteKit handles it automatically. ║
  ╚═══════════════════════════════════════════════════════════════╝

  Here's exactly how the <script> block below would look in TypeScript:

  <script lang="ts">
    // ── Define the Comment type ────────────────────────────
    // This is like a Python dataclass or TypedDict:
    //   class Comment(TypedDict):
    //       id: str
    //       author: str
    //       text: str
    //       timestamp: str

    interface Comment {
      id: string;
      author: string;
      text: string;
      timestamp: string;
    }

    // ── Typed reactive state ───────────────────────────────
    // $state<Type>() — the generic tells TS what type the array holds
    let comments: Comment[] = $state([]);
    //          ^^^^^^^^^^^ TypeScript now enforces that this array
    //                      can ONLY contain Comment objects.
    //                      Try pushing {id: 123} — error! (id must be string)

    let authorInput: string = $state('');
    let textInput: string = $state('');

    // ── Typed function ─────────────────────────────────────
    function addComment(): void {
      if (!authorInput.trim() || !textInput.trim()) return;

      const newComment: Comment = {
        id: crypto.randomUUID(),
        author: authorInput.trim(),
        text: textInput.trim(),
        timestamp: new Date().toLocaleString(),
      };
      // If you misspell "author" as "autor" here, TypeScript
      // catches it BEFORE you even run the code!

      comments = [...comments, newComment];
      authorInput = '';
      textInput = '';
    }

    function deleteComment(id: string): void {
      //                      ^^^^^^ TypeScript ensures you pass a string
      comments = comments.filter((c: Comment) => c.id !== id);
    }
  < /script>    (remove space before / when uncommenting)

  The template ({#each}, {#if}, etc.) stays EXACTLY the same —
  TypeScript only affects the <script> block.

  BENEFITS IN SVELTE SPECIFICALLY:
    ✅ $props() can be typed — components get autocomplete
    ✅ API response shapes can be typed — catch mismatches early
    ✅ $derived() infers types automatically
    ✅ Editor shows types on hover for every template variable
    ✅ No separate compile step — SvelteKit handles it

  Python comparison:
    Python type hints          TypeScript
    ─────────────────          ──────────
    name: str                  name: string
    count: int                 count: number   (no int/float!)
    items: list[str]           items: string[]
    data: dict[str, int]       data: Record<string, number>
    result: str | None         result: string | null
-->

<script>
  // Reactive state
  let comments = $state([]);
  let authorInput = $state('');
  let textInput = $state('');

  function addComment() {
    if (!authorInput.trim() || !textInput.trim()) return;

    // Create comment object — same as Vanilla JS version
    const comment = {
      id: crypto.randomUUID(),
      author: authorInput.trim(),
      text: textInput.trim(),
      timestamp: new Date().toLocaleString(),
    };

    // ============================================================
    // THE KEY DIFFERENCE:
    //
    // Vanilla JS:
    //   comments.push(comment);     // Update array
    //   renderComment(comment);      // Manually create DOM elements
    //   countEl.textContent = ...;   // Manually update count
    //
    // Svelte:
    //   comments = [comment, ...comments];  // That's it!
    //   {#each} re-renders. Count uses {comments.length}. All auto.
    //
    // NOTE: We use = [...spread] instead of .push() because Svelte
    // needs an ASSIGNMENT to detect the change. Array mutations like
    // .push() don't trigger reactivity. This is a common gotcha!
    //
    // Python analogy: It's like the difference between
    //   list.append(item)           # mutates in place (Svelte won't see it)
    //   list = list + [item]        # creates new list (Svelte sees the assignment)
    // ============================================================
    comments = [comment, ...comments];  // Newest first

    // Clear inputs
    authorInput = '';
    textInput = '';
  }

  function deleteComment(id) {
    // .filter() creates a new array without the deleted comment.
    // Svelte sees the assignment and re-renders {#each}.
    // The deleted comment's DOM element simply vanishes.
    //
    // In Vanilla JS, we also had to: document.getElementById(`comment-${id}`).remove()
    // In Svelte: just update the data. The DOM follows.
    comments = comments.filter(c => c.id !== id);
  }
</script>


<h1>Comments Section (Feature 12)</h1>
<p>Each comment gets a UUID. Push to array → list re-renders automatically.</p>

<div class="card">
  <h3>Add a Comment</h3>
  <form onsubmit={(e) => { e.preventDefault(); addComment(); }}>
    <div class="form-group">
      <label for="commentAuthor">Name:</label>
      <input type="text" id="commentAuthor" placeholder="Your name" required bind:value={authorInput}>
    </div>
    <div class="form-group">
      <label for="commentText">Comment:</label>
      <textarea id="commentText" rows="3" placeholder="Write your comment..." required bind:value={textInput}></textarea>
    </div>
    <button type="submit">Post Comment</button>
  </form>
</div>

<p class="mt-2">{comments.length} comment(s)</p>

<!--
  {#each comments as comment (comment.id)}
  
  This loops through the comments array and renders a block for each one.
  (comment.id) is the "key" — it helps Svelte track which DOM elements
  correspond to which data items for efficient updates.
  
  When comments changes (add/delete):
  - Added items: Svelte creates new DOM elements
  - Removed items: Svelte removes their DOM elements
  - Unchanged items: Svelte leaves them alone (efficient!)
  
  In Vanilla JS, we had to do ALL of this manually:
    const div = document.createElement('div');
    div.innerHTML = `...`;
    list.prepend(div);
-->
{#each comments as comment (comment.id)}
  <div class="comment">
    <div class="meta">
      <span>
        <span class="author">{comment.author}</span>
        · {comment.timestamp}
      </span>
      <span class="hash-id" title="Unique comment ID">
        #{comment.id.slice(0, 8)}
      </span>
    </div>
    <p>{comment.text}</p>
    <button class="delete-btn" onclick={() => deleteComment(comment.id)}>
      Delete
    </button>
  </div>
{/each}

{#if comments.length === 0}
  <p class="empty">No comments yet. Be the first!</p>
{/if}

<div class="compare-note">
  <strong>Array reactivity gotcha:</strong> Use <code>comments = [newItem, ...comments]</code> 
  instead of <code>comments.push(newItem)</code>. Svelte detects <em>assignments</em>, 
  not mutations. This is the #1 thing students trip over.
</div>


<style>
  h1 { font-size: 1.8rem; margin-bottom: 0.5rem; color: #0f172a; }
  h3 { margin-bottom: 0.5rem; }
  p { margin-bottom: 0.75rem; }
  code { background: #f1f5f9; padding: 0.15rem 0.4rem; border-radius: 4px; font-family: "Consolas", monospace; }
  .form-group { margin-bottom: 1rem; }
  label { display: block; font-weight: 600; margin-bottom: 0.25rem; }
  input, textarea { width: 100%; padding: 0.5rem 0.75rem; border: 2px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem; font-family: inherit; }
  input:focus, textarea:focus { outline: none; border-color: #3b82f6; }
  button { background-color: #3b82f6; color: white; border: none; padding: 0.5rem 1.25rem; border-radius: 6px; font-size: 0.95rem; cursor: pointer; }
  button:hover { background-color: #2563eb; }
  .card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; margin-bottom: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
  .comment { border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; margin-bottom: 0.75rem; background: white; }
  .meta { display: flex; justify-content: space-between; font-size: 0.8rem; color: #94a3b8; margin-bottom: 0.5rem; }
  .author { font-weight: 600; color: #334155; }
  .hash-id { font-family: monospace; font-size: 0.75rem; }
  .delete-btn { background-color: #64748b; font-size: 0.8rem; padding: 0.25rem 0.75rem; margin-top: 0.5rem; }
  .delete-btn:hover { background-color: #475569; }
  .empty { text-align: center; color: #94a3b8; font-style: italic; padding: 1rem 0; }
  .mt-2 { margin-top: 1rem; }
  .compare-note { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 0.75rem 1rem; margin: 1rem 0; font-size: 0.9rem; border-radius: 0 6px 6px 0; }
  .compare-note strong { color: #1d4ed8; }
</style>
