# Tag-Team Development Workflow

**Alternating between testing and implementation**

## Overview

A highly collaborative workflow where you and the agent take turns being QA Buddy and Maker:

- **Task 1**: You write test → Agent implements
- **Task 2**: Agent writes test → You implement
- **Repeat** until feature complete

## Ratings

- **Collaboration Level**: High
- **Learning Value**: ⭐⭐⭐⭐⭐
- **Speed**: Medium

## When to Use

✅ **Best for:**

- Learning both testing AND implementation
- Maintaining high engagement
- Knowledge transfer
- Medium-complexity features

❌ **Not ideal for:**

- Very simple tasks
- When one person is much faster
- Time-critical work

## Step-by-Step Flow

### 1. Setup

```
You: "Let's use Tag-Team for the player statistics feature"
Agent (Coordinator): Creates task.md with checklist
Agent: "Great! You start - write the first test"
```

### 2. Round 1 - You Write Test

```
You write:

test('calculates win rate correctly', () => {
  const stats = calculateWinRate(3, 5);
  expect(stats).toBe(60);
});

You: "Test written! Your turn to implement."
```

### 3. Round 1 - Agent Implements

```
Agent implements:

export function calculateWinRate(wins: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((wins / total) * 100);
}

Agent: "Implemented! Test passes. My turn to write a test..."
```

### 4. Round 2 - Agent Writes Test

```
Agent writes:

test('handles edge case: zero games', () => {
  const stats = calculateWinRate(0, 0);
  expect(stats).toBe(0);
});

Agent: "Test written! Your turn to make it pass."
```

### 5. Round 2 - You Implement

```
You: "Already passes! The if (total === 0) check handles it."
Agent: "Perfect! Your turn to write the next test..."
```

### 6. Continue Alternating

Keep switching roles until feature is complete.

## Example Scenario

### Feature: Player Statistics Dashboard

**Task Breakdown:**

1. Win rate calculation
2. Average score calculation
3. Statistics component
4. Sorting functionality

**Tag-Team Flow:**

#### Round 1

```
You (QA): Write test for win rate calculation
Agent (Maker): Implement calculateWinRate()
✅ Test passes
```

#### Round 2

```
Agent (QA): Write test for edge cases
You (Maker): Add edge case handling
✅ Tests pass
```

#### Round 3

```
You (QA): Write test for average score
Agent (Maker): Implement calculateAverageScore()
✅ Test passes
```

#### Round 4

```
Agent (QA): Write component rendering test
You (Maker): Create PlayerStats component
✅ Test passes
```

#### Round 5

```
You (QA): Write test for sorting
Agent (Maker): Implement sort logic
✅ Test passes
```

## Communication Pattern

### When You're QA Buddy:

- "Here's my test for [feature]"
- "I'm testing the edge case where..."
- "Your turn to implement!"

### When You're Maker:

- "Implemented! Running tests..."
- "Tests pass! My turn to write a test"
- "This already works because..."

### Agent Responds:

- "Great test! Implementing now..."
- "Done! Here's my next test..."
- "Good catch on that edge case!"

## Benefits

### For You:

✅ See both perspectives (testing & implementation)  
✅ Learn from agent's test-writing style  
✅ Learn from agent's implementation patterns  
✅ Stay highly engaged  
✅ Natural knowledge transfer

### For Both:

✅ Continuous validation  
✅ Shared ownership  
✅ Prevents one person from getting stuck  
✅ Fun and interactive!

## Tips for Success

1. **Keep rounds short** - 1-3 tests per round
2. **Communicate clearly** - Say when you're done
3. **Learn from each other** - Notice patterns
4. **Ask questions** - "Why did you test it that way?"
5. **Celebrate wins** - "Nice implementation!"

## Common Pitfalls

❌ **Unequal rounds** - Keep them balanced  
❌ **Rushing** - Take time to write good tests  
❌ **Not learning** - Pay attention to the other's approach  
❌ **Losing track** - Keep task.md updated

## Variations

### Strict Alternation

- Exactly 1 test per round
- Perfect balance
- Can be slow

### Flexible Alternation (Recommended)

- 1-3 tests per round
- Adjust based on complexity
- More natural flow

### Feature-Based Alternation

- You handle Feature A entirely
- Agent handles Feature B entirely
- Then switch for next features

## Tracking Progress

Update `current_task.md` after each round:

```markdown
## Checklist

- [x] Win rate calculation (You: test, Agent: impl)
- [x] Edge cases (Agent: test, You: impl)
- [/] Average score (You: test, Agent: impl)
- [ ] Component rendering
- [ ] Sorting functionality
```

## Example Session

```
You: "Let's tag-team the statistics feature. I'll start with a test."

[You write test for win rate]

You: "Test written! Your turn."

Agent: "Implementing... Done! Test passes. My turn to write a test."

[Agent writes test for edge cases]

Agent: "Test written! Your turn to implement."

You: "Already passes! Next test is mine..."

[You write test for average score]

You: "Test written!"

Agent: "Implementing... Done! This is fun! 😊"
```

## Transitioning Out

Once comfortable, try:

1. **Reverse TDD** - Agent writes all tests
2. **Mob Programming** - Real-time collaboration
3. **Standard TDD** - You write tests first

---

**Ready to tag-team?** Just say: "Let's use Tag-Team Development!" 🏃‍♂️🏃‍♀️
