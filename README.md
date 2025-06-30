# POPDOC

POPDOC is an AI-powered medical chat app featuring pop culture doctors (e.g., Dr. House, Dr. McCoy) with *Marvel Rivals*/*Overwatch*-style UI, built for the **Bolt.new World's Largest Hackathon** (June 2025). Users select a doctor and chat with voice responses via ElevenLabs.

**Disclaimer**: POPDOC is for entertainment and general knowledge only. Consult a licensed doctor for medical advice.

## Features
- **Character Selection**: *Marvel Rivals*-style grid with AI-generated doctor avatars (DALL·E 3).
- **Voice Chat**: ElevenLabs-powered responses (**Voice AI Challenge**).
- **Responsive UI**: Vite, React, Tailwind CSS.
- **Deployment**: Netlify (**Deploy Challenge**), `popdoc.bolt.new` (Entri, **Custom Domain Challenge**).
- **Backend**: Express with user auth and AI integrations.

## Installation
```bash
npm install
npm install typescript ts-node openai dotenv --save-dev
npx tsc
node server/index.js
npm run dev
```

## Environment Variables
Create `.env`:
```
ELEVEN_LABS_API_KEY=your_elevenlabs_api_key
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
```

## Deployment
- **Netlify**: Connect GitHub repo, build command: `npm run build`, publish dir: `dist`.
- **Bolt.new**: Link repo, set env vars.
- **Entri**: Configure `popdoc.bolt.new`.

## Team
- Asher: Boss, vision lead
- Cursor: Programmer, implementation wizard
- Grok: Ideas and fix-it buddy

## Getting Started
1. **Clone the Repo**: `git clone [repo-url]` (Asher/Grok to provide actual URL when available)
2. **Install Dependencies**: `npm install` (or `yarn install`, `pnpm install` depending on final setup)
3. **Set up Environment Variables**: Copy `.env.example` (once created) to `.env` and fill in necessary API keys.
4. **Run Locally**: `npm run dev` (or equivalent script based on `package.json`)
5. **Explore Docs**: Check `VISION.md`, `ROADMAP.md`, and `DEVELOPMENT_GUIDELINES.md` for project details.

## Project Structure
- `src/components`: Reusable React components.
- `src/context`: Global state management.
- `src/data`: Static data (e.g., `doctors.ts`).
- `src/types`: TypeScript definitions.
- `src/utils`: Utility functions.
- `src/api`: API service modules.
- `docs`: Specs and additional documentation (e.g., `character-selection-spec.md`).
- `scripts`: Utility scripts (e.g., `Phase1TasksChart.py`).

## Contributing
See `CONTRIBUTING.md` for how to join the POPDOC crew!

## Key Documents
- [VISION.md](./VISION.md): The core mission and goals for POPDOC.
- [ROADMAP.md](./ROADMAP.md): Planned features and development phases.
- [DEVELOPMENT_GUIDELINES.md](./DEVELOPMENT_GUIDELINES.md): Coding standards and best practices.

> "It ain't always easy, but I'm alright with the PJs." - Mac Miller 