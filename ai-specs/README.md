# AI Agents: Your AI Development Team

Welcome to the AI Agents specifications! This directory contains everything you need to collaborate effectively with your AI development team.

## 🚀 Quick Start

1. **Start with the Liaison** - Just share your idea
2. **Review the Task** - Check [`current_task.md`](./project/current_task.md) to see the plan
3. **Choose a workflow** - See [workflows guide](./core/guides/workflows.md)
4. **Track progress** - Watch [`current_task.md`](./project/current_task.md) get updated

## 📁 Structure

```
ai-specs/
├── README.md                    ← You are here
│
├── core/                        ← Universal (reusable across projects)
│   ├── agents/                  ← Agent specifications
│   │   ├── manifest.md          ← Agent overview
│   │   ├── liaison.md           ← Your first contact
│   │   ├── coordinator.md       ← Task planner
│   │   ├── maker.md             ← Code writer
│   │   ├── qa_buddy.md          ← Test writer
│   │   └── quality_lead.md      ← Final reviewer
│   │
│   ├── guides/                  ← How to work with the team
│   │   ├── how_to_collaborate.md
│   │   ├── workflows.md         ← Collaboration patterns
│   │   └── examples/            ← Workflow examples
│   │
│   └── templates/               ← Blank templates
│       ├── project_history_template.md
│       └── roadmap_template.md
│
└── project/                     ← Project-specific (korespondencniMars)
    ├── current_task.md          ← Active work tracking
    ├── system_context.md        ← Tech stack & conventions
    ├── project_history.md       ← Past decisions (optional)
    └── roadmap.md               ← Future plans (optional)
```

## � Project Context Protocol

> **For AI Agents:** When starting work on a project, follow this protocol:

1. **Check Project Context**: Look for `ai-specs/project/system_context.md`
   - If missing or references a different project → Create fresh from current codebase
   - If present and matches current project → Use it

2. **Verify Task Context**: Check `ai-specs/project/current_task.md`
   - If missing or references a different project → Start fresh
   - If present and matches current project → Continue from where it left off

3. **Use Templates**: Files in `core/templates/` are blueprints
   - Instantiate them in `project/` directory
   - Fill with project-specific information

4. **Portability**: The `core/` directory is universal
   - Copy to any new project as-is
   - Only `project/` directory needs customization

## �📖 Documentation

### For Users

- **[How to Collaborate](./core/guides/how_to_collaborate.md)** - Quick guide to working with the AI agents
- **[Workflows Guide](./core/guides/workflows.md)** - Collaboration patterns for different scenarios:
  - Standard development
  - Test-Driven Development (TDD)
  - Pair programming
  - Bug fixing
  - Documentation & planning

### For Understanding the Team

- **[Agent Manifest](./core/agents/manifest.md)** - Overview of all agents and their roles
- **Individual Agent Specs** - Detailed specifications in [`core/agents/`](./core/agents/)

### Active Work

- **[current_task.md](./project/current_task.md)** - Always shows what's being worked on right now
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

- Read [How to Collaborate](./core/guides/how_to_collaborate.md) for a quick overview
- Explore [Workflows Guide](./core/guides/workflows.md) for detailed patterns
- Check [Agent Manifest](./core/agents/manifest.md) to understand the team structure

---

**Ready to start?** Just share your idea with the Liaison and let the AI agents handle the rest! 🚀
