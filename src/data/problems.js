// Forjix — Comprehensive Coding Problem Bank (74 Problems)
export const problems = [
  {
    "id": "p1",
    "title": "Reverse a string / Palindrome check",
    "cat": "Two pointers",
    "difficulty": "Easy",
    "desc": "Write a function `isPalindrome(s)` that determines if string `s` is a palindrome, considering only alphanumeric characters and ignoring cases.",
    "priority": "P1",
    "objective": "Master two-pointer converging traversal and string normalization (ignoring case and alphanumeric characters).",
    "examples": [
      {
        "input": "s = \"A man, a plan, a canal: Panama\"",
        "output": "true",
        "explanation": "Normalized string is \"amanaplanacanalpanama\" which reads identical forwards and backwards."
      },
      {
        "input": "s = \"race a car\"",
        "output": "false",
        "explanation": "Normalized string is \"raceacar\" which is not a palindrome."
      }
    ],
    "edgeCases": [
      "Empty string or single character string (should return true)",
      "String with only punctuation and whitespace (should return true)",
      "Mixed case letters and numerical digits"
    ],
    "hints": [
      "Step 1: How can you ignore non-alphanumeric characters and casing? Either normalize first with regex or skip invalid characters during traversal.",
      "Step 2: Initialize two pointers: `left = 0` and `right = s.length - 1`. Move them toward each other.",
      "Step 3: At each step, compare `s[left].toLowerCase()` and `s[right].toLowerCase()`. If they mismatch, return false immediately; otherwise increment left and decrement right."
    ],
    "timeComplexity": "O(n) where n is string length",
    "spaceComplexity": "O(1) extra space with two pointers in-place, or O(n) if creating a filtered string",
    "solution": "function isPalindrome(s) {\n  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n  let left = 0, right = clean.length - 1;\n  while (left < right) {\n    if (clean[left] !== clean[right]) return false;\n    left++;\n    right--;\n  }\n  return true;\n}",
    "explanation": "Clean the string to keep only lowercase alphanumeric characters, then converge two pointers from the ends comparing opposite characters.",
    "starter": "function isPalindrome(s) {\n  // Your code here\n}"
  },
  {
    "id": "p2",
    "title": "Find the second-largest number",
    "cat": "Arrays",
    "difficulty": "Easy",
    "desc": "Given an array of numbers `nums`, find the second-largest DISTINCT number. If no second-largest exists (e.g. array has fewer than two distinct values), return `null`.",
    "priority": "P1",
    "objective": "Extract extreme values in a single linear pass without the O(n log n) cost of full sorting.",
    "examples": [
      {
        "input": "nums = [12, 35, 1, 10, 34, 1]",
        "output": "34",
        "explanation": "Largest is 35, second-largest is 34."
      },
      {
        "input": "nums = [10, 10, 10]",
        "output": "null",
        "explanation": "All elements are identical; no second-largest distinct value."
      }
    ],
    "edgeCases": [
      "Array length < 2 (return null)",
      "All elements are duplicates (return null)",
      "Negative numbers in array (e.g. [-5, -2, -10])"
    ],
    "hints": [
      "Step 1: You could sort, but sorting costs O(n log n). Can you track the top two values in a single O(n) pass?",
      "Step 2: Initialize `first = -Infinity` and `second = -Infinity`.",
      "Step 3: For each number: if `num > first`, then `second = first; first = num;`. Else if `num > second` and `num !== first`, update `second = num;`."
    ],
    "timeComplexity": "O(n) single pass",
    "spaceComplexity": "O(1) auxiliary space",
    "solution": "function findSecondLargest(nums) {\n  let first = -Infinity, second = -Infinity;\n  for (const n of nums) {\n    if (n > first) {\n      second = first;\n      first = n;\n    } else if (n > second && n !== first) {\n      second = n;\n    }\n  }\n  return second === -Infinity ? null : second;\n}",
    "explanation": "Maintain two scalar variables for largest and second-largest distinct values, updating them appropriately across a single pass.",
    "starter": "function findSecondLargest(nums) {\n  // Your code here\n}"
  },
  {
    "id": "p3",
    "title": "Count element frequency",
    "cat": "JavaScript",
    "difficulty": "Easy",
    "priority": "P1",
    "objective": "Solve Count element frequency with optimal time and space complexity.",
    "desc": "Use an object or Map to count repeated numbers or characters.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Map or object: counts[x]=(counts[x]||0)+1.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Solve Count element frequency",
    "explanation": "Apply optimal data structure and handle boundary edge cases.",
    "starter": "// Count element frequency\n// Use an object or Map to count repeated numbers or characters.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p4",
    "title": "Find duplicates and unique values",
    "cat": "JavaScript",
    "difficulty": "Easy",
    "priority": "P1",
    "objective": "Solve Find duplicates and unique values with optimal time and space complexity.",
    "desc": "Try both a Set-based approach and a frequency-counter approach.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "A Set tracks seen values; a second Set collects duplicates.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Solve Find duplicates and unique values",
    "explanation": "Apply optimal data structure and handle boundary edge cases.",
    "starter": "// Find duplicates and unique values\n// Try both a Set-based approach and a frequency-counter approach.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p5",
    "title": "Remove duplicates without Set",
    "cat": "JavaScript",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Remove duplicates without Set with optimal time and space complexity.",
    "desc": "Preserve ordering and explain the time/space trade-off.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Check an object of seen keys (or includes for O(n²)) while keeping order.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Solve Remove duplicates without Set",
    "explanation": "Apply optimal data structure and handle boundary edge cases.",
    "starter": "// Remove duplicates without Set\n// Preserve ordering and explain the time/space trade-off.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p6",
    "title": "Group objects by a property",
    "cat": "JavaScript",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Group objects by a property with optimal time and space complexity.",
    "desc": "For example, group employees by department or products by category.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "reduce into an object keyed by the property.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Solve Group objects by a property",
    "explanation": "Apply optimal data structure and handle boundary edge cases.",
    "starter": "// Group objects by a property\n// For example, group employees by department or products by category.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p7",
    "title": "Merge object arrays by id",
    "cat": "JavaScript",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Merge object arrays by id with optimal time and space complexity.",
    "desc": "Combine matching records from two arrays while keeping the original inputs unchanged.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Index one array by id in a Map, then merge in a single pass.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Solve Merge object arrays by id",
    "explanation": "Apply optimal data structure and handle boundary edge cases.",
    "starter": "// Merge object arrays by id\n// Combine matching records from two arrays while keeping the original inputs unchanged.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p8",
    "title": "Check whether two strings are anagrams",
    "cat": "Frequency counters",
    "difficulty": "Easy",
    "desc": "Write a function `isAnagram(s, t)` returning true if `t` is an anagram of `s` (contains the exact same characters with the same frequencies), and false otherwise.",
    "priority": "P1",
    "objective": "Implement frequency counting using a hash map or fixed-size array in O(n) time.",
    "examples": [
      {
        "input": "s = \"anagram\", t = \"nagaram\"",
        "output": "true",
        "explanation": "Both strings have identical character counts."
      },
      {
        "input": "s = \"rat\", t = \"car\"",
        "output": "false",
        "explanation": "Characters do not match."
      }
    ],
    "edgeCases": [
      "Different string lengths (return false immediately)",
      "Empty strings (return true)",
      "Different casing or whitespace if specified"
    ],
    "hints": [
      "Step 1: Quick check: If `s.length !== t.length`, they cannot be anagrams.",
      "Step 2: You could sort both strings and compare (O(n log n)), but frequency counting is O(n).",
      "Step 3: Count characters in `s` using an object or Map. Then iterate through `t`, decrementing counts. If any count drops below 0 or key is missing, return false."
    ],
    "timeComplexity": "O(n) where n is string length",
    "spaceComplexity": "O(1) auxiliary space (at most 26 lowercase English letters or fixed character set)",
    "solution": "function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = {};\n  for (const c of s) count[c] = (count[c] || 0) + 1;\n  for (const c of t) {\n    if (!count[c]) return false;\n    count[c]--;\n  }\n  return true;\n}",
    "explanation": "Count character frequencies in the first string, then decrement for the second string. An early return occurs if any character count is exhausted.",
    "starter": "function isAnagram(s, t) {\n  // Your code here\n}"
  },
  {
    "id": "p9",
    "title": "First non-repeating character",
    "cat": "JavaScript",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve First non-repeating character with optimal time and space complexity.",
    "desc": "Count first, then scan in original order to preserve the earliest match.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Two passes: count, then return the first character with count 1.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Solve First non-repeating character",
    "explanation": "Apply optimal data structure and handle boundary edge cases.",
    "starter": "// First non-repeating character\n// Count first, then scan in original order to preserve the earliest match.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p10",
    "title": "Two Sum",
    "cat": "Frequency counters",
    "difficulty": "Medium",
    "desc": "Given an array of integers `nums` and an integer `target`, return indices `[i, j]` of the two numbers such that they add up to `target`. Each input has exactly one solution, and you may not use the same element twice.",
    "priority": "P1",
    "objective": "Learn the hash map lookup pattern to trade linear space for quadratic time reduction.",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "nums[0] + nums[1] == 2 + 7 == 9"
      },
      {
        "input": "nums = [3, 2, 4], target = 6",
        "output": "[1, 2]",
        "explanation": "nums[1] + nums[2] == 2 + 4 == 6"
      }
    ],
    "edgeCases": [
      "Negative numbers in array",
      "Target is zero or negative",
      "Duplicate values that together equal the target (e.g. [3, 3], target 6)"
    ],
    "hints": [
      "Step 1: Brute force uses nested loops checking all pairs (O(n²)). How can we check if `target - current` exists in O(1)?",
      "Step 2: Use a Map to store each number and its index as you iterate.",
      "Step 3: At each index `i`, check if `seen.has(target - nums[i])`. If found, return `[seen.get(target - nums[i]), i]`. Otherwise, `seen.set(nums[i], i)`."
    ],
    "timeComplexity": "O(n) single pass",
    "spaceComplexity": "O(n) for the hash map",
    "solution": "function twoSum(nums, target) {\n  const seen = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (seen.has(complement)) {\n      return [seen.get(complement), i];\n    }\n    seen.set(nums[i], i);\n  }\n  return [];\n}",
    "explanation": "Iterate through the array while checking if the required complement already exists in our Map. Store seen elements with their index.",
    "starter": "function twoSum(nums, target) {\n  // Your code here\n}"
  },
  {
    "id": "p11",
    "title": "Balanced parentheses / Brackets validator",
    "cat": "Stack & queue",
    "difficulty": "Medium",
    "desc": "Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. Open brackets must be closed by the same type of brackets in the correct order.",
    "priority": "P1",
    "objective": "Apply the Stack (LIFO) data structure for nested delimiter validation.",
    "examples": [
      {
        "input": "s = \"()[]{}\"",
        "output": "true",
        "explanation": "Every bracket is matched and closed in order."
      },
      {
        "input": "s = \"(]\"",
        "output": "false",
        "explanation": "Mismatched closing bracket."
      },
      {
        "input": "s = \"([)]\"",
        "output": "false",
        "explanation": "Interleaved invalid closing order."
      }
    ],
    "edgeCases": [
      "Empty string (returns true)",
      "Odd length string (returns false immediately)",
      "Starts with closing bracket (e.g. \")(\")",
      "Unclosed opening brackets (e.g. \"(((\")"
    ],
    "hints": [
      "Step 1: If string length is odd, it can never be valid.",
      "Step 2: Use a stack array. When you encounter an opening bracket `(`, `[`, `{`, push it.",
      "Step 3: When you encounter a closing bracket, pop from the stack and verify it matches. At the end, verify the stack is completely empty."
    ],
    "timeComplexity": "O(n) single pass",
    "spaceComplexity": "O(n) worst-case stack depth",
    "solution": "function isValidBrackets(s) {\n  if (s.length % 2 !== 0) return false;\n  const map = { ')': '(', '}': '{', ']': '[' };\n  const stack = [];\n  for (const c of s) {\n    if (c === '(' || c === '{' || c === '[') {\n      stack.push(c);\n    } else if (map[c]) {\n      if (stack.pop() !== map[c]) return false;\n    }\n  }\n  return stack.length === 0;\n}",
    "explanation": "Push opening brackets to a stack. For closing brackets, pop the most recent opener and check for correspondence. Ensure no dangling openers remain.",
    "starter": "function isValidBrackets(s) {\n  // Your code here\n}"
  },
  {
    "id": "p12",
    "title": "Implement debounce with cancellation",
    "cat": "JS functions",
    "difficulty": "Medium",
    "desc": "Create `debounce(fn, delay)` returning a debounced function. If called repeatedly within `delay` ms, execution is delayed. Also attach a `.cancel()` method to clear pending timers.",
    "priority": "P1",
    "objective": "Implement higher-order function debounce from scratch, preserving `this` and arguments, with a cancel method.",
    "examples": [
      {
        "input": "debounced(1); debounced(2); after 50ms",
        "output": "fn(2) called once",
        "explanation": "Subsequent calls cancel previous timers."
      }
    ],
    "edgeCases": [
      "Preserving dynamic `this` context",
      "Passing all arguments correctly",
      "Calling cancel() before timer fires"
    ],
    "hints": [
      "Step 1: Use a closure to store `timerId` outside the returned function.",
      "Step 2: Inside the returned wrapper, call `clearTimeout(timerId)` immediately.",
      "Step 3: Set `timerId = setTimeout(() => fn.apply(this, args), delay)`. Attach `wrapper.cancel = () => clearTimeout(timerId)`."
    ],
    "timeComplexity": "O(1) invocation overhead",
    "spaceComplexity": "O(1) closure state",
    "solution": "function debounce(fn, delay) {\n  let timerId = null;\n  function debounced(...args) {\n    if (timerId) clearTimeout(timerId);\n    timerId = setTimeout(() => {\n      fn.apply(this, args);\n      timerId = null;\n    }, delay);\n  }\n  debounced.cancel = function() {\n    if (timerId) {\n      clearTimeout(timerId);\n      timerId = null;\n    }\n  };\n  return debounced;\n}",
    "explanation": "A closure stores the pending timer. Each call clears any existing timer and schedules a new one with `.apply(this, args)`.",
    "starter": "function debounce(fn, delay) {\n  // Your code here\n}"
  },
  {
    "id": "p13",
    "title": "Implement throttle",
    "cat": "JS functions",
    "difficulty": "Medium",
    "desc": "Implement `throttle(fn, limit)` that ensures `fn` is called at most once every `limit` milliseconds.",
    "priority": "P1",
    "objective": "Rate-limit function execution to at most once per interval using timestamp comparison.",
    "examples": [
      {
        "input": "throttled(1); throttled(2); immediately",
        "output": "fn(1) executes, fn(2) ignored within throttle window"
      }
    ],
    "edgeCases": [
      "First call executes immediately",
      "Rapid subsequent calls within limit are throttled",
      "Calls after limit executes again"
    ],
    "hints": [
      "Step 1: Track `lastRan` timestamp in closure scope.",
      "Step 2: In the returned function, compare `Date.now() - lastRan`.",
      "Step 3: If elapsed time >= limit, update `lastRan = Date.now()` and execute `fn.apply(this, args)`."
    ],
    "timeComplexity": "O(1) overhead",
    "spaceComplexity": "O(1)",
    "solution": "function throttle(fn, limit) {\n  let lastRan = 0;\n  return function(...args) {\n    const now = Date.now();\n    if (now - lastRan >= limit) {\n      fn.apply(this, args);\n      lastRan = now;\n    }\n  };\n}",
    "explanation": "Check whether enough time has elapsed since the last execution before calling the function again.",
    "starter": "function throttle(fn, limit) {\n  // Your code here\n}"
  },
  {
    "id": "p14",
    "title": "Predict Promise/event-loop output",
    "cat": "Async JS",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Predict Promise/event-loop output with optimal time and space complexity.",
    "desc": "Write down synchronous, microtask, and timer ordering before executing.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Synchronous code first, then microtasks (then/await), then timers.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Solve Predict Promise/event-loop output",
    "explanation": "Apply optimal data structure and handle boundary edge cases.",
    "starter": "// Predict Promise/event-loop output\n// Write down synchronous, microtask, and timer ordering before executing.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p15",
    "title": "Build a Todo application with search and filter",
    "cat": "React components",
    "difficulty": "Medium",
    "desc": "Build a complete Todo application with:\n1. Input field to add todos\n2. Toggle complete checkbox\n3. Delete button\n4. Filter buttons: All, Active, Completed\n5. Search query input\n6. Empty state message when no items match.",
    "priority": "P1",
    "objective": "Practice immutable state updates, derived list state, controlled inputs, and stable keys.",
    "examples": [
      {
        "input": "Add \"Learn React\", toggle completed, filter \"Active\"",
        "output": "\"Learn React\" is hidden under Active filter"
      }
    ],
    "edgeCases": [
      "Empty string submission (prevent addition)",
      "Preserving item IDs rather than array index",
      "Search with no matching items (show friendly empty state)"
    ],
    "hints": [
      "Step 1: Model state: `todos` array with `{ id, text, completed }` and `filter` string and `search` query.",
      "Step 2: Derive `visibleTodos = todos.filter(...)` during render instead of maintaining a second state array.",
      "Step 3: Use immutable updates: `todos.map(...)` for toggling and `todos.filter(...)` for deletion."
    ],
    "timeComplexity": "O(n) filtering",
    "spaceComplexity": "O(n) state storage",
    "solution": "function TodoApp() {\n  const [todos, setTodos] = useState([]);\n  const [text, setText] = useState('');\n  const [filter, setFilter] = useState('all');\n  const [search, setSearch] = useState('');\n\n  const addTodo = (e) => {\n    e.preventDefault();\n    if (!text.trim()) return;\n    setTodos([...todos, { id: Date.now(), text: text.trim(), completed: false }]);\n    setText('');\n  };\n\n  const toggleTodo = (id) => {\n    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));\n  };\n\n  const deleteTodo = (id) => {\n    setTodos(todos.filter(t => t.id !== id));\n  };\n\n  const visibleTodos = todos.filter(t => {\n    const matchesFilter = filter === 'all' || (filter === 'active' ? !t.completed : t.completed);\n    const matchesSearch = t.text.toLowerCase().includes(search.toLowerCase());\n    return matchesFilter && matchesSearch;\n  });\n\n  return (\n    <div style={{ padding: 16 }}>\n      <form onSubmit={addTodo} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>\n        <input value={text} onChange={e => setText(e.target.value)} placeholder=\"What needs to be done?\" />\n        <button type=\"submit\">Add</button>\n      </form>\n      <input value={search} onChange={e => setSearch(e.target.value)} placeholder=\"Search todos...\" style={{ marginBottom: 12 }} />\n      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>\n        {['all', 'active', 'completed'].map(f => (\n          <button key={f} onClick={() => setFilter(f)} style={{ fontWeight: filter === f ? 'bold' : 'normal' }}>\n            {f.toUpperCase()}\n          </button>\n        ))}\n      </div>\n      {visibleTodos.length === 0 ? <p>No todos found.</p> : (\n        <ul>\n          {visibleTodos.map(todo => (\n            <li key={todo.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>\n              <input type=\"checkbox\" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />\n              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>\n              <button onClick={() => deleteTodo(todo.id)}>×</button>\n            </li>\n          ))}\n        </ul>\n      )}\n    </div>\n  );\n}",
    "explanation": "Manage raw todos in state, derive filtered and searched views purely during rendering, and perform clean immutable updates.",
    "starter": "function App() {\n  return <div>Build your Todo App here</div>;\n}"
  },
  {
    "id": "p16",
    "title": "Accessible Tabs component",
    "cat": "React components",
    "difficulty": "Easy",
    "desc": "Build a Tabs component taking items `[{ id, label, content }]`. Support active tab state, clicking to select, and keyboard left/right arrow navigation.",
    "priority": "P1",
    "objective": "Build an accessible tabbed interface with keyboard arrow navigation and ARIA attributes.",
    "examples": [
      {
        "input": "Clicking Tab 2",
        "output": "Activates Tab 2 and displays its corresponding content panel"
      }
    ],
    "edgeCases": [
      "Empty tabs list",
      "Default to first tab if active tab not specified",
      "Keyboard arrow wrapping from last to first"
    ],
    "hints": [
      "Step 1: Keep `activeId` state initialized to `items[0]?.id`.",
      "Step 2: Add `role=\"tablist\"` on container, `role=\"tab\"` on buttons with `aria-selected={activeId === item.id}`.",
      "Step 3: Listen for onKeyDown (ArrowLeft, ArrowRight) to cycle the active tab."
    ],
    "timeComplexity": "O(1) switch",
    "spaceComplexity": "O(1)",
    "solution": "function Tabs({ items = [] }) {\n  const [activeId, setActiveId] = useState(items[0]?.id);\n  if (!items.length) return null;\n\n  const handleKeyDown = (e, index) => {\n    if (e.key === 'ArrowRight') {\n      const next = (index + 1) % items.length;\n      setActiveId(items[next].id);\n    } else if (e.key === 'ArrowLeft') {\n      const prev = (index - 1 + items.length) % items.length;\n      setActiveId(items[prev].id);\n    }\n  };\n\n  const activeItem = items.find(i => i.id === activeId) || items[0];\n\n  return (\n    <div>\n      <div role=\"tablist\" style={{ display: 'flex', gap: 8, borderBottom: '1px solid #ccc' }}>\n        {items.map((item, idx) => (\n          <button\n            key={item.id}\n            role=\"tab\"\n            aria-selected={activeId === item.id}\n            onClick={() => setActiveId(item.id)}\n            onKeyDown={(e) => handleKeyDown(e, idx)}\n            style={{\n              padding: '8px 16px',\n              border: 0,\n              borderBottom: activeId === item.id ? '2px solid orange' : 'none',\n              background: 'none',\n              cursor: 'pointer'\n            }}\n          >\n            {item.label}\n          </button>\n        ))}\n      </div>\n      <div role=\"tabpanel\" style={{ padding: 16 }}>\n        {activeItem?.content}\n      </div>\n    </div>\n  );\n}",
    "explanation": "Track active tab ID, render tablist and tabpanel roles, and handle keyboard arrow navigation.",
    "starter": "function Tabs({ items }) {\n  return <div>Build Tabs here</div>;\n}"
  },
  {
    "id": "p17",
    "title": "Sortable, filterable, paginated data table",
    "cat": "Machine coding",
    "difficulty": "Hard",
    "desc": "Build a data table displaying users with:\n1. Search input filtering across name/email\n2. Clickable column headers to sort ascending/descending\n3. Pagination with Previous, Next, and page numbers\n4. Configurable page size (5, 10, 20).",
    "priority": "P1",
    "objective": "Build a production-grade data table managing multi-column sorting, search filtering, and pagination.",
    "examples": [
      {
        "input": "Sort by \"Age\" ascending and filter by \"John\"",
        "output": "Displays matching Johns sorted by age with pagination controls"
      }
    ],
    "edgeCases": [
      "Empty data array",
      "Search filters out all rows (show \"No records found\")",
      "Current page becomes invalid after filter reduces total pages (reset page to 1)"
    ],
    "hints": [
      "Step 1: State management: `data`, `searchQuery`, `sortConfig = { key, direction }`, `currentPage`, `pageSize`.",
      "Step 2: Derive filtered data first -> then sort -> then slice for pagination.",
      "Step 3: If `currentPage * pageSize >= filteredCount`, clamp `currentPage`."
    ],
    "timeComplexity": "O(n log n) sorting",
    "spaceComplexity": "O(n) derived rows",
    "solution": "function DataTable({ data = [] }) {\n  const [query, setQuery] = useState('');\n  const [sortKey, setSortKey] = useState('name');\n  const [sortDir, setSortDir] = useState('asc');\n  const [page, setPage] = useState(1);\n  const pageSize = 5;\n\n  const filtered = data.filter(row =>\n    Object.values(row).some(val => String(val).toLowerCase().includes(query.toLowerCase()))\n  );\n\n  const sorted = [...filtered].sort((a, b) => {\n    if (a[sortKey] < b[sortKey]) return sortDir === 'asc' ? -1 : 1;\n    if (a[sortKey] > b[sortKey]) return sortDir === 'asc' ? 1 : -1;\n    return 0;\n  });\n\n  const totalPages = Math.ceil(sorted.length / pageSize) || 1;\n  const safePage = Math.min(page, totalPages);\n  const paginated = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);\n\n  const toggleSort = (key) => {\n    if (sortKey === key) {\n      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');\n    } else {\n      setSortKey(key);\n      setSortDir('asc');\n    }\n  };\n\n  return (\n    <div>\n      <input\n        value={query}\n        onChange={e => { setQuery(e.target.value); setPage(1); }}\n        placeholder=\"Filter records...\"\n        style={{ marginBottom: 12, padding: 6 }}\n      />\n      <table style={{ width: '100%', borderCollapse: 'collapse' }}>\n        <thead>\n          <tr>\n            {['name', 'role', 'score'].map(col => (\n              <th\n                key={col}\n                onClick={() => toggleSort(col)}\n                style={{ cursor: 'pointer', borderBottom: '2px solid #ccc', textAlign: 'left', padding: 8 }}\n              >\n                {col.toUpperCase()} {sortKey === col ? (sortDir === 'asc' ? '▲' : '▼') : ''}\n              </th>\n            ))}\n          </tr>\n        </thead>\n        <tbody>\n          {paginated.length ? paginated.map((r, i) => (\n            <tr key={i} style={{ borderBottom: '1px solid #eee' }}>\n              <td style={{ padding: 8 }}>{r.name}</td>\n              <td style={{ padding: 8 }}>{r.role}</td>\n              <td style={{ padding: 8 }}>{r.score}</td>\n            </tr>\n          )) : (\n            <tr><td colSpan={3} style={{ padding: 16, textAlign: 'center' }}>No records found.</td></tr>\n          )}\n        </tbody>\n      </table>\n      <div style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center' }}>\n        <button disabled={safePage <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>\n        <span>Page {safePage} of {totalPages}</span>\n        <button disabled={safePage >= totalPages} onClick={() => setPage(p => p + 1)}>Next</button>\n      </div>\n    </div>\n  );\n}",
    "explanation": "Derive visible rows in strict order: filter by query -> sort copy by active column and direction -> slice by current page offset.",
    "starter": "function DataTable({ data }) {\n  return <div>Build Data Table here</div>;\n}"
  },
  {
    "id": "p18",
    "title": "Debounced search autocomplete with AbortController",
    "cat": "Machine coding",
    "difficulty": "Hard",
    "desc": "Build a search autocomplete component that fetches suggestions from an API endpoint as the user types:\n1. Debounce queries by 300ms\n2. Cancel outdated requests with AbortController\n3. Show loading spinner and empty state\n4. Navigate suggestions with ArrowUp, ArrowDown, Enter to select, Escape to close.",
    "priority": "P1",
    "objective": "Implement real-world asynchronous autocomplete handling debouncing, loading, errors, keyboard navigation, and request aborting.",
    "examples": [
      {
        "input": "Type \"react\", navigate with Down arrow, hit Enter",
        "output": "Selected suggestion populates input and dropdown closes"
      }
    ],
    "edgeCases": [
      "Rapid typing causing out-of-order network responses",
      "API failure displays error message",
      "Clicking outside closes dropdown"
    ],
    "hints": [
      "Step 1: Create a `useDebounce` hook or effect with 300ms delay.",
      "Step 2: In data fetch effect, create `const controller = new AbortController()`. Return cleanup calling `controller.abort()`.",
      "Step 3: Track `highlightIndex` state for keyboard arrow navigation. Handle ArrowDown, ArrowUp, Enter, and Escape keys in onKeyDown."
    ],
    "timeComplexity": "O(1) debounced queries",
    "spaceComplexity": "O(suggestions count)",
    "solution": "function Autocomplete({ onSelect }) {\n  const [query, setQuery] = useState('');\n  const [results, setResults] = useState([]);\n  const [loading, setLoading] = useState(false);\n  const [highlight, setHighlight] = useState(-1);\n  const [open, setOpen] = useState(false);\n\n  useEffect(() => {\n    if (!query.trim()) {\n      setResults([]);\n      setLoading(false);\n      return;\n    }\n    const controller = new AbortController();\n    const timer = setTimeout(async () => {\n      setLoading(true);\n      try {\n        const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=5`, { signal: controller.signal });\n        const data = await res.json();\n        setResults(data.products || []);\n        setOpen(true);\n      } catch (e) {\n        if (e.name !== 'AbortError') setResults([]);\n      } finally {\n        setLoading(false);\n      }\n    }, 300);\n\n    return () => {\n      clearTimeout(timer);\n      controller.abort();\n    };\n  }, [query]);\n\n  const handleKeyDown = (e) => {\n    if (!open || !results.length) return;\n    if (e.key === 'ArrowDown') {\n      e.preventDefault();\n      setHighlight(h => (h + 1) % results.length);\n    } else if (e.key === 'ArrowUp') {\n      e.preventDefault();\n      setHighlight(h => (h - 1 + results.length) % results.length);\n    } else if (e.key === 'Enter' && highlight >= 0) {\n      e.preventDefault();\n      choose(results[highlight]);\n    } else if (e.key === 'Escape') {\n      setOpen(false);\n    }\n  };\n\n  const choose = (item) => {\n    setQuery(item.title);\n    setOpen(false);\n    onSelect?.(item);\n  };\n\n  return (\n    <div style={{ position: 'relative', width: 300 }}>\n      <input\n        value={query}\n        onChange={e => { setQuery(e.target.value); setHighlight(-1); }}\n        onKeyDown={handleKeyDown}\n        placeholder=\"Search products...\"\n        style={{ width: '100%', padding: 8 }}\n      />\n      {loading && <div style={{ fontSize: 12, color: '#888' }}>Searching...</div>}\n      {open && results.length > 0 && (\n        <ul style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #ddd', margin: 0, padding: 0, listStyle: 'none', zIndex: 10 }}>\n          {results.map((item, idx) => (\n            <li\n              key={item.id}\n              onClick={() => choose(item)}\n              style={{ padding: 8, background: highlight === idx ? '#eee' : '#fff', cursor: 'pointer' }}\n            >\n              {item.title}\n            </li>\n          ))}\n        </ul>\n      )}\n    </div>\n  );\n}",
    "explanation": "Combines debounced timeouts with AbortController cancellation in cleanup, along with keyboard navigation index state.",
    "starter": "function Autocomplete() {\n  return <div>Build Autocomplete here</div>;\n}"
  },
  {
    "id": "p19",
    "title": "Custom useDebounce Hook",
    "cat": "React components",
    "difficulty": "Medium",
    "desc": "Create a custom React hook `useDebounce(value, delay)` that returns the debounced value, updating only after `delay` ms of silence.",
    "priority": "P1",
    "objective": "Implement custom hook useDebounce with proper useEffect cleanup.",
    "examples": [
      {
        "input": "const debouncedText = useDebounce(text, 500)",
        "output": "debouncedText updates 500ms after user stops typing"
      }
    ],
    "edgeCases": [
      "Rapidly changing value clears previous timeout",
      "Unmounting cleans up active timeout"
    ],
    "hints": [
      "Step 1: Maintain internal state `const [debouncedValue, setDebouncedValue] = useState(value)`.",
      "Step 2: In `useEffect`, set a timeout to update `debouncedValue` after `delay` ms.",
      "Step 3: In the effect cleanup, call `clearTimeout(timer)`. Return `debouncedValue`."
    ],
    "timeComplexity": "O(1)",
    "spaceComplexity": "O(1)",
    "solution": "function useDebounce(value, delay) {\n  const [debouncedValue, setDebouncedValue] = useState(value);\n\n  useEffect(() => {\n    const timer = setTimeout(() => {\n      setDebouncedValue(value);\n    }, delay);\n\n    return () => {\n      clearTimeout(timer);\n    };\n  }, [value, delay]);\n\n  return debouncedValue;\n}",
    "explanation": "A useEffect runs whenever `value` or `delay` changes. The cleanup function clears the pending timer, ensuring only the final value after silence updates state.",
    "starter": "function useDebounce(value, delay) {\n  // Your code here\n}"
  },
  {
    "id": "p20",
    "title": "API component with cancellation",
    "cat": "Async JS",
    "difficulty": "Hard",
    "priority": "P2",
    "objective": "Solve API component with cancellation with optimal time and space complexity.",
    "desc": "Handle loading/error/success states and ignore obsolete responses on input changes.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Create an AbortController in the effect and abort it in cleanup.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Solve API component with cancellation",
    "explanation": "Apply optimal data structure and handle boundary edge cases.",
    "starter": "// API component with cancellation\n// Handle loading/error/success states and ignore obsolete responses on input changes.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p21",
    "title": "Flatten a nested array",
    "cat": "JavaScript",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Flatten a nested array with optimal time and space complexity.",
    "desc": "Implement flat(depth) recursively, then iteratively with a stack.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Recurse on Array.isArray and track remaining depth; use an explicit stack to avoid recursion limits.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Recurse on Array.isArray and track remaining depth; use an explicit stack to avoid recursion limits.\n// Implement your solution following this strategy.",
    "explanation": "Recurse on Array.isArray and track remaining depth; use an explicit stack to avoid recursion limits.",
    "starter": "// Flatten a nested array\n// Implement flat(depth) recursively, then iteratively with a stack.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p22",
    "title": "Deep clone an object with circular references",
    "cat": "Objects & Maps",
    "difficulty": "Medium",
    "desc": "Write `deepClone(obj)` that produces an exact independent copy of `obj`, correctly copying nested objects, arrays, and breaking circular reference cycles.",
    "hint": "Keep a WeakMap of already-cloned objects to break cycles.",
    "priority": "P1",
    "objective": "Implement recursive cloning handling nested objects, arrays, and circular references via WeakMap.",
    "examples": [
      {
        "input": "const a = { x: 1 }; a.self = a; deepClone(a)",
        "output": "Independent clone with self-reference intact"
      }
    ],
    "edgeCases": [
      "Primitives (return as-is)",
      "null and undefined",
      "Arrays vs plain objects",
      "Circular references"
    ],
    "hints": [
      "Step 1: Base case: if `obj === null || typeof obj !== \"object\"`, return it directly.",
      "Step 2: Maintain a `seen = new WeakMap()` to store original object -> cloned object.",
      "Step 3: If `seen.has(obj)`, return `seen.get(obj)`. Otherwise create clone, set in `seen`, and recursively clone each key."
    ],
    "timeComplexity": "O(n) where n is total property count",
    "spaceComplexity": "O(n) recursion stack & seen map",
    "solution": "function deepClone(obj, seen = new WeakMap()) {\n  if (obj === null || typeof obj !== 'object') return obj;\n  if (seen.has(obj)) return seen.get(obj);\n\n  const clone = Array.isArray(obj) ? [] : {};\n  seen.set(obj, clone);\n\n  for (const key of Object.keys(obj)) {\n    clone[key] = deepClone(obj[key], seen);\n  }\n  return clone;\n}",
    "explanation": "Check for primitives, use a WeakMap to track visited objects to resolve circular graphs, and clone properties recursively.",
    "starter": "function deepClone(obj, seen = new WeakMap()) {\n  // Your code here\n}"
  },
  {
    "id": "p23",
    "title": "Memoize a function",
    "cat": "JavaScript",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Memoize a function with optimal time and space complexity.",
    "desc": "Cache results by arguments; discuss cache keys and memory growth.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "JSON.stringify(args) is a simple key; mention Map, size limits and pure functions only.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: JSON.stringify(args) is a simple key; mention Map, size limits and pure functions only.\n// Implement your solution following this strategy.",
    "explanation": "JSON.stringify(args) is a simple key; mention Map, size limits and pure functions only.",
    "starter": "// Memoize a function\n// Cache results by arguments; discuss cache keys and memory growth.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p24",
    "title": "Curry a function",
    "cat": "JavaScript",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Curry a function with optimal time and space complexity.",
    "desc": "Support both f(1)(2)(3) and f(1,2)(3).",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Compare args.length with fn.length; otherwise return a function that collects more arguments.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Compare args.length with fn.length; otherwise return a function that collects more arguments.\n// Implement your solution following this strategy.",
    "explanation": "Compare args.length with fn.length; otherwise return a function that collects more arguments.",
    "starter": "// Curry a function\n// Support both f(1)(2)(3) and f(1,2)(3).\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p25",
    "title": "Polyfill Function.prototype.bind",
    "cat": "JS functions",
    "difficulty": "Medium",
    "desc": "Implement `myBind(context, ...boundArgs)` on Function.prototype returning a new function that invokes the original with `context` and prepended arguments.",
    "hint": "Attach the function to the context under a unique Symbol key, invoke it, then delete the key.",
    "priority": "P2",
    "objective": "Implement Function.prototype.bind handling context binding and partial application.",
    "examples": [
      {
        "input": "function f(a, b) { return this.x + a + b; }; f.myBind({ x: 10 }, 5)(2)",
        "output": "17"
      }
    ],
    "edgeCases": [
      "Invoking with new keyword (bonus)",
      "Preserving multiple calls with varying arguments"
    ],
    "hints": [
      "Step 1: Save the target function reference (`const fn = this`).",
      "Step 2: Return a function that collects `...callArgs`.",
      "Step 3: Inside, invoke `fn.apply(context, [...boundArgs, ...callArgs])`."
    ],
    "timeComplexity": "O(1)",
    "spaceComplexity": "O(args length)",
    "solution": "Function.prototype.myBind = function(context, ...boundArgs) {\n  const targetFn = this;\n  if (typeof targetFn !== 'function') throw new TypeError('Not callable');\n  return function(...callArgs) {\n    return targetFn.apply(context, [...boundArgs, ...callArgs]);\n  };\n};",
    "explanation": "Capture the original function and bound arguments in a closure, merging them with subsequent call arguments via apply.",
    "starter": "Function.prototype.myBind = function(context, ...boundArgs) {\n  // Your code here\n}"
  },
  {
    "id": "p26",
    "title": "Event emitter (pub/sub)",
    "cat": "JavaScript",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Event emitter (pub/sub) with optimal time and space complexity.",
    "desc": "Implement on, off, once and emit.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Map from event name to handler array; once wraps the handler and removes itself after one call.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Map from event name to handler array; once wraps the handler and removes itself after one call.\n// Implement your solution following this strategy.",
    "explanation": "Map from event name to handler array; once wraps the handler and removes itself after one call.",
    "starter": "// Event emitter (pub/sub)\n// Implement on, off, once and emit.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p27",
    "title": "Longest substring without repeating characters",
    "cat": "Sliding window",
    "difficulty": "Medium",
    "desc": "Given a string `s`, find the length of the longest substring without duplicate characters.",
    "hint": "Store the last index of each char; move the left pointer past a repeated character.",
    "priority": "P1",
    "objective": "Master the dynamic sliding window pattern with index tracking.",
    "examples": [
      {
        "input": "s = \"abcabcbb\"",
        "output": "3",
        "explanation": "The answer is \"abc\", with length 3."
      },
      {
        "input": "s = \"bbbbb\"",
        "output": "1",
        "explanation": "The answer is \"b\", with length 1."
      },
      {
        "input": "s = \"pwwkew\"",
        "output": "3",
        "explanation": "The answer is \"wke\", with length 3."
      }
    ],
    "edgeCases": [
      "Empty string (returns 0)",
      "String with all unique characters (returns length)",
      "String with all identical characters (returns 1)"
    ],
    "hints": [
      "Step 1: A brute force checks all substrings in O(n³). A sliding window maintains a valid window `[left, right]` in O(n).",
      "Step 2: Keep track of the last seen index of each character using a Map.",
      "Step 3: As `right` advances, if `s[right]` was seen at or after `left`, jump `left` to `lastSeen.get(s[right]) + 1`. Update max length at every step."
    ],
    "timeComplexity": "O(n) where n is string length",
    "spaceComplexity": "O(min(n, m)) where m is size of the character set",
    "solution": "function lengthOfLongestSubstring(s) {\n  const lastSeen = new Map();\n  let left = 0, maxLength = 0;\n  for (let right = 0; right < s.length; right++) {\n    const char = s[right];\n    if (lastSeen.has(char) && lastSeen.get(char) >= left) {\n      left = lastSeen.get(char) + 1;\n    }\n    lastSeen.set(char, right);\n    maxLength = Math.max(maxLength, right - left + 1);\n  }\n  return maxLength;\n}",
    "explanation": "Expand the window with pointer `right`. When a duplicate character is encountered within the current window, move `left` pointer directly past the previous occurrence.",
    "starter": "function lengthOfLongestSubstring(s) {\n  // Your code here\n}"
  },
  {
    "id": "p28",
    "title": "Merge overlapping intervals",
    "cat": "JavaScript",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Merge overlapping intervals with optimal time and space complexity.",
    "desc": "Return merged ranges and discuss touching intervals.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Sort by start, then extend the last interval while next.start <= last.end.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Sort by start, then extend the last interval while next.start <= last.end.\n// Implement your solution following this strategy.",
    "explanation": "Sort by start, then extend the last interval while next.start <= last.end.",
    "starter": "// Merge overlapping intervals\n// Return merged ranges and discuss touching intervals.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p29",
    "title": "Top K frequent elements",
    "cat": "JavaScript",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Top K frequent elements with optimal time and space complexity.",
    "desc": "Compare the sort-based approach with bucket sort.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Build a frequency Map, then sort entries or use buckets indexed by frequency for O(n).",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Build a frequency Map, then sort entries or use buckets indexed by frequency for O(n).\n// Implement your solution following this strategy.",
    "explanation": "Build a frequency Map, then sort entries or use buckets indexed by frequency for O(n).",
    "starter": "// Top K frequent elements\n// Compare the sort-based approach with bucket sort.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p30",
    "title": "Binary search in a rotated sorted array",
    "cat": "JavaScript",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Binary search in a rotated sorted array with optimal time and space complexity.",
    "desc": "Find a target in O(log n) and explain how you pick the sorted half.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Compare mid with the right end to learn which half is sorted, then test the target against it.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Compare mid with the right end to learn which half is sorted, then test the target against it.\n// Implement your solution following this strategy.",
    "explanation": "Compare mid with the right end to learn which half is sorted, then test the target against it.",
    "starter": "// Binary search in a rotated sorted array\n// Find a target in O(log n) and explain how you pick the sorted half.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p31",
    "title": "Implement an LRU cache",
    "cat": "JavaScript",
    "difficulty": "Hard",
    "priority": "P2",
    "objective": "Solve Implement an LRU cache with optimal time and space complexity.",
    "desc": "Support get and put in O(1) with a capacity limit.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "A Map remembers insertion order: delete and re-set on every access, evict the first key.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: A Map remembers insertion order: delete and re-set on every access, evict the first key.\n// Implement your solution following this strategy.",
    "explanation": "A Map remembers insertion order: delete and re-set on every access, evict the first key.",
    "starter": "// Implement an LRU cache\n// Support get and put in O(1) with a capacity limit.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p32",
    "title": "Maximum subarray (Kadane)",
    "cat": "JavaScript",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Maximum subarray (Kadane) with optimal time and space complexity.",
    "desc": "Return the best contiguous sum and handle all-negative input.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "current = max(x, current + x); best = max(best, current).",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: current = max(x, current + x); best = max(best, current).\n// Implement your solution following this strategy.",
    "explanation": "current = max(x, current + x); best = max(best, current).",
    "starter": "// Maximum subarray (Kadane)\n// Return the best contiguous sum and handle all-negative input.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p33",
    "title": "Polyfill Promise.all",
    "cat": "Async JS",
    "difficulty": "Hard",
    "desc": "Implement `promiseAll(iterable)` from scratch. It returns a Promise that fulfills with an array of all resolved values in input order, or rejects immediately with the first rejection reason.",
    "hint": "Write results by index and count completions; wrap each input with Promise.resolve.",
    "priority": "P1",
    "objective": "Understand Promise combinator mechanics, parallel execution, and preservation of completion order.",
    "examples": [
      {
        "input": "promiseAll([Promise.resolve(1), delay(20).then(()=>2), 3])",
        "output": "[1, 2, 3]",
        "explanation": "Order is preserved and non-promise values are wrapped."
      }
    ],
    "edgeCases": [
      "Empty iterable input (resolves immediately with [])",
      "Inputs with non-promise primitive values",
      "Immediate rejection stops further resolution"
    ],
    "hints": [
      "Step 1: Return a new Promise with `resolve` and `reject`. Handle empty input array immediately.",
      "Step 2: Keep an output array `results = []` and a counter `completed = 0`.",
      "Step 3: Iterate with index `i`. Wrap each element in `Promise.resolve(item)`. On resolve, assign `results[i] = value` (do not push!) and check if `++completed === items.length`."
    ],
    "timeComplexity": "O(n) where n is number of promises",
    "spaceComplexity": "O(n) results storage",
    "solution": "function promiseAll(iterable) {\n  return new Promise((resolve, reject) => {\n    const items = Array.from(iterable);\n    if (items.length === 0) return resolve([]);\n    const results = new Array(items.length);\n    let completed = 0;\n\n    items.forEach((item, index) => {\n      Promise.resolve(item)\n        .then(value => {\n          results[index] = value;\n          completed++;\n          if (completed === items.length) {\n            resolve(results);\n          }\n        })\n        .catch(reject);\n    });\n  });\n}",
    "explanation": "Wrap each item in Promise.resolve, place resolved values into their original index position, and resolve once the completion counter matches input length.",
    "starter": "function promiseAll(iterable) {\n  // Your code here\n}"
  },
  {
    "id": "p34",
    "title": "Retry with exponential backoff",
    "cat": "Async JS",
    "difficulty": "Hard",
    "desc": "Implement `retryWithBackoff(fn, retries = 3, delay = 100)`: execute async `fn`. If it fails, wait `delay * 2^attempt` ms and retry up to `retries` times before re-throwing.",
    "hint": "Loop with await and a sleep helper, double the delay each time, rethrow after the last attempt.",
    "priority": "P1",
    "objective": "Implement resilient network error recovery with backoff delays.",
    "examples": [
      {
        "input": "Fails twice, succeeds 3rd attempt",
        "output": "Resolves with result after two delays"
      },
      {
        "input": "Fails 4 times with retries=3",
        "output": "Rejects with the final error"
      }
    ],
    "edgeCases": [
      "Succeeds on first attempt (zero delay)",
      "Zero retries allowed",
      "Exponential delay growth"
    ],
    "hints": [
      "Step 1: Create a sleep helper `const sleep = ms => new Promise(r => setTimeout(r, ms))`",
      "Step 2: Use a loop from `attempt = 0` to `retries`. Wrap `await fn()` in try/catch.",
      "Step 3: In catch: if `attempt === retries`, throw error. Otherwise `await sleep(delay * Math.pow(2, attempt))`."
    ],
    "timeComplexity": "O(attempts)",
    "spaceComplexity": "O(1)",
    "solution": "async function retryWithBackoff(fn, retries = 3, delay = 100) {\n  const sleep = ms => new Promise(res => setTimeout(res, ms));\n  let lastError;\n  for (let attempt = 0; attempt <= retries; attempt++) {\n    try {\n      return await fn();\n    } catch (err) {\n      lastError = err;\n      if (attempt < retries) {\n        await sleep(delay * Math.pow(2, attempt));\n      }\n    }\n  }\n  throw lastError;\n}",
    "explanation": "Loop through retry attempts with exponential backoff delay between failures, throwing the final captured error if all attempts fail.",
    "starter": "async function retryWithBackoff(fn, retries = 3, delay = 100) {\n  // Your code here\n}"
  },
  {
    "id": "p35",
    "title": "Run async tasks with a concurrency limit",
    "cat": "Async JS",
    "difficulty": "Hard",
    "priority": "P2",
    "objective": "Solve Run async tasks with a concurrency limit with optimal time and space complexity.",
    "desc": "Execute N tasks at a time and collect results in order.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Start N workers that each pull the next index until the queue is empty.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Start N workers that each pull the next index until the queue is empty.\n// Implement your solution following this strategy.",
    "explanation": "Start N workers that each pull the next index until the queue is empty.",
    "starter": "// Run async tasks with a concurrency limit\n// Execute N tasks at a time and collect results in order.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p36",
    "title": "Stopwatch or countdown timer",
    "cat": "React UI",
    "difficulty": "Easy",
    "priority": "P1",
    "objective": "Solve Stopwatch or countdown timer with optimal time and space complexity.",
    "desc": "Start, pause and reset without leaking intervals.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Keep the interval id in a ref, clear it in cleanup, and compute elapsed time from timestamps to avoid drift.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Keep the interval id in a ref, clear it in cleanup, and compute elapsed time from timestamps to avoid drift.\n// Implement your solution following this strategy.",
    "explanation": "Keep the interval id in a ref, clear it in cleanup, and compute elapsed time from timestamps to avoid drift.",
    "starter": "// Stopwatch or countdown timer\n// Start, pause and reset without leaking intervals.\n\nfunction App() {\n  return <div>Build Stopwatch or countdown timer here</div>;\n}\n"
  },
  {
    "id": "p37",
    "title": "Tic-tac-toe with winner detection",
    "cat": "React UI",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Tic-tac-toe with winner detection with optimal time and space complexity.",
    "desc": "Detect a win or draw, block moves after the end, and support reset.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Derive the winner from board state instead of storing it separately.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Derive the winner from board state instead of storing it separately.\n// Implement your solution following this strategy.",
    "explanation": "Derive the winner from board state instead of storing it separately.",
    "starter": "// Tic-tac-toe with winner detection\n// Detect a win or draw, block moves after the end, and support reset.\n\nfunction App() {\n  return <div>Build Tic-tac-toe with winner detection here</div>;\n}\n"
  },
  {
    "id": "p38",
    "title": "Recursive file explorer",
    "cat": "React UI",
    "difficulty": "Hard",
    "priority": "P2",
    "objective": "Solve Recursive file explorer with optimal time and space complexity.",
    "desc": "Render nested folders with expand and collapse per node.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "A recursive Node component owning its own expanded state; key children by id.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: A recursive Node component owning its own expanded state; key children by id.\n// Implement your solution following this strategy.",
    "explanation": "A recursive Node component owning its own expanded state; key children by id.",
    "starter": "// Recursive file explorer\n// Render nested folders with expand and collapse per node.\n\nfunction App() {\n  return <div>Build Recursive file explorer here</div>;\n}\n"
  },
  {
    "id": "p39",
    "title": "Infinite scroll with IntersectionObserver",
    "cat": "React UI",
    "difficulty": "Hard",
    "priority": "P2",
    "objective": "Solve Infinite scroll with IntersectionObserver with optimal time and space complexity.",
    "desc": "Load more pages near the bottom with loading, error and end states.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Observe a sentinel element; guard against duplicate loads; disconnect the observer in cleanup.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Observe a sentinel element; guard against duplicate loads; disconnect the observer in cleanup.\n// Implement your solution following this strategy.",
    "explanation": "Observe a sentinel element; guard against duplicate loads; disconnect the observer in cleanup.",
    "starter": "// Infinite scroll with IntersectionObserver\n// Load more pages near the bottom with loading, error and end states.\n\nfunction App() {\n  return <div>Build Infinite scroll with IntersectionObserver here</div>;\n}\n"
  },
  {
    "id": "p40",
    "title": "Accessible modal with a portal",
    "cat": "React UI",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Accessible modal with a portal with optimal time and space complexity.",
    "desc": "Close on Escape and backdrop click, and manage focus properly.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "createPortal, focus the dialog on open, restore focus on close, set aria-modal and a label.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: createPortal, focus the dialog on open, restore focus on close, set aria-modal and a label.\n// Implement your solution following this strategy.",
    "explanation": "createPortal, focus the dialog on open, restore focus on close, set aria-modal and a label.",
    "starter": "// Accessible modal with a portal\n// Close on Escape and backdrop click, and manage focus properly.\n\nfunction App() {\n  return <div>Build Accessible modal with a portal here</div>;\n}\n"
  },
  {
    "id": "p41",
    "title": "Form with validation",
    "cat": "React UI",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Form with validation with optimal time and space complexity.",
    "desc": "Validate on blur and submit, show errors per field, and disable submit while pending.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Track touched fields and an errors object; derive validity rather than storing it.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Track touched fields and an errors object; derive validity rather than storing it.\n// Implement your solution following this strategy.",
    "explanation": "Track touched fields and an errors object; derive validity rather than storing it.",
    "starter": "// Form with validation\n// Validate on blur and submit, show errors per field, and disable submit while pending.\n\nfunction App() {\n  return <div>Build Form with validation here</div>;\n}\n"
  },
  {
    "id": "p42",
    "title": "Toast notification system",
    "cat": "React UI",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Toast notification system with optimal time and space complexity.",
    "desc": "Show stacked toasts that auto-dismiss and can be closed manually.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Context plus reducer for the toast list; clear each timer on unmount or manual close.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Context plus reducer for the toast list; clear each timer on unmount or manual close.\n// Implement your solution following this strategy.",
    "explanation": "Context plus reducer for the toast list; clear each timer on unmount or manual close.",
    "starter": "// Toast notification system\n// Show stacked toasts that auto-dismiss and can be closed manually.\n\nfunction App() {\n  return <div>Build Toast notification system here</div>;\n}\n"
  },
  {
    "id": "p43",
    "title": "Like button with optimistic update",
    "cat": "React UI",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Like button with optimistic update with optimal time and space complexity.",
    "desc": "Update instantly, roll back on failure, and prevent double submits.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Store previous value, set optimistic value, restore in the catch block, disable while pending.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Store previous value, set optimistic value, restore in the catch block, disable while pending.\n// Implement your solution following this strategy.",
    "explanation": "Store previous value, set optimistic value, restore in the catch block, disable while pending.",
    "starter": "// Like button with optimistic update\n// Update instantly, roll back on failure, and prevent double submits.\n\nfunction App() {\n  return <div>Build Like button with optimistic update here</div>;\n}\n"
  },
  {
    "id": "p44",
    "title": "Image carousel",
    "cat": "React UI",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Image carousel with optimal time and space complexity.",
    "desc": "Next/previous with wrap-around, dots, keyboard arrows and optional autoplay.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Single index state with modulo; clear the autoplay timer in cleanup and pause on hover.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Single index state with modulo; clear the autoplay timer in cleanup and pause on hover.\n// Implement your solution following this strategy.",
    "explanation": "Single index state with modulo; clear the autoplay timer in cleanup and pause on hover.",
    "starter": "// Image carousel\n// Next/previous with wrap-around, dots, keyboard arrows and optional autoplay.\n\nfunction App() {\n  return <div>Build Image carousel here</div>;\n}\n"
  },
  {
    "id": "p45",
    "title": "Intersection of two arrays",
    "cat": "JavaScript",
    "difficulty": "Easy",
    "priority": "P1",
    "objective": "Solve Intersection of two arrays with optimal time and space complexity.",
    "desc": "Return the unique values present in both arrays and explain why a Set gives O(n + m).",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Put one array in a Set, filter the other against it, then dedupe the result.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Put one array in a Set, filter the other against it, then dedupe the result.\n// Implement your solution following this strategy.",
    "explanation": "Put one array in a Set, filter the other against it, then dedupe the result.",
    "starter": "// Intersection of two arrays\n// Return the unique values present in both arrays and explain why a Set gives O(n + m).\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p46",
    "title": "Closure-based counter",
    "cat": "JavaScript",
    "difficulty": "Easy",
    "priority": "P1",
    "objective": "Solve Closure-based counter with optimal time and space complexity.",
    "desc": "Create a counter with private state exposing increment, decrement, reset and value.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Keep count in the outer function’s scope and return an object of methods that close over it.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Keep count in the outer function’s scope and return an object of methods that close over it.\n// Implement your solution following this strategy.",
    "explanation": "Keep count in the outer function’s scope and return an object of methods that close over it.",
    "starter": "// Closure-based counter\n// Create a counter with private state exposing increment, decrement, reset and value.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p47",
    "title": "FizzBuzz (configurable)",
    "cat": "JavaScript",
    "difficulty": "Easy",
    "priority": "P1",
    "objective": "Solve FizzBuzz (configurable) with optimal time and space complexity.",
    "desc": "Print 1 to n, replacing multiples of 3, 5 and both. Then make the rules configurable.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Concatenate a word for every matching rule; fall back to the number when nothing matched.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Concatenate a word for every matching rule; fall back to the number when nothing matched.\n// Implement your solution following this strategy.",
    "explanation": "Concatenate a word for every matching rule; fall back to the number when nothing matched.",
    "starter": "// FizzBuzz (configurable)\n// Print 1 to n, replacing multiples of 3, 5 and both. Then make the rules configurable.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p48",
    "title": "Fibonacci: recursive, memoized, iterative",
    "cat": "JavaScript",
    "difficulty": "Easy",
    "priority": "P1",
    "objective": "Solve Fibonacci: recursive, memoized, iterative with optimal time and space complexity.",
    "desc": "Compare the time and space complexity of each approach.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Iterate with two variables for O(n) time and O(1) space; memoize the recursion with a Map.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Iterate with two variables for O(n) time and O(1) space; memoize the recursion with a Map.\n// Implement your solution following this strategy.",
    "explanation": "Iterate with two variables for O(n) time and O(1) space; memoize the recursion with a Map.",
    "starter": "// Fibonacci: recursive, memoized, iterative\n// Compare the time and space complexity of each approach.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p49",
    "title": "Move zeroes to the end",
    "cat": "JavaScript",
    "difficulty": "Easy",
    "priority": "P1",
    "objective": "Solve Move zeroes to the end with optimal time and space complexity.",
    "desc": "Do it in place and keep the relative order of the non-zero values.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Two pointers: write non-zeros forward, then fill the remainder with zeros.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Two pointers: write non-zeros forward, then fill the remainder with zeros.\n// Implement your solution following this strategy.",
    "explanation": "Two pointers: write non-zeros forward, then fill the remainder with zeros.",
    "starter": "// Move zeroes to the end\n// Do it in place and keep the relative order of the non-zero values.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p50",
    "title": "Rotate an array by k",
    "cat": "JavaScript",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Rotate an array by k with optimal time and space complexity.",
    "desc": "Rotate right by k, handling k larger than the length; aim for O(1) extra space.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "k %= n; reverse the whole array, then reverse the first k items and the rest.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: k %= n; reverse the whole array, then reverse the first k items and the rest.\n// Implement your solution following this strategy.",
    "explanation": "k %= n; reverse the whole array, then reverse the first k items and the rest.",
    "starter": "// Rotate an array by k\n// Rotate right by k, handling k larger than the length; aim for O(1) extra space.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p51",
    "title": "Chunk an array",
    "cat": "JavaScript",
    "difficulty": "Easy",
    "priority": "P1",
    "objective": "Solve Chunk an array with optimal time and space complexity.",
    "desc": "Split an array into groups of size n; the last group may be shorter.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Loop with step n and slice(i, i + n).",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Loop with step n and slice(i, i + n).\n// Implement your solution following this strategy.",
    "explanation": "Loop with step n and slice(i, i + n).",
    "starter": "// Chunk an array\n// Split an array into groups of size n; the last group may be shorter.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p52",
    "title": "Group anagrams",
    "cat": "JavaScript",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Group anagrams with optimal time and space complexity.",
    "desc": "Group the words that are anagrams of each other.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Sorted letters (or a 26-count signature) make a key; group with a Map.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Sorted letters (or a 26-count signature) make a key; group with a Map.\n// Implement your solution following this strategy.",
    "explanation": "Sorted letters (or a 26-count signature) make a key; group with a Map.",
    "starter": "// Group anagrams\n// Group the words that are anagrams of each other.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p53",
    "title": "Product of array except self",
    "cat": "JavaScript",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Product of array except self with optimal time and space complexity.",
    "desc": "Return the product of all other elements for each index, without division, in O(n).",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Prefix products going right, then multiply by suffix products going left.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Prefix products going right, then multiply by suffix products going left.\n// Implement your solution following this strategy.",
    "explanation": "Prefix products going right, then multiply by suffix products going left.",
    "starter": "// Product of array except self\n// Return the product of all other elements for each index, without division, in O(n).\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p54",
    "title": "compose and pipe",
    "cat": "JavaScript",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve compose and pipe with optimal time and space complexity.",
    "desc": "compose(f, g, h)(x) equals f(g(h(x))); pipe runs left to right.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "reduceRight for compose and reduce for pipe over the functions array.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: reduceRight for compose and reduce for pipe over the functions array.\n// Implement your solution following this strategy.",
    "explanation": "reduceRight for compose and reduce for pipe over the functions array.",
    "starter": "// compose and pipe\n// compose(f, g, h)(x) equals f(g(h(x))); pipe runs left to right.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p55",
    "title": "Polyfill map, filter and reduce",
    "cat": "JavaScript",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Polyfill map, filter and reduce with optimal time and space complexity.",
    "desc": "Add them to Array.prototype and handle reduce with and without an initial value.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Use function (not arrow) so this is the array; without an initial value, start from the first element.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Use function (not arrow) so this is the array; without an initial value, start from the first element.\n// Implement your solution following this strategy.",
    "explanation": "Use function (not arrow) so this is the array; without an initial value, start from the first element.",
    "starter": "// Polyfill map, filter and reduce\n// Add them to Array.prototype and handle reduce with and without an initial value.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p56",
    "title": "once(fn)",
    "cat": "JavaScript",
    "difficulty": "Easy",
    "priority": "P1",
    "objective": "Solve once(fn) with optimal time and space complexity.",
    "desc": "Return a function that runs fn only on the first call and returns the cached result after that.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "A closure holding a called flag and the stored result.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: A closure holding a called flag and the stored result.\n// Implement your solution following this strategy.",
    "explanation": "A closure holding a called flag and the stored result.",
    "starter": "// once(fn)\n// Return a function that runs fn only on the first call and returns the cached result after that.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p57",
    "title": "Deep equal",
    "cat": "JavaScript",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Deep equal with optimal time and space complexity.",
    "desc": "Compare primitives, arrays, nested objects and Dates; treat NaN as equal to NaN.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Recurse over keys, compare key counts first, and use Object.is for primitives.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Recurse over keys, compare key counts first, and use Object.is for primitives.\n// Implement your solution following this strategy.",
    "explanation": "Recurse over keys, compare key counts first, and use Object.is for primitives.",
    "starter": "// Deep equal\n// Compare primitives, arrays, nested objects and Dates; treat NaN as equal to NaN.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p58",
    "title": "get(obj, path, default)",
    "cat": "JavaScript",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve get(obj, path, default) with optimal time and space complexity.",
    "desc": "Read nested values with paths like a.b[0].c and return the default when missing.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Turn the path into an array of keys (replace [i] with .i), then walk it safely with early exit.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Turn the path into an array of keys (replace [i] with .i), then walk it safely with early exit.\n// Implement your solution following this strategy.",
    "explanation": "Turn the path into an array of keys (replace [i] with .i), then walk it safely with early exit.",
    "starter": "// get(obj, path, default)\n// Read nested values with paths like a.b[0].c and return the default when missing.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p59",
    "title": "Parse and stringify query strings",
    "cat": "JavaScript",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Parse and stringify query strings with optimal time and space complexity.",
    "desc": "Handle repeated keys, URL encoding and empty values.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "URLSearchParams helps; collect repeated keys into arrays and use encodeURIComponent on output.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: URLSearchParams helps; collect repeated keys into arrays and use encodeURIComponent on output.\n// Implement your solution following this strategy.",
    "explanation": "URLSearchParams helps; collect repeated keys into arrays and use encodeURIComponent on output.",
    "starter": "// Parse and stringify query strings\n// Handle repeated keys, URL encoding and empty values.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p60",
    "title": "Predict output: var, let, hoisting and this",
    "cat": "JavaScript",
    "difficulty": "Easy",
    "priority": "P1",
    "objective": "Solve Predict output: var, let, hoisting and this with optimal time and space complexity.",
    "desc": "Explain why var in a setTimeout loop prints the same value and how let or a closure fixes it.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "var has one shared function-scoped binding; let creates a fresh binding on each iteration.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: var has one shared function-scoped binding; let creates a fresh binding on each iteration.\n// Implement your solution following this strategy.",
    "explanation": "var has one shared function-scoped binding; let creates a fresh binding on each iteration.",
    "starter": "// Predict output: var, let, hoisting and this\n// Explain why var in a setTimeout loop prints the same value and how let or a closure fixes it.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p61",
    "title": "delay(ms), sequential vs parallel tasks",
    "cat": "Async JS",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve delay(ms), sequential vs parallel tasks with optimal time and space complexity.",
    "desc": "Write delay(ms) returning a Promise, then run a list of async tasks one by one and all at once.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Sequential: for...of with await. Parallel: Promise.all(tasks.map(t => t())).",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Sequential: for...of with await. Parallel: Promise.all(tasks.map(t => t())).\n// Implement your solution following this strategy.",
    "explanation": "Sequential: for...of with await. Parallel: Promise.all(tasks.map(t => t())).",
    "starter": "// delay(ms), sequential vs parallel tasks\n// Write delay(ms) returning a Promise, then run a list of async tasks one by one and all at once.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p62",
    "title": "fetch wrapper with error handling and timeout",
    "cat": "Async JS",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve fetch wrapper with error handling and timeout with optimal time and space complexity.",
    "desc": "Throw on non-2xx responses, parse JSON safely, and abort after a timeout.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "fetch only rejects on network errors, so check res.ok; use AbortController with setTimeout for the timeout.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: fetch only rejects on network errors, so check res.ok; use AbortController with setTimeout for the timeout.\n// Implement your solution following this strategy.",
    "explanation": "fetch only rejects on network errors, so check res.ok; use AbortController with setTimeout for the timeout.",
    "starter": "// fetch wrapper with error handling and timeout\n// Throw on non-2xx responses, parse JSON safely, and abort after a timeout.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p63",
    "title": "Polyfill Promise.race, allSettled and any",
    "cat": "Async JS",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Polyfill Promise.race, allSettled and any with optimal time and space complexity.",
    "desc": "Implement all three and explain how they differ from Promise.all.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "race: first to settle wins. allSettled: always resolves with status objects. any: first fulfilment, else AggregateError.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: race: first to settle wins. allSettled: always resolves with status objects. any: first fulfilment, else AggregateError.\n// Implement your solution following this strategy.",
    "explanation": "race: first to settle wins. allSettled: always resolves with status objects. any: first fulfilment, else AggregateError.",
    "starter": "// Polyfill Promise.race, allSettled and any\n// Implement all three and explain how they differ from Promise.all.\n\nfunction solution() {\n  // Your code here\n}\n"
  },
  {
    "id": "p64",
    "title": "List with add, edit, delete and reorder",
    "cat": "React UI",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve List with add, edit, delete and reorder with optimal time and space complexity.",
    "desc": "Keep updates immutable, use stable keys, and show an empty state.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Use ids (not indexes) as keys; reorder by swapping items in a copied array.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Use ids (not indexes) as keys; reorder by swapping items in a copied array.\n// Implement your solution following this strategy.",
    "explanation": "Use ids (not indexes) as keys; reorder by swapping items in a copied array.",
    "starter": "// List with add, edit, delete and reorder\n// Keep updates immutable, use stable keys, and show an empty state.\n\nfunction App() {\n  return <div>Build List with add, edit, delete and reorder here</div>;\n}\n"
  },
  {
    "id": "p65",
    "title": "Multi-page app with a router",
    "cat": "React UI",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Multi-page app with a router with optimal time and space complexity.",
    "desc": "Three pages, navigation with an active link, and a 404 route (React Router, or a hash router in the preview).",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "With React Router use Routes, Route, NavLink and a * route; in the preview listen to hashchange and render by route.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: With React Router use Routes, Route, NavLink and a * route; in the preview listen to hashchange and render by route.\n// Implement your solution following this strategy.",
    "explanation": "With React Router use Routes, Route, NavLink and a * route; in the preview listen to hashchange and render by route.",
    "starter": "// Multi-page app with a router\n// Three pages, navigation with an active link, and a 404 route (React Router, or a hash router in the preview).\n\nfunction App() {\n  return <div>Build Multi-page app with a router here</div>;\n}\n"
  },
  {
    "id": "p66",
    "title": "Share state with Context (theme and user)",
    "cat": "React UI",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Share state with Context (theme and user) with optimal time and space complexity.",
    "desc": "Provide a theme toggle and a logged-in user to distant components without prop drilling.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "createContext, a provider holding state, a custom hook that throws outside the provider, and a memoised value.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: createContext, a provider holding state, a custom hook that throws outside the provider, and a memoised value.\n// Implement your solution following this strategy.",
    "explanation": "createContext, a provider holding state, a custom hook that throws outside the provider, and a memoised value.",
    "starter": "// Share state with Context (theme and user)\n// Provide a theme toggle and a logged-in user to distant components without prop drilling.\n\nfunction App() {\n  return <div>Build Share state with Context (theme and user) here</div>;\n}\n"
  },
  {
    "id": "p67",
    "title": "Optimise a searchable 10,000-row table",
    "cat": "React UI",
    "difficulty": "Hard",
    "priority": "P2",
    "objective": "Solve Optimise a searchable 10,000-row table with optimal time and space complexity.",
    "desc": "Keep typing responsive and scrolling smooth; explain each optimisation and how you measured it.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Debounce search, memoise rows with React.memo, derive the filtered list with useMemo, and virtualise or paginate.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Debounce search, memoise rows with React.memo, derive the filtered list with useMemo, and virtualise or paginate.\n// Implement your solution following this strategy.",
    "explanation": "Debounce search, memoise rows with React.memo, derive the filtered list with useMemo, and virtualise or paginate.",
    "starter": "// Optimise a searchable 10,000-row table\n// Keep typing responsive and scrolling smooth; explain each optimisation and how you measured it.\n\nfunction App() {\n  return <div>Build Optimise a searchable 10,000-row table here</div>;\n}\n"
  },
  {
    "id": "p68",
    "title": "Lazy-loaded route with Suspense",
    "cat": "React UI",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Lazy-loaded route with Suspense with optimal time and space complexity.",
    "desc": "Code-split a page, show a fallback while it loads, and handle load failures.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "lazy(() => import('./Page')) inside Suspense with a fallback, wrapped by an error boundary.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: lazy(() => import('./Page')) inside Suspense with a fallback, wrapped by an error boundary.\n// Implement your solution following this strategy.",
    "explanation": "lazy(() => import('./Page')) inside Suspense with a fallback, wrapped by an error boundary.",
    "starter": "// Lazy-loaded route with Suspense\n// Code-split a page, show a fallback while it loads, and handle load failures.\n\nfunction App() {\n  return <div>Build Lazy-loaded route with Suspense here</div>;\n}\n"
  },
  {
    "id": "p69",
    "title": "Write tests for add, filter and validation",
    "cat": "React UI",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Write tests for add, filter and validation with optimal time and space complexity.",
    "desc": "Using React Testing Library: render the Todo app, type, click and assert on visible outcomes.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Query by role and label, use userEvent, assert visible text, and mock the network at the boundary.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Query by role and label, use userEvent, assert visible text, and mock the network at the boundary.\n// Implement your solution following this strategy.",
    "explanation": "Query by role and label, use userEvent, assert visible text, and mock the network at the boundary.",
    "starter": "// Write tests for add, filter and validation\n// Using React Testing Library: render the Todo app, type, click and assert on visible outcomes.\n\nfunction App() {\n  return <div>Build Write tests for add, filter and validation here</div>;\n}\n"
  },
  {
    "id": "p70",
    "title": "Counter with useReducer, undo and redo",
    "cat": "React UI",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Counter with useReducer, undo and redo with optimal time and space complexity.",
    "desc": "Support increment, decrement, undo and redo with a clean reducer.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "State is { past, present, future }; undo pops past; any new action clears future.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: State is { past, present, future }; undo pops past; any new action clears future.\n// Implement your solution following this strategy.",
    "explanation": "State is { past, present, future }; undo pops past; any new action clears future.",
    "starter": "// Counter with useReducer, undo and redo\n// Support increment, decrement, undo and redo with a clean reducer.\n\nfunction App() {\n  return <div>Build Counter with useReducer, undo and redo here</div>;\n}\n"
  },
  {
    "id": "p71",
    "title": "Nested comments thread",
    "cat": "React UI",
    "difficulty": "Hard",
    "priority": "P2",
    "objective": "Solve Nested comments thread with optimal time and space complexity.",
    "desc": "Render replies recursively with add-reply and per-comment collapse.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "A recursive Comment component; store replies as children, key by id, keep collapse state per node.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: A recursive Comment component; store replies as children, key by id, keep collapse state per node.\n// Implement your solution following this strategy.",
    "explanation": "A recursive Comment component; store replies as children, key by id, keep collapse state per node.",
    "starter": "// Nested comments thread\n// Render replies recursively with add-reply and per-comment collapse.\n\nfunction App() {\n  return <div>Build Nested comments thread here</div>;\n}\n"
  },
  {
    "id": "p72",
    "title": "Dropdown with outside-click close",
    "cat": "React UI",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Dropdown with outside-click close with optimal time and space complexity.",
    "desc": "Open and close on click, close on Escape or outside click, and support keyboard selection.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "A ref plus a document mousedown listener cleaned up in an effect; set aria-expanded.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: A ref plus a document mousedown listener cleaned up in an effect; set aria-expanded.\n// Implement your solution following this strategy.",
    "explanation": "A ref plus a document mousedown listener cleaned up in an effect; set aria-expanded.",
    "starter": "// Dropdown with outside-click close\n// Open and close on click, close on Escape or outside click, and support keyboard selection.\n\nfunction App() {\n  return <div>Build Dropdown with outside-click close here</div>;\n}\n"
  },
  {
    "id": "p73",
    "title": "Tag input (chips)",
    "cat": "React UI",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Tag input (chips) with optimal time and space complexity.",
    "desc": "Add tags on Enter or comma, remove with × or Backspace, and prevent duplicates.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Controlled input plus array state; handle keydown, trim, and dedupe before adding.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Controlled input plus array state; handle keydown, trim, and dedupe before adding.\n// Implement your solution following this strategy.",
    "explanation": "Controlled input plus array state; handle keydown, trim, and dedupe before adding.",
    "starter": "// Tag input (chips)\n// Add tags on Enter or comma, remove with × or Backspace, and prevent duplicates.\n\nfunction App() {\n  return <div>Build Tag input (chips) here</div>;\n}\n"
  },
  {
    "id": "p74",
    "title": "Dashboard or product listing: design sketch",
    "cat": "React UI",
    "difficulty": "Medium",
    "priority": "P1",
    "objective": "Solve Dashboard or product listing: design sketch with optimal time and space complexity.",
    "desc": "Describe the component tree, state ownership, API calls, loading and error states, and performance choices.",
    "examples": [
      {
        "input": "Standard test input",
        "output": "Expected output",
        "explanation": "Demonstrates expected behavior."
      }
    ],
    "edgeCases": [
      "Empty input",
      "Single element",
      "Boundary values"
    ],
    "hints": [
      "Start from data and actions, split container from presentational components, and say where each piece of state lives and why.",
      "What data structure (Map, Set, Stack, Two Pointers) gives O(n) or O(log n)?",
      "Test your code with edge cases like empty inputs or duplicates."
    ],
    "timeComplexity": "O(n) or O(n log n)",
    "spaceComplexity": "O(1) to O(n)",
    "solution": "// Approach: Start from data and actions, split container from presentational components, and say where each piece of state lives and why.\n// Implement your solution following this strategy.",
    "explanation": "Start from data and actions, split container from presentational components, and say where each piece of state lives and why.",
    "starter": "// Dashboard or product listing: design sketch\n// Describe the component tree, state ownership, API calls, loading and error states, and performance choices.\n\nfunction App() {\n  return <div>Build Dashboard or product listing: design sketch here</div>;\n}\n"
  }
];
