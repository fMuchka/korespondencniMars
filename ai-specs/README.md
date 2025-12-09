# AI Agents: Your AI Development Team

Welcome to the AI Agents specifications! This directory contains everything you need to collaborate effectively with your AI development team.

## 🚀 Quick Start

1. **Start with the Liaison** - Just share your idea
2. **Review the Task** - Check [`current_task.md`](./current_task.md) to see the plan
3. **Choose a workflow** - See [workflows guide](./guides/workflows.md)
4. **Track progress** - Watch [`current_task.md`](./current_task.md) get updated

## 📁 Structure

```
A_Team/
├── README.md                    ← You are here
├── current_task.md              ← Active work tracking
│
├── guides/                      ← How to work with the team
│   ├── how_to_collaborate.md    ← Quick collaboration guide
│   └── workflows.md             ← Collaboration patterns
│
├── agents/                      ← Agent specifications
│   ├── manifest.md              ← Agent overview
│   ├── liaison.md               ← Your first contact
│   ├── coordinator.md           ← Task planner
│   ├── maker.md                 ← Code writer
│   ├── qa_buddy.md              ← Test writer
│   └── quality_lead.md          ← Final reviewer
│
└── templates/                   ← Project templates
    ├── system_context.md        ← Tech stack reference
    ├── project_history_template.md
    └── roadmap_template.md
```

## 📖 Documentation

### For Users

- **[How to Collaborate](./guides/how_to_collaborate.md)** - Quick guide to working with the AI agents
- **[Workflows Guide](./guides/workflows.md)** - Collaboration patterns for different scenarios:
  - Standard development
  - Test-Driven Development (TDD)
  - Pair programming
  - Bug fixing
  - Documentation & planning

### For Understanding the Team

- **[Agent Manifest](./agents/manifest.md)** - Overview of all agents and their roles
- **Individual Agent Specs** - Detailed specifications in [`agents/`](./agents/)

### Active Work

- **[current_task.md](./current_task.md)** - Always shows what's being worked on right now
  - Type: Bug or Feature
  - Status: In Progress / Blocked / Complete
  - Checklist of items
  - Notes and decisions

## 🎯 Common Workflows

### Standard Feature Development

```
You: "I want feature X"
→ Agent creates task.md
→ Agent implements
→ You review
```

### Test-Driven Development (TDD)

```
You: "I want feature X"
→ Agent creates task.md
→ You write tests
→ Agent implements until tests pass
→ You review
```

### Bug Fixing

```
You: "Bug: X is broken"
→ Agent creates task.md
→ Agent investigates and fixes
→ Agent writes regression test
→ You verify
```

## 🔧 Key Concepts

### Task Types

- **Feature** - New functionality or enhancements
- **Bug** - Fixes for broken behavior

### Task Statuses

- **In Progress** - Currently being worked on
- **Blocked** - Waiting for something (usually user input)
- **Complete** - Done and verified

### Workflows

- **Standard** - Agent does everything, you review
- **TDD** - You write tests, agent implements
- **Pair Programming** - Collaborate step-by-step
- **Documentation** - Planning and brainstorming only
- **Bug Fix** - Investigate and fix issues

## 💡 Tips

1. **Be specific** - Clear requirements = better results
2. **Review early** - Catch issues before they compound
3. **Check current_task.md** - Always know what's happening
4. **Choose the right workflow** - Match the approach to the task
5. **Give feedback** - Help the team learn and improve

## 🎓 Learning More

- Read [How to Collaborate](./guides/how_to_collaborate.md) for a quick overview
- Explore [Workflows Guide](./guides/workflows.md) for detailed patterns
- Check [Agent Manifest](./agents/manifest.md) to understand the team structure

---

**Ready to start?** Just share your idea with the Liaison and let the AI agents handle the rest! 🚀
