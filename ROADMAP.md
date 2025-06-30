# POPDOC Roadmap

## Overview
POPDOC is an AI-powered medical chat app featuring pop culture doctors, built for the **Bolt.new World's Largest Hackathon** (June 1–30, 2025). This roadmap outlines our plan to deliver a winning MVP.

## Phase 1: MVP Development (June 1–20, 2025)
- [x] Set up Vite + React frontend and Express backend.
- [x] Implement character selection (`CharacterCard.tsx`, `CharacterGrid.tsx`).
- [x] Create chat UI (`Chat.tsx`) with ElevenLabs voice integration (`gptService.js`).
- [x] Set up `SelectedDoctorContext` for state management.
- [x] Configure `.env` for `ELEVEN_LABS_API_KEY` and `JWT_SECRET`.
- [x] Test basic chat with mock responses and audio.

## Phase 2: Polish and Deployment (June 21–30, 2025)
- [ ] **AI-Generated Doctor Avatars**:
  - Integrate DALL·E 3 API for *Marvel Rivals*/*Overwatch*-style doctor images.
  - Update `src/data/doctors.ts` with dynamic avatar paths.
  - Cache images in `public/assets/avatars/` for performance.
- [ ] **Marvel Rivals/Overwatch UI**:
  - Style `CharacterGrid.tsx` and `CharacterCard.tsx` with Tailwind for vibrant, animated character select.
  - Add hover effects, glowing borders, and ARIA compliance.
- [ ] **Chat UI Polish**:
  - Enhance `Chat.tsx` with Tailwind for *Overwatch*-inspired message bubbles and animations.
- [ ] **Deployment**:
  - Deploy frontend to Netlify (**Deploy Challenge**).
  - Configure `popdoc.bolt.new` with Entri (**Custom Domain Challenge**).
  - Set up Bolt.new pipeline for backend.
- [ ] **Voice Refinement**:
  - Test ElevenLabs voices (e.g., "Rachel" for Dr. House, "Josh" for Dr. McCoy).
  - Update `src/data/doctors.ts` with voice mappings.
- [ ] **Stretch Goals**:
  - Add Tavus for **Conversational AI Video Challenge**.
  - Implement user auth (`/api/login`) for personalized chats.
- [ ] **Submission**:
  - Finalize `submission-pitch.md` with disclaimer: "POPDOC is for entertainment only."
  - Record demo video showcasing voice chat and UI.

## Timeline
- **June 15**: Draft `submission-pitch.md`.
- **June 20**: Complete MVP.
- **June 25**: Integrate AI images and UI polish.
- **June 28**: Deploy to Netlify/Entri, test voices.
- **June 30, 2:00 PM PDT**: Submit to hackathon.

## Success Criteria
- Meets hackathon criteria: **Potential Impact**, **Quality of Idea**, **Technological Implementation**, **Design & UX**.
- Completes **Voice AI**, **Deploy**, and **Custom Domain** Challenges.

## Future Considerations (Post-Hackathon)
- **Advanced Medical Advice Module**: Explore verified medical knowledge bases or professional connections, with strict guardrails.
- **Community Features**: User feedback, doctor ratings, custom character submissions.
- **Mobile App**: Extend POPDOC to iOS/Android.

## Disclaimer
POPDOC provides general health tips for entertainment. Always consult a licensed doctor for medical advice. This is paramount for a responsible hackathon entry.

---
*Initial prompt and feature list provided by the user. This roadmap will be refined as development progresses.* 