# 🚀 Deployment Guide - AWS S3 + CloudFront

This project is deployed on AWS S3 with CloudFront distribution.

## Prerequisites

1. **AWS CLI installed**
   ```bash
   # Check if installed
   aws --version
   
   # If not installed, install from:
   # https://aws.amazon.com/cli/
   ```

2. **AWS Credentials configured**
   
   You have two options:

   **Option A: Environment variables (recommended for CI/CD)**
   ```bash
   export AWS_ACCESS_KEY_ID="AKIAZVZBOPN5T77KQ3C3"
   export AWS_SECRET_ACCESS_KEY="<your-secret-key>"
   export AWS_DEFAULT_REGION="us-east-1"
   ```

   **Option B: AWS CLI configure**
   ```bash
   aws configure
   # Enter your credentials when prompted
   ```

## Deployment

### Staging Deployment

```bash
npm run deploy:staging
```

Deploys to: `s3://next-bakers-tezos-com.tzstaging.com/`
URL: https://next-bakers-tezos-com.tzstaging.com

### Production Deployment

```bash
npm run deploy:prod
```

Deploys to: `s3://site-prod.bakers.tezos.com/`
URL: https://bakers.tezos.com

**Note:** Production deployment automatically invalidates CloudFront cache.

## Manual Deployment Steps

If you prefer to deploy manually:

1. **Build the static site**
   ```bash
   npm run build
   ```
   This creates an `out/` directory with static files.

2. **Upload to S3**
   ```bash
   # Staging
   aws s3 sync out/ s3://next-bakers-tezos-com.tzstaging.com/ --delete
   
   # Production
   aws s3 sync out/ s3://site-prod.bakers.tezos.com/ --delete
   ```

3. **Invalidate CloudFront cache (production only)**
   ```bash
   aws cloudfront create-invalidation \
     --distribution-id E1VVV2BAWH2CSJ \
     --paths "/*"
   ```

## S3 Bucket Configuration

- **Production**: `s3://site-prod.bakers.tezos.com/`
- **Staging**: `s3://next-bakers-tezos-com.tzstaging.com/`

## CloudFront Distribution

- **Distribution ID**: `E1VVV2BAWH2CSJ`
- **Domain**: `bakers.tezos.com`

## Important Notes

1. **Static Export**: The site is exported as static HTML/CSS/JS files. All data fetching happens client-side.

2. **Image Optimization**: Images are unoptimized in static export mode (S3 doesn't support Next.js image optimization). Images are already optimized (WebP format) in the build process.

3. **Cache Headers**: 
   - Static assets (JS/CSS): `max-age=31536000, immutable`
   - HTML files: `max-age=0, must-revalidate`

4. **Cache Invalidation**: CloudFront cache invalidation takes 1-2 minutes to complete.

## Troubleshooting

### Error: AWS credentials not configured
```bash
# Set environment variables
export AWS_ACCESS_KEY_ID="AKIAZVZBOPN5T77KQ3C3"
export AWS_SECRET_ACCESS_KEY="<your-secret-key>"
```

### Error: Permission denied
```bash
# Make script executable
chmod +x scripts/deploy-s3.sh
```

### Build fails
```bash
# Clear Next.js cache
rm -rf .next out
npm run build
```

## Security

⚠️ **Never commit AWS credentials to Git!**

- Use environment variables
- Add `.env` to `.gitignore`
- Use AWS IAM roles in CI/CD environments

