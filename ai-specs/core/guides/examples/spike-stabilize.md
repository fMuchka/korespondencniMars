# Spike & Stabilize Workflow

**Prototype fast, refine later**

## Overview

Two-phase approach focusing on exploration then quality:

- **Phase 1 (Spike)**: You quickly prototype (messy code OK)
- **Phase 2 (Stabilize)**: Agent refactors, adds tests, cleans up

## Ratings

- **Collaboration Level**: Medium
- **Learning Value**: ⭐⭐⭐
- **Speed**: Fast

## When to Use

✅ **Best for:** Exploring new ideas, proof of concepts, rapid experimentation  
❌ **Not ideal for:** Production code without phase 2, well-understood features

## Flow

### Phase 1: Spike (You)

```
You: "I'll spike the statistics page quickly"
[You write messy but functional code]
You: "Works! But needs cleanup. Your turn to stabilize."
```

### Phase 2: Stabilize (Agent)

```
Agent: "Refactoring now..."
- Extracts functions
- Adds proper types
- Writes tests
- Adds comments
- Improves performance

Agent: "Stabilized! Code is production-ready."
```

## Example

**Your Spike:**

```typescript
// Quick and dirty
function stats(games) {
  let wins = 0;
  games.forEach((g) => {
    if (g.won) wins++;
  });
  return (wins / games.length) * 100;
}
```

**Agent Stabilizes:**

```typescript
/**
 * Calculates win rate percentage
 */
export function calculateWinRate(games: Game[]): number {
  if (games.length === 0) return 0;

  const wins = games.filter((g) => g.won).length;
  return Math.round((wins / games.length) * 100);
}

// + Tests added
// + Edge cases handled
// + TypeScript types
```

## Benefits

✅ Fast exploration  
✅ Learn refactoring patterns  
✅ Validate ideas quickly  
✅ Production-quality result

## Tips

- Don't worry about quality in spike
- Focus on "does it work?"
- Let agent handle cleanup
- Learn from the refactoring

---

**Try it:** "I'll spike this, then you stabilize!" 🚀
