# Interactive Yes/No Mini-project

This is a small static UI mini-project that playfully asks the user "Would you like to code?" and provides two buttons: **Yes** and **No**.

Behavior:
- Colorful background and centered card.
- Two green buttons (Yes and No). The **No** button runs away when your mouse approaches and shrinks on hover.
- Clicking **No** makes it vanish into a very small size and enlarges the **Yes** button.
- Clicking **Yes** reveals the final message: "We know you'd come around 😉" and persists the choice.

Accessibility & UX improvements (feature101)
- Keyboard accessibility: buttons activate with Enter/Space; the No button also reacts when focused so keyboard users see the playful behavior.
- Strong visual focus ring for keyboard users.
- Respect for prefers-reduced-motion: transitions/animations are suppressed when the user requests reduced motion.
- Larger touch targets on small screens for easier tapping.
- LocalStorage persistence: "Yes" choice persists across reloads.
- Improved screen-reader semantics: final message uses role="status", aria-live="polite", aria-atomic="true" and the emoji is aria-hidden.
- Colorblind-friendly cues: small icons added to Yes/No and a check icon for the final message.

How to run locally
1. Clone the repo and fetch branches:
   git clone https://github.com/avyuktakalki/skills-copilot-codespaces-vscode.git
   cd skills-copilot-codespaces-vscode
   git fetch origin
   git checkout feature101

2. Serve the repo root to preserve relative paths:
   python3 -m http.server 8000
   Open http://localhost:8000/mini/interactive-yes-no/index.html

Testing checklist
- Mouse: Move pointer toward No; it should move farther and not be clipped. Click No and then Yes; final message with check and wink should appear.
- Keyboard: Tab to the buttons and press Enter or Space to activate. Focus ring should be clearly visible.
- Reduced motion: Enable OS-level reduced-motion and verify animations are suppressed.
- Persistence: Click Yes, reload the page — the final message should persist.
- Mobile: Verify touch targets are easy to tap in a mobile emulator.

Deployment notes
- The repository is configured to deploy the mini/interactive-yes-no folder to the gh-pages branch automatically when main is updated (GitHub Actions workflow deploy-on-main).
- Merge feature101 into main to include these changes in the published site.

