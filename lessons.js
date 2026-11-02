// Lesson content for the job study path.
// Each lesson: summary, explanation paragraphs, worked example, video search, reads (web posts with a quality rating 1-5), and practice exercises.
// Exercise types:
//   mc      multiple choice          { q, o:[options], a:index, why }
//   tf      true / false             { q, a:boolean, why }
//   multi   select all that apply    { q, o:[options], a:[indices], why }
//   order   put steps in order       { q, items:[correct order], why }
//   fill    type the answer          { q (use ___), a:[accepted answers], why }
//   blank   pick a word for a gap    { q (use ___), bank:[choices], a:correct choice, why }
//   match   pair left with right     { q, pairs:[[left,right],...], why }
//   num     type a number            { q, a:number, why }
//   tapline tap the wrong/right line { q, code:"line\nline", a:line index (0-based), why }
//
// Ratings are judgements of depth, accuracy and clarity from search snippets and source reputation.
// Official docs are rated highest. Re-check any post before relying on it for an interview.

var UNITS = [
  { name: 'Algorithms', color: '', lessons: [

    { id: 'bigo', title: 'Big-O notation',
      sum: 'Big-O describes how time or memory grows with input size n, ignoring constants. O(1) is constant, O(log n) halves each step, O(n) scans once, O(n²) compares every pair.',
      explain: [
        'Big-O is about growth, not speed. It asks what happens to the cost as n gets large. We drop constant factors and smaller terms: 3n + 5 is O(n).',
        'Read the code to get the class. One loop over n items is O(n). A loop inside another loop over n is O(n²). Halving the problem each step is O(log n). Work that does not depend on n is O(1).',
        'For sequential steps keep the largest term: O(n) + O(n²) = O(n²). For nested work multiply: a loop of n inside a loop of n is n × n.'
      ],
      code: '// O(n): one pass\nfunction total(nums) {\n  let s = 0;\n  for (const x of nums) s += x;\n  return s;\n}\n\n// O(n²): every pair\nfunction hasDup(nums) {\n  for (let i = 0; i < nums.length; i++)\n    for (let j = i + 1; j < nums.length; j++)\n      if (nums[i] === nums[j]) return true;\n  return false;\n}',
      yt: 'Big O notation explained for beginners', spec: false,
      posts: [
        { t: "A Beginner's Guide to Big O Notation", by: 'robbell.io', url: 'https://robbell.io/2009/06/a-beginners-guide-to-big-o-notation', r: 4,
          take: 'Big-O is the standard way to describe how an algorithm scales. The post walks through common classes with simple code for each. It is old (2009) but the core ideas have not changed.' },
        { t: 'What is Big O notation? A beginner\'s guide', by: 'DEV Community', url: 'https://dev.to/jaimaldullat/what-is-big-o-notation-a-beginners-guide-to-algorithm-efficiency-41fh', r: 3,
          take: 'A short, practical introduction to measuring algorithm efficiency. Useful as a second pass after the classic guide above.' },
        { t: 'Big-O Notation (reference)', by: 'roadmap.sh', url: 'https://www.roadmap.sh/guides/big-o-notation', r: 3,
          take: 'A compact reference of the common complexity classes. Good for a quick look-up rather than a full explanation.' }
      ],
      ex: [
        { t: 'mc', q: 'A loop that visits each item once is roughly:', o: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], a: 1, why: 'One pass over n items is linear: O(n).' },
        { t: 'mc', q: 'Halving the search range every step gives:', o: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], a: 2, why: 'Halving repeatedly takes about log n steps.' },
        { t: 'tf', q: 'O(n + n²) simplifies to O(n).', a: false, why: 'Keep the dominant term: O(n²).' },
        { t: 'tapline', q: 'Which line makes this function O(n²)?', code: 'function countPairs(a) {\n  let c = 0;\n  for (let i = 0; i < a.length; i++) {\n    for (let j = 0; j < a.length; j++) {\n      if (a[i] + a[j] === 10) c++;\n    }\n  }\n  return c;\n}', a: 3, why: 'The inner loop runs n times for each of the n outer iterations.' },
        { t: 'num', q: 'How many times can you halve 1024 before you reach 1?', a: 10, why: 'log2(1024) = 10.' },
        { t: 'order', q: 'Put these from fastest-growing to slowest-growing.', items: ['O(2ⁿ)', 'O(n²)', 'O(n log n)', 'O(n)', 'O(log n)', 'O(1)'], why: 'Exponential beats polynomial, which beats n log n, and so on down to constant.' },
        { t: 'blank', q: 'Looking up a key in a hash map is ___ on average.', bank: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], a: 'O(1)', why: 'The hash jumps straight to the bucket.' },
        { t: 'multi', q: 'Which are O(n log n) or better? Select all that apply.', o: ['Merge sort', 'Bubble sort', 'Binary search', 'Quicksort (average case)'], a: [0, 2, 3], why: 'Bubble sort is O(n²).' }
      ] },

    { id: 'hash', title: 'Hash maps',
      sum: 'A hash map stores key–value pairs. A hash function turns each key into an array index, so lookup, insert and delete are O(1) on average. Use it for "have I seen this?" and counting.',
      explain: [
        'A hash map stores pairs. A hash function maps a key to a bucket: index = hash(key) mod size. Lookup goes straight to that bucket instead of scanning.',
        'Two keys can land in the same bucket. That is a collision. Real implementations resolve it by chaining (a list per bucket) or probing (try the next slot). Lookups stay O(1) on average; many collisions or a poor hash degrade toward O(n).',
        'The main interview pattern is one pass that stores what you have seen. Use it for duplicates, frequency counts, grouping and "find a pair that adds to a target".'
      ],
      code: 'const seen = new Map();\nfor (const x of [3, 7, 3, 9]) {\n  if (seen.has(x)) console.log("duplicate", x);\n  seen.set(x, true);\n}\n// duplicate 3',
      yt: 'hash map hash table explained coding interview', spec: false,
      posts: [
        { t: 'How does HashMap handle hash collisions internally?', by: 'DEV Community', url: 'https://dev.to/realnamehidden1_61/how-does-hashmap-handle-hash-collisions-internally-5ho2', r: 3,
          take: 'Explains chaining: each bucket holds a list of entries that share an index. Java switches a crowded bucket to a tree, which keeps the worst case better than a plain list.' },
        { t: 'How Hash Maps Work', by: 'HackerNoon', url: 'https://hackernoon.com/how-hash-maps-work', r: 3,
          take: 'A walk through hash function, index and bucket, meant to build the mental model before the code.' },
        { t: 'Introduction to hash maps', by: 'Educative (Grokking the Coding Interview)', url: 'https://www.educative.io/courses/grokking-coding-interview/introduction-to-hash-maps', r: 3,
          take: 'Interview-focused: which problems turn into hash map problems. The full course is paid; the preview is enough for the pattern.' }
      ],
      ex: [
        { t: 'mc', q: 'Average cost of a hash map lookup by key:', o: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'], a: 2, why: 'A hash map jumps straight to the slot: O(1) on average.' },
        { t: 'mc', q: 'Two keys landing in the same slot is called:', o: ['A collision', 'A deadlock', 'A rehash', 'A cycle'], a: 0, why: 'Collisions are handled by chaining or open addressing.' },
        { t: 'fill', q: 'What do you call a key that maps to a bucket already used by another key?', a: ['collision'], why: 'Collisions are normal; the table has a plan for them.' },
        { t: 'tf', q: 'A hash map keeps its keys in sorted order.', a: false, why: 'Hash maps are unordered. Use a tree map or sorted structure for order.' },
        { t: 'blank', q: 'To count how often each word appears, use a ___.', bank: ['hash map', 'stack', 'heap', 'queue'], a: 'hash map', why: 'Key = word, value = count.' },
        { t: 'match', q: 'Match each term with its meaning.', pairs: [['hash function', 'turns a key into a bucket index'], ['collision', 'two keys land in the same bucket'], ['chaining', 'each bucket holds a list of entries'], ['load factor', 'entries divided by buckets']], why: 'These four terms come up in every hash table discussion.' },
        { t: 'order', q: 'Put the steps of two-sum with a hash map in order.', items: ['Create an empty map', 'For each number x, look up target − x in the map', 'If found, return the pair', 'Otherwise store x in the map'], why: 'Check the complement before storing the current number, so a number is not paired with itself.' },
        { t: 'num', q: 'A hash map has 1,000 entries and 10 buckets. What is the average number of entries per bucket (the load factor)?', a: 100, why: '1000 / 10 = 100.' },
        { t: 'tapline', q: 'Which line is the bug when counting words?', code: 'const counts = {};\nfor (const w of words) {\n  counts[w] = counts[w] + 1;\n}', a: 2, why: 'A new key is undefined, and undefined + 1 is NaN. Start at 0: counts[w] = (counts[w] || 0) + 1.' }
      ] },

    { id: 'twoptr', title: 'Two pointers and sliding window',
      sum: 'Two pointers move through an array from both ends or in the same direction. Sliding window keeps a range [left, right] that grows and shrinks while you track a condition. Each pointer only moves forward, so the cost is O(n).',
      explain: [
        'Two pointers use two indices that move forward through a sorted array or a string. In a sorted array you can start at both ends and move the pointer whose move helps the target.',
        'A sliding window is a contiguous range [left, right]. Expand right to include the next item. When the window breaks the rule (too big, has a repeat), advance left until it is valid again. Record the best answer as you go.',
        'Recognise it when a problem asks for the longest, shortest or maximum contiguous subarray or substring under a condition. Each pointer only moves forward, so the total work is O(n).'
      ],
      code: '// Longest substring with no repeated character\nfunction longestUnique(s) {\n  const last = new Set();\n  let left = 0, best = 0;\n  for (let right = 0; right < s.length; right++) {\n    while (last.has(s[right])) last.delete(s[left++]);\n    last.add(s[right]);\n    best = Math.max(best, right - left + 1);\n  }\n  return best;\n}\n// longestUnique("abcabcbb") -> 3',
      yt: 'NeetCode sliding window two pointers', spec: false,
      posts: [
        { t: 'Stop Grinding LeetCode: Master These 6 Patterns', by: 'DesignGurus (Substack)', url: 'https://designgurus.substack.com/p/stop-grinding-leetcode-master-these', r: 3,
          take: 'Frames sliding window as a pattern: "subarray plus an optimisation goal" is the cue. Useful for recognising when to use it. It is a newsletter, so some promotion.' },
        { t: 'Sliding Window Patterns', by: 'liziu.com', url: 'https://liziu.com/dsa/sliding-window.html', r: 2,
          take: 'Lists fixed-size and variable-size windows and the usual problems for each. Useful as a checklist; check the claims against the problem statements.' },
        { t: 'Sliding window pattern', by: 'LeetCode Discuss', url: 'https://leetcode.com/discuss/post/6901308/sliding-window-pattern-by-aadymanda-jq9f/', r: 3,
          take: 'A community write-up of the template: expand on the right, shrink on the left when the condition breaks. Code-first, so read it alongside the problems.' }
      ],
      ex: [
        { t: 'mc', q: 'Sliding window problems usually run in:', o: ['O(n²)', 'O(n)', 'O(2ⁿ)', 'O(n log n)'], a: 1, why: 'Each pointer moves forward only, so each element is visited a constant number of times.' },
        { t: 'mc', q: 'In a sliding window, what changes as the window moves?', o: ['The array is sorted', 'left and right move forward', 'The hash map is rebuilt', 'The array is copied'], a: 1, why: 'The window expands at right and shrinks at left.' },
        { t: 'tf', q: 'Sliding window works only on sorted arrays.', a: false, why: 'It works on any contiguous range. Some variants sort first, but sorting is not required.' },
        { t: 'tapline', q: 'Which line is the bug? The window never gets smaller.', code: 'let left = 0, sum = 0;\nfor (let right = 0; right < n; right++) {\n  sum += arr[right];\n  while (sum > k) sum -= arr[left];\n}', a: 3, why: 'left never moves, so the loop never ends. It needs sum -= arr[left]; left++;.' },
        { t: 'fill', q: 'In a sliding window the two pointers are named left and ___.', a: ['right'], why: 'left marks the start of the window and right marks the end.' },
        { t: 'num', q: 'arr = [2, 1, 5, 1, 3, 2]. What is the maximum sum of a fixed window of size 3?', a: 9, why: '5 + 1 + 3 = 9 is the largest of the windows 8, 7, 9, 6.' },
        { t: 'order', q: 'Put the variable-window steps in order.', items: ['Set left = 0 and best = 0', 'Move right forward, adding the new item', 'While the window breaks the rule, move left forward', 'Update best with the window length'], why: 'Set up, grow, shrink while invalid, then record.' },
        { t: 'blank', q: 'A sliding window moves ___ only, so the total work is O(n).', bank: ['forward', 'backward', 'randomly', 'in a circle'], a: 'forward', why: 'Neither pointer ever goes back.' },
        { t: 'multi', q: 'Which problems are usually solved with a sliding window? Select all that apply.', o: ['Longest substring without repeats', 'Minimum window substring', 'Shortest path in a graph', 'Maximum sum of k consecutive elements'], a: [0, 1, 3], why: 'Shortest path needs BFS or Dijkstra, not a window.' }
      ] },

    { id: 'binsearch', title: 'Binary search',
      sum: 'On a sorted array, check the middle. If the target is smaller, search the left half; otherwise the right half. Each step halves the range: O(log n). The common bug is off-by-one at the bounds.',
      explain: [
        'Binary search needs a sorted array, or any input where you can tell which side of the middle the answer is on. Compare the target with the middle, then discard the half that cannot contain it.',
        'Most bugs are in the bounds. Decide what your loop invariant is (for example, the answer lies in [lo, hi] inclusive) and make every update keep it: lo = mid + 1 or hi = mid - 1, never hi = mid unless you mean it.',
        'Compute the middle as lo + (hi - lo) / 2. The naive (lo + hi) / 2 can overflow in fixed-width integers; this was a real bug in the Java standard library for years.'
      ],
      code: 'function search(a, target) {\n  let lo = 0, hi = a.length - 1;\n  while (lo <= hi) {\n    const mid = lo + Math.floor((hi - lo) / 2);\n    if (a[mid] === target) return mid;\n    if (a[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}\n// search([1, 3, 5, 7, 9], 7) -> 3',
      yt: 'Binary Search Algorithm in 100 Seconds fireship', spec: true,
      posts: [
        { t: 'Off-by-One Errors in Binary Search: 5 Common Bugs', by: 'DEV Community (TildAlice)', url: 'https://dev.to/tildalice/off-by-one-errors-in-binary-search-5-common-bugs-4cfg', r: 4,
          take: 'Walks through the usual off-by-one variants, each with broken code and the fix. The most practical of the posts for this topic.' },
        { t: 'Binary Search, Explained', by: 'Andrew Erwin (hosted on Buy Me a Coffee)', url: 'https://buymeacoffee.com/andrewerwin/binary-search-5148564', r: 3,
          take: 'Focuses on the invariant: the two lines that move the bounds are where bugs hide. Also covers the midpoint overflow bug. Judge the content, not the tip-jar host.' }
      ],
      ex: [
        { t: 'mc', q: 'Binary search needs the input to be:', o: ['Sorted', 'A hash map', 'A linked list', 'Unique'], a: 0, why: 'Halving only works if you know which side the target is on.' },
        { t: 'mc', q: 'Binary search on 1,000,000 sorted items takes about:', o: ['1,000,000 steps', '1,000 steps', '20 steps', '2 steps'], a: 2, why: 'log2(1,000,000) ≈ 20.' },
        { t: 'tapline', q: 'Which line is wrong? It breaks when lo + hi is odd.', code: 'function search(a, t) {\n  let lo = 0, hi = a.length - 1;\n  while (lo <= hi) {\n    const mid = (lo + hi) / 2;\n    if (a[mid] === t) return mid;\n    if (a[mid] < t) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}', a: 3, why: '(lo + hi) / 2 can be a fraction, and a[2.5] is undefined. Use Math.floor or integer division.' },
        { t: 'fill', q: 'Binary search time complexity is ___.', a: ['O(log n)', 'log n'], why: 'The range halves each step.' },
        { t: 'num', q: 'How many halvings take 1,024 sorted items down to 1?', a: 10, why: '2^10 = 1024.' },
        { t: 'order', q: 'Put the binary search steps in order.', items: ['Set lo = 0 and hi = n − 1', 'Compute mid', 'Compare a[mid] with the target', 'Discard the half that cannot hold the target'], why: 'Repeat until found or the range is empty.' },
        { t: 'match', q: 'Match each variable with its role.', pairs: [['lo', 'lower bound of the search range'], ['hi', 'upper bound of the search range'], ['mid', 'index being checked now'], ['invariant', 'what stays true about the range each step']], why: 'The invariant is the key to getting the bounds right.' },
        { t: 'blank', q: 'Compute mid as lo + (hi − lo) / 2 to avoid ___.', bank: ['overflow', 'sorting', 'recursion', 'locking'], a: 'overflow', why: 'lo + hi can exceed the integer limit in fixed-width languages.' },
        { t: 'tf', q: 'Binary search works on an unsorted array if you scan carefully.', a: false, why: 'Without an ordering, you cannot discard half the array safely.' }
      ] },

    { id: 'stack', title: 'Stacks, queues and linked lists',
      sum: 'A stack is last-in, first-out. A queue is first-in, first-out. A linked list is nodes that point to the next node: inserting at a known node is O(1), but finding an item is O(n).',
      explain: [
        'A stack is last in, first out. push adds to the top and pop removes from the top. Use it for undo, matching brackets and depth-first search.',
        'A queue is first in, first out. enqueue adds at the back and dequeue removes from the front. Use it for breadth-first search, task scheduling and buffering.',
        'A linked list stores each value in a node with a pointer to the next node. Inserting or deleting after a node you already hold is O(1). Finding a value is O(n), because you walk the chain.'
      ],
      code: 'const stack = [];\nstack.push("(");   // push\nstack.pop();       // pop -> "("\n\nclass Node {\n  constructor(v) { this.v = v; this.next = null; }\n}\nconst head = new Node(1);\nhead.next = new Node(2);   // 1 -> 2',
      yt: 'Getting started with data structures in JavaScript stack queue linked list', spec: true,
      posts: [
        { t: 'CS140 Lecture Notes: Linked Data Structures (Stacks, Queues, Lists)', by: 'James Plank, University of Tennessee', url: 'https://web.eecs.utk.edu/~bvanderz/cs140/Notes/Linked/index.html', r: 4,
          take: 'Builds a stack and a queue on a linked list step by step, including pop and the destructor, then covers doubly linked lists. Academic and thorough; the code is C++.' },
        { t: 'How To Create A Linked List, Stack and Queue in JavaScript', by: 'Program With Erik', url: 'https://www.programwitherik.com/blog/how-to-create-a-linked-list-and-stack-in-javascript-2/', r: 3,
          take: 'Defines a linked list as nodes that each point to the next, then builds stack and queue on top in JavaScript. Good for this lesson\'s language.' },
        { t: 'Linked lists, stacks and queues (lecture slides)', by: 'CUHK, Yufei Tao', url: 'https://www.cse.cuhk.edu.hk/~taoyf/course/2100/20-fall/lec/ll-stack-q.pdf', r: 3,
          take: 'Lecture slides showing push and pop on a linked list with sample steps. Short and visual.' }
      ],
      ex: [
        { t: 'mc', q: 'A stack is:', o: ['First in, first out', 'Last in, first out', 'Sorted by key', 'A tree'], a: 1, why: 'Push and pop work at the top: last in, first out.' },
        { t: 'mc', q: 'Finding a value in a linked list costs:', o: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], a: 1, why: 'You must walk node by node.' },
        { t: 'tf', q: 'Dequeue removes an item from the back of a queue.', a: false, why: 'Dequeue removes from the front. Enqueue adds at the back.' },
        { t: 'order', q: 'Put the bracket-matching steps in order.', items: ['Walk the string left to right', 'On an opening bracket, push it', 'On a closing bracket, pop and check it matches', 'At the end, the stack must be empty'], why: 'A stack remembers the most recent unmatched opener.' },
        { t: 'blank', q: 'A queue removes items from the ___.', bank: ['front', 'back', 'middle', 'top'], a: 'front', why: 'First in means first out.' },
        { t: 'tapline', q: 'Which line is the bug in pop()?', code: 'class Stack {\n  constructor() { this.items = []; }\n  push(x) { this.items.push(x); }\n  pop() { return this.items[this.items.length]; }\n}', a: 3, why: 'The index is one past the end, so it returns undefined. Use this.items.pop().' },
        { t: 'fill', q: 'The operation that adds to a stack is called ___.', a: ['push'], why: 'Pop is the matching removal.' },
        { t: 'match', q: 'Match each structure with its rule.', pairs: [['stack', 'last in, first out'], ['queue', 'first in, first out'], ['linked list', 'nodes that point to the next node'], ['deque', 'add and remove at both ends']], why: 'Know these four cold.' },
        { t: 'multi', q: 'Which tasks naturally use a stack? Select all that apply.', o: ['Undo history', 'Breadth-first search', 'Matching brackets', 'Recursive function calls'], a: [0, 2, 3], why: 'BFS uses a queue.' },
        { t: 'num', q: 'A stack gets 5 pushes and then 2 pops. How many items are left?', a: 3, why: '5 − 2 = 3.' }
      ] },

    { id: 'trees', title: 'Trees, BFS and DFS',
      sum: 'Depth-first search goes down one branch before the next (recursion or a stack). Breadth-first search visits level by level (a queue). Both visit every node once: O(n). BFS finds shortest paths in unweighted graphs.',
      explain: [
        'A tree is a connected graph with no cycles and one root. Depth-first search (DFS) follows one branch to its end before backtracking. Implement it with recursion or an explicit stack.',
        'Breadth-first search (BFS) visits all nodes at distance 1, then distance 2, and so on. Implement it with a queue. In an unweighted graph, the first time BFS reaches a node it has used the fewest edges, so it finds shortest paths.',
        'Both visit each node once, so the time is O(V + E) on a graph, which is O(n) on a tree. Memory differs: DFS needs about the depth of the tree, BFS about its widest level.'
      ],
      code: 'function bfs(root) {\n  const q = [root], out = [];\n  while (q.length) {\n    const node = q.shift();   // O(n) for arrays; use a real deque in production\n    out.push(node.val);\n    for (const c of node.children) q.push(c);\n  }\n  return out;\n}',
      yt: 'Binary tree traversal breadth-first and depth-first strategies mycodeschool', spec: true,
      posts: [
        { t: 'Depth-First Search (DFS) vs Breadth-First Search (BFS)', by: 'Techie Delight', url: 'https://techiedelight.com/depth-first-search-dfs-vs-breadth-first-search-bfs/', r: 4,
          take: 'Compares the two on trees and graphs and says when each fits. Makes the memory trade-off explicit: DFS grows with depth, BFS with width.' },
        { t: 'Tree Traversals Explained: DFS, BFS and When to Use Each', by: 'DEV Community', url: 'https://dev.to/mqshaikh8/tree-traversals-explained-dfs-bfs-and-when-to-use-each-2m3f', r: 3,
          take: 'Covers inorder, preorder and postorder as DFS variants, then BFS for shortest or closest node. Beginner-friendly with code.' },
        { t: 'Graph Traversal Algorithms Explained: DFS, BFS & Applications', by: 'PuppyGraph', url: 'https://www.puppygraph.com/blog/graph-traversal', r: 3,
          take: 'Code for recursive DFS, iterative DFS and BFS, with the point that marking visited nodes keeps each node to one visit. Vendor blog, but the code is sound.' }
      ],
      ex: [
        { t: 'mc', q: 'Which search uses a queue and visits level by level?', o: ['DFS', 'BFS', 'Binary search', 'Topological sort'], a: 1, why: 'BFS processes nodes in the order they were discovered.' },
        { t: 'mc', q: 'BFS finds the shortest path when:', o: ['Edges have weights', 'Every edge has the same cost', 'The graph is a tree with negative values', 'It never does'], a: 1, why: 'With equal edge costs, the first arrival at a node is the shortest route.' },
        { t: 'tf', q: 'DFS uses a queue.', a: false, why: 'DFS uses recursion or a stack. BFS uses a queue.' },
        { t: 'tapline', q: 'Which line should check visited before recursing?', code: 'function dfs(node, seen = new Set()) {\n  seen.add(node);\n  for (const n of node.neighbors) {\n    dfs(n, seen);\n  }\n}', a: 3, why: 'Without a check, a cycle makes the recursion run forever. Add if (!seen.has(n)) before the call.' },
        { t: 'order', q: 'Put the BFS steps in order.', items: ['Put the start node in the queue', 'Dequeue the front node and visit it', 'Enqueue its unvisited neighbours', 'Repeat until the queue is empty'], why: 'Mark nodes when enqueued so none is added twice.' },
        { t: 'match', q: 'Match each idea with its traversal.', pairs: [['DFS', 'stack or recursion'], ['BFS', 'queue'], ['tree traversal', 'visits every node once'], ['shortest path, unweighted', 'BFS']], why: 'These pairings come up in almost every interview.' },
        { t: 'blank', q: 'Visiting every node of a tree with n nodes takes O(___).', bank: ['n', 'log n', 'n²', '1'], a: 'n', why: 'Each node is visited once.' },
        { t: 'multi', q: 'Which are true of BFS? Select all that apply.', o: ['Explores level by level', 'Uses a stack', 'Finds shortest paths in unweighted graphs', 'Always uses less memory than DFS'], a: [0, 2], why: 'BFS can use more memory than DFS on a deep, narrow tree.' },
        { t: 'num', q: 'A perfect binary tree has 3 levels (the root is level 1). How many nodes?', a: 7, why: '1 + 2 + 4 = 7.' }
      ] },

    { id: 'heap', title: 'Heaps and priority queues',
      sum: 'A heap is a tree stored in an array where each parent is smaller (min heap) or larger (max heap) than its children. The top is O(1); insert and remove are O(log n). For top K, keep a min heap of size K.',
      explain: [
        'A heap is a complete binary tree stored in an array. A min heap keeps the smallest value at the top; a max heap keeps the largest.',
        'Reading the top is O(1). Insert and remove-top are O(log n), because a value moves up or down one level per comparison.',
        'The top K pattern: to keep the K largest values in a stream, use a min heap of size K. Push each value, and if the heap grows past K, pop the smallest. What remains is the K largest seen so far.'
      ],
      code: 'import heapq\n\ndef k_largest(nums, k):\n    heap = []                      # Python heapq is a min heap\n    for x in nums:\n        heapq.heappush(heap, x)\n        if len(heap) > k:\n            heapq.heappop(heap)    # drop the smallest\n    return sorted(heap, reverse=True)',
      yt: 'K Closest Points to Origin NeetCode 973', spec: true,
      posts: [
        { t: 'Top K Frequent Elements (community solution)', by: 'Hello Interview', url: 'https://www.hellointerview.com/community/questions/top-k-frequent-elements/cm5eh7nri04wn838o9sazfr53', r: 2,
          take: 'A community answer thread for the top K problem. Mixed quality; use it for ideas, not as a reference implementation.' },
        { t: 'Top K Frequent Elements', by: 'DevPath (Grokking the Coding Interview)', url: 'https://www.devpath.com/courses/grokking-coding-interview/top-k-frequent-elements', r: 3,
          take: 'Frequency counting with a size-K min heap, and why sorting everything is O(n log n) while the heap is O(n log K). Course page; preview only.' }
      ],
      note: 'No strong free article on heaps surfaced in search. The links above are the closest matches.',
      ex: [
        { t: 'mc', q: 'In a min heap, the top element is:', o: ['The largest', 'The smallest', 'The newest', 'The median'], a: 1, why: 'The parent is always smaller than its children.' },
        { t: 'mc', q: 'For the K largest items in a stream, keep a heap of size K that is:', o: ['Max heap', 'Min heap', 'Sorted list', 'Hash map'], a: 1, why: 'The min heap top is the smallest of the K largest, so it is the one to evict.' },
        { t: 'tf', q: 'Inserting into a heap is O(1).', a: false, why: 'Insert is O(log n). Only reading the top is O(1).' },
        { t: 'tapline', q: 'Which line is wrong for finding the K largest?', code: 'heap = []\nfor x in nums:\n    heapq.heappush(heap, -x)\n    if len(heap) > k:\n        heapq.heappop(heap)', a: 2, why: 'Pushing −x makes a max heap of the values, so popping evicts the largest. Push x for a min heap.' },
        { t: 'fill', q: 'A heap is usually stored in a plain ___.', a: ['array', 'list'], why: 'Children of index i sit at 2i + 1 and 2i + 2.' },
        { t: 'num', q: 'About how many levels does a binary heap of 1,024 items have? (log2)', a: 10, why: 'log2(1024) = 10.' },
        { t: 'order', q: 'Put the top-K steps in order.', items: ['Create an empty min heap', 'For each number, push it', 'If the heap has more than K items, pop the smallest', 'Return the heap contents'], why: 'The heap stays at size K.' },
        { t: 'match', q: 'Match each term with its meaning.', pairs: [['min heap', 'smallest value at the top'], ['max heap', 'largest value at the top'], ['heappush (Python)', 'adds a value and keeps heap order'], ['top K', 'keep a heap of size K']], why: 'Know the two heap kinds and the K-size trick.' },
        { t: 'blank', q: 'Reading the top of a heap is ___.', bank: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], a: 'O(1)', why: 'The top is always at index 0.' }
      ] },

    { id: 'graphs', title: 'Graphs and topological sort',
      sum: 'Topological sort orders the nodes of a directed acyclic graph so every edge goes forward, which fits prerequisites such as courses. Kahn\'s method removes nodes with no incoming edges. If nodes remain, there is a cycle.',
      explain: [
        'A topological order lists the nodes of a directed acyclic graph (DAG) so that every edge points from an earlier node to a later one. It fits any dependency problem: course prerequisites, build order, package installs.',
        'Kahn\'s algorithm counts incoming edges for each node. It queues every node whose count is zero, then repeatedly pops a node, appends it to the output, and reduces the count of each neighbour; a neighbour that reaches zero is queued.',
        'If the output has fewer nodes than the graph, the remaining nodes sit on a cycle, so no valid order exists. The cost is O(V + E).'
      ],
      code: 'from collections import deque\n\ndef topo(n, edges):\n    g = [[] for _ in range(n)]\n    indeg = [0] * n\n    for a, b in edges:\n        g[a].append(b)\n        indeg[b] += 1\n    q = deque(i for i in range(n) if indeg[i] == 0)\n    order = []\n    while q:\n        u = q.popleft()\n        order.append(u)\n        for v in g[u]:\n            indeg[v] -= 1\n            if indeg[v] == 0:\n                q.append(v)\n    return order if len(order) == n else []   # [] means a cycle',
      yt: 'LeetCode 207 Course Schedule topological sort', spec: true,
      posts: [
        { t: "Kahn's Topological Sort Algorithm", by: 'Techie Delight', url: 'https://techiedelight.com/kahn-topological-sort-algorithm/', r: 4,
          take: 'Shows the in-degree method in several languages and says what happens when the input is not a DAG. Clear and correct.' },
        { t: 'Topological Sort (Kahn)', by: 'Virtual Labs, IIIT Hyderabad', url: 'https://ds2-iiith.vlabs.ac.in/exp/topo-sort/kahns-algorithm/basic-concept-algorithm.html', r: 4,
          take: 'A numbered, step-by-step explanation of Kahn\'s algorithm, including the check that flags a cycle when not all nodes are visited. Academic and reliable.' },
        { t: 'Topological sort pattern', by: 'Hello Interview', url: 'https://www.hellointerview.com/learn/ai-coding/patterns/topological-sort', r: 3,
          take: 'Focuses on recognising when a problem needs topological sort, with a Python implementation. Good for the "when" more than the "how".' }
      ],
      ex: [
        { t: 'mc', q: 'Topological sort needs the graph to be:', o: ['Undirected', 'A directed acyclic graph', 'Weighted', 'A tree'], a: 1, why: 'A cycle makes a valid ordering impossible.' },
        { t: 'mc', q: 'In Kahn\'s method, you start with nodes that have:', o: ['No outgoing edges', 'No incoming edges', 'The most edges', 'The highest id'], a: 1, why: 'Nodes with in-degree 0 have no prerequisites left.' },
        { t: 'tf', q: 'A topological order exists for any directed graph.', a: false, why: 'Only DAGs have one. A cycle means no valid order.' },
        { t: 'tapline', q: 'Which line is the bug in Kahn\'s start?', code: 'q = [i for i in range(n) if indeg[i] > 0]\nwhile q:\n    u = q.pop()', a: 0, why: 'You must start with nodes whose in-degree is 0, not greater than 0.' },
        { t: 'order', q: 'Put Kahn\'s algorithm in order.', items: ['Count incoming edges for every node', 'Queue all nodes with zero incoming edges', 'Pop a node and append it to the order', 'Decrease the in-degree of its neighbours; queue any that reach zero'], why: 'This is the whole algorithm.' },
        { t: 'fill', q: 'If Kahn\'s output is shorter than the node count, the graph has a ___.', a: ['cycle'], why: 'The unprocessed nodes are stuck waiting on each other.' },
        { t: 'blank', q: 'Topological sort costs O(V + E), the cost of ___.', bank: ['visiting each node and edge once', 'sorting all the edges', 'building a heap', 'copying the graph'], a: 'visiting each node and edge once', why: 'Each edge is processed once when its source is popped.' },
        { t: 'match', q: 'Match each term with its meaning.', pairs: [['in-degree', 'number of incoming edges'], ['DAG', 'directed graph with no cycles'], ['prerequisite', 'must come before'], ['cycle', 'makes an ordering impossible']], why: 'Terms you will need to explain in an interview.' },
        { t: 'multi', q: 'Which problems map to topological sort? Select all that apply.', o: ['Course schedule with prerequisites', 'Build order for packages', 'Shortest path with negative weights', 'Compile order of source files'], a: [0, 1, 3], why: 'Shortest path with negative weights is Bellman-Ford.' }
      ] },

    { id: 'intervals', title: 'Merge intervals',
      sum: 'Sort intervals by start time. If the current interval starts before the last merged one ends, extend that end; otherwise start a new one. Sorting costs O(n log n).',
      explain: [
        'Given a list of intervals [start, end], merge every overlap. Sort by start, then walk the list keeping the last merged interval.',
        'If the next start is at or before the current end, extend the current end to the larger of the two ends. Otherwise, output the current interval and start a new one.',
        'Sorting is what makes this work: after sorting, an interval can only overlap the most recent merged one. For greedy problems (such as the most non-overlapping meetings) sort by end time instead.'
      ],
      code: 'def merge(intervals):\n    intervals.sort()                 # sort by start\n    out = []\n    for s, e in intervals:\n        if out and s <= out[-1][1]:\n            out[-1][1] = max(out[-1][1], e)\n        else:\n            out.append([s, e])\n    return out\n# merge([[1,3],[2,6],[8,10],[15,18]]) -> [[1,6],[8,10],[15,18]]',
      yt: 'NeetCode merge intervals', spec: false,
      posts: [
        { t: 'Day 10: Pattern Merge Intervals', by: "Denisse's newsletter", url: 'https://denisse.beehiiv.com/p/day-10-pattern-merge-intervals', r: 4,
          take: 'Presents the sort-then-sweep pattern and the related problems (insert, non-overlapping) with the sort key for each. Practical and concise.' },
        { t: 'Interval Algorithm Patterns for Coding Interviews', by: 'techinterview.org', url: 'https://www.techinterview.org/post/3233467664/interval-merge-patterns/', r: 3,
          take: 'Lists the interval patterns side by side. Good as a reference once you know the basic merge.' },
        { t: 'Merge Intervals', by: 'Hello Interview (community)', url: 'https://www.hellointerview.com/community/questions/merge-intervals/cm5eh7nrh04ok838oa0xi845w', r: 3,
          take: 'Community answer thread with the standard solution and its complexity.' }
      ],
      ex: [
        { t: 'mc', q: 'The first step in merge intervals is usually:', o: ['Sort by start time', 'Build a heap', 'Reverse the list', 'Hash each interval'], a: 0, why: 'Sorting by start makes overlaps adjacent.' },
        { t: 'mc', q: 'Two intervals overlap when:', o: ['The second starts after the first ends', 'The second starts before the first ends', 'They have equal length', 'They are both empty'], a: 1, why: 'If the next start is before the current end, they overlap.' },
        { t: 'tf', q: 'After sorting by start, you only need to compare each interval with the last merged one.', a: true, why: 'Earlier merged intervals end before this one can start.' },
        { t: 'tapline', q: 'Which line is the bug? Contained intervals shrink the result.', code: 'out = []\nfor s, e in sorted(iv):\n    if out and s <= out[-1][1]:\n        out[-1][1] = e', a: 3, why: 'For [1,10] then [2,3], this sets the end to 3. It must be max(out[-1][1], e).' },
        { t: 'order', q: 'Put the merge steps in order.', items: ['Sort intervals by start', 'Start with the first interval as current', 'For each next interval, merge if it overlaps current', 'Otherwise save current and start a new one'], why: 'Sort first; everything else depends on it.' },
        { t: 'num', q: 'How many merged intervals come out of [[1,4],[2,3],[5,6]]?', a: 2, why: '[1,4] absorbs [2,3]; [5,6] stays separate.' },
        { t: 'blank', q: 'Sorting by start time costs O(___) before the scan.', bank: ['n log n', 'n', 'n²', 'log n'], a: 'n log n', why: 'The sort dominates; the scan is O(n).' },
        { t: 'match', q: 'Match each problem with its approach.', pairs: [['merge intervals', 'sort by start, then sweep'], ['insert interval', 'add into a sorted list'], ['non-overlapping intervals (LeetCode 435)', 'greedy, sort by end'], ['overlap test', 'next start ≤ current end']], why: 'Same family, different sort keys.' },
        { t: 'fill', q: 'The LeetCode problem number for Merge Intervals is ___.', a: ['56'], why: 'It is LeetCode 56.' }
      ] },

    { id: 'dp', title: 'Dynamic programming (intro)',
      sum: 'DP reuses answers to smaller subproblems. Write the recurrence first: ways(n) = ways(n−1) + ways(n−2) for climbing stairs. House Robber: best(i) = max(best(i−1), best(i−2) + value[i]).',
      explain: [
        'Dynamic programming applies when a problem splits into overlapping subproblems with optimal substructure. Store each subproblem answer so it is computed once.',
        'The recipe: define the state (what does dp[i] mean?), write the recurrence between dp[i] and smaller states, set the base cases, then fill in dependency order (bottom-up) or add a cache to the recursion (top-down).',
        'Climbing stairs: ways(n) = ways(n−1) + ways(n−2), because the last move is one step or two. House Robber: best(i) = max(skip house i, rob it and take best(i−2)).'
      ],
      code: 'def climb(n):\n    a, b = 1, 1            # ways(0), ways(1)\n    for _ in range(n - 1):\n        a, b = b, a + b\n    return b\n# climb(5) -> 8',
      yt: 'Introduction to Dynamic Programming Mastering 1D Problems', spec: true,
      posts: [
        { t: 'Memoization vs. tabulation in dynamic programming', by: 'Educative', url: 'https://educative.io/blog/memoization-vs-tabulation', r: 4,
          take: 'Explains top-down caching against bottom-up table filling, and when each is the better fit. Clear comparison with examples.' },
        { t: 'Tabulation vs Memoization', by: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/tabulation-vs-memoization/amp/', r: 3,
          take: 'Side-by-side code for both styles with the trade-off: recursion depth against computing unneeded subproblems. Standard reference material.' },
        { t: 'Dynamic programming vs memoization vs tabulation', by: 'programming.guide', url: 'https://programming.guide/dynamic-programming-vs-memoization-vs-tabulation.html', r: 3,
          take: 'Short comparison that separates the idea (DP) from the two implementation styles. Good summary after the longer pieces.' }
      ],
      ex: [
        { t: 'mc', q: 'Climbing stairs (1 or 2 steps) follows the recurrence:', o: ['ways(n) = ways(n−1) + ways(n−2)', 'ways(n) = n', 'ways(n) = 2ⁿ', 'ways(n) = ways(n/2)'], a: 0, why: 'The last move is one step or two, so the counts add.' },
        { t: 'mc', q: 'Memoisation means:', o: ['Storing answers to subproblems', 'Sorting the input', 'Using more threads', 'Deleting recursion'], a: 0, why: 'Store each subproblem result so it is computed once.' },
        { t: 'tf', q: 'Dynamic programming always requires recursion.', a: false, why: 'Tabulation fills a table with loops and no recursion.' },
        { t: 'order', q: 'Put the DP recipe in order.', items: ['Define what dp[i] means', 'Write the recurrence between dp[i] and smaller states', 'Set the base cases', 'Fill the table in dependency order and read the answer'], why: 'The state definition is the step most people skip.' },
        { t: 'num', q: 'Using ways(1) = 1, ways(2) = 2, ways(3) = 3 and ways(n) = ways(n−1) + ways(n−2), what is ways(4)?', a: 5, why: '3 + 2 = 5.' },
        { t: 'tapline', q: 'Which line is the bug? The result is never cached.', code: 'memo = {}\ndef f(n):\n    if n in memo: return memo[n]\n    if n <= 1: return 1\n    return f(n-1) + f(n-2)', a: 4, why: 'The result must be stored: memo[n] = f(n-1) + f(n-2), then return it.' },
        { t: 'blank', q: 'Memoization is ___-down; tabulation is bottom-up.', bank: ['top', 'left', 'side', 'inside'], a: 'top', why: 'Memoization starts at the full problem and recurses down.' },
        { t: 'match', q: 'Match each DP term with its meaning.', pairs: [['dp state', 'what dp[i] means'], ['base case', 'the smallest answer you know'], ['recurrence', 'how dp[i] depends on smaller states'], ['memoization', 'cache recursive results']], why: 'Name these four in every DP answer.' },
        { t: 'multi', q: 'Which are classic DP problems? Select all that apply.', o: ['Climbing stairs', 'House robber', 'Reverse a linked list', 'Coin change (fewest coins)'], a: [0, 1, 3], why: 'Reversing a list is a pointer task.' },
        { t: 'fill', q: 'Storing answers to subproblems so they are computed once is called ___.', a: ['memoization', 'memoisation'], why: 'The top-down version of DP.' }
      ] }
    ]},

  { name: 'Backend and databases', color: 'b', lessons: [

    { id: 'nplus1', title: 'N+1 queries',
      sum: 'Loading a list (1 query) and then a related row for each item (N queries) costs N+1 round trips. Fix it with eager loading or a JOIN, so the database returns everything in one or two queries.',
      explain: [
        'Load 500 orders with one query, then one query per order to fetch its customer, and you have 501 round trips. Each trip adds network latency, so the endpoint slows down as the list grows.',
        'The cause is usually lazy loading: the ORM loads a relation the first time you touch it, inside a loop. The code looks innocent; the query count does not.',
        'Fix it with eager loading (includes, select_related, joinedload, prefetch_related, selectinload) or a JOIN, so related rows come back in one or two queries. Detect it by counting queries per request in your logs. Only eager-load what the response actually uses.'
      ],
      code: '-- N+1: one list query, then one query per row\nSELECT * FROM orders;                      -- once\nSELECT * FROM customers WHERE id = 1;      -- per order\nSELECT * FROM customers WHERE id = 7;      -- ...\n\n-- Fixed: one JOIN\nSELECT o.*, c.name\nFROM orders o JOIN customers c ON c.id = o.customer_id;',
      yt: 'N+1 query problem explained', spec: true,
      extra: ['Zuplo: N+1 in GraphQL (API World 2024)', 'https://www.youtube.com/results?search_query=Zuplo+N%2B1+GraphQL+API+World+2024'],
      posts: [
        { t: 'N+1 queries problem and how to resolve', by: 'ShiftAsia', url: 'https://shiftasia.com/community/n-1-queries/', r: 3,
          take: 'Defines the pattern, shows the before and after queries, and explains the JOIN and batched-IN fixes. Clear, though it is a vendor blog.' },
        { t: 'Eager Loading and the N+1 Query Problem', by: 'Rails Tutorial news', url: 'https://news.railstutorial.org/eager-loading', r: 3,
          take: 'Explains lazy against eager loading with a Rails example. The idea transfers to any ORM once you know the names for your stack.' },
        { t: 'The N+1 Query Problem: Why Your API Gets Slower With Every Row', by: 'Level Up (Medium)', url: 'https://levelup.gitconnected.com/the-n-1-query-problem-why-your-api-gets-slower-with-every-row-you-add-fd48d09522b6', r: 3,
          take: 'Shows how the cost grows with row count, which makes the problem concrete. Read it for the motivation, then check the fix against your ORM docs.' }
      ],
      ex: [
        { t: 'mc', q: 'A list of 50 orders, then one query per order for its customer, is:', o: ['1 query', '51 queries', '50 queries', '2 queries'], a: 1, why: '1 query for the list plus 50 follow-ups is N+1 = 51.' },
        { t: 'mc', q: 'Best fix for N+1 is:', o: ['Add more servers', 'Eager loading or a JOIN', 'Remove the index', 'Use more RAM'], a: 1, why: 'Fetch the related rows in one go.' },
        { t: 'num', q: 'A page lists 20 posts. It runs 1 query for the posts, then 1 query per post for its author. How many queries in total?', a: 21, why: '1 + 20 = 21.' },
        { t: 'tapline', q: 'Which line triggers one query per post?', code: 'posts = Post.objects.all()\nfor p in posts:\n    print(p.author.name)', a: 2, why: 'p.author is loaded lazily inside the loop, once per post.' },
        { t: 'fill', q: 'The fix that fetches related rows in one batch is called eager ___.', a: ['loading'], why: 'Eager loading versus lazy loading.' },
        { t: 'match', q: 'Match each term with its meaning.', pairs: [['lazy loading', 'related rows fetched on first access'], ['eager loading', 'related rows fetched up front'], ['JOIN', 'one query returns both tables'], ['N+1', 'one list query plus N follow-ups']], why: 'The vocabulary you will use in reviews.' },
        { t: 'tf', q: 'Adding an index always fixes N+1.', a: false, why: 'N+1 is a query-count problem. An index makes each query faster but still runs N of them.' },
        { t: 'order', q: 'Put the N+1 debugging steps in order.', items: ['Notice the slow endpoint in logs', 'Count queries per request', 'Find the loop that fetches related rows', 'Eager load the relation and recount'], why: 'Measure before and after.' },
        { t: 'blank', q: 'Eager loading uses a ___ or a batched IN query.', bank: ['JOIN', 'DELETE', 'TRIGGER', 'VIEW'], a: 'JOIN', why: 'JOIN returns the related rows with the parent.' },
        { t: 'multi', q: 'Which are good fixes for N+1? Select all that apply.', o: ['select_related / joinedload', 'Add more RAM', 'prefetch_related / selectinload', 'Disable the database index'], a: [0, 2], why: 'The first and third are eager-loading helpers in Django and SQLAlchemy.' }
      ] },

    { id: 'lostupd', title: 'Transactions and the lost update',
      sum: 'A transaction makes statements succeed or fail together (ACID). A lost update happens when two transactions read the same row and both write back, so one write overwrites the other. Fix with SELECT ... FOR UPDATE, an atomic UPDATE, or a stricter isolation level.',
      explain: [
        'A transaction groups statements so they succeed or fail together. Isolation controls what concurrent transactions can see from each other.',
        'A lost update: two transactions read a balance of 100. Each withdraws 10, computes 90 and writes it back. The final balance is 90, not 80. One of the two updates vanished.',
        'Three fixes: (1) SELECT ... FOR UPDATE locks the row until commit, so the second reader waits. (2) An atomic UPDATE, such as SET balance = balance - 10, lets the database do the arithmetic in one statement. (3) Optimistic locking: keep a version column, put it in the WHERE clause, and check the rows affected.'
      ],
      code: 'BEGIN;\nSELECT balance FROM accounts WHERE id = 1 FOR UPDATE;   -- lock the row\nUPDATE accounts SET balance = balance - 10 WHERE id = 1;\nCOMMIT;\n\n-- Or one statement, no read-modify-write in app code:\nUPDATE accounts SET balance = balance - 10\nWHERE id = 1 AND balance >= 10;',
      yt: 'lost update database transactions SELECT FOR UPDATE explained', spec: false,
      extra: ['Vlad Mihalcea: lost updates and locking (written guide)', 'https://vladmihalcea.com/a-beginners-guide-to-database-locking-and-the-lost-update-phenomena'],
      posts: [
        { t: "A beginner's guide to database locking and the lost update phenomena", by: 'Java Code Geeks', url: 'https://www.javacodegeeks.com/2014/09/14/a-beginners-guide-to-database-locking-and-the-lost-update-phenomena/', r: 4,
          take: 'Walks through the lost update with a concrete example, then pessimistic and optimistic locking with code. The best single read on this topic in the results.' },
        { t: 'Optimistic vs Pessimistic Locking', by: 'binaryigor', url: 'https://binaryigor.com/optimistic-vs-pessimistic-locking.html', r: 4,
          take: 'Compares the two approaches on conflicts, blocking and retries. Makes the choice depend on how often rows are contended.' },
        { t: 'SELECT FOR UPDATE in SQL: Definition and Examples', by: 'Yugabyte', url: 'https://www.yugabyte.com/key-concepts/select-for-update-in-sql-definition-and-examples/', r: 3,
          take: 'Explains the lock taken by FOR UPDATE and its syntax. Vendor documentation; accurate for the statement itself.' }
      ],
      ex: [
        { t: 'mc', q: 'A lost update happens when:', o: ['Two transactions overwrite each other\'s writes after reading the same value', 'A server crashes', 'A table is deleted', 'An index is missing'], a: 0, why: 'Both read the old value, both write back, and one write is lost.' },
        { t: 'mc', q: 'An atomic UPDATE like "SET n = n - 1" is safer because:', o: ['The database does the math in one step', 'It sorts rows', 'It caches reads', 'It needs no transaction'], a: 0, why: 'The read and the write happen together inside the database.' },
        { t: 'tf', q: 'Read Committed isolation alone always prevents lost updates.', a: false, why: 'Read Committed still allows the read-then-write race. Use FOR UPDATE, an atomic update or a version check.' },
        { t: 'blank', q: 'To lock a row until commit, use SELECT ... ___.', bank: ['FOR UPDATE', 'DISTINCT', 'ORDER BY', 'LIMIT'], a: 'FOR UPDATE', why: 'It takes a write lock on the rows returned.' },
        { t: 'order', q: 'Put the optimistic locking steps in order.', items: ['Read the row and its version', 'Compute the new value in the app', 'UPDATE ... WHERE id = ? AND version = ?', 'If rows affected is 0, someone else wrote: retry or report'], why: 'No lock is held, so the check happens at write time.' },
        { t: 'match', q: 'Match each term with its meaning.', pairs: [['pessimistic locking', 'lock first, then write'], ['optimistic locking', 'check the version on write'], ['atomic UPDATE', 'the arithmetic happens inside the database'], ['lost update', 'one write overwrites another']], why: 'Choose between these based on contention.' },
        { t: 'tapline', q: 'Which line opens the lost-update window?', code: 'bal = db.get_balance(1)\nnew_bal = bal - 10\ndb.set_balance(1, new_bal)', a: 0, why: 'The read happens before the write. Another transaction can change the row in between.' },
        { t: 'num', q: 'Two withdrawals of 10 from a balance of 100 end with a lost update. What balance is left?', a: 90, why: 'Both read 100 and both write 90.' },
        { t: 'multi', q: 'Which prevent lost updates? Select all that apply.', o: ['SELECT ... FOR UPDATE', 'Atomic UPDATE with a computed expression', 'Reading in a loop without a transaction', 'Version column with a conditional UPDATE'], a: [0, 1, 3], why: 'Reading without a transaction gives no protection.' },
        { t: 'fill', q: 'Adding a version column and checking it on UPDATE is called ___ locking.', a: ['optimistic'], why: 'No lock is held; a conflict is detected at write time.' }
      ] }
    ]},

  { name: 'System design', color: 'y', lessons: [

    { id: 'lb', title: 'Load balancers',
      sum: 'A load balancer sends each request to one of several servers and drops unhealthy ones. Layer 4 balances by IP and port; Layer 7 by HTTP content. Common methods: round robin and least connections.',
      explain: [
        'A load balancer spreads requests across several servers, health-checks them and stops sending traffic to any that fail. You get scale and failover from one component.',
        'Layer 4 works on the transport layer: it routes by IP address and TCP or UDP port, and does not read the request. It is fast and simple, and it can pass encrypted traffic through unread.',
        'Layer 7 works on HTTP: it reads the path, headers and cookies. That lets you send /api to one pool and /static to another, stick a user to a server, or terminate TLS. Common methods are round robin, least connections and weighted variants.'
      ],
      code: '# nginx (Layer 7): route by path, round robin across two backends\nupstream api {\n  server 10.0.0.2:8080;\n  server 10.0.0.3:8080;\n}\nserver {\n  listen 80;\n  location /api/ { proxy_pass http://api; }\n}',
      yt: 'ByteByteGo load balancer system design', spec: false,
      posts: [
        { t: 'Layer 4 vs Layer 7 Load Balancing (Differences Explained)', by: 'HAProxy', url: 'https://www.haproxy.com/blog/loadbalancing-faq/', r: 4,
          take: 'Explains the two layers from the proxy\'s point of view: L4 routes on IP and port, L7 reads the application protocol. The proxy keeps two TCP connections, one each side.' },
        { t: 'Load Balancing: L4 vs L7', by: 'OneUptime', url: 'https://oneuptime.com/blog/post/2026-01-27-load-balancing-l4-vs-l7/view', r: 3,
          take: 'A recent (2026) explainer with request-flow diagrams and HAProxy, Nginx and cloud examples. Vendor blog, but the content is accurate.' },
        { t: 'Layer 7 Load Balancer vs Layer 4: Key Differences Explained', by: 'A10 Networks', url: 'https://www.a10networks.com/blog/how-do-layer-4-and-layer-7-load-balancing-differ', r: 3,
          take: 'Summarises the trade-off: L4 is faster and simpler, L7 is content-aware and handles TLS and sticky sessions. Short, vendor-written.' }
      ],
      ex: [
        { t: 'mc', q: 'Layer 7 balancing uses:', o: ['HTTP content', 'Only IP addresses', 'Disk sectors', 'Memory pages'], a: 0, why: 'Layer 7 reads the request, such as the path or headers.' },
        { t: 'mc', q: 'A load balancer mainly helps with:', o: ['Scale and failover', 'Storing files', 'Writing SQL', 'Compiling code'], a: 0, why: 'It spreads traffic and routes around failed servers.' },
        { t: 'tf', q: 'A Layer 4 balancer can route by URL path.', a: false, why: 'The URL path is inside the HTTP request, which only Layer 7 reads.' },
        { t: 'match', q: 'Match each method with what it does.', pairs: [['round robin', 'rotate through servers in turn'], ['least connections', 'pick the least busy server'], ['sticky sessions', 'same client, same server'], ['health check', 'remove unhealthy servers']], why: 'Know these as the standard choices.' },
        { t: 'multi', q: 'Which need Layer 7? Select all that apply.', o: ['Route /api and /static to different pools', 'Balance raw TCP database traffic', 'Terminate TLS and read headers', 'Route by client IP only'], a: [0, 2], why: 'Raw TCP and IP-only routing are Layer 4.' },
        { t: 'num', q: 'Three servers use round robin. You send 9 requests. How many go to server 2?', a: 3, why: '9 / 3 = 3.' },
        { t: 'blank', q: 'A load balancer that fails a server\'s health check ___ it from rotation.', bank: ['removes', 'restarts', 'encrypts', 'caches'], a: 'removes', why: 'Traffic goes only to healthy servers.' },
        { t: 'order', q: 'Put the request flow in order.', items: ['Client sends request to the load balancer address', 'Balancer picks a healthy backend by its algorithm', 'Forwards the request to that server', 'Returns the response to the client'], why: 'The client never talks to a backend directly.' },
        { t: 'fill', q: 'Layer 7 balancing reads the ___ request.', a: ['HTTP'], why: 'Layer 7 is the application layer.' }
      ] },

    { id: 'cache', title: 'Caching',
      sum: 'A cache keeps answers to slow queries in fast memory such as Redis. Cache-aside: read the cache; on a miss, read the database and store the result with a TTL. The hard part is invalidation.',
      explain: [
        'Cache-aside: the application checks the cache. On a hit, it returns the value. On a miss, it reads the database, stores the value with a TTL, and returns it.',
        'On write, update the database first, then delete the cache key. Deleting is safer than updating: two writers can race to set the cache, but the next read reloads the correct value.',
        'The hard parts are staleness (bounded by the TTL), a short race between the database write and the cache delete, and invalidating many derived keys at once. Use cache-aside for read-heavy data that can be a little stale.'
      ],
      code: 'def get_user(id):\n    v = cache.get(f"user:{id}")\n    if v is None:                       # miss\n        v = db.load_user(id)\n        cache.set(f"user:{id}", v, ttl=300)\n    return v\n\ndef update_user(id, data):\n    db.save_user(id, data)\n    cache.delete(f"user:{id}")          # next read reloads',
      yt: 'ByteByteGo caching cache aside system design', spec: false,
      posts: [
        { t: 'Cache-Aside Pattern (Lazy Loading)', by: 'Redis documentation (redis.antirez.com)', url: 'https://redis.antirez.com/fundamental/cache-aside.html', r: 5,
          take: 'The Redis project\'s own description of cache-aside: the app owns the cache, entries appear only on request, and writes should delete rather than update the key. Authoritative and short.' },
        { t: 'What is the cache-aside pattern?', by: 'Redisson glossary', url: 'https://redisson.pro/glossary/cache-aside.html', r: 3,
          take: 'Lists the failure modes: stale data between the write and the delete, and the fix of a short TTL or a per-key lock.' },
        { t: 'Cache-Aside with Redis', by: 'KodeKloud notes', url: 'https://notes.kodekloud.com/docs/System-Design-For-Beginners/Data-Reads-and-Writes/Cache-Aside-with-Redis/page', r: 3,
          take: 'Beginner notes that walk through the read and write paths with Redis. A good first pass before the authoritative page.' }
      ],
      ex: [
        { t: 'mc', q: 'In cache-aside, a cache miss means:', o: ['Read the database and fill the cache', 'Return an error', 'Delete the database', 'Skip the cache forever'], a: 0, why: 'Load from the source, then store it for next time.' },
        { t: 'mc', q: 'A TTL on a cache entry:', o: ['Limits how long stale data is kept', 'Makes it permanent', 'Encrypts it', 'Sorts it'], a: 0, why: 'After the TTL the entry expires and is reloaded.' },
        { t: 'tf', q: 'On write, updating the cache value is always safer than deleting it.', a: false, why: 'Concurrent writers can leave a wrong value in the cache. Deleting lets the next read reload it.' },
        { t: 'order', q: 'Put the cache-aside read path in order.', items: ['Check the cache', 'On a hit, return the cached value', 'On a miss, read the database', 'Store the value in the cache with a TTL, then return it'], why: 'The cache is filled lazily.' },
        { t: 'blank', q: 'Stale cached data is bounded by the ___.', bank: ['TTL', 'port', 'schema', 'index'], a: 'TTL', why: 'After the TTL the entry is gone.' },
        { t: 'tapline', q: 'Which line is in the wrong order?', code: 'def update_user(id, data):\n    cache.set(f"user:{id}", data)\n    db.save_user(id, data)', a: 1, why: 'Write the database first. If the database write fails, the cache would otherwise hold a value that was never saved.' },
        { t: 'match', q: 'Match each term with its meaning.', pairs: [['cache-aside', 'app loads the value on a miss'], ['write-through', 'write cache and database together'], ['TTL', 'how long an entry lives'], ['cache key', 'name of the cached item']], why: 'Know the write strategies.' },
        { t: 'multi', q: 'Which suit cache-aside? Select all that apply.', o: ['Read-heavy product pages', 'Account balances that must be exact', 'Per-user settings that rarely change', 'Every write must go through the cache'], a: [0, 2], why: 'Exact balances need strong consistency, not a cache.' },
        { t: 'fill', q: 'On a write, cache-aside usually ___ the cache key.', a: ['delete', 'deletes', 'invalidate', 'invalidates'], why: 'The next read repopulates it.' },
        { t: 'num', q: 'A cache entry has a TTL of 5 minutes. What is the longest it can stay stale, in seconds?', a: 300, why: '5 × 60 = 300.' }
      ] },

    { id: 'cdn', title: 'CDN',
      sum: 'A content delivery network stores copies of files on servers near users, so latency drops and the origin server gets fewer requests.',
      explain: [
        'A CDN is a network of edge servers close to users. Each edge caches copies of responses. A hit is served locally; a miss fetches from the origin and keeps a copy.',
        'Freshness comes from Cache-Control: max-age sets how long browsers keep a copy, and s-maxage sets it for shared caches such as CDNs. Versioned file names (app.3f9a.js) let you cache forever safely, because a change means a new URL.',
        'Use CDNs for static assets and cacheable pages. Mark personal responses private or no-store so they are never shared from an edge.'
      ],
      code: 'Cache-Control: public, max-age=60, s-maxage=3600\n# browsers keep it 60 s; the CDN edge keeps it 1 h\n\nCache-Control: private, no-store\n# personal page: never cached at the edge',
      yt: 'ByteByteGo CDN content delivery network system design', spec: false,
      posts: [
        { t: 'How does a CDN work?', by: 'KeyCDN', url: 'https://www.keycdn.com/support/how-does-a-cdn-work', r: 3,
          take: 'Walks through DNS routing to the nearest edge, the cache hit and miss path, and how the origin is contacted. Vendor support page, accurate on the basics.' },
        { t: 'How CDN Works: A Step-by-Step Technical Breakdown', by: 'BlazingCDN', url: 'https://blog.blazingcdn.com/en-us/how-cdn-works-a-step-by-step-technical-breakdown', r: 3,
          take: 'Follows one request from DNS lookup to delivery, with the cache-control headers that decide freshness. Vendor blog; check claims against the HTTP specs.' },
        { t: 'How CDN Works: Request Routing, Caching, and Edge Delivery', by: 'CloudOptimo', url: 'https://cloudoptimo.com/blog/how-cdn-works-request-routing-caching-and-edge-delivery/', r: 3,
          take: 'Explains the routing layer, the edge point of presence and why personalised pages stay out of shared caches. Good for the design trade-offs.' }
      ],
      ex: [
        { t: 'mc', q: 'A CDN mainly reduces:', o: ['Latency and origin load', 'Code size', 'Database columns', 'Passwords'], a: 0, why: 'Users get files from a nearby edge server.' },
        { t: 'mc', q: 'A CDN is best for:', o: ['Static files such as images and scripts', 'Password checks', 'Transactions', 'Sorting'], a: 0, why: 'Static content is easy to copy to edges.' },
        { t: 'tf', q: 'Cache-Control: private lets a CDN edge store the response for everyone.', a: false, why: 'private means only the browser may store it.' },
        { t: 'order', q: 'Put a CDN request in order.', items: ['User requests a file', 'DNS routes the user to the nearest edge', 'Edge checks its cache', 'On a miss, edge fetches from the origin and stores it'], why: 'Only misses reach the origin.' },
        { t: 'blank', q: 'The header that sets the lifetime for shared caches such as CDNs is ___.', bank: ['s-maxage', 'host', 'cookie', 'accept'], a: 's-maxage', why: 'max-age applies to browsers; s-maxage applies to shared caches.' },
        { t: 'num', q: 'Edge s-maxage is 3600 seconds. At most how many seconds until the origin is asked again for that file?', a: 3600, why: 'The edge copy is fresh for one hour.' },
        { t: 'match', q: 'Match each term with its meaning.', pairs: [['edge', 'nearby server holding copies'], ['origin', 'your real server'], ['hit', 'served from the cache'], ['purge', 'remove cached copies early']], why: 'The vocabulary you need for CDN questions.' },
        { t: 'tapline', q: 'Which line stops shared CDN caching of this file?', code: 'location /static/ {\n  add_header Cache-Control "private, max-age=86400";\n}', a: 1, why: 'private keeps the response out of shared caches, so the CDN will not store it.' },
        { t: 'fill', q: 'A ___ asset URL (for example app.3f9a.js) lets you cache forever safely.', a: ['versioned', 'fingerprinted', 'hashed'], why: 'A changed file gets a new URL, so stale copies are never served.' }
      ] },

    { id: 'queue', title: 'Queues and background workers',
      sum: 'A queue holds jobs (send email, resize image) so the request can return fast. Workers take jobs off the queue. Delivery is usually at-least-once, so jobs must be safe to run twice.',
      explain: [
        'A queue decouples the request from slow work. The web request puts a job on the queue (send an email, resize an image) and returns 202 Accepted. Workers take jobs and do the work.',
        'Delivery is usually at-least-once. If a worker crashes after doing the work but before acknowledging, the broker redelivers the message. So a job can run twice; the system prefers a duplicate to a lost message.',
        'Make jobs idempotent. Store the message ID with the effect in the same transaction and skip IDs already seen, or design the effect so repeating it changes nothing (SET status = shipped, not counter + 1).'
      ],
      code: 'def handle(msg):\n    if db.exists("processed", msg.id):    # already done?\n        return\n    with db.transaction():\n        send_invoice(msg.order_id)\n        db.insert("processed", msg.id)    # same transaction as the effect',
      yt: 'message queues background workers system design explained', spec: false,
      posts: [
        { t: 'Idempotent Consumer: Handling Duplicate Messages', by: 'Milan Jovanović', url: 'https://milanjovanovic.tech/blog/idempotent-consumer-handling-duplicate-messages.md', r: 4,
          take: 'Shows the idempotent consumer as a decorator that records processed message IDs, with the lazy and eager variants. Clear, with code.' },
        { t: 'Delivery Semantics', by: 'AxonOps (Kafka docs)', url: 'https://docs.axonops.com/data-platforms/kafka/concepts/delivery-semantics', r: 4,
          take: 'Defines at-most-once, at-least-once and exactly-once, and says exactly-once is at-least-once plus idempotent processing. Accurate and precise.' },
        { t: 'The Kafka lesson nobody teaches you until a customer gets charged twice', by: 'DEV Community', url: 'https://dev.to/shahzamandev/the-kafka-lesson-nobody-teaches-you-until-a-customer-gets-charged-twice-23jo', r: 3,
          take: 'A story of a duplicate charge that shows why at-least-once needs idempotent consumers. Memorable, though a single anecdote.' }
      ],
      ex: [
        { t: 'mc', q: 'Why put slow work on a queue?', o: ['The request returns fast', 'It makes code shorter', 'It removes bugs', 'It needs no workers'], a: 0, why: 'The user does not wait for the slow job.' },
        { t: 'mc', q: 'If delivery is at-least-once, a job may run:', o: ['Twice', 'Never', 'Only at night', 'Only once'], a: 0, why: 'So the job itself must be idempotent.' },
        { t: 'tf', q: 'At-least-once delivery means messages can be lost.', a: false, why: 'It means they can be repeated. Losing messages is what it prevents.' },
        { t: 'order', q: 'Put the job lifecycle in order.', items: ['Request enqueues a job and returns 202', 'Worker dequeues the job', 'Worker performs the work', 'Worker acknowledges the message'], why: 'Acknowledge last, so a crash causes a redelivery, not a loss.' },
        { t: 'blank', q: 'If a worker crashes before acknowledging, the message is ___.', bank: ['redelivered', 'deleted', 'encrypted', 'compressed'], a: 'redelivered', why: 'The broker assumes it was not handled.' },
        { t: 'match', q: 'Match each term with its role.', pairs: [['producer', 'adds jobs to the queue'], ['consumer / worker', 'takes jobs and runs them'], ['idempotent', 'safe to run twice'], ['ack', 'tells the broker the job is done']], why: 'The four roles in any queue system.' },
        { t: 'tapline', q: 'Which line is the bug? A crash here loses the email.', code: 'def worker(msg):\n    queue.ack(msg)\n    send_email(msg.user)', a: 1, why: 'Acknowledging first means a crash before the email is sent drops the job. Ack after the work.' },
        { t: 'multi', q: 'Which operations are naturally idempotent? Select all that apply.', o: ['SET status = shipped', 'balance = balance + 10', 'DELETE WHERE id = 5', 'Send a receipt email'], a: [0, 2], why: 'Repeating the first and third leaves the same result. Repeating the second adds 10 each time.' },
        { t: 'num', q: 'A message fails 3 times, then succeeds on the 4th attempt. How many total executions?', a: 4, why: 'Each attempt is one execution.' },
        { t: 'fill', q: 'The guarantee where messages are never lost but may repeat is called at-least-___.', a: ['once'], why: 'The opposite is at-most-once.' }
      ] },

    { id: 'shard', title: 'Sharding and consistent hashing',
      sum: 'Sharding splits data across databases by a key. Plain hash % N remaps almost every key when N changes. Consistent hashing puts servers and keys on a ring, so adding a server moves only a few keys.',
      explain: [
        'Sharding splits data across servers by a key. hash(key) % N works until N changes. Then almost every key maps to a different server, and you must move most of your data.',
        'Consistent hashing places each server on a ring of hash values. A key belongs to the first server clockwise from its hash. Adding a server takes keys only from its clockwise neighbour, so about 1/N of the keys move.',
        'Virtual nodes give each server many points on the ring, which evens out the load. Redis Cluster takes a different route: it uses 16,384 fixed hash slots and assigns slots to nodes.'
      ],
      code: 'import bisect, hashlib\n\ndef h(s):\n    return int(hashlib.md5(s.encode()).hexdigest(), 16)\n\nservers = ["A", "B", "C"]\nring = sorted((h(f"{s}#{i}"), s) for s in servers for i in range(100))  # 100 vnodes each\npoints = [p for p, _ in ring]\n\ndef server_for(key):\n    i = bisect.bisect(points, h(key)) % len(ring)   # first point clockwise\n    return ring[i][1]',
      yt: 'ByteByteGo consistent hashing', spec: true,
      posts: [
        { t: 'Consistent Hashing Explained', by: 'AlgoMaster', url: 'https://blog.algomaster.io/p/consistent-hashing-explained', r: 4,
          take: 'Explains why plain modulo hashing moves most keys and how the ring fixes it. Clear diagrams-in-words and a good first read.' },
        { t: 'Consistent hashing', by: 'Mintlify (karanpratapsingh system-design)', url: 'https://www.mintlify.com/karanpratapsingh/system-design/databases/consistent-hashing', r: 4,
          take: 'Covers the ring and virtual nodes, and why vnodes spread load and speed rebalancing. Solid reference material.' },
        { t: 'Understanding Consistent Hashing: Concepts, Pitfalls, and Real-World Use Cases', by: 'Level Up (Medium)', url: 'https://levelup.gitconnected.com/understanding-consistent-hashing-concepts-pitfalls-and-real-world-use-cases-2b0571689330', r: 3,
          take: 'Discusses how many virtual nodes are useful. The gains level off around 100 to 200 per server, while memory cost keeps growing.' }
      ],
      ex: [
        { t: 'mc', q: 'Why is plain hash % N bad when you add a server?', o: ['It remaps almost every key', 'It is too slow', 'It needs a GPU', 'It deletes data'], a: 0, why: 'Changing N changes the result for most keys.' },
        { t: 'mc', q: 'In consistent hashing, a key goes to:', o: ['The next server clockwise on the ring', 'A random server', 'The first server always', 'Every server'], a: 0, why: 'Only keys near the new server move.' },
        { t: 'tf', q: 'Virtual nodes give each server several points on the ring.', a: true, why: 'More points spread the load more evenly.' },
        { t: 'num', q: 'With hash % N, going from 4 servers to 5, about what percent of keys move? (Answer 80.)', a: 80, why: 'Roughly 4 in 5 keys get a new remainder.' },
        { t: 'order', q: 'Put adding a server to the ring in order.', items: ['Hash the new server onto the ring', 'Its keys are the ones clockwise from its points', 'Those keys move from the next server', 'Other keys stay where they are'], why: 'Only a slice of the ring changes hands.' },
        { t: 'match', q: 'Match each term with its meaning.', pairs: [['ring', 'the hash space as a circle'], ['virtual node', 'an extra ring point for a server'], ['shard', 'a slice of the data'], ['hash slot (Redis)', 'a fixed partition of keys']], why: 'Terms from both approaches.' },
        { t: 'blank', q: 'A key is stored on the first server ___ from its hash on the ring.', bank: ['clockwise', 'randomly', 'alphabetically', 'by size'], a: 'clockwise', why: 'That is the lookup rule.' },
        { t: 'tapline', q: 'Which line makes adding a server remap most keys?', code: 'i = hash(key) % len(servers)\nreturn servers[i]', a: 0, why: 'len(servers) changes when a server is added, so the modulo result changes for most keys.' },
        { t: 'multi', q: 'Which are benefits of consistent hashing? Select all that apply.', o: ['Few keys move when a node joins', 'Perfectly even load without virtual nodes', 'Works well for caches and sharded stores', 'Removes the need for replication'], a: [0, 2], why: 'Consistent hashing does not replace replication, and without vnodes the load can be uneven.' }
      ] },

    { id: 'cap', title: 'CAP theorem',
      sum: 'When a network partition splits a system, you choose between answering with possibly stale data (availability) and refusing until the nodes agree (consistency). Partitions happen, so the real choice is C or A during a partition.',
      explain: [
        'CAP says that during a network partition, a system must choose: answer with possibly stale data (availability), or refuse until the nodes agree (consistency). It cannot guarantee both for every request while the partition lasts.',
        'Partitions happen on real networks, so the practical question is what your system does when they happen, not a permanent choice of two out of three.',
        'Kleppmann\'s critique: the C in CAP means linearizability, a narrow property. "CP" and "AP" labels hide the real design choices. PACELC adds the trade-off that exists even without a partition: latency against consistency.'
      ],
      code: 'Partition: node A cannot reach node B.\nClient asks B for the balance:\n  CP answer: "error, cannot confirm latest value"   (consistency kept, availability lost)\n  AP answer: "100, might be stale"                  (availability kept, consistency lost)',
      yt: 'CAP theorem explained consistency availability partition', spec: false,
      posts: [
        { t: 'Please stop calling databases CP or AP', by: 'Martin Kleppmann', url: 'https://martin.kleppmann.com/2015/05/11/please-stop-calling-databases-cp-or-ap.html', r: 5,
          take: 'Argues the labels are misleading because most databases are not strictly CP or AP in their default setup, and the terms have narrow meanings. The author is a leading distributed-systems researcher.' },
        { t: 'A Critique of the CAP Theorem', by: 'Martin Kleppmann (arXiv:1509.05393)', url: 'https://arxiv.org/abs/1509.05393', r: 4,
          take: 'The formal version: the CAP definitions and proof are narrower than the popular reading, and the paper proposes a delay-sensitivity framework. Dense, but the source for the critique.' },
        { t: 'A critique of the CAP theorem', by: 'Julia Evans', url: 'https://jvns.ca/blog/2016/11/19/a-critique-of-the-cap-theorem/', r: 4,
          take: 'A readable summary of Kleppmann\'s paper: what the theorem says, where the terms are ambiguous, and why the proof is small but its use is limited.' }
      ],
      ex: [
        { t: 'mc', q: 'During a network partition, a system must choose between:', o: ['Consistency and availability', 'Speed and cost', 'Read and write', 'Cache and disk'], a: 0, why: 'You cannot have both while the nodes cannot talk.' },
        { t: 'mc', q: 'Partition tolerance in CAP means:', o: ['The system keeps working despite lost messages', 'The system never fails', 'It has no replicas', 'It is encrypted'], a: 0, why: 'Partitions happen in distributed systems, so you must tolerate them.' },
        { t: 'tf', q: 'CAP says a distributed system must always give up consistency.', a: false, why: 'It applies during a partition. Without one, a system can have both.' },
        { t: 'match', q: 'Match each term with its meaning.', pairs: [['consistency (CAP)', 'linearizable reads'], ['availability (CAP)', 'every non-failing node responds'], ['partition', 'a network split between nodes'], ['PACELC', 'adds the latency-vs-consistency trade-off with no partition']], why: 'Kleppmann\'s point is that the precise meanings matter.' },
        { t: 'multi', q: 'Which statements about CAP are accurate? Select all that apply.', o: ['It applies during network partitions', 'CP means refusing some requests during a partition', 'Every database is strictly CP or AP by default', 'Partition tolerance is optional on real networks'], a: [0, 1], why: 'Most databases are not strictly one or the other by default.' },
        { t: 'blank', q: 'Kleppmann argues the C in CAP means ___.', bank: ['linearizability', 'encryption', 'sharding', 'compression'], a: 'linearizability', why: 'A narrow property, not everyday consistency.' },
        { t: 'order', q: 'Put the partition response in order.', items: ['Detect that nodes cannot reach each other', 'Choose: refuse requests or serve possibly stale data', 'Apply that policy to incoming requests', 'Reconcile when the partition heals'], why: 'The decision happens at detection time.' },
        { t: 'fill', q: 'The acronym CAP stands for consistency, availability and partition ___.', a: ['tolerance'], why: 'Partition tolerance is the P.' },
        { t: 'num', q: 'A 5-node cluster splits into groups of 3 and 2. How many nodes are in the majority group?', a: 3, why: 'Majorities decide; 3 of 5 is a majority.' }
      ] },

    { id: 'replag', title: 'Replication lag',
      sum: 'Replicas copy writes from the primary, often a little late. A user who writes and then reads a replica may not see their own write. Fix by reading from the primary for a short time after a write.',
      explain: [
        'Replicas copy writes from the primary asynchronously, so they can lag by milliseconds or seconds. A read sent to a replica may return older data.',
        'Read-your-writes: after a user saves, their next reads should show that save. Two common fixes: read from the primary for that user for a short window after a write, or record the write\'s log position and read from a replica only once it has caught up.',
        'Measure lag (for example, replay lag on Postgres) and alert on it. Do not assume replicas are current.'
      ],
      code: 'def save_profile(user, data):\n    db.primary.update_user(user.id, data)\n    session["read_primary_until"] = now() + 10     # 10 s window\n\ndef get_profile(user):\n    src = db.primary if now() < session.get("read_primary_until", 0) else db.replica\n    return src.get_user(user.id)',
      yt: 'database replication lag read your writes explained', spec: false,
      posts: [
        { t: 'Read-Your-Writes Consistency', by: 'Arpit Bhayani', url: 'https://arpitbhayani.me/blogs/read-your-write-consistency', r: 4,
          take: 'Walks through the replica problem and the fixes: pinning reads to the primary, or fallback on a miss. Concrete and practical.' },
        { t: 'Read-Your-Writes Consistency: Why Your Profile Update Disappears on Refresh', by: 'Codemia', url: 'https://codemia.io/archive/read-your-writes-consistency', r: 3,
          take: 'Exactly the symptom in this lesson, with the fix of routing a user\'s own reads to the primary for a short time. Short and focused.' },
        { t: 'The impact and mitigation of replication lag in high availability systems', by: 'Medium (Tarang)', url: 'https://medium.com/@tarangds/the-impact-and-mitigation-of-replication-lag-in-high-availability-systems-28a9bead3707', r: 3,
          take: 'Covers synchronous replication and its throughput cost, against the cheaper pinning approaches. Useful for the trade-off discussion.' }
      ],
      ex: [
        { t: 'mc', q: 'You save a profile change, reload, and see the old name. The likely cause is:', o: ['Replication lag', 'A missing CSS file', 'A broken link', 'A DNS typo'], a: 0, why: 'The read went to a replica that had not caught up yet.' },
        { t: 'mc', q: 'Read-your-writes is often fixed by:', o: ['Reading from the primary for a short window after a write', 'Turning off the cache', 'Adding a CDN', 'Deleting the replica'], a: 0, why: 'Route the user\'s reads to the primary briefly.' },
        { t: 'tf', q: 'Replicas are always up to date with the primary.', a: false, why: 'Asynchronous replication means they can be behind.' },
        { t: 'order', q: 'Put the read-your-writes sequence in order.', items: ['User saves the profile', 'Write goes to the primary', 'Replica catches up later', 'Next read goes to the primary for a short window'], why: 'The window covers the lag.' },
        { t: 'blank', q: 'The primary sends writes to replicas ___, so they can lag.', bank: ['asynchronously', 'never', 'only at night', 'as files'], a: 'asynchronously', why: 'Replicas do not wait for each write to be copied.' },
        { t: 'tapline', q: 'Which line writes to the wrong database?', code: 'def save(user, data):\n    replica.update_user(user.id, data)\n    return replica.get_user(user.id)', a: 1, why: 'Writes go to the primary. Replicas are for reads.' },
        { t: 'match', q: 'Match each term with its meaning.', pairs: [['primary', 'accepts writes'], ['replica', 'copies from the primary'], ['replication lag', 'delay between a write and its copy'], ['read-your-writes', 'you see your own write']], why: 'The vocabulary for this lesson.' },
        { t: 'num', q: 'A replica lags 2 seconds. A user saves and reloads after 1 second. How many more seconds until the replica shows the write?', a: 1, why: '2 − 1 = 1.' },
        { t: 'multi', q: 'Which fix stale reads after a write? Select all that apply.', o: ['Read from the primary briefly after a write', 'Synchronous replication', 'Read from a random replica every time', 'Track the write\'s log position before reading a replica'], a: [0, 1, 3], why: 'Random replica reads make the problem worse.' },
        { t: 'fill', q: 'A replica is a copy of the ___.', a: ['primary', 'database'], why: 'Replicas copy the primary.' }
      ] },

    { id: 'idem', title: 'Idempotency',
      sum: 'An idempotent operation gives the same result when repeated. The client sends an idempotency key; the server stores the key and result, so a retry returns the stored result instead of charging twice.',
      explain: [
        'An operation is idempotent if repeating it has the same effect as doing it once. PUT and DELETE are idempotent by definition. A POST that creates a charge is not, so a retry can create a second one.',
        'Clients send an Idempotency-Key header with a random unique value. On the first request, the server saves the key with the response. A retry with the same key returns the saved response instead of running the operation again.',
        'Reusing a key with different parameters is an error. Keys expire after a while, so keep them random and never reuse one for a different operation.'
      ],
      code: 'POST /v1/charges\nIdempotency-Key: 6f1c2a9e-4b7d-4e0a-9d2f-1a2b3c4d5e6f\n{"amount": 2000, "currency": "usd"}\n\n# Retry with the same key: the server returns the first response. No second charge.',
      yt: 'idempotency keys API payments explained', spec: false,
      posts: [
        { t: 'Idempotent requests', by: 'Stripe API documentation', url: 'https://docs.stripe.com/idempotency', r: 5,
          take: 'The reference for the pattern: send a random key, Stripe stores the first result, retries replay it, and mismatched parameters are rejected. Keys can be pruned after 24 hours. Official and precise.' },
        { t: 'Idempotent Consumer: Handling Duplicate Messages (related)', by: 'Milan Jovanović', url: 'https://milanjovanovic.tech/blog/idempotent-consumer-handling-duplicate-messages.md', r: 4,
          take: 'The same idea on the consumer side: record processed IDs so repeated messages do nothing. Read it with the Stripe page to see both ends of the pattern.' }
      ],
      ex: [
        { t: 'mc', q: 'A payment request is retried after a flaky network. Without idempotency, the risk is:', o: ['Charging twice', 'Losing the server', 'Slower CSS', 'A missing index'], a: 0, why: 'Each retry can create a new charge.' },
        { t: 'mc', q: 'An idempotency key lets the server:', o: ['Return the stored result for a repeated request', 'Skip authentication', 'Delete old logs', 'Disable retries'], a: 0, why: 'The same key gives the same answer.' },
        { t: 'tf', q: 'GET requests need idempotency keys.', a: false, why: 'GET is idempotent by definition. Stripe says keys matter for POST.' },
        { t: 'order', q: 'Put the idempotency flow in order.', items: ['Client generates a random key', 'Client sends the POST with the key', 'Server saves the key and the result', 'A retry with the same key returns the saved result'], why: 'The key is generated once and reused on every retry.' },
        { t: 'fill', q: 'Name an HTTP method that is idempotent and is not POST.', a: ['GET', 'PUT', 'DELETE'], why: 'Any of these repeats safely.' },
        { t: 'tapline', q: 'Which line should run only after checking store[key]?', code: 'def charge(req):\n    key = req.headers["Idempotency-Key"]\n    result = stripe.charge(req.amount)\n    store[key] = result', a: 2, why: 'Check the store first. If the key is already there, return the saved result without charging.' },
        { t: 'match', q: 'Match each term with its meaning.', pairs: [['idempotency key', 'client-chosen unique id per operation'], ['POST', 'not idempotent by default'], ['retry', 'sending the same request again'], ['stored response', 'what the server replays']], why: 'The terms behind the pattern.' },
        { t: 'num', q: 'Stripe may remove a key once it is at least how many hours old?', a: 24, why: 'The documentation says keys can be pruned after at least 24 hours.' },
        { t: 'multi', q: 'Which practices are good? Select all that apply.', o: ['Use random UUIDs as keys', 'Reuse one key for every charge', 'Reject a reused key with different parameters', 'Put the user\'s email in the key'], a: [0, 2], why: 'Keys should be random and not carry personal data.' },
        { t: 'blank', q: 'Retrying a request with the same key returns the ___ result.', bank: ['stored', 'new', 'random', 'empty'], a: 'stored', why: 'The first outcome is replayed.' }
      ] },

    { id: 'ratelim', title: 'Rate limiter (token bucket)',
      sum: 'A bucket holds up to N tokens and refills at a fixed rate. Each request takes one token; if the bucket is empty, the request is rejected (HTTP 429). It allows short bursts and a steady average rate.',
      explain: [
        'A token bucket holds up to B tokens and refills at R tokens per second. Each request takes one token. With no token left, reject the request with 429 Too Many Requests.',
        'The bucket allows bursts up to B, and the long-run rate is R per second. That is usually what you want: a client can briefly spike, but cannot sustain more than R.',
        'Across several servers, the bucket state must be shared (Redis is the common choice), or each server gets its own allowance. Return a Retry-After header so well-behaved clients can back off.'
      ],
      code: 'def allow(bucket, now):\n    bucket.tokens = min(B, bucket.tokens + (now - bucket.last) * R)\n    bucket.last = now\n    if bucket.tokens >= 1:\n        bucket.tokens -= 1\n        return True\n    return False     # respond 429',
      yt: 'token bucket rate limiter system design', spec: false,
      posts: [
        { t: 'Rate Limiting Algorithms Explained with Code', by: 'AlgoMaster', url: 'https://blog.algomaster.io/i/146668173/sliding-window-log', r: 4,
          take: 'Compares token bucket, leaky bucket and sliding windows with code for each. The best comparison of the set; this link points into a longer newsletter post.' },
        { t: 'Token Bucket Algorithm Explained', by: 'DEV Community', url: 'https://dev.to/0xtanzim/token-bucket-algorithm-explained-4ceo', r: 3,
          take: 'Works a small example: a bucket of 10 lets a burst of 10 through and rejects the rest until refill. Simple and correct.' },
        { t: 'Token Bucket Rate Limiting Explained', by: 'Gravitee', url: 'https://www.gravitee.io/token-bucket-basics.html', r: 3,
          take: 'Defines the two parameters, bucket size and refill rate, and explains the burst trade-off. Vendor page with a concise conceptual overview.' }
      ],
      ex: [
        { t: 'mc', q: 'When the token bucket is empty, the usual response is:', o: ['HTTP 429 (too many requests)', 'HTTP 200', 'A database crash', 'Silent success'], a: 0, why: '429 tells the client to slow down.' },
        { t: 'mc', q: 'A token bucket allows:', o: ['Short bursts with a steady average rate', 'Unlimited requests', 'No requests', 'Only one request a day'], a: 0, why: 'Saved tokens let a burst through.' },
        { t: 'tf', q: 'A bucket with capacity 10 and refill 10 per second lets 100 requests through instantly.', a: false, why: 'Only the 10 tokens in the bucket are available at once.' },
        { t: 'num', q: 'The bucket is empty. It refills 2 tokens per second. How many seconds until 6 tokens are available?', a: 3, why: '6 / 2 = 3.' },
        { t: 'order', q: 'Put the token bucket check in order.', items: ['Refill tokens based on elapsed time', 'Cap the tokens at the bucket size', 'If a token is available, take one and allow the request', 'Otherwise reject with 429'], why: 'Refill first, then decide.' },
        { t: 'tapline', q: 'Which line lets the bucket overflow its capacity?', code: 'def refill(bucket, elapsed):\n    bucket.tokens = bucket.tokens + elapsed * R', a: 1, why: 'Nothing caps the tokens at B. Use min(B, ...).' },
        { t: 'match', q: 'Match each term with its meaning.', pairs: [['capacity', 'maximum tokens, the burst size'], ['refill rate', 'tokens added per second'], ['429', 'too many requests'], ['Retry-After', 'seconds until the client should retry']], why: 'The parameters and the response.' },
        { t: 'blank', q: 'A token bucket allows short ___ but keeps the average rate steady.', bank: ['bursts', 'outages', 'cache hits', 'sorts'], a: 'bursts', why: 'Saved tokens cover a spike.' },
        { t: 'mc', q: 'Where should bucket state live when there are many servers?', o: ['In a shared store such as Redis', 'Only in each server\'s memory', 'In a cookie the client keeps', 'Nowhere: check once a minute'], a: 0, why: 'A shared store keeps one count for all servers.' },
        { t: 'fill', q: 'The HTTP status code for too many requests is ___.', a: ['429'], why: 'It is part of RFC 6585.' }
      ] }
    ]},

  { name: 'Applied AI', color: 'b', lessons: [

    { id: 'lora', title: 'LoRA fine-tuning',
      sum: 'LoRA freezes the model and trains two small matrices per layer whose product is added to the frozen weights. You train millions of parameters instead of billions, so it fits on one GPU.',
      explain: [
        'Full fine-tuning updates every weight. LoRA freezes the original weight matrix W and learns a low-rank update ΔW = B·A, where A and B are small matrices with a shared small dimension r (the rank, often 8 or 16).',
        'Only A and B train. For a 4096 × 4096 layer, a full update has about 16.8 million values. With rank 8, A and B together have about 65 thousand. The gap is what makes it fit on one GPU.',
        'B starts at zero, so the adapter does nothing at first and training moves away from the base model smoothly. You save only the small adapter and attach it to the base model at inference.'
      ],
      code: 'from peft import LoraConfig, get_peft_model\n\ncfg = LoraConfig(r=8, lora_alpha=16,\n                 target_modules=["q_proj", "v_proj"],\n                 lora_dropout=0.05)\nmodel = get_peft_model(base_model, cfg)\nmodel.print_trainable_parameters()   # a small percentage of the total',
      yt: 'Sam Witteveen Fine-Tuning LLMs with PEFT and LoRA', spec: true,
      extra: ['Hugging Face PEFT docs', 'https://huggingface.co/docs/peft'],
      posts: [
        { t: 'LoRA (Low-Rank Adaptation) reference', by: 'Hugging Face PEFT documentation', url: 'https://huggingface.co/docs/peft/main/en/package_reference/lora', r: 5,
          take: 'Official reference: freezes the base weights, adds trainable low-rank matrices, starts B at zero, and lists the config options such as r and lora_alpha. Versions differ, so check yours.' },
        { t: 'LoRA: Low-Rank Adaptation of LLMs Explained', by: 'DigitalOcean', url: 'https://www.digitalocean.com/community/tutorials/lora-low-rank-adaptation-llms-explained', r: 3,
          take: 'A tutorial that explains the low-rank decomposition in plain terms and how it plugs into PEFT. Good for the intuition; use the official reference for the API.' }
      ],
      ex: [
        { t: 'mc', q: 'LoRA freezes:', o: ['The original model weights', 'The data', 'The GPU', 'The optimizer'], a: 0, why: 'Only the small added matrices are trained.' },
        { t: 'mc', q: 'Why is LoRA cheaper than full fine-tuning?', o: ['It trains far fewer parameters', 'It uses no data', 'It skips the forward pass', 'It runs on CPU only'], a: 0, why: 'Fewer trained parameters means less memory and compute.' },
        { t: 'tf', q: 'In LoRA, the B matrix starts random, so the adapter adds noise at first.', a: false, why: 'B starts at zero, so the adapter starts as a no-op.' },
        { t: 'num', q: 'A layer is 1024 × 1024 and the rank is 4. How many values are in A and B together?', a: 8192, why: 'A is 1024 × 4 and B is 4 × 1024: 2 × 1024 × 4 = 8192.' },
        { t: 'blank', q: 'LoRA learns a ___ update to the frozen weights.', bank: ['low-rank', 'random', 'full-size', 'sparse-zero'], a: 'low-rank', why: 'The product B·A has rank at most r.' },
        { t: 'tapline', q: 'Which line is the bug? The base model should be frozen.', code: 'cfg = LoraConfig(r=8, lora_alpha=16, target_modules=["q_proj"])\nfor p in base_model.parameters():\n    p.requires_grad = True', a: 2, why: 'Set requires_grad = False for the base model so only the adapter trains.' },
        { t: 'order', q: 'Put the LoRA workflow in order.', items: ['Load the frozen base model', 'Attach LoRA adapters to chosen layers', 'Train only the adapter weights on your data', 'Save the small adapter and load it at inference'], why: 'The base never changes on disk.' },
        { t: 'multi', q: 'Why is LoRA popular? Select all that apply.', o: ['It trains far fewer parameters', 'Adapters are small to store', 'The base model is fully updated each step', 'It fits on one GPU more easily'], a: [0, 1, 3], why: 'Updating the full base model is what LoRA avoids.' },
        { t: 'match', q: 'Match each symbol with its meaning.', pairs: [['W (frozen)', 'original pretrained weight'], ['A and B', 'trainable low-rank matrices'], ['rank r', 'size of the bottleneck'], ['lora_alpha', 'scaling for the update']], why: 'The four pieces of the formula.' },
        { t: 'fill', q: 'The rank hyperparameter is usually written as ___.', a: ['r'], why: 'LoraConfig(r=...).' }
      ] },

    { id: 'vllm', title: 'LLM serving (vLLM)',
      sum: 'Batching groups requests into one GPU pass. The KV cache stores attention results per token; vLLM manages it in pages so memory is not wasted. Quantisation stores weights in fewer bits to fit more on the GPU.',
      explain: [
        'LLM serving is limited by memory. The KV cache stores keys and values for every token of every running request, so it grows with sequence length and batch size.',
        'PagedAttention, the core of vLLM, splits the KV cache into fixed-size blocks mapped like virtual-memory pages. Memory is allocated as tokens arrive instead of reserved for the maximum length, so more requests fit on one GPU.',
        'Continuous batching adds new requests and removes finished ones at every decoding step, instead of waiting for a whole batch to finish. Quantisation stores weights in 8 or 4 bits, which shrinks the model so more of it fits.'
      ],
      code: '# Serve a model behind an OpenAI-compatible API\nvllm serve your-model-name --max-model-len 8192\n\n# Client call\ncurl localhost:8000/v1/completions \\\n  -d \'{"model": "your-model-name", "prompt": "Hello", "max_tokens": 32}\'',
      yt: 'vLLM explained PagedAttention continuous batching', spec: false,
      posts: [
        { t: 'vLLM Paged Attention (kernel design docs)', by: 'vLLM documentation', url: 'https://docs.vllm.ai/en/v0.8.4/design/kernel/paged_attention.html', r: 3,
          take: 'The design doc for the paged KV cache: keys and values are split into blocks, and each block holds a fixed number of tokens. Dense and written for kernel developers, so read the explainers first.' },
        { t: 'PagedAttention and vLLM Explained: What Are They?', by: 'rss.boorghani.com (repost)', url: 'https://rss.boorghani.com/?p=269358', r: 2,
          take: 'A plain-language overview of PagedAttention borrowed from virtual memory. It is an aggregator repost, so check the numbers against the original paper.' }
      ],
      note: 'The original paper, "Efficient Memory Management for Large Language Model Serving with PagedAttention" (SOSP 2023), is the primary source. It was not opened in this session.',
      ex: [
        { t: 'mc', q: 'Batching requests helps because:', o: ['The GPU does more work per pass', 'It removes the model', 'It shortens prompts', 'It deletes the cache'], a: 0, why: 'Parallel work uses the GPU better.' },
        { t: 'mc', q: 'Quantisation mainly reduces:', o: ['Memory per weight', 'The number of questions', 'The prompt text', 'Answer quality to zero'], a: 0, why: 'Fewer bits per weight means a smaller model in memory.' },
        { t: 'tf', q: 'A paged KV cache makes each request reserve its maximum length up front.', a: false, why: 'Paging allocates blocks as tokens arrive, which is the point.' },
        { t: 'match', q: 'Match each term with its meaning.', pairs: [['KV cache', 'stored keys and values per token'], ['PagedAttention', 'blocks like virtual-memory pages'], ['continuous batching', 'add and remove requests every step'], ['quantisation', 'fewer bits per weight']], why: 'The four ideas behind fast serving.' },
        { t: 'order', q: 'Put a request\'s life in the server in order.', items: ['Request arrives', 'Scheduler admits it into the running batch', 'Each decode step generates one token per running request', 'When finished, it leaves and its memory blocks are freed'], why: 'Requests join and leave between steps.' },
        { t: 'num', q: 'Weights are 16-bit (2 bytes each). After 4-bit quantisation, how many times smaller are they?', a: 4, why: '16 / 4 = 4.' },
        { t: 'blank', q: 'The memory that grows with each generated token is the ___ cache.', bank: ['KV', 'L1', 'DNS', 'TLS'], a: 'KV', why: 'Keys and values for every token.' },
        { t: 'multi', q: 'What does continuous batching improve? Select all that apply.', o: ['GPU utilisation', 'Throughput with mixed request lengths', 'Model accuracy by default', 'Wait time for queued requests'], a: [0, 1, 3], why: 'It does not change the model\'s answers.' },
        { t: 'tapline', q: 'Which line is static batching, the pattern that waits for the whole batch?', code: 'for step in range(max_tokens):\n    batch = wait_for_all(requests)\n    run_step(batch)', a: 1, why: 'Waiting for every request before starting new work is static batching. Continuous batching avoids it.' },
        { t: 'fill', q: 'vLLM\'s attention memory technique is called ___.', a: ['PagedAttention', 'paged attention'], why: 'It pages the KV cache like virtual memory.' }
      ] }
    ]},

  { name: 'Tooling', color: 'y', lessons: [

    { id: 'docker', title: 'Docker',
      sum: 'A container packages an app with its dependencies so it runs the same everywhere. An image is the template; a container is a running instance. A Dockerfile describes how to build the image.',
      explain: [
        'A container packages an app with its dependencies and runs it as an isolated process. Containers share the host kernel, so they start in seconds and are much lighter than virtual machines, which boot a whole operating system.',
        'An image is a read-only template built in layers from a Dockerfile. docker run starts a container: a running, writable instance of an image. One image can run many containers.',
        'The usual flow: write a Dockerfile, build the image with docker build, run it with docker run and a port mapping, then push the image to a registry so other machines can pull it.'
      ],
      code: 'FROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD ["python", "main.py"]\n\n# docker build -t app:1.0 .\n# docker run -p 8080:8000 app:1.0',
      yt: 'Docker tutorial for beginners images containers', spec: false,
      posts: [
        { t: 'Overview of the get started guide', by: 'Docker documentation', url: 'https://docs.docker.com/learn/', r: 5,
          take: 'Official entry point: build and run an image as a container, then share images. Start here, then return to the reference pages as needed.' },
        { t: 'What Are Docker and Containers? Why Do We Need Them, and How Do You Get Started?', by: 'ExplainThis', url: 'https://www.explainthis.io/en/swe/docker-containers', r: 3,
          take: 'Explains why containers exist before the commands: the "works on my machine" problem and how an image solves it.' },
        { t: 'Getting started with Docker: a practical guide for beginners', by: 'DEV Community', url: 'https://dev.to/cliffordisaboke/getting-started-with-docker-a-practical-guide-for-beginners-3a7m', r: 3,
          take: 'A hands-on walk through building and running a small app. Good for practice after the concepts.' }
      ],
      ex: [
        { t: 'mc', q: 'A Docker image is:', o: ['A template for containers', 'A running server', 'A database', 'A password'], a: 0, why: 'Run one or more containers from it.' },
        { t: 'mc', q: 'A Dockerfile is used to:', o: ['Describe how to build an image', 'Store passwords', 'Run tests in the browser', 'Scale databases'], a: 0, why: 'It is the build recipe.' },
        { t: 'tf', q: 'A container is a full virtual machine with its own kernel.', a: false, why: 'Containers share the host kernel. VMs run their own.' },
        { t: 'order', q: 'Put the Docker workflow in order.', items: ['Write a Dockerfile', 'docker build to create an image', 'docker run to start a container', 'Push the image to a registry'], why: 'Build before run; push to share.' },
        { t: 'blank', q: 'docker ___ starts a container from an image.', bank: ['run', 'build', 'push', 'pull'], a: 'run', why: 'build makes images, run makes containers.' },
        { t: 'tapline', q: 'Which line makes builds less reproducible?', code: 'FROM python:latest\nCOPY . /app\nCMD ["python", "/app/main.py"]', a: 0, why: 'latest changes over time. Pin a version such as python:3.12-slim.' },
        { t: 'match', q: 'Match each term with its meaning.', pairs: [['image', 'read-only template'], ['container', 'running instance'], ['Dockerfile', 'build recipe'], ['registry', 'stores and shares images']], why: 'The four core Docker terms.' },
        { t: 'multi', q: 'Which statements about containers are true? Select all that apply.', o: ['They share the host kernel', 'Each has its own kernel', 'They start in seconds', 'They are isolated from other processes by default'], a: [0, 2, 3], why: 'Each VM has its own kernel; containers do not.' },
        { t: 'fill', q: 'To map host port 8080 to container port 80, use the flag -p 8080:___.', a: ['80'], why: 'The left side is the host port, the right is the container port.' },
        { t: 'num', q: 'Three containers run from one image. How many images exist?', a: 1, why: 'Containers are instances; the image is shared.' }
      ] },

    { id: 'aws', title: 'AWS basics',
      sum: 'EC2 is a virtual server, S3 is object storage for files, IAM controls who can do what, and RDS is a managed relational database.',
      explain: [
        'EC2 provides resizable virtual servers. You pick an instance type (CPU and memory), a machine image (AMI), storage, and a security group, which is a set of firewall rules.',
        'S3 stores files as objects in buckets, each with a key (its name) and metadata, reached over HTTP. It is durable and cheap for static files, backups and data lakes.',
        'IAM defines identities (users and roles) and policies that allow or deny actions on resources. Least privilege means granting only what is needed. Give an EC2 instance an IAM role rather than long-lived access keys. RDS runs managed databases such as PostgreSQL and MySQL; AWS handles patching and backups, while you still design the schema and indexes.'
      ],
      code: '{\n  "Version": "2012-10-17",\n  "Statement": [{\n    "Effect": "Allow",\n    "Action": ["s3:GetObject"],\n    "Resource": "arn:aws:s3:::my-bucket/*"\n  }]\n}',
      yt: 'AWS EC2 S3 IAM RDS beginners explained', spec: false,
      posts: [
        { t: 'Amazon RDS and Aurora Documentation', by: 'AWS documentation', url: 'https://docs.aws.amazon.com/rds/', r: 5,
          take: 'Official entry point with user guides, API and CLI references. The User Guide introduces the DB instance as the basic building block.' },
        { t: 'IAM User Guide', by: 'AWS documentation', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/iam-config.html', r: 5,
          take: 'Official guide to identities, policies and least privilege. Read the policy-language pages before you write your first policy.' },
        { t: 'EC2 User Guide', by: 'AWS (China region mirror of the official guide)', url: 'https://docs.amazonaws.cn/ec2/', r: 4,
          take: 'The EC2 concepts: instances, AMIs, storage and networking, plus how to manage them from the console, CLI and SDKs. Same content as the main site.' },
        { t: 'What is Amazon S3, and how is it used?', by: 'Educative', url: 'https://educative.io/answers/what-is-amazon-s3-and-how-is-it-used', r: 3,
          take: 'A short answer on what S3 stores and how buckets and objects work. Use the AWS S3 User Guide for current details.' }
      ],
      ex: [
        { t: 'mc', q: 'S3 is mainly used for:', o: ['Object and file storage', 'Running servers', 'Access control', 'Relational tables'], a: 0, why: 'Store files and objects.' },
        { t: 'mc', q: 'IAM is for:', o: ['Permissions and identities', 'Storing images', 'Load balancing', 'Compiling code'], a: 0, why: 'Who can do what, on which resources.' },
        { t: 'tf', q: 'RDS requires you to patch the database operating system yourself.', a: false, why: 'RDS is a managed service: AWS handles OS patching.' },
        { t: 'match', q: 'Match each service with its job.', pairs: [['EC2', 'virtual servers'], ['S3', 'object storage'], ['IAM', 'identities and permissions'], ['RDS', 'managed relational databases']], why: 'The four services in this lesson.' },
        { t: 'mc', q: 'Best practice for an app on EC2 that reads from S3?', o: ['Put long-lived access keys in the code', 'Attach an IAM role to the instance', 'Make the bucket public', 'Share the root account'], a: 1, why: 'Roles give temporary credentials without keys in code.' },
        { t: 'tapline', q: 'Which line grants access to every resource?', code: '"Effect": "Allow",\n"Action": "s3:*",\n"Resource": "*"', a: 2, why: 'Resource "*" applies the permission to all resources. Scope it to a bucket ARN.' },
        { t: 'order', q: 'Put the access setup in order.', items: ['Create an IAM user or role', 'Attach a policy with least privilege', 'Use it from EC2 or your app', 'Review access regularly'], why: 'Grant the smallest set, then review it.' },
        { t: 'blank', q: 'EC2 security groups act as virtual ___.', bank: ['firewalls', 'databases', 'disks', 'DNS servers'], a: 'firewalls', why: 'They filter traffic to instances.' },
        { t: 'multi', q: 'Which does AWS manage for RDS? Select all that apply.', o: ['OS patching', 'Automated backups', 'Writing your SQL schema', 'Failover options such as Multi-AZ'], a: [0, 1, 3], why: 'The schema is yours to design.' },
        { t: 'num', q: 'S3 quotes durability of 99.999999999%. How many nines is that?', a: 11, why: 'Eleven nines.' }
      ] },

    { id: 'playwright', title: 'Playwright',
      sum: 'Playwright drives a real browser from code: it clicks, types and asserts. It waits for elements automatically, which reduces flaky tests.',
      explain: [
        'Playwright controls Chromium, Firefox and WebKit from code. You find elements with locators and act on them with click, fill and similar methods, then check results with expect assertions.',
        'Auto-waiting: before acting, Playwright checks that the element is attached, visible, stable, enabled and able to receive the event. These actionability checks replace most sleep() calls.',
        'Flaky tests usually come from brittle selectors, fixed timeouts, shared state between tests, and force: true, which skips the checks. Prefer role or test-id locators and web-first assertions that retry until they pass.'
      ],
      code: 'import { test, expect } from "@playwright/test";\n\ntest("adds item to cart", async ({ page }) => {\n  await page.goto("https://example.com/shop");\n  await page.getByRole("button", { name: "Add to cart" }).click();  // auto-waits\n  await expect(page.getByTestId("cart-count")).toHaveText("1");    // retries until true\n});',
      yt: 'Playwright tutorial for beginners', spec: false,
      posts: [
        { t: 'Actionability', by: 'Playwright documentation', url: 'https://playwright.dev/docs/actionability', r: 5,
          take: 'Official explanation of the checks Playwright runs before each action, per action type. It also notes that force skips non-essential checks and can make tests unreliable.' },
        { t: 'How to Avoid Flaky Tests in Playwright', by: 'Better Stack', url: 'https://betterstack.com/community/guides/testing/avoid-flaky-playwright-tests/', r: 4,
          take: 'Practical causes of flakiness and fixes: stable locators, no fixed waits, and isolated tests. Clear checklist style.' },
        { t: 'How to Avoid Flaky Tests in Playwright', by: 'Semaphore', url: 'https://semaphore.io/?p=23130', r: 3,
          take: 'Covers the same ground from a CI perspective, including test order and retries. Useful once you run tests in a pipeline.' }
      ],
      ex: [
        { t: 'mc', q: 'Playwright is used for:', o: ['End-to-end browser tests', 'Writing CSS', 'Database backups', 'DNS'], a: 0, why: 'It runs real browsers in tests.' },
        { t: 'mc', q: 'Why are Playwright tests less flaky?', o: ['It waits for elements automatically', 'It skips assertions', 'It runs without a browser', 'It retries forever'], a: 0, why: 'Auto-waiting avoids timing guesses.' },
        { t: 'tf', q: 'Playwright waits a fixed time before every click.', a: false, why: 'It checks actionability, not a fixed delay.' },
        { t: 'order', q: 'Put a Playwright action in order.', items: ['Locate the element', 'Wait until it is visible, stable and enabled', 'Perform the action', 'Assert the expected result, retrying'], why: 'The checks happen before the action.' },
        { t: 'blank', q: 'Prefer ___ locators such as getByRole to brittle CSS selectors.', bank: ['role', 'random', 'index', 'pixel'], a: 'role', why: 'Roles follow what users see.' },
        { t: 'tapline', q: 'Which line is a fixed sleep that makes tests slow and flaky?', code: 'await page.goto("/cart");\nawait page.waitForTimeout(5000);\nawait page.getByRole("button").click();', a: 1, why: 'Fixed waits guess at timing. Let auto-waiting and web-first assertions handle it.' },
        { t: 'match', q: 'Match each term with its meaning.', pairs: [['locator', 'how to find an element, evaluated lazily'], ['actionability', 'checks before acting'], ['expect', 'an assertion that retries'], ['force: true', 'skips actionability checks']], why: 'The core Playwright vocabulary.' },
        { t: 'multi', q: 'Which reduce flakiness? Select all that apply.', o: ['Role or test-id locators', 'Waiting fixed seconds before each step', 'Web-first assertions that retry', 'Isolated tests so state does not leak'], a: [0, 2, 3], why: 'Fixed waits are a common cause of flakiness.' },
        { t: 'fill', q: 'The click option that skips actionability checks is called ___.', a: ['force'], why: 'Use it rarely; it hides real problems.' },
        { t: 'tf', q: 'A test that passes once is reliable.', a: false, why: 'Reliable means it passes every time. Run it repeatedly to check.' }
      ] }
    ]}
];
