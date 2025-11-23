# Security Policy

## 🔒 Reporting a Vulnerability

The Tezos Baking Portal team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings, and will make every effort to acknowledge your contributions.

### How to Report a Security Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via the following methods:

1. **GitHub Security Advisories**
   - Go to the Security tab on GitHub
   - Click "Report a vulnerability"
   - Fill out the form with details

### What to Include in Your Report

Please include the following information:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### Response Timeline

- **Initial Response**: Within 48 hours of receiving your report
- **Status Update**: Within 7 days with an assessment of the issue
- **Resolution**: We'll work with you to understand and resolve the issue promptly
- **Disclosure**: After the issue is fixed, we'll work with you on a public disclosure timeline

## 🛡️ Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | ✅ Yes            |
| < 1.0   | ❌ No             |

## 🔐 Security Best Practices

If you're deploying this project, we recommend:

### For Developers

- Keep dependencies up to date
- Use environment variables for sensitive data
- Never commit secrets or API keys
- Enable dependabot alerts
- Review security advisories regularly

### For Deployments

- Use HTTPS in production
- Set up proper CORS policies
- Implement rate limiting
- Use secure headers (CSP, HSTS, etc.)
- Regular security audits
- Monitor for suspicious activity

## 📦 Dependency Security

This project uses:

- **Dependabot** - Automated dependency updates
- **npm audit** / **pnpm audit** - Vulnerability scanning
- **Snyk** (optional) - Continuous security monitoring

### Running Security Checks

```bash
# Check for known vulnerabilities
pnpm audit

# Fix automatically (when possible)
pnpm audit --fix

# Check for outdated dependencies
pnpm outdated
```

## 🔄 Security Update Process

When a security vulnerability is reported:

1. **Acknowledgment**: We acknowledge receipt within 48 hours
2. **Assessment**: We assess the severity and impact
3. **Fix Development**: We develop a fix in a private branch
4. **Testing**: Thorough testing of the fix
5. **Release**: Security patch released
6. **Disclosure**: Coordinated public disclosure
7. **Credit**: Reporter credited (if desired)

## 📝 Security Advisories

Past security advisories can be found in the Security Advisories section on GitHub.

## 🏆 Hall of Fame

We appreciate the security researchers who help keep our project safe:

<!-- Contributors will be listed here after responsible disclosure -->

## ⚠️ Known Limitations

- This project relies on third-party APIs (TzKT)
- No authentication system (public data only)
- Client-side caching may store blockchain data locally

## 📚 Additional Resources

- [OWASP Top Ten](https://owasp.org/www-project-top-ten/)
- [Security Best Practices for Node.js](https://nodejs.org/en/docs/guides/security/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)

## 📞 Contact

For general questions about security:
- Create a GitHub Discussion
- Open a GitHub Issue with the [security] tag

---

**Thank you for helping keep Tezos Baking Portal and our users safe!** 🙏

