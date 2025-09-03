# Old Man Yells At Generator

Fully client-side "Old Man Yells At" meme generator - create amusing images of an old man yelling at anything you want to poke fun at!

## Over-engineered features

- All operations done fully client-side - no backend, no private data leaves your browser.
- Uses [MediaPipe Face Detector task](https://ai.google.dev/edge/mediapipe/solutions/vision/face_detector) to automatically detect and position the old man character.
- Extensive customization options for the old man:
  - Placement anywhere on the input image (including slightly going outside it).
  - Change the size of the old man character.
  - Customize facial expressions and yelling intensity.
  - No limit on the number of old men (for maximum yelling chaos).
  - Flip the character vertically or horizontally.
  - Customize the direction from which the old man appears.
  - Different old man character styles and expressions.
- GIF output options:
  - Looping mode.
  - Number of frames.
  - Frame delay.
  - Separate delay setting for last frame.
  - Output size.
- Anonymous product analytics using [PostHog](https://posthog.com/), requiring explicit *opt-in*.
- Celebration confetti 🎉
- Easter eggs.

## Development

Uses [Vite](https://vitejs.dev/), so the usual dance is enough:

```
nvm use
npm install
npm run dev
```

Then visit http://localhost:5173/old-man-yells-at/ (note the subdirectory).
# old-man-yells-at
