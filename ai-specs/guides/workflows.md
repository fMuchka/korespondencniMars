# Collaboration Workflows

This guide presents various collaboration patterns between you and the AI agents, organized to help you choose the right approach for your situation.

> [!NOTE]
> **Evaluation Criteria**: All workflows have been evaluated by the AI agent based on practical collaboration experience. Ratings are subjective and may vary based on your context.

---

## 📊 Quick Comparison

| Workflow                                      | Collab Level | Learning   | Speed     | Best For             |
| --------------------------------------------- | ------------ | ---------- | --------- | -------------------- |
| [Standard Development](#standard-development) | Low          | ⭐⭐       | Fast      | Most features        |
| [TDD (You Write Tests)](#tdd-you-write-tests) | Medium       | ⭐⭐⭐⭐   | Medium    | Critical features    |
| [Reverse TDD](#reverse-tdd)                   | High         | ⭐⭐⭐⭐⭐ | Medium    | Learning testing     |
| [Tag-Team](#tag-team-development)             | High         | ⭐⭐⭐⭐⭐ | Medium    | Balanced learning    |
| [Solo Dev + Review](#solo-dev--review)        | Low          | ⭐⭐⭐     | Fast      | Independent work     |
| [Mob Programming](#mob-programming)           | Very High    | ⭐⭐⭐⭐   | Slow      | Complex problems     |
| [Spike & Stabilize](#spike--stabilize)        | Medium       | ⭐⭐⭐     | Fast      | Prototyping          |
| [Design → Implement](#design--implement)      | Medium       | ⭐⭐⭐⭐   | Fast      | Architecture         |
| [Parallel Development](#parallel-development) | Low          | ⭐⭐       | Very Fast | Independent features |
| [Bug Hunt & Fix](#bug-hunt--fix)              | Medium       | ⭐⭐⭐     | Medium    | Debugging            |
| [Documentation Only](#documentation-only)     | Medium       | ⭐⭐⭐     | Fast      | Planning             |

---

## 🎯 Choose by Goal

**Learning?** → [Reverse TDD](#reverse-tdd), [Tag-Team](#tag-team-development), [Mob Programming](#mob-programming)  
**Speed?** → [Standard](#standard-development), [Solo Dev + Review](#solo-dev--review), [Parallel](#parallel-development)  
**Quality?** → [TDD](#tdd-you-write-tests), [Solo Dev + Review](#solo-dev--review), [Tag-Team](#tag-team-development)  
**Exploration?** → [Spike & Stabilize](#spike--stabilize), [Documentation Only](#documentation-only)

---

## Workflows

### Standard Development

**Agent does everything, you review**

- **You**: Provide requirements
- **Agent**: Plan → Code → Test → Review
- **Best for**: Most features, quick delivery

**[→ Detailed guide](./examples/standard-dev.md)** _(coming soon)_

---

### TDD (You Write Tests)

**You write tests first, agent implements**

- **You**: Write tests defining success
- **Agent**: Implement until tests pass
- **Best for**: Critical features, learning codebase

**Example:**

```
You write: test('calculates win rate correctly')
Agent implements: calculateWinRate() function
Tests pass ✅
```

---

### Reverse TDD

**Agent writes tests, you implement**

- **Agent**: Write failing tests
- **You**: Implement until tests pass
- **Best for**: Learning testing patterns, TDD methodology

**[→ Detailed guide](./examples/reverse-tdd.md)**

---

### Tag-Team Development

**Alternate between testing and implementation**

- **Round 1**: You write test → Agent implements
- **Round 2**: Agent writes test → You implement
- **Repeat** until complete
- **Best for**: Balanced learning, high engagement

**[→ Detailed guide](./examples/tag-team.md)**

---

### Solo Dev + Review

**You build everything, agent reviews**

- **You**: Write tests AND code
- **Agent**: Review for quality, standards, best practices
- **Best for**: Independent work, fast iteration

**[→ Detailed guide](./examples/solo-dev-review.md)**

---

### Mob Programming

**Real-time collaborative coding**

- **You**: Navigate (guide approach)
- **Agent**: Drive (write code)
- **Together**: Discuss and refine
- **Best for**: Complex problems, architectural decisions

**[→ Detailed guide](./examples/mob-programming.md)**

---

### Spike & Stabilize

**Prototype fast, refine later**

- **Phase 1**: You quickly prototype (messy OK)
- **Phase 2**: Agent refactors, adds tests, cleans up
- **Best for**: Exploring ideas, proof of concepts

**[→ Detailed guide](./examples/spike-stabilize.md)**

---

### Design → Implement

**Specification-driven development**

- **You**: Write detailed specs/pseudocode
- **Agent**: Translate to code with tests
- **Best for**: Architecture learning, when you know WHAT not HOW

**[→ Detailed guide](./examples/design-implement.md)**

---

### Parallel Development

**Work on separate features simultaneously**

- **You**: Work on Feature A
- **Agent**: Work on Feature B
- **Then**: Integrate and test together
- **Best for**: Independent features, maximum speed

**[→ Detailed guide](./examples/parallel-dev.md)**

---

### Bug Hunt & Fix

**Collaborative debugging**

- **You**: Find bugs, write reproduction tests
- **Agent**: Fix bugs, ensure tests pass
- **Best for**: Debugging sessions, quality improvement

**[→ Detailed guide](./examples/bug-hunt-fix.md)**

---

### Documentation Only

**Planning and brainstorming**

- **You**: Share ideas and requirements
- **Agent**: Document in structured format
- **Together**: Discuss trade-offs
- **Best for**: Architecture decisions, planning sprints

**Example:**

```
You: "Thinking about adding multiplayer sessions"
Agent creates:
- Architecture document
- Technical considerations
- Implementation phases
- Risk assessment
```

---

## 🤝 By Collaboration Level

### Very High

- [Mob Programming](#mob-programming)

### High

- [Reverse TDD](#reverse-tdd)
- [Tag-Team Development](#tag-team-development)

### Medium

- [TDD (You Write Tests)](#tdd-you-write-tests)
- [Spike & Stabilize](#spike--stabilize)
- [Design → Implement](#design--implement)
- [Bug Hunt & Fix](#bug-hunt--fix)
- [Documentation Only](#documentation-only)

### Low

- [Standard Development](#standard-development)
- [Solo Dev + Review](#solo-dev--review)
- [Parallel Development](#parallel-development)

---

## 📚 By Learning Value

### Highest (⭐⭐⭐⭐⭐)

- [Reverse TDD](#reverse-tdd)
- [Tag-Team Development](#tag-team-development)

### High (⭐⭐⭐⭐)

- [TDD (You Write Tests)](#tdd-you-write-tests)
- [Mob Programming](#mob-programming)
- [Design → Implement](#design--implement)

### Medium (⭐⭐⭐)

- [Solo Dev + Review](#solo-dev--review)
- [Spike & Stabilize](#spike--stabilize)
- [Bug Hunt & Fix](#bug-hunt--fix)
- [Documentation Only](#documentation-only)

### Lower (⭐⭐)

- [Standard Development](#standard-development)
- [Parallel Development](#parallel-development)

---

## ⚡ By Speed

### Very Fast

- [Parallel Development](#parallel-development)

### Fast

- [Standard Development](#standard-development)
- [Solo Dev + Review](#solo-dev--review)
- [Spike & Stabilize](#spike--stabilize)
- [Design → Implement](#design--implement)
- [Documentation Only](#documentation-only)

### Medium

- [TDD (You Write Tests)](#tdd-you-write-tests)
- [Reverse TDD](#reverse-tdd)
- [Tag-Team Development](#tag-team-development)
- [Bug Hunt & Fix](#bug-hunt--fix)

### Slow

- [Mob Programming](#mob-programming)

---

## 💡 Tips for Success

### General

1. **Mix and match** - Use different workflows for different tasks
2. **Start simple** - Try Standard or Solo Dev + Review first
3. **Communicate** - Tell the agent which workflow you want
4. **Iterate** - Adjust if it's not working
5. **Have fun** - Experiment and find what works!

### For You

- **Be specific** - Clear requirements = better results
- **Review early** - Catch issues before they compound
- **Write tests** - Best way to communicate intent
- **Ask questions** - Agent can explain decisions

### For Agent

- **Create task.md** - Keep work trackable
- **Update progress** - Mark items as you go
- **Follow workflow** - Respect the chosen pattern
- **Communicate blockers** - Ask when stuck

---

## 🔄 Evolution Path

As you gain experience:

```
Standard Development
    ↓
Solo Dev + Review
    ↓
Tag-Team Development
    ↓
Reverse TDD
    ↓
Mob Programming (complex features)
```

Or for rapid development:

```
Spike & Stabilize
    ↓
Design → Implement
    ↓
Parallel Development
```

---

## 📋 Task File Format

All workflows use `ai-specs/current_task.md`:

```markdown
# [Task Name]

**Type:** Bug / Feature
**Status:** In Progress / Blocked / Complete
**Started:** 2025-12-09
**Workflow:** Standard / TDD / Reverse TDD / etc.

## Checklist

- [x] Completed item
- [/] In progress item
- [ ] Pending item

## Notes

- Important context
- Blockers or questions
```

---

**Ready to start?** Pick a workflow and tell the agent: "Let's use [workflow name] for this!" 🚀
