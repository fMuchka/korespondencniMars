# You Design, I Implement Workflow

**Specification-driven development**

## Overview

Clear separation of design and implementation:

- **You**: Write detailed specifications/pseudocode
- **Agent**: Translate to code with tests

## Ratings

- **Collaboration Level**: Medium
- **Learning Value**: ⭐⭐⭐⭐
- **Speed**: Fast

## When to Use

✅ **Best for:** Architecture learning, when you know WHAT but not HOW, documentation-first  
❌ **Not ideal for:** When you want to code yourself, simple features

## Flow

```
You write spec:

"""
Feature: Player Statistics

calculateWinRate(wins, total)
- Input: number of wins, total games
- Output: percentage (0-100)
- Edge cases: handle zero total
- Round to nearest integer

Component: PlayerStats
- Props: games[]
- Display: win rate, average score
- Sorting: by any column
"""

Agent: "Got it! Implementing now..."
[Agent writes code + tests]
Agent: "Done! Matches your spec."
```

## Example Spec

```markdown
## Win Rate Calculator

### Function Signature

calculateWinRate(wins: number, total: number): number

### Behavior

1. If total is 0, return 0
2. Calculate: (wins / total) \* 100
3. Round to nearest integer
4. Return percentage

### Test Cases

- calculateWinRate(3, 5) → 60
- calculateWinRate(0, 0) → 0
- calculateWinRate(5, 5) → 100
```

## Benefits

✅ Learn architecture and design  
✅ Focus on WHAT not HOW  
✅ Clear requirements  
✅ Fast implementation

## Tips

- Be specific in specs
- Include edge cases
- Provide examples
- Review implementation

---

**Try it:** "Here's my spec, please implement!" 📝
