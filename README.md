## Requirements

- node v18.12
- yarn
- next.js
- .env (environment variables)
- r42be - Back-end API for this application (the nest.js application)

## Environment variables

- **NEXT_PUBLIC_API_BASE_URL** - Application back-end API base URL
- **NEXT_PUBLIC_STRAVA_OAUTH_REDIRECT_URL** - Redirect URL on front-end (e.g )
- **NEXT_PUBLIC_STRAVA_CLIENT_ID** - Application strava client Id

```bash
# EXAMPLE (.env file in the project root)

# Back-end API BASE_URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Front-end expected redirect URL to be called by strava API (callback URL)
NEXT_PUBLIC_STRAVA_OAUTH_REDIRECT_URL=http://localhost:3000/auth

# Strava application API client ID
NEXT_PUBLIC_STRAVA_CLIENT_ID=111111

```

## Installation

```bash
yarn install
```

## Up and Running

```bash
# Running it in development mode
yarn dev

# Running it in production mode
yarn build
yarn start
```

## Up and Running (Using Docker)

```bash
# Create the docker image
docker build -t r42/r42fe:1.0 .

# Create the container and run it
docker run -p 3000:3000 r42/r42fe:1.0
```
