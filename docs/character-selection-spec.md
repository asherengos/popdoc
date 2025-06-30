# Character Selection UI Specification - POPDOC

This document outlines the design and functionality for POPDOC's character selection interface.

## 1. Overview
Users will be presented with a visually engaging grid or carousel of available pop culture doctors. Selecting a doctor will personalize their POPDOC experience.

## 2. Key Components (`src/components/CharacterSelection/`)
- `CharacterGrid.tsx`: Container for displaying `CharacterCard` components.
  - Fetches doctor data (from `src/data/doctors.ts` initially).
  - Handles layout (responsive grid).
- `CharacterCard.tsx`: Displays individual doctor information.
  - Props: `doctor: Doctor` (from `src/types/index.ts`).
  - Shows: Avatar, Name, Title, Universe.
  - On click: Updates global state with selected doctor, navigates to chat/dashboard.

## 3. Data Requirements (from `doctors.ts`)
Each doctor object needs:
- `id`: Unique identifier.
- `name`: Full name (e.g., "Beverly Crusher").
- `title`: (e.g., "Dr.").
- `universe`: (e.g., "Star Trek: TNG").
- `avatar`: URL to image.
- `description`: Brief bio.
- `catchphrase`: Iconic line.
- `primaryColor`, `secondaryColor`, `accent`: For theming (optional for V1 display).

## 4. User Flow
1. User lands on Character Selection screen (e.g., app launch or via a "Change Doctor" option).
2. Doctor avatars and names are displayed in `CharacterGrid`.
3. User hovers/taps a `CharacterCard` (potential for subtle animation/highlight).
4. User clicks a `CharacterCard`.
5. Application state updates to reflect the chosen doctor.
6. User is navigated to the main chat interface, now themed/contextualized for the selected doctor.

## 5. Styling & Theming
- Use Tailwind CSS for layout and styling.
- Cards should be visually distinct and appealing.
- Consider using doctor-specific `primaryColor` for card accents if feasible in V1.

## 6. Future Considerations
- Search/filter functionality for doctors.
- Categories or sorting (e.g., by universe).
- More detailed doctor profile pages.

## Disclaimer Reminder
Even at character selection, a subtle, non-intrusive disclaimer about POPDOC's nature as an entertainment/general info tool can be considered. 