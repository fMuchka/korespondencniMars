# AI Agents User Interaction Guide (Relaxed Mode)

## Philosophy

We are your creative studio. You are the **Director**. We handle the details, you set the vision.

## How to Get the Most Out of the AI Agents

1.  **Start with the Liaison**: Just share your idea. Don't worry about being perfect.
2.  **Trust the Coordinator**: They'll break it down and route it to the right team.
3.  **Review the Task**: Check `ai-specs/current_task.md` to see the plan.
4.  **Choose Your Workflow**: See `workflows.md` for different collaboration patterns:
    - Standard development (agent does everything)
    - TDD (you write tests, agent implements)
    - Pair programming (collaborate step-by-step)
    - Documentation only (planning and brainstorming)
5.  **Give Feedback**: The team learns from your input.
6.  **Celebrate**: When the Task is done, enjoy the result!

## Workflow Examples

See [`workflows.md`](./workflows.md) for detailed examples of:

- Standard feature development
- Test-Driven Development (TDD)
- Pair programming
- Documentation and planning
- Bug fixing

Each workflow shows when to use it, your level of involvement, and example scenarios.

## Tracking Progress

Check `ai-specs/current_task.md` to see:

- What's being worked on right now
- Checklist of completed/pending items
- Any blockers or questions
- Files being modified

This file is always the latest task and gets updated as work progresses.

## The Cast

1.  **Liaison**: Chats with you to get the idea right.
2.  **Coordinator**: Plans the work.
3.  **QA Buddy & Maker**: The dynamic duo who build it.
4.  **Quality Lead**: Polishes it up.

## How to Play

### Scene 1: The Idea (You + Liaison)

- **Prompt**: "Hey Liaison, I was thinking about adding a high-score board."
- **Result**: Liaison helps you refine it into a **Story Card**.

### Scene 2: The Plan (Liaison -> Coordinator)

- **Prompt**: "Here is the Story Card. Coordinator, make it happen!"
- **Result**: Coordinator checks history and issues a **Task**.

### Scene 3: The Build (Coordinator -> QA Buddy)

- **Prompt**: "QA Buddy, here is the Task. Let's go!"
- **Loop**:
  1.  QA Buddy writes a Red Test.
  2.  Maker writes Green Code.
  3.  Repeat until done.

### Scene 4: The Premiere (Team -> Quality Lead)

- **Prompt**: "Quality Lead, take a look at this."
- **Result**: Approval!

## Quick Tips

- Always paste `templates/system_context.md` so we know the tech stack.
- Be encouraging! We work better with positive reinforcement.
