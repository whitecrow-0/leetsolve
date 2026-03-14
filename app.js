// ═══════════════════════════════════════════════════
// CONFIG — Worker URL (set after deploying worker.js)
// ═══════════════════════════════════════════════════
const WORKER_URL = '__WORKER_URL__';

// ═══════════════════════════════════════════════════
// SYSTEM PROMPT
// ═══════════════════════════════════════════════════
const SYSTEM_PROMPT = `You are LeetSolve — a LeetCode tutor for absolute beginners. Your #1 priority is giving the SIMPLEST, MOST READABLE solution possible. Not the cleverest. Not the most Pythonic. The easiest one a beginner can read and understand.

════════════════════════════════════
CRITICAL RULES — NEVER BREAK THESE
════════════════════════════════════

1. When the user mentions ANY problem — by number, name, or description (e.g. "problem 1", "two sum", "help me with arrays", "easy problem") — ALWAYS give the FULL SOLUTION FORMAT. Never ask for clarification. Never give a partial answer. Just solve it completely.

2. When user says "problem 1" or any number — that means LeetCode problem #1 (Two Sum). Know all 2000+ LeetCode problems by number and name.

3. ALWAYS include the actual problem statement at the top — copy it word for word including the example inputs/outputs and constraints. The user may not have it in front of them.

4. NEVER assume the user knows anything. Explain every concept from scratch.

5. Casual messages (hi, thanks, etc.) → 1 warm sentence, ask what problem they want help with. No code, no tags.

6. Code review → find bugs, explain simply, show the fix.

════════════════════════════════════
FULL SOLUTION FORMAT — USE THIS FOR EVERY PROBLEM
════════════════════════════════════

### Problem Statement
Paste the FULL official problem statement here including:
- The description
- All example inputs and outputs (Example 1, Example 2, etc.)
- Constraints
This is important — the user needs to see the full problem.

### What is this actually asking?
Translate the problem into the simplest possible English. Pretend you are explaining it to someone who has never coded before. Use a real-world analogy if possible.
Example: "Imagine you have a shopping list with prices. You need to find two items that together cost exactly your budget."

### The key insight (the "aha" moment)
What is the ONE thing you need to realize to solve this efficiently?
Explain it like you are telling a friend over coffee. No jargon. Use actual values from the examples.

### Step-by-step plan (NO code yet)
Write out EXACTLY what the code will do, in plain English steps using real values:
1. Step one with actual numbers...
2. Step two...
A beginner should be able to write the code themselves just from reading this.

### Simple solution (easiest to understand)
\`\`\`python
# THE SIMPLEST VERSION — easy to read, easy to understand
# Comment EVERY single line — what it does AND why
# Use long, descriptive variable names (not i, j, x — use index, pointer, current_num)
\`\`\`

### Complete dry run
Use Example 1. Show EVERY step. Show EVERY variable value at EVERY step.
Format like:
nums = [2, 7, 11, 15], target = 9

--- Iteration 1 (index=0) ---
current_num = 2
need = 9 - 2 = 7
Is 7 in seen? NO
seen = {2: 0}

--- Iteration 2 (index=1) ---
current_num = 7
need = 9 - 7 = 2
Is 2 in seen? YES at index 0
Return [0, 1] ✓

### Concepts explained from scratch
For EVERY data structure or concept used, explain it like the reader has never heard of it.
Use real-world analogies and actual values.

### Brute force vs optimal
Show both approaches with code. Explain WHY the optimal is better with concrete numbers.

### Time and Space
Time: O(...) in plain words
Space: O(...) in plain words

TIME_COMPLEXITY: O(...)
SPACE_COMPLEXITY: O(...)

### Pattern to remember
Pattern name, when to use it, one-liner to remember it.

Rules:
✓ Always use REAL values from examples
✓ Show arrays like [2, 7, 11, 15] with actual numbers
✓ Every dry run shows exact variable values
✓ Complete every section
✓ Descriptive variable names in all code
✓ End with encouragement
✗ Never say "simply", "just", "obviously"
✗ Never skip sections or truncate`;

// ═══════════════════════════════════════════════════
// DEFAULT CODE
// ═══════════════════════════════════════════════════
const DEFAULT_CODE = `# Write your Python code here
# Press Run or Ctrl+Enter to execute

def greet(name):
    return f"Hello, {name}!"

print(greet("LeetSolve"))
`;

// ═══════════════════════════════════════════════════
// PROBLEM DATABASE — fetched live from LeetCode, fallback hardcoded
// ═══════════════════════════════════════════════════
const PROBLEMS_FALLBACK = [
  {id:1,name:'Two Sum',diff:'Easy'},{id:2,name:'Add Two Numbers',diff:'Medium'},
  {id:3,name:'Longest Substring Without Repeating Characters',diff:'Medium'},
  {id:4,name:'Median of Two Sorted Arrays',diff:'Hard'},{id:5,name:'Longest Palindromic Substring',diff:'Medium'},
  {id:11,name:'Container With Most Water',diff:'Medium'},{id:15,name:'3Sum',diff:'Medium'},
  {id:20,name:'Valid Parentheses',diff:'Easy'},{id:21,name:'Merge Two Sorted Lists',diff:'Easy'},
  {id:22,name:'Generate Parentheses',diff:'Medium'},{id:23,name:'Merge k Sorted Lists',diff:'Hard'},
  {id:26,name:'Remove Duplicates from Sorted Array',diff:'Easy'},{id:33,name:'Search in Rotated Sorted Array',diff:'Medium'},
  {id:46,name:'Permutations',diff:'Medium'},{id:48,name:'Rotate Image',diff:'Medium'},
  {id:49,name:'Group Anagrams',diff:'Medium'},{id:53,name:'Maximum Subarray',diff:'Medium'},
  {id:56,name:'Merge Intervals',diff:'Medium'},{id:62,name:'Unique Paths',diff:'Medium'},
  {id:70,name:'Climbing Stairs',diff:'Easy'},{id:72,name:'Edit Distance',diff:'Medium'},
  {id:76,name:'Minimum Window Substring',diff:'Hard'},{id:78,name:'Subsets',diff:'Medium'},
  {id:79,name:'Word Search',diff:'Medium'},{id:84,name:'Largest Rectangle in Histogram',diff:'Hard'},
  {id:94,name:'Binary Tree Inorder Traversal',diff:'Easy'},{id:98,name:'Validate Binary Search Tree',diff:'Medium'},
  {id:100,name:'Same Tree',diff:'Easy'},{id:102,name:'Binary Tree Level Order Traversal',diff:'Medium'},
  {id:104,name:'Maximum Depth of Binary Tree',diff:'Easy'},{id:105,name:'Construct Binary Tree from Preorder and Inorder Traversal',diff:'Medium'},
  {id:121,name:'Best Time to Buy and Sell Stock',diff:'Easy'},{id:124,name:'Binary Tree Maximum Path Sum',diff:'Hard'},
  {id:128,name:'Longest Consecutive Sequence',diff:'Medium'},{id:136,name:'Single Number',diff:'Easy'},
  {id:139,name:'Word Break',diff:'Medium'},{id:141,name:'Linked List Cycle',diff:'Easy'},
  {id:143,name:'Reorder List',diff:'Medium'},{id:152,name:'Maximum Product Subarray',diff:'Medium'},
  {id:153,name:'Find Minimum in Rotated Sorted Array',diff:'Medium'},{id:160,name:'Intersection of Two Linked Lists',diff:'Easy'},
  {id:167,name:'Two Sum II',diff:'Medium'},{id:190,name:'Reverse Bits',diff:'Easy'},
  {id:191,name:'Number of 1 Bits',diff:'Easy'},{id:198,name:'House Robber',diff:'Medium'},
  {id:200,name:'Number of Islands',diff:'Medium'},{id:206,name:'Reverse Linked List',diff:'Easy'},
  {id:207,name:'Course Schedule',diff:'Medium'},{id:208,name:'Implement Trie',diff:'Medium'},
  {id:210,name:'Course Schedule II',diff:'Medium'},{id:212,name:'Word Search II',diff:'Hard'},
  {id:213,name:'House Robber II',diff:'Medium'},{id:217,name:'Contains Duplicate',diff:'Easy'},
  {id:226,name:'Invert Binary Tree',diff:'Easy'},{id:230,name:'Kth Smallest Element in a BST',diff:'Medium'},
  {id:235,name:'Lowest Common Ancestor of BST',diff:'Medium'},{id:238,name:'Product of Array Except Self',diff:'Medium'},
  {id:242,name:'Valid Anagram',diff:'Easy'},{id:252,name:'Meeting Rooms',diff:'Easy'},
  {id:261,name:'Graph Valid Tree',diff:'Medium'},{id:268,name:'Missing Number',diff:'Easy'},
  {id:269,name:'Alien Dictionary',diff:'Hard'},{id:271,name:'Encode and Decode Strings',diff:'Medium'},
  {id:278,name:'First Bad Version',diff:'Easy'},{id:297,name:'Serialize and Deserialize Binary Tree',diff:'Hard'},
  {id:300,name:'Longest Increasing Subsequence',diff:'Medium'},{id:322,name:'Coin Change',diff:'Medium'},
  {id:323,name:'Number of Connected Components in Undirected Graph',diff:'Medium'},
  {id:338,name:'Counting Bits',diff:'Easy'},{id:347,name:'Top K Frequent Elements',diff:'Medium'},
  {id:371,name:'Sum of Two Integers',diff:'Medium'},{id:374,name:'Guess Number Higher or Lower',diff:'Easy'},
  {id:377,name:'Combination Sum IV',diff:'Medium'},{id:380,name:'Insert Delete GetRandom O(1)',diff:'Medium'},
  {id:384,name:'Shuffle an Array',diff:'Medium'},{id:387,name:'First Unique Character in a String',diff:'Easy'},
  {id:392,name:'Is Subsequence',diff:'Easy'},{id:394,name:'Decode String',diff:'Medium'},
  {id:412,name:'Fizz Buzz',diff:'Easy'},{id:416,name:'Partition Equal Subset Sum',diff:'Medium'},
  {id:424,name:'Longest Repeating Character Replacement',diff:'Medium'},
  {id:435,name:'Non-overlapping Intervals',diff:'Medium'},{id:437,name:'Path Sum III',diff:'Medium'},
  {id:438,name:'Find All Anagrams in a String',diff:'Medium'},{id:448,name:'Find All Numbers Disappeared in an Array',diff:'Easy'},
  {id:485,name:'Max Consecutive Ones',diff:'Easy'},{id:494,name:'Target Sum',diff:'Medium'},
  {id:496,name:'Next Greater Element I',diff:'Easy'},{id:543,name:'Diameter of Binary Tree',diff:'Easy'},
  {id:567,name:'Permutation in String',diff:'Medium'},{id:572,name:'Subtree of Another Tree',diff:'Easy'},
  {id:647,name:'Palindromic Substrings',diff:'Medium'},{id:678,name:'Valid Parenthesis String',diff:'Medium'},
  {id:695,name:'Max Area of Island',diff:'Medium'},{id:703,name:'Kth Largest Element in a Stream',diff:'Easy'},
  {id:704,name:'Binary Search',diff:'Easy'},{id:739,name:'Daily Temperatures',diff:'Medium'},
  {id:746,name:'Min Cost Climbing Stairs',diff:'Easy'},{id:763,name:'Partition Labels',diff:'Medium'},
  {id:784,name:'Letter Case Permutation',diff:'Medium'},{id:853,name:'Car Fleet',diff:'Medium'},
  {id:875,name:'Koko Eating Bananas',diff:'Medium'},{id:973,name:'K Closest Points to Origin',diff:'Medium'},
  {id:981,name:'Time Based Key-Value Store',diff:'Medium'},{id:994,name:'Rotting Oranges',diff:'Medium'},
  {id:1046,name:'Last Stone Weight',diff:'Easy'},{id:1143,name:'Longest Common Subsequence',diff:'Medium'},
  {id:1448,name:'Count Good Nodes in Binary Tree',diff:'Medium'},{id:1851,name:'Minimum Interval to Include Each Query',diff:'Hard'},
];

let PROBLEMS = [...PROBLEMS_FALLBACK];
let problemsLoaded = false;

const PROBLEMS_CACHE_KEY = 'ls-problems-cache';
const PROBLEMS_CACHE_TS  = 'ls-problems-ts';
const PROBLEMS_CACHE_TTL = 24 * 60 * 60 * 1000;

async function fetchAllProblems() {
  // Check localStorage cache (24h TTL)
  try {
    const ts = parseInt(localStorage.getItem(PROBLEMS_CACHE_TS) || '0');
    if (Date.now() - ts < PROBLEMS_CACHE_TTL) {
      const cached = JSON.parse(localStorage.getItem(PROBLEMS_CACHE_KEY) || 'null');
      if (cached && cached.length > 100) {
        PROBLEMS = cached;
        problemsLoaded = true;
        return;
      }
    }
  } catch(_) {}

  // Fetch all problems via LeetCode's public GraphQL API (no auth needed, no CORS issues via worker)
  try {
    const res = await fetch(WORKER_URL + '/problems');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    if (Array.isArray(data) && data.length > 100) {
      PROBLEMS = data;
      problemsLoaded = true;
      try {
        localStorage.setItem(PROBLEMS_CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(PROBLEMS_CACHE_TS, String(Date.now()));
      } catch(_) {}
      return;
    }
  } catch(_) {}

  // Direct LeetCode GraphQL — works if no CORS block
  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{
          allQuestionsCount { difficulty count }
          problemsetQuestionList(categorySlug: "" filters: {} limit: 3500 skip: 0) {
            questions {
              frontendQuestionId
              title
              difficulty
              isPaidOnly
            }
          }
        }`
      })
    });
    if (!res.ok) throw new Error('GraphQL HTTP ' + res.status);
    const json = await res.json();
    const qs = json?.data?.problemsetQuestionList?.questions || [];
    const parsed = qs
      .filter(q => !q.isPaidOnly)
      .map(q => ({
        id:   parseInt(q.frontendQuestionId),
        name: q.title,
        diff: q.difficulty === 'Easy' ? 'Easy' : q.difficulty === 'Hard' ? 'Hard' : 'Medium'
      }))
      .filter(q => q.id)
      .sort((a, b) => a.id - b.id);
    if (parsed.length > 100) {
      PROBLEMS = parsed;
      problemsLoaded = true;
      try {
        localStorage.setItem(PROBLEMS_CACHE_KEY, JSON.stringify(parsed));
        localStorage.setItem(PROBLEMS_CACHE_TS, String(Date.now()));
      } catch(_) {}
      return;
    }
  } catch(_) {}

  // Worker raw proxy fallback
  try {
    const res = await fetch(WORKER_URL + '/problems-raw');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const raw = await res.json();
    const diffMap = {1:'Easy',2:'Medium',3:'Hard'};
    const parsed = (raw.stat_status_pairs || [])
      .filter(p => !p.paid_only)
      .map(p => ({
        id:   p.stat.frontend_question_id,
        name: p.stat.question__title,
        diff: diffMap[p.difficulty.level] || 'Medium'
      }))
      .sort((a, b) => a.id - b.id);
    if (parsed.length > 100) {
      PROBLEMS = parsed;
      problemsLoaded = true;
      try {
        localStorage.setItem(PROBLEMS_CACHE_KEY, JSON.stringify(parsed));
        localStorage.setItem(PROBLEMS_CACHE_TS, String(Date.now()));
      } catch(_) {}
      return;
    }
  } catch(_) {}

  // All failed — stay on fallback list
  problemsLoaded = true;
}

// ═══════════════════════════════════════════════════
// SETTINGS — persisted to localStorage
// ═══════════════════════════════════════════════════
const DEFAULT_SETTINGS = { autoLoad:true, autoRun:false, showTyping:true, smartScroll:true };
let settings = { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem('ls-settings') || '{}') };

function saveSetting(key, value) {
  settings[key] = value;
  localStorage.setItem('ls-settings', JSON.stringify(settings));
}

function loadSettingsUI() {
  document.getElementById('settingAutoLoad').checked  = settings.autoLoad;
  document.getElementById('settingAutoRun').checked   = settings.autoRun;
  document.getElementById('settingTyping').checked    = settings.showTyping;
  document.getElementById('settingSmartScroll').checked = settings.smartScroll;
  const lineN = localStorage.getItem('ls-lineNumbers');
  if (lineN !== null) document.getElementById('toggleLineNumbers').checked = lineN === 'true';
  const lineW = localStorage.getItem('ls-lineWrap');
  if (lineW !== null) document.getElementById('toggleLineWrap').checked = lineW === 'true';
  updateThemeButtons();
  document.getElementById('fontSizeDisplay').textContent = fontSize + 'px';
}

function updateThemeButtons() {
  ['Dark','Light','High'].forEach(t => {
    const btn = document.getElementById('sbtn' + t);
    if (btn) btn.classList.toggle('active-theme', currentTheme === 'theme-' + t.toLowerCase().replace('hi-c','high'));
  });
  document.getElementById('sbtnDark')?.classList.toggle('active-theme', currentTheme === 'theme-dark');
  document.getElementById('sbtnLight')?.classList.toggle('active-theme', currentTheme === 'theme-light');
  document.getElementById('sbtnHigh')?.classList.toggle('active-theme', currentTheme === 'theme-high');
}

// ═══════════════════════════════════════════════════
// SNIPPETS
// ═══════════════════════════════════════════════════
const SNIPPETS = [
  { name:'Linked List Node', desc:'ListNode class + helpers',
    code:`class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def make_list(arr):
    dummy = ListNode(0)
    cur = dummy
    for v in arr:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next

def to_list(node):
    res = []
    while node:
        res.append(node.val)
        node = node.next
    return res

head = make_list([1, 2, 3, 4, 5])
print(to_list(head))`},
  { name:'Binary Tree Node', desc:'TreeNode + BFS/DFS',
    code:`from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def make_tree(arr):
    if not arr: return None
    root = TreeNode(arr[0])
    q = deque([root])
    i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root

def inorder(root):
    return inorder(root.left) + [root.val] + inorder(root.right) if root else []

root = make_tree([1, 2, 3, 4, 5])
print(inorder(root))`},
  { name:'Binary Search', desc:'Classic template',
    code:`def binary_search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

print(binary_search([1,3,5,7,9,11], 7))  # 3`},
  { name:'Sliding Window', desc:'Variable-size window',
    code:`def sliding_window(nums, k):
    left = 0
    curr_sum = 0
    best = 0
    for right in range(len(nums)):
        curr_sum += nums[right]
        while curr_sum > k:
            curr_sum -= nums[left]
            left += 1
        best = max(best, right - left + 1)
    return best

print(sliding_window([3,1,2,7,4,2,1], 8))  # 4`},
  { name:'DFS on Grid', desc:'4-directional DFS',
    code:`def num_islands(grid):
    if not grid: return 0
    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '#'
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            dfs(r+dr, c+dc)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                dfs(r,c); count += 1
    return count

grid=[['1','1','0'],['1','1','0'],['0','0','1']]
print(num_islands(grid))  # 2`},
  { name:'Dynamic Programming', desc:'1D DP (Climbing Stairs)',
    code:`def climb_stairs(n):
    if n <= 2: return n
    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

for i in range(1, 8):
    print(f"n={i}: {climb_stairs(i)} ways")`},
  { name:'Two Pointers', desc:'Left/right pattern',
    code:`def two_sum_sorted(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        s = nums[lo] + nums[hi]
        if s == target: return [lo+1, hi+1]
        elif s < target: lo += 1
        else: hi -= 1
    return []

print(two_sum_sorted([2,7,11,15], 9))  # [1,2]`},
  { name:'BFS Shortest Path', desc:'Level-order BFS',
    code:`from collections import deque

def bfs(graph, start, end):
    queue = deque([(start, [start])])
    visited = {start}
    while queue:
        node, path = queue.popleft()
        if node == end: return path
        for nei in graph[node]:
            if nei not in visited:
                visited.add(nei)
                queue.append((nei, path+[nei]))
    return []

graph = {0:[1,2],1:[0,3],2:[0,3],3:[1,2,4],4:[3]}
print(bfs(graph, 0, 4))`},
  { name:'Heap / Priority Queue', desc:'Min/max heap + Dijkstra',
    code:`import heapq

def k_smallest(nums, k):
    return heapq.nsmallest(k, nums)

def k_largest(nums, k):
    return heapq.nlargest(k, nums)

print(k_smallest([3,1,4,1,5,9,2,6], 3))  # [1,1,2]
print(k_largest([3,1,4,1,5,9,2,6], 3))   # [9,6,5]`},
  { name:'Union Find', desc:'Disjoint set + path compression',
    code:`class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py: return False
        if self.rank[px] < self.rank[py]: px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]: self.rank[px] += 1
        return True

uf = UnionFind(5)
uf.union(0,1); uf.union(2,3)
print(uf.find(0)==uf.find(1))  # True`},
  { name:'Backtracking', desc:'Permutations / combinations',
    code:`def permutations(nums):
    result = []
    def backtrack(path, remaining):
        if not remaining:
            result.append(path[:]); return
        for i in range(len(remaining)):
            path.append(remaining[i])
            backtrack(path, remaining[:i]+remaining[i+1:])
            path.pop()
    backtrack([], nums)
    return result

print(permutations([1,2,3]))`},
  { name:'Trie', desc:'Prefix tree',
    code:`class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self): self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word: node = node.children.setdefault(ch, TrieNode())
        node.is_end = True

    def search(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children: return False
            node = node.children[ch]
        return node.is_end

t = Trie()
t.insert("apple")
print(t.search("apple"))  # True
print(t.search("app"))    # False`},
];

// ═══════════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════════
const THEMES = ['theme-dark','theme-light','theme-high'];
let currentTheme = localStorage.getItem('ls-theme') || 'theme-dark';

function applyTheme(t) {
  document.body.className = t;
  currentTheme = t;
  localStorage.setItem('ls-theme', t);
  updateThemeButtons();
  if (editor)  editor.refresh();
  if (editor2) editor2.refresh();
}

// ═══════════════════════════════════════════════════
// FONT SIZE / ZOOM
// ═══════════════════════════════════════════════════
let fontSize = parseInt(localStorage.getItem('ls-fontsize') || '13');

function applyFontSize() {
  document.querySelectorAll('.CodeMirror').forEach(el => { el.style.fontSize = fontSize + 'px'; });
  const chatMsgs = document.getElementById('chatMsgs');
  if (chatMsgs) chatMsgs.style.fontSize = fontSize + 'px';
  const outText = document.getElementById('outText');
  if (outText) outText.style.fontSize = Math.max(10, fontSize - 1) + 'px';
  if (editor)  editor.refresh();
  if (editor2) editor2.refresh();
  localStorage.setItem('ls-fontsize', fontSize);
  const display = document.getElementById('fontSizeDisplay');
  if (display) display.textContent = fontSize + 'px';
}

function changeFontSize(delta) {
  fontSize = Math.max(10, Math.min(22, fontSize + delta));
  applyFontSize();
  showToast(`Font size: ${fontSize}px`);
}

// ═══════════════════════════════════════════════════
// EDITOR OPTIONS
// ═══════════════════════════════════════════════════
function setEditorOption(key, value) {
  if (editor) editor.setOption(key, value);
  if (editor2) editor2.setOption(key, value);
  localStorage.setItem('ls-' + key, value);
}

// ═══════════════════════════════════════════════════
// MODALS
// ═══════════════════════════════════════════════════
function openModal(id) {
  document.getElementById(id).classList.add('open');
  if (id === 'snippetsModal') renderSnippets();
  if (id === 'searchModal') { initSearch(); setTimeout(() => document.getElementById('problemSearch')?.focus(), 50); }
  if (id === 'settingsModal') loadSettingsUI();
}
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open')); }
  if (e.key === '?' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'INPUT') openModal('shortcutsModal');
  if (e.key === '/' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'INPUT') { e.preventDefault(); document.getElementById('chatIn')?.focus(); }
  if (e.key === 'k' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); openModal('searchModal'); }
  if (e.key === 't' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); newTab(); }
  if (e.key === 'w' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); closeTab(null, activeId); }
  if (e.key === 's' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); downloadPy(); }
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
});

// ═══════════════════════════════════════════════════
// PROBLEM SEARCH
// ═══════════════════════════════════════════════════
let searchDiffFilter = 'All';
let searchSelectedIdx = -1;

// Virtual list state
let _vlList = [];
let _vlItemH = 38;
let _vlPad = 6;
let _vlScrollHandler = null; // single persistent handler, replaced on each render

function initSearch() {
  const input = document.getElementById('problemSearch');
  input.value = '';
  searchDiffFilter = 'All';
  document.querySelectorAll('.diff-filter-btn').forEach(b => b.classList.toggle('active', b.dataset.diff === 'All'));
  searchSelectedIdx = -1;

  if (!problemsLoaded) {
    const container = document.getElementById('problemList');
    const count = document.getElementById('searchResultCount');
    if (count) count.textContent = 'loading…';
    container.innerHTML = '<div class="problems-loading"><div class="problems-spinner"></div><span>Fetching all LeetCode problems…</span></div>';
    fetchAllProblems().then(() => renderVirtualList(PROBLEMS));
  } else {
    renderVirtualList(PROBLEMS);
  }
}

function renderVirtualList(list) {
  _vlList = list;
  const container = document.getElementById('problemList');
  const count = document.getElementById('searchResultCount');
  if (count) count.textContent = `${list.length} problem${list.length !== 1 ? 's' : ''}`;

  // Remove old scroll listener before rebuilding
  if (_vlScrollHandler) {
    container.removeEventListener('scroll', _vlScrollHandler);
    _vlScrollHandler = null;
  }
  container.innerHTML = '';
  container.scrollTop = 0;

  if (!list.length) {
    container.innerHTML = '<div style="padding:16px 12px;font-size:12px;color:var(--t3)">No problems found</div>';
    return;
  }

  // Total height spacer — no contain:strict so items aren't clipped
  const totalH = list.length * _vlItemH;
  const scroller = document.createElement('div');
  scroller.style.cssText = `position:relative;height:${totalH}px`;
  container.appendChild(scroller);

  function paintWindow() {
    const scrollTop = container.scrollTop;
    const viewH    = container.clientHeight || 380;
    const start    = Math.max(0, Math.floor(scrollTop / _vlItemH) - _vlPad);
    const end      = Math.min(list.length - 1, Math.ceil((scrollTop + viewH) / _vlItemH) + _vlPad);

    // Remove items outside window
    scroller.querySelectorAll('.problem-item').forEach(el => {
      const i = parseInt(el.dataset.vlidx);
      if (i < start || i > end) el.remove();
    });

    // Add items inside window that aren't rendered yet
    const rendered = new Set([...scroller.querySelectorAll('.problem-item')].map(el => parseInt(el.dataset.vlidx)));
    for (let i = start; i <= end; i++) {
      if (rendered.has(i)) continue;
      const p = list[i];
      const item = document.createElement('div');
      item.className = 'problem-item';
      item.dataset.vlidx = i;
      item.style.cssText = `position:absolute;top:${i * _vlItemH}px;left:0;right:0;height:${_vlItemH}px;display:flex;align-items:center`;
      item.innerHTML = `<span class="prob-num">#${p.id}</span><span class="prob-name">${esc(p.name)}</span><span class="prob-diff ${p.diff}">${p.diff}</span>`;
      item.onclick = () => selectProblem(p);
      scroller.appendChild(item);
    }
  }

  // Store handler ref so we can remove it next time
  _vlScrollHandler = paintWindow;
  container.addEventListener('scroll', _vlScrollHandler, { passive: true });
  // Paint immediately
  paintWindow();
}

function setDiffFilter(diff) {
  searchDiffFilter = diff;
  document.querySelectorAll('.diff-filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.diff === diff);
  });
  filterProblems(document.getElementById('problemSearch')?.value || '');
}

function filterProblems(query) {
  searchSelectedIdx = -1;
  const q = query.toLowerCase().trim();
  let filtered = PROBLEMS;
  if (searchDiffFilter !== 'All') filtered = filtered.filter(p => p.diff === searchDiffFilter);
  if (q) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) || String(p.id).includes(q)
    );
  }
  renderProblems(filtered);
}

function renderProblems(list) {
  renderVirtualList(list);
}

function selectProblem(p) {
  closeModal('searchModal');
  const msg = `Solve LeetCode ${p.id} ${p.name}`;
  sendMsg(msg);
}

function handleSearchKey(e) {
  const items = document.querySelectorAll('#problemList .problem-item');
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    searchSelectedIdx = Math.min(searchSelectedIdx + 1, items.length - 1);
    items.forEach((item, i) => item.classList.toggle('selected', i === searchSelectedIdx));
    items[searchSelectedIdx]?.scrollIntoView({ block: 'nearest' });
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    searchSelectedIdx = Math.max(searchSelectedIdx - 1, 0);
    items.forEach((item, i) => item.classList.toggle('selected', i === searchSelectedIdx));
    items[searchSelectedIdx]?.scrollIntoView({ block: 'nearest' });
  } else if (e.key === 'Enter') {
    if (searchSelectedIdx >= 0 && items[searchSelectedIdx]) {
      items[searchSelectedIdx].click();
    } else {
      // Search by what was typed
      const q = e.target.value.trim();
      if (q) { closeModal('searchModal'); sendMsg(`Solve LeetCode problem: ${q}`); }
    }
  }
}

// ═══════════════════════════════════════════════════
// HINT MODE
// ═══════════════════════════════════════════════════
function requestHint(level) {
  closeModal('hintModal');
  const tab = curTab();
  const problemName = tab?.name?.startsWith('Tab ') ? 'the current problem' : (tab?.name || 'the current problem');
  const hintMessages = {
    1: `Give me just a small nudge for ${problemName}. Don't tell me the approach or any code — just point me in a general direction. One sentence max.`,
    2: `Give me the key insight for ${problemName}. Tell me the "aha moment" in plain English. No code, no steps — just the core idea I'm missing.`,
    3: `Give me a step-by-step plan for ${problemName} in plain English. No code yet. Just tell me what to do at each step so I can write the code myself.`,
    4: `Give me pseudocode for ${problemName}. Write the logic almost like code but in plain English. I want to translate it myself.`,
    5: `Give me the complete solution for ${problemName} with full explanation — I give up trying on my own. Use the full solution format.`
  };
  sendMsg(hintMessages[level]);
}

// ═══════════════════════════════════════════════════
// SNIPPETS
// ═══════════════════════════════════════════════════
function renderSnippets() {
  const grid = document.getElementById('snippetsGrid');
  grid.innerHTML = '';
  SNIPPETS.forEach(s => {
    const card = document.createElement('div');
    card.className = 'snippet-card';
    card.innerHTML = `<div class="snippet-name">${s.name}</div><div class="snippet-desc">${s.desc}</div><div class="snippet-preview">${esc(s.code.split('\n')[0])}</div>`;
    card.onclick = () => {
      const target = splitActive && editor2 ? editor2 : editor;
      target.setValue(s.code);
      closeModal('snippetsModal');
      showToast(`Loaded: ${s.name}`);
    };
    grid.appendChild(card);
  });
}

// ═══════════════════════════════════════════════════
// PACKAGES
// ═══════════════════════════════════════════════════
const BUILTIN_PACKAGES = new Set(['numpy','pandas','scipy','matplotlib','scikit-learn','sklearn','pillow','cryptography','pydantic','regex','lxml','beautifulsoup4']);
const UNSUPPORTED_PACKAGES = new Set(['sleep','requests','flask','django','fastapi','sqlalchemy','psycopg2','pygame','tkinter','cv2','opencv-python','torch','tensorflow','keras','selenium']);

function friendlyPkgError(msg, pkgName) {
  if (msg.includes("Can't find a pure Python 3 wheel") || msg.includes('pure Python'))
    return `✗ "${pkgName}" can't run in the browser.\n\nThis package needs native code (C extensions) that don't work in WebAssembly.\n\nTry: numpy, pandas, sortedcontainers, sympy, networkx`;
  if (msg.includes('404') || msg.includes('not found'))
    return `✗ "${pkgName}" not found on PyPI. Check the spelling.`;
  const lines = msg.split('\n').filter(l => l.trim());
  return `✗ Failed: ${lines[lines.length-1] || msg}`;
}

async function installPackage() {
  const input = document.getElementById('pkgInput').value.trim();
  if (!input) return;
  const out = document.getElementById('pkgOutput');
  out.classList.add('visible'); out.style.color = '';
  if (!pyodide) { out.textContent = '✗ Python still loading, please wait'; out.style.color='var(--red)'; return; }
  const packages = input.split(',').map(p => p.trim().toLowerCase()).filter(Boolean);
  for (const pkg of packages) {
    if (UNSUPPORTED_PACKAGES.has(pkg)) {
      out.textContent = `✗ "${pkg}" is a built-in module or requires native code — can't be installed here.`;
      out.style.color = 'var(--red)'; return;
    }
  }
  try {
    await pyodide.loadPackage('micropip');
    for (const pkg of packages) {
      out.textContent = `Installing ${pkg}...`;
      if (BUILTIN_PACKAGES.has(pkg)) {
        try { await pyodide.loadPackage(pkg); out.textContent = `✓ ${pkg} loaded`; out.style.color='var(--green)'; continue; } catch(_) {}
      }
      await pyodide.runPythonAsync(`import micropip; await micropip.install('${pkg}')`);
    }
    out.textContent = `✓ ${input} installed successfully`;
    out.style.color = 'var(--green)';
    showToast(`${input} installed`);
  } catch(e) {
    const failedPkg = packages.find(p => e.message.toLowerCase().includes(p)) || input;
    out.textContent = friendlyPkgError(e.message, failedPkg);
    out.style.color = 'var(--red)';
  }
}

async function quickInstall(pkg) { document.getElementById('pkgInput').value = pkg; await installPackage(); }

// ═══════════════════════════════════════════════════
// EXPORT & CODE DOWNLOAD
// ═══════════════════════════════════════════════════
function chatToText(tab, md=true) {
  if (!tab || !tab.chatHistory.length) return '';
  return tab.chatHistory.map(m => {
    const role = m.role === 'user' ? 'YOU' : 'AI';
    return md ? `## ${role}\n${m.content}` : `${role}:\n${m.content}`;
  }).join('\n\n---\n\n');
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

function exportMarkdown() { const t=curTab(); downloadFile(`# LeetSolve — ${t.name}\n\n${chatToText(t,true)}`,`${t.name.replace(/\s+/g,'-')}.md`,'text/markdown'); closeModal('exportModal'); showToast('Downloaded as Markdown'); }
function exportText()     { const t=curTab(); downloadFile(chatToText(t,false),`${t.name.replace(/\s+/g,'-')}.txt`,'text/plain'); closeModal('exportModal'); showToast('Downloaded as Text'); }
function copyChat()       { navigator.clipboard.writeText(chatToText(curTab(),false)); closeModal('exportModal'); showToast('Chat copied to clipboard'); }

function downloadPy() {
  const code = editor ? editor.getValue() : '';
  const tab = curTab();
  const filename = (tab?.name || 'solution').replace(/\s+/g,'-').replace(/[^a-zA-Z0-9\-_]/g,'') + '.py';
  downloadFile(code, filename, 'text/plain');
  closeModal('exportModal');
  showToast('Downloaded as .py');
}

function copyCode() {
  const code = editor ? editor.getValue() : '';
  navigator.clipboard.writeText(code);
  closeModal('exportModal');
  showToast('Code copied to clipboard');
}

// ═══════════════════════════════════════════════════
// PROBLEM HISTORY
// ═══════════════════════════════════════════════════
let problemHistory = JSON.parse(localStorage.getItem('ls-history') || '[]');
let historyFilter = 'All';

function addToHistory(name, difficulty) {
  const entry = { name, difficulty: difficulty || 'Medium', ts: Date.now() };
  problemHistory = problemHistory.filter(p => p.name !== name);
  problemHistory.unshift(entry);
  if (problemHistory.length > 30) problemHistory = problemHistory.slice(0, 30);
  localStorage.setItem('ls-history', JSON.stringify(problemHistory));
  renderHistory();
}

function filterHistory(diff) {
  historyFilter = diff;
  document.querySelectorAll('.hf-btn').forEach(b => b.classList.toggle('active', b.dataset.f === diff));
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById('historyList');
  list.innerHTML = '';
  let items = problemHistory;
  if (historyFilter !== 'All') items = items.filter(p => p.difficulty === historyFilter);
  if (!items.length) {
    list.innerHTML = `<div style="font-size:11px;color:var(--t3);padding:4px 8px">${historyFilter === 'All' ? 'No problems yet' : `No ${historyFilter} problems`}</div>`;
    return;
  }
  items.slice(0, 10).forEach(p => {
    const d = document.createElement('div');
    d.className = 'history-item';
    d.innerHTML = `<span class="hi-diff ${p.difficulty}">${p.difficulty}</span><span style="overflow:hidden;text-overflow:ellipsis">${esc(p.name)}</span>`;
    d.onclick = () => chip(`Solve LeetCode problem: ${p.name}`);
    list.appendChild(d);
  });
}

function clearHistory() {
  if (!confirm('Clear all problem history?')) return;
  problemHistory = [];
  localStorage.removeItem('ls-history');
  renderHistory();
  closeModal('settingsModal');
  showToast('History cleared');
}

function clearAllData() {
  if (!confirm('This will reset ALL tabs, chats, and history. Are you sure?')) return;
  localStorage.removeItem('ls-tabs');
  localStorage.removeItem('ls-history');
  localStorage.removeItem('ls-activeId');
  localStorage.removeItem('ls-tabCtr');
  location.reload();
}

function extractProblemInfo(text) {
  const numName  = text.match(/(?:leetcode\s*#?\s*(\d+)[:\.\s]+([A-Za-z][A-Za-z\s\-]+))/i);
  const justName = text.match(/solve\s+([A-Z][A-Za-z\s\-]{3,40})/i);
  const numOnly  = text.match(/(?:leetcode|problem|#)\s*(\d+)/i);
  const diffMatch = text.match(/\b(Easy|Medium|Hard)\b/);
  let name = null;
  if (numName) name = `${numName[1]}. ${numName[2].trim()}`;
  else if (justName) name = justName[1].trim();
  else if (numOnly)  name = `Problem ${numOnly[1]}`;
  // Also try matching against known problems
  if (!name) {
    const lower = text.toLowerCase();
    const found = PROBLEMS.find(p => lower.includes(p.name.toLowerCase()));
    if (found) name = `${found.id}. ${found.name}`;
  }
  return { name, difficulty: diffMatch ? diffMatch[1] : 'Medium' };
}

document.addEventListener('DOMContentLoaded', () => {
  const histLabel = document.querySelector('.history-label');
  if (histLabel) histLabel.onclick = function() { this.parentElement.classList.toggle('collapsed'); };
});

// ═══════════════════════════════════════════════════
// COMPLEXITY BADGES
// ═══════════════════════════════════════════════════
function extractComplexity(text) {
  const time  = text.match(/TIME_COMPLEXITY:\s*(O\([^)]+\))/);
  const space = text.match(/SPACE_COMPLEXITY:\s*(O\([^)]+\))/);
  return { time: time?.[1], space: space?.[1] };
}

function showComplexity(time, space) {
  const bar = document.getElementById('complexityBar');
  if (!time && !space) { bar.style.display = 'none'; return; }
  if (time)  document.getElementById('cxTime').textContent  = '<i class="fa-regular fa-clock"></i> ' + time;
  if (space) document.getElementById('cxSpace').textContent = '<i class="fa-solid fa-memory"></i> ' + space;
  bar.style.display = 'flex';
}

// ═══════════════════════════════════════════════════
// TAB STATE — persisted to localStorage
// ═══════════════════════════════════════════════════
let tabs = [], activeId = null, tabCtr = 0;

function mkTab(name) {
  const t = { id:++tabCtr, name:name||`Tab ${tabCtr}`, code:DEFAULT_CODE, chatHistory:[], outText:'', outCls:'', difficulty:'' };
  tabs.push(t);
  return t;
}

function saveCurrent() {
  if (!activeId || !editor) return;
  const t = tabs.find(x => x.id === activeId);
  if (!t) return;
  t.code    = editor.getValue();
  t.outText = document.getElementById('outText').textContent;
  t.outCls  = document.getElementById('outText').className.replace('out-text','').trim();
  persistTabs();
}

function persistTabs() {
  try { localStorage.setItem('ls-tabs', JSON.stringify(tabs)); localStorage.setItem('ls-activeId', activeId); localStorage.setItem('ls-tabCtr', tabCtr); } catch(e) {}
}

function loadPersistedTabs() {
  try {
    const raw = localStorage.getItem('ls-tabs');
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (!data || !data.length) return false;
    tabCtr = parseInt(localStorage.getItem('ls-tabCtr') || '0');
    tabs = data;
    const savedActive = parseInt(localStorage.getItem('ls-activeId') || '0');
    activeId = tabs.find(t => t.id === savedActive) ? savedActive : tabs[0].id;
    return true;
  } catch(e) { return false; }
}

function renderTabBar() {
  const bar = document.getElementById('tabbar');
  const add = document.getElementById('tabAdd');
  bar.querySelectorAll('.tab').forEach(e => e.remove());
  tabs.forEach(t => {
    const d = document.createElement('div');
    d.className = 'tab' + (t.id === activeId ? ' active' : '');
    const diffDot = t.difficulty ? `<span class="tab-diff ${t.difficulty}"></span>` : '';
    d.innerHTML = `${diffDot}<span class="tab-nm">${esc(t.name)}</span>${tabs.length > 1 ? `<span class="tab-x" onclick="closeTab(event,${t.id})">×</span>` : ''}`;
    d.onclick    = e => { if (e.target.classList.contains('tab-x')) return; switchTab(t.id); };
    d.ondblclick = e => { if (e.target.classList.contains('tab-x')) return; const n=prompt('Rename tab:',t.name); if(n?.trim()){t.name=n.trim();renderTabBar();persistTabs();} };
    bar.insertBefore(d, add);
  });
}

function switchTab(id) {
  saveCurrent();
  activeId = id;
  const t = tabs.find(x => x.id === id);
  if (!t) return;
  if (editor) editor.setValue(t.code);
  const out = document.getElementById('outText');
  out.textContent = t.outText || '// press Run or Ctrl+Enter';
  out.className   = 'out-text' + (t.outCls ? ' '+t.outCls : '');
  renderChat(t);
  renderTabBar();
  persistTabs();
  document.querySelector('.ask-error-btn')?.remove();
  setTimeout(() => { editor&&editor.refresh(); editor2&&editor2.refresh(); }, 10);
}

function newTab() { saveCurrent(); const t=mkTab(); renderTabBar(); switchTab(t.id); }

function closeTab(e, id) {
  if (e) e.stopPropagation();
  if (tabs.length <= 1) { showToast("Can't close last tab"); return; }
  const idx = tabs.findIndex(t => t.id === id);
  tabs = tabs.filter(t => t.id !== id);
  if (activeId === id) { activeId=null; switchTab(tabs[Math.min(idx,tabs.length-1)].id); }
  else { renderTabBar(); persistTabs(); }
}

document.getElementById('tabAdd').onclick = newTab;

// ═══════════════════════════════════════════════════
// CODEMIRROR
// ═══════════════════════════════════════════════════
let editor = null, editor2 = null, splitActive = false;

function makeEditor(el, value) {
  const lineN = localStorage.getItem('ls-lineNumbers');
  const lineW = localStorage.getItem('ls-lineWrapping');
  return CodeMirror(el, {
    value: value || DEFAULT_CODE,
    mode: 'python', lineNumbers: lineN === null ? true : lineN === 'true',
    indentUnit: 4, tabSize: 4, indentWithTabs: false,
    autoCloseBrackets: true, matchBrackets: true,
    lineWrapping: lineW === 'true',
    extraKeys: { 'Ctrl-Enter':runCode,'Cmd-Enter':runCode,'Ctrl-/':'toggleComment','Tab':'indentMore','Shift-Tab':'indentLess' }
  });
}

function initEditor() {
  editor = makeEditor(document.getElementById('cmWrap'), DEFAULT_CODE);
  editor.on('change', () => { clearTimeout(editor._saveTimer); editor._saveTimer = setTimeout(saveCurrent, 800); });
}

function toggleSplit() {
  splitActive = !splitActive;
  const wrap = document.getElementById('cmWrap2');
  const div  = document.getElementById('editorDivider');
  const btn  = document.getElementById('splitBtn');
  if (splitActive) {
    wrap.style.display=''; div.style.display='';
    if (!editor2) { editor2=makeEditor(wrap,'# Second editor\n'); applyFontSize(); }
    else editor2.refresh();
    btn.innerHTML = '<i class="fa-solid fa-table-columns"></i> unsplit';
  } else {
    wrap.style.display='none'; div.style.display='none';
    btn.innerHTML = '<i class="fa-solid fa-table-columns"></i> split';
  }
}

function resetEditor() { if(editor) editor.setValue(DEFAULT_CODE); clearOut(); }

// ═══════════════════════════════════════════════════
// PYODIDE
// ═══════════════════════════════════════════════════
let pyodide = null;

async function initPyodide() {
  const badge = document.getElementById('pyBadge');
  const CDN = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
  try {
    await new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src=CDN+'pyodide.js'; s.onload=resolve; s.onerror=reject;
      document.head.appendChild(s);
    });
    pyodide = await window.loadPyodide({ indexURL: CDN });
    badge.innerHTML='<i class="fa-solid fa-circle-check"></i> python ready'; badge.className='py-badge ready';
  } catch(e) {
    badge.innerHTML='<i class="fa-solid fa-circle-xmark"></i> python error'; badge.style.color='var(--red)';
  }
}

// ═══════════════════════════════════════════════════
// RUN CODE
// ═══════════════════════════════════════════════════
async function runCode() {
  if (!pyodide) { showToast('Python is still loading...'); return; }
  const code = editor ? editor.getValue().trim() : '';
  if (!code) return;
  const btn=document.getElementById('runBtn'), sp=document.getElementById('spinner'), out=document.getElementById('outText');
  btn.disabled=true; sp.classList.add('on'); out.className='out-text'; out.textContent='';
  document.getElementById('runTime').textContent='';
  document.querySelector('.ask-error-btn')?.remove();
  const t0 = performance.now();
  try {
    pyodide.runPython(`import sys,io\n_buf=io.StringIO()\nsys.stdout=sys.stderr=_buf`);
    let errMsg=null;
    try { pyodide.runPython(code); } catch(e) { errMsg=e.message; }
    const captured = pyodide.runPython('_buf.getvalue()') || '';
    pyodide.runPython('sys.stdout=sys.__stdout__;sys.stderr=sys.__stderr__');
    const result = (captured+(errMsg&&!captured.includes(errMsg)?(captured?'\n':'')+errMsg:'')).trim();
    const elapsed = (performance.now()-t0).toFixed(1);
    document.getElementById('runTime').textContent = elapsed+'ms';
    out.textContent = result || '(no output)';
    out.className = 'out-text '+(errMsg?'err':(result?'ok':''));
    const t = tabs.find(x=>x.id===activeId);
    if(t) { t.outText=out.textContent; t.outCls=errMsg?'err':(result?'ok':''); persistTabs(); }
    if (errMsg) {
      const askBtn = document.createElement('button');
      askBtn.className='ask-error-btn';
      askBtn.innerHTML='<i class="fa-solid fa-robot"></i> Ask AI about this error';
      askBtn.onclick=()=>{ sendMsg(`I got this error:\n\`\`\`\n${errMsg}\n\`\`\`\nExplain what's wrong and how to fix it simply.`); askBtn.remove(); };
      out.after(askBtn);
    }
  } catch(e) {
    out.textContent=String(e); out.className='out-text err';
  } finally { btn.disabled=false; sp.classList.remove('on'); }
}

function clearOut() {
  document.getElementById('outText').textContent='// press Run or Ctrl+Enter';
  document.getElementById('outText').className='out-text';
  document.getElementById('runTime').textContent='';
  document.querySelector('.ask-error-btn')?.remove();
}

// ═══════════════════════════════════════════════════
// CALL AI — via Cloudflare Worker
// ═══════════════════════════════════════════════════
async function callAI(messages, stream=true) {
  if (!WORKER_URL || !WORKER_URL.startsWith('https://')) throw new Error('Worker URL not configured in app.js');
  const res = await fetch(WORKER_URL, {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ model:'openrouter/auto', temperature:0.5, stream, messages:[{role:'system',content:SYSTEM_PROMPT},...messages] })
  });
  if (!res.ok) { const e=await res.json().catch(()=>({})); throw new Error(e.error?.message||`HTTP ${res.status}`); }
  if (!stream) { const d=await res.json(); return d.choices?.[0]?.message?.content||''; }
  return res;
}

// ═══════════════════════════════════════════════════
// CHAT
// ═══════════════════════════════════════════════════
function curTab() { return tabs.find(t=>t.id===activeId); }

function renderChat(tab) {
  const msgs=document.getElementById('chatMsgs');
  msgs.innerHTML='';
  if (!tab.chatHistory || !tab.chatHistory.length) { msgs.appendChild(makeWelcome()); return; }
  tab.chatHistory.filter(m=>!m._hidden).forEach(m=>addBubble(m.role,m.content,false));
  msgs.scrollTop=msgs.scrollHeight;
}

function makeWelcome() {
  const d=document.createElement('div');
  d.className='welcome'; d.id='chatWelcome';
  d.innerHTML=`<div class="wg">{ }</div><div class="wt">LeetCode AI Tutor</div><div class="ws">Ask me any LeetCode problem by name or number. I'll explain it simply — step by step, with real examples.</div><div class="welcome-chips"><div class="wchip" onclick="chip('Solve LeetCode 1 Two Sum')">Two Sum #1</div><div class="wchip" onclick="chip('Solve LeetCode 206 Reverse Linked List')">Reverse List #206</div><div class="wchip" onclick="chip('Solve LeetCode 53 Maximum Subarray')">Max Subarray #53</div><div class="wchip" onclick="chip('Solve LeetCode 200 Number of Islands')">Islands #200</div><div class="wchip" onclick="chip('Solve LeetCode 70 Climbing Stairs')">Climbing Stairs #70</div><div class="wchip" onclick="chip('Solve LeetCode 121 Best Time to Buy and Sell Stock')">Stock #121</div></div>`;
  return d;
}

// Smart scroll: only auto-scroll if user is already near bottom
function smartScrollChat() {
  if (!settings.smartScroll) { const m=document.getElementById('chatMsgs'); m.scrollTop=m.scrollHeight; return; }
  const m=document.getElementById('chatMsgs');
  const nearBottom = m.scrollHeight - m.scrollTop - m.clientHeight < 80;
  if (nearBottom) m.scrollTop=m.scrollHeight;
}

// Up arrow to edit last user message
let lastUserMsg = '';
document.addEventListener('DOMContentLoaded', () => {
  const ta = document.getElementById('chatIn');
  if (!ta) return;
  ta.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && ta.value === '' && lastUserMsg) {
      ta.value = lastUserMsg;
      ta.style.height = Math.min(ta.scrollHeight, 130) + 'px';
      e.preventDefault();
    }
  });
});

async function sendMsg(override) {
  const input = document.getElementById('chatIn');
  const text  = override || input.value.trim();
  if (!text) return;

  lastUserMsg = text;
  input.value = ''; input.style.height='40px';
  document.getElementById('chatWelcome')?.remove();
  setTimeout(()=>input.focus(), 0);

  const tab = curTab();
  if (!tab) return;

  addBubble('user', text, true);

  // Only inject code for explicit code review requests
  const code   = editor ? editor.getValue() : '';
  const outVal = document.getElementById('outText').textContent;
  const isDefaultCode = code.trim().startsWith('# Write your Python code here') || code.trim()==='';
  const isCodeQuestion = /\b(my code|this code|review|bug|error|fix|wrong|output|why is|what's wrong|debug|broken|not working|doesn't work|check my)\b/i.test(text);
  const withCode = isCodeQuestion && !isDefaultCode;
  const apiText = withCode ? `${text}\n\n---\n*My current code:*\n\`\`\`python\n${code}\n\`\`\`\n*Last output:* ${outVal}` : text;

  tab.chatHistory.push({ role:'user', content:apiText });

  const typId = 'tp_'+Date.now();
  if (settings.showTyping) addTyping(typId);

  const apiMsgs = tab.chatHistory.map(m=>({role:m.role,content:m.content}));

  try {
    const res = await callAI(apiMsgs, true);
    removeEl(typId);

    const { bubble } = addBubble('assistant','',true);
    bubble.classList.add('scursor');

    const reader=res.body.getReader(), dec=new TextDecoder();
    let full='';

    while(true) {
      const {done,value}=await reader.read();
      if(done) break;
      for(const line of dec.decode(value).split('\n').filter(l=>l.startsWith('data: '))) {
        const d=line.slice(6).trim();
        if(d==='[DONE]') continue;
        try { const delta=JSON.parse(d).choices?.[0]?.delta?.content||''; full+=delta; bubble.innerHTML=mdToHtml(full); smartScrollChat(); } catch(_) {}
      }
    }

    bubble.classList.remove('scursor');
    tab.chatHistory.push({ role:'assistant', content:full });

    // Complexity badges
    const cx=extractComplexity(full);
    if(cx.time||cx.space) showComplexity(cx.time,cx.space);

    // History + auto-rename tab
    const allText=tab.chatHistory.filter(m=>m.role==='user').map(m=>m.content).join(' ');
    const info=extractProblemInfo(allText);
    if(info.name) {
      addToHistory(info.name, info.difficulty);
      if(tab.name.startsWith('Tab ')) {
        tab.name = info.name.length>22 ? info.name.slice(0,20)+'…' : info.name;
        tab.difficulty = info.difficulty;
        renderTabBar();
      }
    }

    // Auto-load last python block + load buttons for all blocks
    const allMatches=[...full.matchAll(/```python\n([\s\S]+?)```/g)];
    if(allMatches.length>0) {
      if(settings.autoLoad) {
        const lastSnippet=allMatches[allMatches.length-1][1].trim();
        editor.setValue(lastSnippet); editor.refresh();
        showToast('Solution loaded into editor');
        if(settings.autoRun) setTimeout(()=>runCode(), 300);
      }
      const btnWrap=document.createElement('div');
      btnWrap.className='load-btns-wrap';
      allMatches.forEach((match,idx) => {
        const snippet=match[1].trim();
        const btn=document.createElement('button');
        btn.className='load-btn';
        if(allMatches.length===1) { btn.innerHTML='<i class="fa-solid fa-check"></i> Loaded into editor'; if(settings.autoLoad) btn.disabled=true; else btn.innerHTML='<i class="fa-solid fa-download"></i> Load into editor'; }
        else { const isLast=idx===allMatches.length-1; btn.innerHTML=isLast?`<i class="fa-solid fa-check"></i> Optimal loaded`:`<i class="fa-solid fa-download"></i> Load solution ${idx+1}`; if(settings.autoLoad&&isLast) btn.disabled=true; }
        btn.onclick=()=>{ editor.setValue(snippet); editor.focus(); editor.refresh(); showToast('Loaded'); btnWrap.querySelectorAll('.load-btn').forEach(b=>{b.disabled=false;b.innerHTML=b.innerHTML.replace(/<i[^>]+><\/i> /,'<i class="fa-solid fa-download"></i> ').replace(' (loaded)','');}); btn.innerHTML='<i class="fa-solid fa-check"></i> '+btn.innerHTML.replace(/<i[^>]+><\/i> /,'')+' (loaded)'; btn.disabled=true; if(settings.autoRun) setTimeout(runCode,300); };
        btnWrap.appendChild(btn);
      });
      bubble.appendChild(btnWrap);
    }

    // Add copy buttons to all code blocks
    addCopyButtons(bubble);



    if(tab.chatHistory.length>40) tab.chatHistory=tab.chatHistory.slice(-40);
    persistTabs();

  } catch(e) {
    removeEl(typId);
    addBubble('assistant',`**Error:** ${e.message}`,true);
  }
}

function chip(t) { sendMsg(t); }

function addBubble(role, text, animate) {
  const msgs=document.getElementById('chatMsgs');
  const div=document.createElement('div'); div.className='msg '+role;
  if(!animate) div.style.animation='none';
  const lbl=document.createElement('span'); lbl.className='msg-lbl';
  const now=new Date();
  const timeStr=now.getHours().toString().padStart(2,'0')+':'+now.getMinutes().toString().padStart(2,'0');
  lbl.innerHTML=`${role==='user'?'you':'ai'}<span class="msg-time">${timeStr}</span>`;
  const bbl=document.createElement('div'); bbl.className='msg-bbl';
  bbl.innerHTML=mdToHtml(text);
  div.appendChild(lbl); div.appendChild(bbl);
  msgs.appendChild(div);
  smartScrollChat();
  return {div,bubble:bbl};
}

// Add copy buttons to code blocks in a bubble
function addCopyButtons(bubble) {
  bubble.querySelectorAll('pre').forEach(pre => {
    if (pre.parentElement.classList.contains('code-block-wrap')) return;
    const wrap = document.createElement('div');
    wrap.className = 'code-block-wrap';
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-code-btn';
    copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> copy';
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(pre.textContent);
      copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> copied';
      setTimeout(() => { copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> copy'; }, 1500);
    };
    wrap.appendChild(copyBtn);
  });
}

function addTyping(id) {
  const msgs=document.getElementById('chatMsgs');
  const d=document.createElement('div'); d.className='msg assistant'; d.id=id;
  d.innerHTML=`<span class="msg-lbl">ai</span><div class="msg-bbl"><div class="tdots"><div class="td"></div><div class="td"></div><div class="td"></div></div></div>`;
  msgs.appendChild(d); smartScrollChat();
}

function clearChat() {
  const t=curTab();
  if(t){t.chatHistory=[];persistTabs();}
  const msgs=document.getElementById('chatMsgs');
  msgs.innerHTML=''; msgs.appendChild(makeWelcome());
  showComplexity(null,null);
}

function removeEl(id) { document.getElementById(id)?.remove(); }

// ═══════════════════════════════════════════════════
// MARKDOWN → HTML (XSS-safe, correct list types)
// ═══════════════════════════════════════════════════
function mdToHtml(s) {
  if(!s) return '';
  // Strip machine-readable complexity markers (extracted separately for badges)
  s = s.replace(/^TIME_COMPLEXITY:.*$/gm, '').replace(/^SPACE_COMPLEXITY:.*$/gm, '').replace(/\n{3,}/g, '\n\n').trim();

  // ── Step 1: Extract ALL code blocks (complete + in-progress streaming) ──────
  // Store them as placeholders so NO other rule can touch their content.
  const codeBlocks = [];
  function stashCode(raw) {
    const idx = codeBlocks.length;
    codeBlocks.push(raw);
    return `\x00CODE${idx}\x00`;
  }

  // Complete fenced blocks  ```lang\n...```
  let h = s.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
    stashCode(`<pre class="lang-${lang||'python'}">${esc(code.trimEnd())}</pre>`)
  );

  // Incomplete / still-streaming block — no closing fence yet
  h = h.replace(/```(\w*)\n([\s\S]*)$/, (_, lang, code) =>
    stashCode(`<pre class="lang-${lang||'python'} streaming">${esc(code)}</pre>`)
  );

  // ── Step 2: Inline code (safe now — all fenced blocks are stashed) ──────────
  h = h.replace(/`([^`\n]+)`/g, (_, c) => `<code>${esc(c)}</code>`);

  // ── Step 3: Inline formatting ───────────────────────────────────────────────
  h = h.replace(/^#{1,4} (.+)$/gm, '<h4>$1</h4>');
  h = h.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  h = h.replace(/\*(.+?)\*/g, '<em>$1</em>');
  h = h.replace(/^---+$/gm, '<hr>');

  // ── Step 4: Lists ───────────────────────────────────────────────────────────
  h = h.replace(/((?:^\d+\. .+\n?)+)/gm, m => {
    const items = m.trim().split('\n').map(l => `<li>${l.replace(/^\d+\. /, '')}</li>`).join('');
    return `<ol>${items}</ol>`;
  });
  h = h.replace(/((?:^[•\-] .+\n?)+)/gm, m => {
    const items = m.trim().split('\n').map(l => `<li>${l.replace(/^[•\-] /, '')}</li>`).join('');
    return `<ul>${items}</ul>`;
  });

  // ── Step 5: Newlines → <br> (only outside stashed blocks) ──────────────────
  h = h.replace(/\n\n/g, '<br><br>');
  h = h.replace(/([^>])\n([^<])/g, '$1<br>$2');

  // ── Step 6: Restore stashed code blocks ────────────────────────────────────
  h = h.replace(/\x00CODE(\d+)\x00/g, (_, i) => codeBlocks[parseInt(i)]);

  return h;
}

function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// ═══════════════════════════════════════════════════
// RESIZE — unified helper
// ═══════════════════════════════════════════════════
function makeResizer(handle, onDrag, cursor) {
  let drag=false, startX=0, startY=0;
  handle.addEventListener('mousedown', e=>{drag=true;startX=e.clientX;startY=e.clientY;document.body.style.userSelect='none';document.body.style.cursor=cursor||'';handle.classList?.add('dragging');});
  document.addEventListener('mousemove', e=>{if(!drag)return;onDrag(e.clientX-startX,e.clientY-startY);});
  document.addEventListener('mouseup', ()=>{if(!drag)return;drag=false;document.body.style.userSelect='';document.body.style.cursor='';handle.classList?.remove('dragging');});
}

(function(){
  const h=document.getElementById('dragH'), p=document.getElementById('outPane'); let sh=0;
  h.addEventListener('mousedown',()=>{sh=p.offsetHeight;});
  makeResizer(h,(_, dy)=>{const nh=Math.max(60,Math.min(500,sh-dy));p.style.height=p.style.minHeight=nh+'px';editor&&editor.refresh();},'ns-resize');
})();

(function(){
  const resizer=document.getElementById('vResizer'),chatSide=document.getElementById('chatSide'),editorSide=document.getElementById('editorSide'),workspace=document.getElementById('workspace'); let startChatW=0;
  resizer.addEventListener('mousedown',()=>{startChatW=chatSide.offsetWidth;});
  makeResizer(resizer,dx=>{const totalW=workspace.offsetWidth-resizer.offsetWidth;const newChatW=Math.max(280,Math.min(totalW-220,startChatW+dx));chatSide.style.flex='none';chatSide.style.width=newChatW+'px';editorSide.style.width=(totalW-newChatW)+'px';editor&&editor.refresh();editor2&&editor2.refresh();},'col-resize');
})();

(function(){
  const div=document.getElementById('editorDivider'),w1=document.getElementById('cmWrap'),w2=document.getElementById('cmWrap2'); let sw=0;
  div.addEventListener('mousedown',()=>{sw=w1.offsetWidth;});
  makeResizer(div,dx=>{const total=w1.offsetWidth+w2.offsetWidth;const newW=Math.max(100,Math.min(total-100,sw+dx));w1.style.flex='none';w1.style.width=newW+'px';w2.style.flex='1';editor&&editor.refresh();editor2&&editor2.refresh();},'col-resize');
})();

// ═══════════════════════════════════════════════════
// TEXTAREA AUTO RESIZE + KEYBOARD
// ═══════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  const ta=document.getElementById('chatIn');
  if (!ta) return;
  ta.addEventListener('input', ()=>{ta.style.height='40px';ta.style.height=Math.min(ta.scrollHeight,130)+'px';});
  ta.addEventListener('keydown', e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMsg();}});
});

// ═══════════════════════════════════════════════════
// MOBILE
// ═══════════════════════════════════════════════════
function mobileTab(tab) {
  const chat=document.getElementById('chatSide'),editorEl=document.getElementById('editorSide'),btnC=document.getElementById('mobChat'),btnE=document.getElementById('mobEditor');
  if(tab==='chat'){chat.classList.remove('mobile-hidden');editorEl.classList.remove('mobile-active');btnC.classList.add('active');btnE.classList.remove('active');}
  else{chat.classList.add('mobile-hidden');editorEl.classList.add('mobile-active');btnE.classList.add('active');btnC.classList.remove('active');setTimeout(()=>editor&&editor.refresh(),50);}
}

// ═══════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════
function showToast(msg) {
  document.querySelectorAll('.toast').forEach(e=>e.remove());
  const t=document.createElement('div'); t.className='toast'; t.textContent=msg;
  document.body.appendChild(t); setTimeout(()=>t.remove(),2800);
}

// ═══════════════════════════════════════════════════
// BOOT
// ═══════════════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);
  initEditor();
  applyFontSize();
  renderHistory();

  const restored = loadPersistedTabs();
  if (restored) {
    renderTabBar();
    const t=tabs.find(x=>x.id===activeId);
    if(t&&editor){ editor.setValue(t.code||DEFAULT_CODE); const out=document.getElementById('outText'); out.textContent=t.outText||'// press Run or Ctrl+Enter'; out.className='out-text'+(t.outCls?' '+t.outCls:''); renderChat(t); }
  } else {
    const first=mkTab('Tab 1'); activeId=first.id; renderTabBar();
  }

  initPyodide();
  fetchAllProblems(); // background prefetch so search is instant on first open
});
