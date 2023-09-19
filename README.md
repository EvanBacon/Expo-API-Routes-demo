# Expo Router v3 alpha demo

> This is not production ready!

Changes to the default template:

- Disabled UNVERSIONED validation in export with `EXPO_SKIP_MANIFEST_VALIDATION_TOKEN` in `.env`.
- Deleted the root-level catch-all `app/[...missing].tsx` as it was blocking API routes.
- Used `"output": "server",` in app.json.
- Added a small hook to `app/_layout` to prevent rendering SSG since the styling solutions (changing based on the appearance API) and `@react-navigation/stack` don't support server rendering.
- Added a demo route in `app/(tabs)/index.tsx` which makes requests to our API route.
- Added a demo API route in `app/(tabs)/generate+api.tsx` which interacts with Open AI. You'll need an API key (fixtures included) to test this. Add the key to the `.env.local` file.
- Added an origin to the `expo-router` Config Plugin to support native fetch requests.

## Satori

I also added an example `app/satori/[text]+api.tsx` which renders JSX to SVG, this required that we enabled `config.resolver.unstable_enablePackageExports = true;` in the `metro.config.js`.

## Production

To test production:

- `npx expo export -p web` -> exports the website to `dist`.
- `yarn serve` -> Runs a small express server on localhost:3000 that serves the web build and API routes.

- `netlify deploy` will push the app to Netlify.
