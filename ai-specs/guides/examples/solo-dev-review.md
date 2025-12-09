# Solo Dev + Review Workflow

**You build everything, agent reviews for quality**

## Overview

You take full control as both QA Buddy and Maker, then the agent acts as Quality Lead to review your work:

- **You**: Write tests AND implementation
- **Agent (Quality Lead)**: Review code quality, comments, conventions
- Focus on independent work with quality validation

## Ratings

- **Collaboration Level**: Low
- **Learning Value**: ⭐⭐⭐
- **Speed**: Fast

## When to Use

✅ **Best for:**

- Independent work
- Fast iteration
- When you know what you're doing
- Learning from feedback

❌ **Not ideal for:**

- Complex unfamiliar features
- When you need guidance
- Learning new patterns

## Step-by-Step Flow

### 1. Setup

```
You: "I'll build the statistics page solo, then you review"
Agent (Coordinator): Creates task.md
Agent: "Sounds good! Let me know when ready for review."
```

### 2. You Build (Solo)

```
You write tests:
- test('calculates win rate')
- test('handles edge cases')
- test('renders component')

You write implementation:
- calculateWinRate()
- calculateAverageScore()
- PlayerStats component

You: "Done! Ready for review."
```

### 3. Agent Reviews (Quality Lead)

```
Agent reviews:

✅ **Good:**
- Tests cover main functionality
- Component structure is clean
- Logic is correct

⚠️ **Suggestions:**
- Add JSDoc comments to calculateWinRate
- Extract magic number 100 to constant
- Consider memoizing expensive calculations
- Add prop types validation

Agent: "Overall great work! A few suggestions above. Want to address them?"
```

### 4. You Refine

```
You make changes based on feedback:
- Add comments
- Extract constants
- Add memoization

You: "Updated! Take another look?"
```

### 5. Final Approval

```
Agent: "Perfect! All suggestions addressed. Code is ready to merge. ✅"
```

## Example Scenario

### Feature: Player Statistics Dashboard

**Your Work:**

```typescript
// PlayerStats.tsx
import { useMemo } from 'react';

const PERCENTAGE_MULTIPLIER = 100;

/**
 * Calculates win rate as a percentage
 * @param wins - Number of games won
 * @param total - Total number of games played
 * @returns Win rate percentage (0-100)
 */
export function calculateWinRate(wins: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((wins / total) * PERCENTAGE_MULTIPLIER);
}

export function PlayerStats({ games }: { games: Game[] }) {
  const stats = useMemo(() => calculateStats(games), [games]);

  return (
    <div className="player-stats">
      <h2>Statistics</h2>
      <div>Win Rate: {stats.winRate}%</div>
    </div>
  );
}
```

**Agent Review:**

```
✅ Good use of useMemo for performance
✅ Clear function documentation
✅ Extracted magic number to constant
✅ Proper TypeScript types

💡 Suggestion: Add loading state for async data
💡 Suggestion: Consider error boundary for edge cases

Overall: Excellent work! Code is production-ready.
```

## Communication Pattern

### You Say:

- "Building [feature] solo, will ping when ready"
- "Done! Please review"
- "Updated based on feedback"
- "Ready for final check"

### Agent Says:

- "Sounds good! Take your time"
- "Reviewing now..."
- "Here's my feedback: [detailed review]"
- "Looks great! Approved ✅"

## Benefits

### For You:

✅ Full creative control  
✅ Work at your own pace  
✅ Learn from detailed feedback  
✅ Build confidence  
✅ Fast iteration

### Quality Assurance:

✅ Catch issues before shipping  
✅ Learn best practices  
✅ Ensure code standards  
✅ Improve over time

## Review Checklist

The agent checks for:

**Code Quality:**

- [ ] Clear, descriptive names
- [ ] Proper error handling
- [ ] No code duplication
- [ ] Follows project conventions

**Testing:**

- [ ] Tests cover main functionality
- [ ] Edge cases tested
- [ ] Tests are readable
- [ ] Good test descriptions

**Documentation:**

- [ ] Complex logic has comments
- [ ] Functions have JSDoc
- [ ] README updated if needed

**TypeScript:**

- [ ] No `any` types
- [ ] Proper type definitions
- [ ] Interfaces for complex objects

**Performance:**

- [ ] No unnecessary re-renders
- [ ] Expensive operations memoized
- [ ] Efficient algorithms

## Tips for Success

1. **Write tests first** - Even solo, TDD helps
2. **Self-review** - Check your own code before agent review
3. **Be open to feedback** - Reviews help you improve
4. **Ask questions** - "Why is this approach better?"
5. **Iterate** - Apply feedback and improve

## Common Pitfalls

❌ **Skipping tests** - Write them!  
❌ **Defensive about feedback** - It's for learning  
❌ **Not self-reviewing** - Catch obvious issues yourself  
❌ **Ignoring suggestions** - Consider all feedback

## Variations

### Quick Review

- Agent does high-level review only
- Focus on critical issues
- Fast turnaround

### Detailed Review (Recommended)

- Agent reviews everything
- Detailed suggestions
- Learning opportunity

### Iterative Review

- Review in small chunks
- Continuous feedback
- Prevents big rewrites

## Example Review Session

```
You: "Built the statistics page. Ready for review!"

Agent: "Reviewing now...

✅ Tests look good - nice coverage
✅ Component structure is clean
✅ TypeScript types are solid

💡 Suggestions:
1. Add JSDoc to calculateWinRate
2. Extract magic number 100 to constant
3. Consider memoizing the stats calculation

Overall great work! Want to address these?"

You: "Good catches! Updated all three."

Agent: "Perfect! Code is approved. Nice job! ✅"
```

## Transitioning Out

Once you want more collaboration:

1. **Tag-Team** - Share testing and implementation
2. **Reverse TDD** - Let agent write tests
3. **Mob Programming** - Real-time collaboration

---

**Ready to work solo?** Just say: "I'll build this solo, review when done!" 🚀
