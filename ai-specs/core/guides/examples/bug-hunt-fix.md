# Bug Hunt & Fix Workflow

**Collaborative debugging**

## Overview

Focused approach to finding and fixing bugs:

- **You**: Find bugs, write reproduction tests
- **Agent**: Fix bugs, ensure tests pass

## Ratings

- **Collaboration Level**: Medium
- **Learning Value**: ⭐⭐⭐
- **Speed**: Medium

## When to Use

✅ **Best for:** Debugging sessions, quality improvements, learning debugging  
❌ **Not ideal for:** New feature development, when no bugs exist

## Flow

```
You: "Found a bug! Win rate shows NaN for new players"

You write reproduction test:
test('handles new player with no games', () => {
  const rate = calculateWinRate(0, 0);
  expect(rate).toBe(0); // Currently fails - shows NaN
});

Agent: "Investigating..."
Agent: "Found it! Missing zero check. Fixing now..."
[Agent fixes bug]
Agent: "Fixed! Test now passes."

You: "Verified! Works great."
```

## Example Session

**Bug 1: NaN for zero games**

```
You: Write test showing NaN
Agent: Add zero check
✅ Fixed
```

**Bug 2: Negative percentages**

```
You: Write test showing -20%
Agent: Add Math.abs()
✅ Fixed
```

**Bug 3: Sorting breaks on tie**

```
You: Write test for tied scores
Agent: Add secondary sort
✅ Fixed
```

## Benefits

✅ Learn debugging techniques  
✅ Improve code quality  
✅ Build regression test suite  
✅ Prevent future bugs

## Tips

- Write failing test first
- Be specific about reproduction
- Verify fix works
- Keep tests for regression

---

**Try it:** "Found a bug! Let me write a test..." 🐛
