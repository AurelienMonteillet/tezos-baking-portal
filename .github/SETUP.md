# Repository Setup Guide

## Before Making the Repository Public

This guide helps you prepare the repository for public release.

### 1. Update Repository URLs

Replace `YOUR_USERNAME` in README.md with your actual GitHub username:

```markdown
git clone https://github.com/YOUR_USERNAME/tezos-baking-portal.git
```

### 2. Configure GitHub Repository Settings

#### Enable Features
- ✅ Issues
- ✅ Discussions (recommended for community questions)
- ✅ Projects (optional, for roadmap)
- ✅ Wiki (optional)

#### Branch Protection
Add protection rules for `main` branch:
- Require pull request reviews before merging
- Require status checks to pass
- Require conversation resolution before merging

#### GitHub Pages (Optional)
If you want to deploy on GitHub Pages:
1. Go to Settings → Pages
2. Source: GitHub Actions
3. The workflow is already configured in `.github/workflows/deploy.yml`

### 3. Create Issue Labels

Create these labels in your repository:

| Label | Color | Description |
|-------|-------|-------------|
| `bug` | #d73a4a | Something isn't working |
| `enhancement` | #a2eeef | New feature or request |
| `documentation` | #0075ca | Improvements or additions to documentation |
| `good first issue` | #7057ff | Good for newcomers |
| `help wanted` | #008672 | Extra attention is needed |
| `question` | #d876e3 | Further information is requested |
| `wontfix` | #ffffff | This will not be worked on |
| `duplicate` | #cfd3d7 | This issue or pull request already exists |

### 4. Configure Dependabot (Security)

Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

### 5. Add Repository Topics

Add these topics to your repository for better discoverability:
- `tezos`
- `blockchain`
- `baking`
- `cryptocurrency`
- `nextjs`
- `typescript`
- `react`
- `tailwindcss`

### 6. Create Initial Release

When ready for v1.0.0:

```bash
git tag -a v1.0.0 -m "Initial public release"
git push origin v1.0.0
```

Then create a release on GitHub with release notes.

### 7. Social Media & Promotion

Consider announcing on:
- [ ] Tezos Reddit: r/tezos
- [ ] Tezos Forums: forum.tezosagora.org
- [ ] Twitter/X with #Tezos hashtag
- [ ] Dev.to article explaining the project
- [ ] Product Hunt (for wider audience)

### 8. Monitor & Maintain

Set up notifications for:
- New issues
- Pull requests
- Security advisories
- Discussions

---

## Post-Launch Checklist

After making the repository public:

- [ ] Star your own repository (yes, really!)
- [ ] Add a repository description
- [ ] Add a website URL (if deployed)
- [ ] Enable Discussions
- [ ] Create initial "Welcome" discussion post
- [ ] Add CODEOWNERS file (optional)
- [ ] Set up GitHub Actions for CI/CD
- [ ] Configure branch protection rules
- [ ] Add project to relevant awesome-lists
- [ ] Share with the Tezos community

---

## Maintenance Tasks

### Weekly
- Review and respond to issues
- Review pull requests
- Update dependencies if needed

### Monthly
- Check for security vulnerabilities
- Update documentation if needed
- Review and update roadmap

### Quarterly
- Major version updates
- Feature additions
- Community feedback integration

---

Good luck with your open source project! 🚀

