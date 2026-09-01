# Claude Code Setup Guide

This guide explains how to set up your environment to use the custom Claude Code commands in this repository.

## Prerequisites

### 1. Install Claude Code

Follow the installation instructions at: https://docs.claude.com/claude-code

### 2. Install GitHub CLI

The `/create-project-board` command uses the GitHub CLI to create issues and project boards.

**macOS:**
```bash
brew install gh
```

**Windows:**
```bash
winget install GitHub.cli
```

**Linux:**
```bash
# Debian/Ubuntu
sudo apt install gh

# Fedora/RHEL
sudo dnf install gh
```

Or visit: https://cli.github.com/

### 3. Authenticate with GitHub

After installing `gh`, authenticate with your GitHub account:

```bash
gh auth login
```

Follow the prompts:
- Choose "GitHub.com"
- Choose "HTTPS" or "SSH" (your preference)
- Choose "Login with a web browser"
- Copy the one-time code and paste it in your browser
- Authorize GitHub CLI

**Verify authentication:**
```bash
gh auth status
```

You should see: "✓ Logged in to github.com as YOUR_USERNAME"

### 4. Verify Permissions

Make sure you have the correct permissions for this repository:

**For creating issues:**
- You need **Write** access to the repository

**For creating project boards:**
- You need **Admin** access to the repository OR
- Organization-level permissions to create projects

**Check your access:**
```bash
gh repo view ngahuru-2025/spam
```

If you don't have the required permissions, ask the repository owner to grant you access.

### 5. Test GitHub CLI

Test that everything works:

```bash
# List existing issues
gh issue list

# List existing projects
gh project list --owner ngahuru-2025
```

If these commands work, you're all set!

## Using Custom Commands

### Available Commands

#### `/create-project-board`
Creates a GitHub project board and issues from the `.github/tickets.md` file.

**Usage:**
```
/create-project-board
```

Claude will:
1. Read the tickets.md file
2. Parse all tickets
3. Create GitHub issues for each ticket
4. Create or update the project board
5. Link issues to the project board

### Troubleshooting

**"gh: command not found"**
- GitHub CLI is not installed. Follow step 2 above.

**"gh: not logged in"**
- You need to authenticate. Run `gh auth login`

**"GraphQL: Could not resolve to a Repository"**
- You don't have access to the repository, or the repo name is incorrect
- Check with `gh repo view`

**"403 Forbidden" when creating issues**
- You don't have write access to the repository
- Ask the repository owner to grant you collaborator access

**"Could not create project"**
- You don't have permission to create projects
- Projects might need to be created at the organization level
- Ask an admin to create the project board or grant you permissions

## Questions?

If you run into issues, check:
- https://cli.github.com/manual/
- https://docs.claude.com/claude-code
- Ask your team lead for help with permissions