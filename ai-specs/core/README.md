# AI Agent Core Framework

This directory contains **universal, reusable** AI agent specifications that can be copied to any project.

## 📦 What's Inside

- **`agents/`** - Agent role specifications (Liaison, Coordinator, Maker, QA Buddy, Quality Lead)
- **`guides/`** - Collaboration workflows and patterns
- **`templates/`** - Blank templates for project-specific files

## 🚀 Using This in a New Project

1. **Copy the entire `core/` directory** to your new project's `ai-specs/` folder
2. **Create a `project/` directory** alongside `core/`
3. **Fill in project-specific files** in `project/`:
   - `system_context.md` - Your tech stack and conventions
   - `current_task.md` - Active work tracking
   - Optional: `project_history.md`, `roadmap.md`

## 📁 Recommended Structure

```
your-new-project/
└── ai-specs/
    ├── core/           ← Copy this entire directory
    └── project/        ← Create and customize for your project
```

## 🔄 Keeping It Updated

If you improve the core framework (better workflows, clearer agent specs), you can:

- Update it in one project
- Copy the improved `core/` to other projects
- Project-specific files in `project/` remain untouched

---

**Ready to start?** Check the [main README](../README.md) for how to work with the AI agents!
