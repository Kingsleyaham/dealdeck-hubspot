# HUBSPOT EXTENSION APP FOR DEALDECK

A React + TypeScript HubSpot Extension App that integrates with HubSpot's platform to provide custom functionality within the HubSpot interface.

## Prerequisites

- **Node.js**: Version 20 or higher
- **npm** or **yarn**: Package manager
- **HubSpot Developer Account**: Required for app creation and deployment
- **Git**: For version control

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-name>
```

### 2. Navigate to Extension Directory

```bash
cd src/app/extensions
```

### 3. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Install HubSpot CLI

The HubSpot CLI is required for development, authentication, and deployment.

```bash
npm install -g @hubspot/cli@latest
```

Verify installation:

```bash
hs --version
```

### 4. HubSpot Account Authentication

#### Authenticate with HubSpot Account

```bash
hs account auth
```

This will open a browser window where you can log in to your HubSpot account and authorize the CLI.

#### Verify Authentication

```bash
hs accounts list
```

### 5. Project Structure

```
HUBSPOT APP/
├── src/
│   └── app/
│       ├── assets/
│       │   └── logo.png
│       ├── dist/
│       │   ├── DealsCard-manifest.json
│       │   └── DealsCard.js
│       ├── extensions/
│       │   ├── assets/
│       │   │   └── example-card-preview.png
│       │   ├── components/
│       │   │   ├── ConnectedDeckView.tsx
│       │   │   └── CreateDealDeckModal.tsx
│       │   ├── types/
│       │   │   └── card.ts
│       │   ├── customers.ts
│       │   ├── deals-card.json
│       │   ├── DealsCard.tsx
│       │   └── package.json
│       ├── hsproject.json
│       ├── public-app.json
│       └── README.md
├── .gitignore
└── README.md
```

### 6. Development Server

#### Start the Development Server

```bash
hs project dev
```

This will start the development server and automatically watch for changes in your extension files.

### 7. Testing Your Extension

1. Navigate to your HubSpot account
2. Go to a **Deal** record
3. Look for your extension card in the **right sidebar**
4. Your extension should load and display the React component

### 8. Upload to HubSpot

When you're ready to upload your changes to HubSpot:

```bash
hs project upload
```

This command will build and upload your extension to HubSpot automatically.

### 9. Development Workflow

1. **Navigate to Extension Directory**: `cd src/app/extensions`
2. **Install Dependencies**: `npm install` (or `yarn install` or `pnpm install`)
3. **Start Development**: Run `hs project dev` to start the development server
4. **Test**: Test your extension in HubSpot by navigating to a Deal record
5. **Upload**: Run `hs project upload` to upload your changes to HubSpot

## Common Issues and Solutions

### Authentication Issues

- **Error**: "Authentication failed"
- **Solution**: Re-run `hs account auth` and ensure you're using the correct HubSpot account

### Extension Not Loading

- **Error**: Extension doesn't appear in HubSpot Deal records
- **Solution**: Check the `deals-card.json` configuration and ensure the extension is properly configured

### Development Server Issues

- **Error**: "Project not found"
- **Solution**: Ensure you're running `hs project dev` from the correct directory

### Upload Issues

- **Error**: "Upload failed"
- **Solution**: Verify authentication and ensure you have the necessary permissions in your HubSpot account

## Additional Resources

- [HubSpot Developer Documentation](https://developers.hubspot.com/)
- [HubSpot CLI Documentation](https://developers.hubspot.com/docs/guides/crm/ui-extensions/local-development)
- [HubSpot Extensions Guide](https://developers.hubspot.com/docs/guides/crm/ui-extensions/overview)

## Support

If you encounter any issues:

1. Check the HubSpot Developer Documentation
2. Ensure all prerequisites are met
3. Verify your HubSpot account permissions
4. Check that your Node.js version is 20 or higher

## License

This project is licensed under the MIT License - see the LICENSE file for details.
