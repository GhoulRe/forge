// Skill tree content. o = options, a = index of the correct option, w = why.
export const DOMAINS = [
  { id: 'dsa', icon: '🧮', name: 'Data structures & algorithms', blurb: 'Think in complexity and patterns before you write code.', topics: [
    { id: 'dsa-bigo', t: 'Big-O and binary search', lab: 'bs',
      explain: '<p><b>Big-O</b> describes how work grows with input size, ignoring constants. Learn the ladder: O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²) &lt; O(2ⁿ). Binary search is O(log n) because every step halves what is left. Try it below and count the steps.</p>',
      quiz: [
        { q: 'Time complexity of binary search on a sorted array?', o: ['O(n)', 'O(n log n)', 'O(log n)', 'O(1)'], a: 2, w: 'Each comparison halves the remaining range.' },
        { q: 'Two nested loops that each run n times give:', o: ['O(n²)', 'O(n)', 'O(log n)', 'O(2n)'], a: 0, w: 'n × n iterations.' },
        { q: 'Average cost of a hash map lookup:', o: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], a: 3, w: 'Hashing jumps straight to a bucket (worst case O(n) with heavy collisions).' }] },
    { id: 'dsa-window', t: 'Two pointers and sliding window',
      explain: '<p><b>Two pointers</b> walk a sorted array from both ends (or at different speeds) to avoid a nested loop. A <b>sliding window</b> keeps a running range, expanding on the right and shrinking on the left, which turns many O(n²) substring problems into O(n).</p>',
      quiz: [
        { q: 'Which problem is a classic sliding-window problem?', o: ['Sorting an array', 'Longest substring without repeating characters', 'Finding a node in a BST', 'Detecting a graph cycle'], a: 1, w: 'You grow and shrink a window while tracking duplicates.' },
        { q: 'Two pointers for "pair that sums to target" needs the array to be:', o: ['unique', 'even length', 'all positive', 'sorted'], a: 3, w: 'Moving left up raises the sum; moving right down lowers it. That needs order.' },
        { q: 'Recomputing every window of size k from scratch costs O(n·k). Sliding fixes it by:', o: ['sorting first', 'adding the new item and removing the old one', 'using recursion', 'using a bigger k'], a: 1, w: 'Each step updates the running total in O(1).' }] },
    { id: 'dsa-struct', t: 'Hash maps, stacks and queues', lab: 'ds',
      explain: '<p>A <b>hash map</b> trades memory for O(1) lookups: use it to count, dedupe and index. A <b>stack</b> is last-in-first-out (undo, bracket matching, DFS). A <b>queue</b> is first-in-first-out (BFS, task scheduling). Often, choosing the right structure is the whole solution. Try both below.</p>',
      quiz: [
        { q: 'Which structure fits validating nested brackets?', o: ['Queue', 'Stack', 'Hash map', 'Heap'], a: 1, w: 'The most recent opener must close first (LIFO).' },
        { q: 'Breadth-first search relies on a:', o: ['Stack', 'Sorted array', 'Queue', 'Hash set'], a: 2, w: 'It visits nodes level by level, first in first out.' },
        { q: 'To count how often each word appears in O(n), use:', o: ['A nested loop', 'A stack', 'Recursion only', 'A hash map of word to count'], a: 3, w: 'One pass, O(1) update per word.' }] }] },
  { id: 'web', icon: '🌐', name: 'Web fundamentals', blurb: 'What interviewers expect a frontend engineer to know cold.', topics: [
    { id: 'web-render', t: 'How the browser renders',
      explain: '<p>The browser parses HTML into the DOM and CSS into the CSSOM, combines them into a render tree, then runs layout, paint and composite. Changing layout properties (<code>width</code>, <code>top</code>) forces reflow; <code>transform</code> and <code>opacity</code> usually need only compositing, so they animate smoothly. Core Web Vitals measure the result: <b>LCP</b> (loading), <b>INP</b> (responsiveness) and <b>CLS</b> (visual stability).</p>',
      quiz: [
        { q: 'Which is usually cheapest to animate?', o: ['width', 'top', 'transform', 'margin'], a: 2, w: 'Transforms are handled by the compositor without relayout.' },
        { q: 'CLS measures:', o: ['Unexpected layout shifts', 'Server response time', 'Bundle size', 'Memory use'], a: 0, w: 'Cumulative Layout Shift scores visual stability.' },
        { q: 'A script tag without async or defer in the head typically:', o: ['Loads in parallel and never blocks', 'Runs after the page loads', 'Only affects CSS', 'Blocks HTML parsing while it downloads and runs'], a: 3, w: 'Parsing pauses until the script has run; defer avoids that.' }] },
    { id: 'web-a11y', t: 'Accessibility and security basics',
      explain: '<p>Use semantic HTML first (<code>button</code>, <code>nav</code>, <code>label</code>), manage focus for dialogs, and never rely on colour alone. For security: React escapes text by default; avoid <code>dangerouslySetInnerHTML</code> with untrusted HTML, keep secrets out of client code, and prefer HttpOnly cookies for session tokens.</p>',
      quiz: [
        { q: 'The best way to make a clickable control keyboard-accessible is to:', o: ['Add onClick to a div', 'Use a button element', 'Add tabindex to everything', 'Use an image'], a: 1, w: 'Buttons bring focus, Enter and Space support, and the right role for free.' },
        { q: 'dangerouslySetInnerHTML with user-supplied content risks:', o: ['Slower rendering only', 'Memory leaks', 'Cross-site scripting (XSS)', 'Broken hydration only'], a: 2, w: 'Unsanitised HTML can run attacker scripts.' },
        { q: 'Where is it safest to keep a session token?', o: ['localStorage', 'A global on window', 'The URL', 'An HttpOnly, Secure cookie'], a: 3, w: 'Scripts cannot read HttpOnly cookies, which limits XSS damage.' }] }] },
  { id: 'sd', icon: '🏗️', name: 'System design', blurb: 'Estimate, then choose trade-offs on purpose.', topics: [
    { id: 'sd-est', t: 'Back-of-envelope estimation', lab: 'est',
      explain: '<p>Turn users into numbers: <code>QPS = requests per day ÷ 86,400</code>, peak ≈ 2–3× average, storage = items × size. Say your assumptions out loud; interviewers care about the reasoning more than the exact figure. Use the estimator below.</p>',
      quiz: [
        { q: '10 million requests per day is roughly how many average requests per second?', o: ['~1,160', '~116', '~11,600', '~10'], a: 1, w: '10,000,000 / 86,400 ≈ 116.' },
        { q: 'One million writes a day at 2 KB each is about how much per day?', o: ['200 MB', '20 GB', '2 TB', '2 GB'], a: 3, w: '1,000,000 × 2 KB = 2,000,000 KB = 2 GB.' },
        { q: 'Peak traffic is usually estimated as:', o: ['the average', '2–3× the average', '0.5× the average', 'equal to storage'], a: 1, w: 'Traffic is bursty, so plan for a multiple of the mean.' }] },
    { id: 'sd-scale', t: 'Caching, load balancing and sharding',
      explain: '<p>Caches cut latency and database load; load balancers spread traffic over healthy servers; sharding splits data across databases by a key. Each trades complexity for scale: invalidation, hot keys and rebalancing.</p>',
      quiz: [
        { q: 'A cache-aside read first:', o: ['writes to the database only', 'clears the cache', 'checks the cache, then the database on a miss', 'queries every shard'], a: 2, w: 'The application loads and fills the cache on a miss.' },
        { q: 'Sharding by user_id risks:', o: ['hot shards if some users are far busier', 'no downside', 'losing the primary key', 'slower writes everywhere'], a: 0, w: 'Skewed keys put uneven load on a few shards.' },
        { q: 'A load balancer mainly:', o: ['stores sessions forever', 'encrypts the database', 'spreads requests across healthy servers', 'compiles code'], a: 2, w: 'It routes traffic and removes unhealthy instances.' }] },
    { id: 'sd-api', t: 'APIs, pagination and rate limiting',
      explain: '<p>Design APIs around resources and idempotent verbs. Prefer <b>cursor pagination</b> for large or changing lists (offset gets slow and can skip or repeat rows when data changes). Protect services with <b>rate limiting</b> (token bucket or sliding window) and answer with HTTP 429 plus a retry hint.</p>',
      quiz: [
        { q: 'Why prefer cursor pagination over offset for a busy feed?', o: ['Offsets are stable under inserts', 'Cursors stay correct and fast as items are added', 'Cursors need no index', 'Offset is always faster'], a: 1, w: 'An offset shifts when rows are inserted; a cursor anchors to a specific item.' },
        { q: 'Which status code tells a client it is being rate limited?', o: ['401', '403', '404', '429'], a: 3, w: '429 Too Many Requests.' },
        { q: 'An idempotent request is one that:', o: ['Never fails', 'Is always cached', 'Can be repeated with the same final effect', 'Must use POST'], a: 2, w: 'Safe to retry: PUT and DELETE are idempotent by design.' }] }] },
];
export const ALL_TOPICS = DOMAINS.flatMap(d => d.topics.map(t => ({ ...t, domain: d.name })));
