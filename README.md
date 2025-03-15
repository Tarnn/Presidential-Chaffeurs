# Presidential Chauffeurs Client

This is the frontend application for Presidential Chauffeurs, a luxury chauffeur service. The application is built with React, TypeScript, and Material-UI.
This is deployed to PROD and is used by a real business: https://www.presidentialchauffeurs.com/

## Features

- Responsive design for all device sizes
- Multi-language support
- Vehicle inquiry form with validation
- reCAPTCHA integration for spam protection
- Modern UI with animations and transitions

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   cd client
   npm install
   ```

### Environment Variables

Create a `.env` file in the client directory with the following variables:

```
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
VITE_API_URL=http://localhost:3001
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode using Vite.
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm run serve`

Serves the production build locally for testing.

## Testing

The client includes comprehensive test coverage using Jest and React Testing Library.

### Running Tests

```
npm test
```

For continuous testing during development:

```
npm run test:watch
```

### Test Coverage

To generate a test coverage report:

```
npm test -- --coverage
```

### Test Structure

- `src/components/__tests__/`: Tests for React components
  - `VehicleCard.test.tsx`: Tests for the VehicleCard component
  - `Home.test.tsx`: Tests for the HomePage component
  - `Navbar.test.tsx`: Tests for the Navbar component

For more detailed testing information, see the [TESTING.md](../TESTING.md) file.

## Deployment

The client can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

### Vercel Deployment

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Login to Vercel:
   ```
   vercel login
   ```

3. Deploy to Vercel:
   ```
   vercel
   ```

### Environment Variables on Vercel

Add the following environment variables in the Vercel dashboard:

- `VITE_RECAPTCHA_SITE_KEY`: Your reCAPTCHA site key
- `VITE_API_URL`: Your API URL (e.g., https://presidential-chauffeurs-node-nqnv.vercel.app)

## License

This project is proprietary and confidential.
