# Reverse TDD Workflow

**Agent writes tests, you implement code**

## Overview

In this workflow, the traditional TDD roles are reversed:

- **Agent (QA Buddy)** writes failing tests that define the feature
- **You (Maker)** implement code until all tests pass
- Focus on learning testing patterns and TDD methodology

## Ratings

- **Collaboration Level**: High
- **Learning Value**: ⭐⭐⭐⭐⭐
- **Speed**: Medium

## When to Use

✅ **Best for:**

- Learning how to write good tests
- Understanding TDD methodology
- Exploring new testing frameworks
- When you want to focus on implementation

❌ **Not ideal for:**

- Time-sensitive features
- When you're already comfortable with testing
- Very simple features

## Step-by-Step Flow

### 1. Setup (Liaison → Coordinator)

```
You: "I want to add a statistics page showing player win rates"
Agent (Coordinator): Creates task.md with checklist
```

### 2. Test Writing (Agent as QA Buddy)

```
Agent writes first failing test:

// PlayerStats.test.tsx
test('calculates win rate correctly', () => {
  const stats = calculateWinRate(3, 5); // 3 wins out of 5 games
  expect(stats).toBe(60);
});

Agent: "Test written! It's failing because calculateWinRate doesn't exist yet.
       Your turn to implement it."
```

### 3. Implementation (You as Maker)

```
You write code:

export function calculateWinRate(wins: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((wins / total) * 100);
}

You: "Done! Running tests..."
```

### 4. Verification

```
Agent: "Great! Test passes. Let me write the next test for edge cases..."

test('handles zero games', () => {
  const stats = calculateWinRate(0, 0);
  expect(stats).toBe(0);
});

Agent: "This one passes too! Moving to next feature..."
```

### 5. Repeat

Continue this cycle until all features are complete.

## Example Scenario

### Feature: Player Statistics Page

**Task Breakdown:**

1. Calculate win rate
2. Calculate average score
3. Display in sortable table
4. Add navigation link

**Workflow:**

#### Round 1: Win Rate Calculation

```
Agent writes test:
- test('calculates win rate correctly')
- test('handles zero games')
- test('handles all wins')
- test('handles all losses')

You implement:
- calculateWinRate function
- Edge case handling
- Run tests → All pass ✅
```

#### Round 2: Average Score

```
Agent writes test:
- test('calculates average score')
- test('handles empty score array')
- test('rounds to 2 decimal places')

You implement:
- calculateAverageScore function
- Run tests → All pass ✅
```

#### Round 3: Component Rendering

```
Agent writes test:
- test('renders player names')
- test('displays win rates')
- test('sorts by column click')

You implement:
- PlayerStats component
- Sorting logic
- Run tests → All pass ✅
```

## Communication Pattern

### Agent Says:

- "Here's the next test. It's failing because..."
- "This test covers the edge case where..."
- "All tests passing! Ready for the next feature?"

### You Say:

- "Implemented! Running tests now..."
- "Tests pass! What's next?"
- "Can you add a test for [edge case]?"

## Benefits

### For You:

✅ Learn what makes a good test  
✅ Understand test-first thinking  
✅ Focus purely on implementation  
✅ See how tests guide design  
✅ Build confidence in TDD

### For the Agent:

✅ Ensure comprehensive test coverage  
✅ Define clear requirements  
✅ Catch edge cases early

## Tips for Success

1. **Read the tests carefully** - They tell you exactly what to implement
2. **Ask questions** - If a test is unclear, ask the agent to explain
3. **Run tests frequently** - Get immediate feedback
4. **Don't over-implement** - Only write code to make tests pass
5. **Suggest edge cases** - If you think of a scenario, ask for a test

## Common Pitfalls

❌ **Implementing before reading tests** - Read the test first!  
❌ **Over-engineering** - Keep it simple, just make tests pass  
❌ **Skipping test runs** - Run tests after each change  
❌ **Not asking questions** - If confused, ask!

## Variations

### Strict Mode

- Agent writes ALL tests upfront
- You implement everything
- Run full test suite at end

### Iterative Mode (Recommended)

- Agent writes 1-3 tests
- You implement
- Repeat in small cycles

### Guided Mode

- Agent writes test with hints in comments
- You implement with guidance
- Good for learning

## Example Commands

```bash
# Run tests in watch mode
npm run test

# Run specific test file
npm run test PlayerStats.test.tsx

# Run with coverage
npm run test:coverage
```

## Transitioning Out

Once comfortable with this workflow, try:

1. **Tag-Team Development** - Take turns writing tests
2. **Standard TDD** - You write tests first
3. **Mob Programming** - Collaborate on both tests and code

---

**Ready to try it?** Just tell the agent: "Let's use Reverse TDD for this feature!" 🚀
