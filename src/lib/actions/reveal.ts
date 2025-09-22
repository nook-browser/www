export type RevealOptions = {
  animation?: "up" | "down" | "left" | "right" | "fade" | "scale";
  delay?: number; // milliseconds
  duration?: number; // milliseconds
  distance?: number; // pixels
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
};

function getPrefersReducedMotion(): boolean {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function reveal(node: HTMLElement, opts: RevealOptions = {}) {
  const prefersReducedMotion = getPrefersReducedMotion();

  let options: Required<RevealOptions> = {
    animation: "up",
    delay: 0,
    duration: 700,
    distance: 16,
    once: true,
    threshold: 0.12,
    rootMargin: "0px 0px -5% 0px",
    ...opts,
  } as Required<RevealOptions>;

  const setStyles = () => {
    node.style.setProperty("--reveal-delay", `${options.delay}ms`);
    node.style.setProperty("--reveal-duration", `${options.duration}ms`);
    node.style.setProperty("--reveal-distance", `${options.distance}px`);

    node.classList.add("reveal");

    node.classList.remove(
      "reveal-up",
      "reveal-down",
      "reveal-left",
      "reveal-right",
      "reveal-fade",
      "reveal-scale"
    );
    node.classList.add(`reveal-${options.animation}`);
  };

  let observer: IntersectionObserver | null = null;

  const observe = () => {
    if (prefersReducedMotion) {
      node.classList.add("reveal-visible");
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add("reveal-visible");
            if (options.once && observer) {
              observer.unobserve(node);
            }
          }
        }
      },
      { threshold: options.threshold, rootMargin: options.rootMargin }
    );

    observer.observe(node);
  };

  setStyles();
  observe();

  return {
    update(newOpts: RevealOptions) {
      options = { ...options, ...newOpts } as Required<RevealOptions>;
      setStyles();
    },
    destroy() {
      if (observer) {
        observer.unobserve(node);
        observer.disconnect();
        observer = null;
      }
    },
  };
}
