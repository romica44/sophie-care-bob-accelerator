# Vercel Deployment Guide

## Recommended platform

Use Vercel because the project is a Next.js application and can be deployed with the free tier.

## Steps

1. Push this repository to GitHub.
2. Go to Vercel.
3. Create a new project.
4. Import the GitHub repository.
5. Keep default Next.js settings.
6. Deploy.
7. Copy the live URL and use it in the lablab.ai submission form.

## Environment variables

No environment variables are required for the default demo.

Optional variables can be added later if real provider integrations are enabled:

```txt
OPENAI_API_KEY
IBM_WATSONX_API_KEY
IBM_WATSONX_PROJECT_ID
IBM_WATSONX_REGION
HUGGINGFACE_API_TOKEN
CHROMA_URL
```

## Post-deploy test

After deployment:

1. Open the Vercel URL.
2. Click **Run Productivity Review**.
3. Confirm the dashboard appears.
4. Confirm no console errors appear.
5. Copy the URL to the submission form.
