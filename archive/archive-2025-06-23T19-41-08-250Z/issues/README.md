# README

Created by automated setup

# Issues Directory

This directory is for **local development tracking** and **internal issue management** during development. For user issue reporting, please use [GitHub Issues](https://github.com/[username]/build-app-cm-kit/issues).

## 📝 Local Issue Tracking

This directory can be used to track issues during local development before they're reported to GitHub:

- **Bug Reports**: `BUG-[number]-[brief-description].md`
  - Example: `BUG-001-hydration-error.md`
- **Feature Requests**: `FEATURE-[number]-[brief-description].md`
  - Example: `FEATURE-001-new-cli-command.md`

## 🔍 Before Creating a GitHub Issue

1. **Check existing issues** in this directory for local tracking
2. **Review documentation** at `/docs` in the running application
3. **Try CLI help**: `node utils/cli.js help`
4. **Check examples** in the `examples/` directory
5. **Search GitHub Issues** to avoid duplicates

## 📋 Issue Template for GitHub

When creating issues on GitHub, use this template:

```markdown
## 🐛 Problem Description
[Describe what happened and what you expected to happen]

## 🔍 Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

## 📋 Environment
- **OS**: [e.g., macOS 14.0, Windows 11, Ubuntu 22.04]
- **Node.js Version**: [e.g., v18.17.0]
- **CM Kit Version**: [e.g., v0]
- **Browser**: [if applicable]

## 📸 Screenshots/Logs
[Include any relevant screenshots, error messages, or console logs]

## 💡 Expected Behavior
[Describe what you expected to happen]

## 🔧 Additional Context
[Any other information that might be helpful]
```

## 🚀 Getting Help

- **GitHub Issues**: [Create issues in the project repository](https://github.com/[username]/build-app-cm-kit/issues)
- **Documentation**: Check `/docs` pages in the running application
- **CLI Help**: Run `node utils/cli.js help`
- **Examples**: Review the `examples/` directory
- **Main README**: See the main README.md for detailed setup instructions

## 🏷️ GitHub Issue Labels

Use these labels when creating GitHub issues:
- `bug` - For bug reports
- `enhancement` - For feature requests
- `documentation` - For documentation issues
- `cli` - For CLI-related problems
- `ui` - For user interface issues
