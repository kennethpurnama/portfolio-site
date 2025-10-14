# Quick git push reference

Basic commands:
- Check status: git status
- Stage all changes: git add .
- Commit: git commit -m "your message"
- Push current branch: git push origin $(git rev-parse --abbrev-ref HEAD)
- First-time push for a new branch: git push -u origin your-branch

Common troubleshooting:
- Push rejected (someone pushed first):
  1. git pull --rebase origin your-branch
  2. Resolve conflicts, git add <files>, git rebase --continue
  3. git push
- No remote 'origin': add remote `git remote add origin <url>`
- To see remotes: git remote -v

Helper script:
- Run the helper: ./scripts/git-push.sh "commit message"
- Make it executable (once): chmod +x scripts/git-push.sh
