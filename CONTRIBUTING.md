# Contributing to Tezos Baking Portal

First off, thank you for considering contributing to Tezos Baking Portal! 🎉

It's people like you that make this project such a great tool for the Tezos community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Pledge

We are committed to making participation in this project a harassment-free experience for everyone, regardless of:

- Age
- Body size
- Disability
- Ethnicity
- Gender identity and expression
- Level of experience
- Nationality
- Personal appearance
- Race
- Religion
- Sexual identity and orientation

---

## 🤝 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates.

When you create a bug report, please include:

- **Clear title and description**
- **Steps to reproduce** the problem
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, Node version, browser)

**Template:**

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
- OS: [e.g. macOS, Windows, Linux]
- Node version: [e.g. 18.17.0]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.0.0]
```

### 💡 Suggesting Features

Feature suggestions are welcome! Before creating a feature request:

- Check if the feature has already been suggested
- Clearly describe the feature and its benefits
- Explain why this feature would be useful to most users

**Template:**

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
A clear description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

### 📝 Improving Documentation

Documentation improvements are always welcome! This includes:

- Fixing typos or clarifying existing docs
- Adding examples and tutorials
- Translating documentation
- Improving code comments

### 💻 Code Contributions

We love code contributions! Here are some areas where you can help:

- **Bug fixes**
- **New features**
- **Performance improvements**
- **Test coverage**
- **Code refactoring**
- **UI/UX improvements**

---

## 🛠️ Development Setup

### Prerequisites

- Node.js ≥ 18.17
- pnpm (recommended) or npm
- Git

### Setup Steps

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/tezos-baking-portal.git
   cd tezos-baking-portal
   ```

2. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/original-owner/tezos-baking-portal.git
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

6. **Make your changes** and test thoroughly

7. **Run linting**
   ```bash
   pnpm lint
   ```

8. **Build to ensure no errors**
   ```bash
   pnpm build
   ```

---

## 📐 Coding Standards

### TypeScript

- ✅ Use TypeScript for all new files
- ✅ Define proper types/interfaces (avoid `any`)
- ✅ Use meaningful variable and function names
- ✅ Add JSDoc comments for complex functions

**Example:**

```typescript
/**
 * Fetch baker details from TzKT API with caching
 * @param address - Baker's Tezos address
 * @returns Promise with baker details
 */
export async function getBakerDetails(address: string): Promise<Baker> {
  // Implementation
}
```

### React Components

- ✅ Use functional components with hooks
- ✅ Keep components small and focused
- ✅ Extract reusable logic into custom hooks
- ✅ Use meaningful prop names

**Example:**

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  children: React.ReactNode
}

export function Button({ variant = 'primary', size = 'md', onClick, children }: ButtonProps) {
  // Implementation
}
```

### Styling

- ✅ Use Tailwind CSS utility classes
- ✅ Use the `cn()` utility for conditional classes
- ✅ Follow existing color and spacing patterns
- ✅ Ensure responsive design (mobile-first)

**Example:**

```typescript
<button 
  className={cn(
    "px-4 py-2 rounded-lg",
    variant === 'primary' && "bg-blue-600 text-white",
    variant === 'secondary' && "bg-gray-200 text-gray-900",
    "hover:opacity-90 transition-opacity"
  )}
>
  {children}
</button>
```

### File Organization

- ✅ Place components in `components/` or `components/ui/`
- ✅ Place utilities in `lib/`
- ✅ Place hooks in `hooks/`
- ✅ Place pages in `app/`
- ✅ Keep related files together

### Code Style

- ✅ Use 2 spaces for indentation
- ✅ Use semicolons
- ✅ Use single quotes for strings
- ✅ Add trailing commas in multi-line objects/arrays
- ✅ Keep lines under 120 characters
- ✅ Add blank lines between logical sections

---

## 📝 Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Changes to build process or auxiliary tools

### Examples

```bash
feat(cache): add stale-while-revalidate strategy

Implements background data refresh while serving cached data
for better perceived performance.

Closes #123
```

```bash
fix(stats): correct APY calculation for small bakers

The calculation was incorrect for bakers with less than 6000 XTZ.
Now properly handles edge cases.

Fixes #456
```

```bash
docs(readme): update installation instructions

Added troubleshooting section for common setup issues.
```

---

## 🔄 Pull Request Process

### Before Submitting

1. ✅ Update documentation if needed
2. ✅ Add tests if applicable
3. ✅ Run `pnpm lint` and fix any issues
4. ✅ Run `pnpm build` to ensure no build errors
5. ✅ Test your changes thoroughly
6. ✅ Update CHANGELOG.md if applicable

### PR Title Format

Use the same format as commit messages:

```
feat(scope): add new feature
fix(scope): resolve bug
docs(scope): update documentation
```

### PR Description Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
Describe the tests you ran and how to reproduce them.

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Related Issues
Closes #(issue number)
```

### Review Process

1. At least one maintainer must approve the PR
2. All CI checks must pass
3. All conversations must be resolved
4. Branch must be up to date with main

### After Approval

Your PR will be merged using "Squash and merge" to keep the git history clean.

---

## 🐛 Issue Guidelines

### Issue Labels

We use labels to categorize issues:

- **`bug`** - Something isn't working
- **`enhancement`** - New feature or request
- **`documentation`** - Documentation improvements
- **`good first issue`** - Good for newcomers
- **`help wanted`** - Extra attention is needed
- **`question`** - Further information is requested
- **`wontfix`** - This will not be worked on
- **`duplicate`** - This issue already exists

### Issue Templates

We provide templates for:
- Bug reports
- Feature requests
- Documentation improvements

Please use the appropriate template when creating an issue.

---

## 🎯 Areas for Contribution

### High Priority

- [ ] Add comprehensive test coverage
- [ ] Improve mobile responsiveness
- [ ] Add internationalization (i18n)
- [ ] Performance optimizations
- [ ] Accessibility improvements

### Medium Priority

- [ ] Add more baker statistics visualizations
- [ ] Implement advanced filtering and sorting
- [ ] Add export functionality for data
- [ ] Create admin dashboard
- [ ] Add user preferences/settings

### Low Priority

- [ ] Dark/light theme toggle
- [ ] Add animations and transitions
- [ ] Social sharing features
- [ ] PWA support
- [ ] Add more educational content

---

## 💬 Questions?

If you have questions about contributing:

1. Check existing discussions on GitHub
2. Create a new discussion
3. Join our community chat (if available)
4. Contact the maintainers

---

## 🙏 Thank You!

Your contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

Happy coding! 🚀

