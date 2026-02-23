# Draft Preview Mode Setup

This site now includes Sanity draft preview mode functionality. Here's how to set it up and use it:

## Setup Instructions

### 1. Get Sanity API Token

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to "API" tab
4. Create a new token with "Read" permissions
5. Copy the token

### 2. Update Environment Variables

Update your `.env.local` file with:

```
SANITY_API_READ_TOKEN="your_actual_token_here"
SANITY_REVALIDATE_SECRET="your_secret_string_here"
```

Replace:

- `your_actual_token_here` with the token from step 1
- `your_secret_string_here` with any random secure string (e.g., generate one at [passwords.io](https://passwords.io))

### 3. Configure Sanity Studio (Optional)

Add this to your Sanity Studio configuration for easy preview access:

```javascript
// sanity.config.ts
export default defineConfig({
  // ... other config
  document: {
    productionUrl: async (prev, { document }) => {
      const url =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'https://your-domain.com';

      return `${url}/api/draft?secret=${process.env.SANITY_REVALIDATE_SECRET}&slug=/`;
    },
  },
});
```

## How to Use Draft Preview

### Method 1: URL Access

Navigate to: `your-site.com/api/draft?secret=YOUR_SECRET&slug=/`

Replace:

- `your-site.com` with your domain (or `localhost:3000` for local)
- `YOUR_SECRET` with your `SANITY_REVALIDATE_SECRET` value
- `/` with the specific page path you want to preview

### Method 2: From Sanity Studio (if configured)

1. Open Sanity Studio
2. Edit any document
3. Look for "Preview" button/link in the document pane
4. Click to open preview mode

### Method 3: Bookmarklet (Convenient for editors)

Create a bookmark with this URL:

```
javascript:(function(){window.open(window.location.origin+'/api/draft?secret=YOUR_SECRET&slug='+encodeURIComponent(window.location.pathname),'_blank');})();
```

## Preview Mode Features

When in preview mode:

- 📝 **Yellow banner** appears at the top showing you're in preview mode
- 👁️ **Draft content** is visible (unpublished changes)
- 🔗 **"Edit in Studio"** button for quick access to Sanity Studio
- ❌ **"Exit Preview"** button to return to published content
- 🔄 **Real-time updates** as you edit in Sanity Studio

## Setting Up Webhooks (Optional)

For automatic revalidation when content changes:

1. In Sanity Studio, go to "API" → "Webhooks"
2. Create new webhook:
   - **Name**: Site Revalidation
   - **URL**: `https://your-domain.com/api/revalidate`
   - **Trigger on**: Create, Update, Delete
   - **HTTP method**: POST
   - **Headers**: `Content-Type: application/json`
   - **Payload**:
     ```json
     {
       "secret": "YOUR_SANITY_REVALIDATE_SECRET",
       "path": "/"
     }
     ```

## Troubleshooting

### Preview mode not working?

1. Check that `SANITY_API_READ_TOKEN` is set correctly
2. Verify the token has read permissions in Sanity
3. Ensure `SANITY_REVALIDATE_SECRET` matches between .env and URLs

### Content not updating in preview?

1. Make sure you're editing draft documents in Sanity
2. Check that the Sanity client perspective is set to `previewDrafts`
3. Verify the API token has access to draft content

### Preview banner not showing?

1. Confirm you accessed via `/api/draft` endpoint
2. Check browser console for JavaScript errors
3. Verify the secret parameter is correct
