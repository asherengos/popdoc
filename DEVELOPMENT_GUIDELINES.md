# DEVELOPMENT_GUIDELINES.md

Welcome to **POPDOC – Your Pop Culture Medical Companion**! These rules keep our codebase clean and epic, like a Jedi temple. Let's build a starship that makes the Kessel Run in 12 parsecs.

This document is a living guide; suggest updates as the project evolves.

## 1. Directory Structure
- Stick to `src/components`, `src/context`, `src/data`, `src/types`, `src/utils`.
- **Component Sub-folders:** Consider sub-folders for larger features (e.g., `src/components/CharacterSelection/`) or for common reusable elements (e.g., `src/components/ui/Button.tsx`).
- New features fit in existing folders unless they are substantial enough to earn a new top-level folder (e.g., `src/api`).
- Ask: "Can this live somewhere existing efficiently?"

## 2. Naming Conventions
- React Components: `PascalCase` (e.g., `CharacterCard.tsx`).
- Non-Component Files (e.g., utils, services, configs): `camelCase` (e.g., `apiClient.ts`, `doctorUtils.ts`).
- Variables/Functions: `camelCase` (e.g., `const selectedDoctor`, `function handleSendMessage()`).
- CSS/Tailwind: Use Tailwind utilities primarily. If custom CSS is needed, place it in `src/styles/custom.css` or component-specific CSS modules, using `kebab-case` for class names.

## 3. Component Guidelines
- Build small, reusable LEGO-like components.
- One job per component (Single Responsibility Principle), done well.
- Clear, typed props with TypeScript. Document props using JSDoc/TSDoc.

## 4. State Management
- Local state (`useState`) stays local unless it truly needs to be shared.
- Use React Context (`src/context`) for global state that doesn't change too frequently or for simpler global needs.
- For more complex global state or frequent updates, plan for Zustand or Recoil (note in `ROADMAP.md` if this need arises).
- Avoid prop-drilling. Lift state up or use context/global state solutions.

## 5. Styling
- Tailwind-first approach. Define and reuse theme tokens (colors, fonts, spacing) in `tailwind.config.js` (e.g., character colors from `doctors.ts` can inform the theme).
- Minimal custom CSS. If necessary, place in `src/styles/custom.css` or use CSS Modules for component-specific styles.
- Ensure consistent look and feel by reusing defined theme tokens and Tailwind utilities.

## 6. API Integration
- API keys and sensitive configuration must be in `.env` files and listed in `.gitignore`.
- Centralize API call logic in dedicated service modules within `src/api` (e.g., `gptService.ts`, `firebaseService.ts`).
- Handle API errors gracefully (e.g., user notifications, logging). Document common API error patterns.

## 7. Documentation
- Code Comments: Use for *why* a particular piece of complex or non-obvious code exists, not *what* it does (the code should be self-explanatory for the *what*).
- JSDoc/TSDoc: Use for functions, components, and types to explain their purpose, parameters, and return values.
- Keep `VISION.md` and `ROADMAP.md` updated. They are living documents.

## 8. Git Workflow
- `main` branch is sacred and should always reflect production-ready code.
- Develop features on separate branches named `feature/feature-name` (e.g., `feature/character-select-ui`).
- Fixes on branches named `fix/issue-description` (e.g., `fix/avatar-rendering-bug`).
- Commits: Use Conventional Commit style (e.g., `feat: add chat input component`, `fix: resolve scroll jumping in chat`). This helps in automated changelog generation and understanding history.
- Pull Requests (PRs):
    - Create PRs targeting a `develop` branch (if used) or `main`. Consider a `develop` branch for staging features before merging to `main` as the project grows.
    - All PRs must be reviewed before merging, even if initially solo (self-review is better than no review).
    - Ensure code lints and tests pass before requesting a review.

## 9. Linting & Formatting
- ESLint (configured in `eslint.config.js`) and Prettier will be used to maintain code quality and consistency.
- Configure your IDE to auto-format on save using these tools.
- Run linting and formatting checks before committing.

## 10. Testing
- Aim to write unit tests for utility functions (`src/utils`) and business logic.
- Write component tests for UI components, focusing on interactions and rendering based on props/state.
- Use Jest and React Testing Library as the primary testing stack.
- Testing is an iterative process; critical features get tests first (as noted in `ROADMAP.md` Phase 2+).

## Final Note
This is our project's constitution. Have ideas for improvement or see something unclear? Propose changes via PRs to this document or discuss them in our primary communication channel. Let's make this epic!

"It ain't always easy, but I'm alright with the PJs." - Mac Miller 

## Code Style
- Use TypeScript for frontend (`src/`) and backend (`server/`).
- Follow ESLint/Prettier (`npm run lint`).
- Name files: `CamelCase.tsx` for components, `camelCase.js` for backend.

## File Structure
- Frontend: `src/components/`, `src/context/`, `src/data/`, `src/types/`.
- Backend: `server/services/`, `server/index.js`.
- Assets: `public/assets/avatars/` for AI-generated images.

## Commits
- Semantic: `feat:`, `fix:`, `docs:`.
- Example: `git commit -m "feat: add AI image generation"`

## Testing
- Local: `node server/index.js`, `npm run dev`.
- Verify ElevenLabs audio and DALL·E images in `Chat.tsx`, `CharacterGrid.tsx`.
- Test UI in Chrome/Firefox for accessibility.

## Deployment
- Compile: `npx tsc`.
- Deploy: Netlify (frontend), Bolt.new (backend), Entri (`popdoc.bolt.new`). 