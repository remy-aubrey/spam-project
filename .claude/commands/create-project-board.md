# Create Project Board from Tickets

Read the `.github/tickets.md` file and create a GitHub project board with all the tickets as issues.

## Your Task:

1. Read the `.github/tickets.md` file
2. Parse all tickets from the markdown (each ticket is separated by `---`)
3. **FIRST: Create all necessary labels in the repository:**
   - Category labels: auth0, frontend, backend, test, software quality, Tailwind CSS
   - Priority labels: P1, P2, P3
   - Size labels: S, M, L
   - Use `gh label create` for each one (skip if already exists)
4. For each ticket, extract:
   - Title (the heading after `###`)
   - Description (everything under `**Description:**`)
   - Labels (from `**Labels:**`)
   - Priority (from `**Priority:**`)
   - Size (from `**Size:**`)
5. Use `gh issue create` to create each ticket as a GitHub issue with all labels applied
6. Create or update the project board using `gh project`
7. Add all created issues to the project board
8. Report back how many issues were created

## Important:
- **ALWAYS create labels BEFORE creating issues** to avoid "label not found" errors
- Check if issues already exist before creating duplicates
- Use the existing "Spam Project Board" if it exists, or create a new one
- Handle dependencies between tickets if specified in the "Depends on:" section
- Apply Priority and Size labels to issues when they are specified in the ticket