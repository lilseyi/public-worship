// Vanilla TS controller for the /collaborate choose-your-own-adventure page.
// Shows one [data-collab-screen] at a time. Buttons with [data-collab-target]
// switch screens; [data-collab-restart] returns to the entry screen; [data-collab-back]
// pops the previous screen off a small history stack.

const SCREEN = "[data-collab-screen]";
const TARGET = "[data-collab-target]";
const RESTART = "[data-collab-restart]";
const BACK = "[data-collab-back]";
const ENTRY_ID = "entry";

const history: string[] = [];

function show(id: string, push = true): void {
  const target = document.getElementById(id);
  if (!target) return;

  document.querySelectorAll<HTMLElement>(SCREEN).forEach((s) => {
    if (s.id === id) {
      s.removeAttribute("hidden");
    } else {
      s.setAttribute("hidden", "");
    }
  });

  if (push) {
    const current = history[history.length - 1];
    if (current !== id) history.push(id);
  }

  // Keep the user oriented by scrolling to the top of the chooser when
  // moving between screens.
  const wrapper = document.getElementById("collab-flow");
  if (wrapper) {
    wrapper.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function init(): void {
  // Initial screen: entry.
  if (!document.getElementById(ENTRY_ID)) return;
  history.length = 0;
  show(ENTRY_ID);

  document.querySelectorAll<HTMLElement>(TARGET).forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-collab-target");
      if (id) show(id);
    });
  });

  document.querySelectorAll<HTMLElement>(RESTART).forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      history.length = 0;
      show(ENTRY_ID);
    });
  });

  document.querySelectorAll<HTMLElement>(BACK).forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      history.pop();
      const previous = history[history.length - 1] || ENTRY_ID;
      show(previous, false);
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
