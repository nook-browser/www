export function initAccordion() {
  const details = document.querySelectorAll<HTMLDetailsElement>(
    "details[data-reveal]"
  );

  details.forEach((targetDetail) => {
    const content = targetDetail.querySelector<HTMLElement>(".faq-content");
    const inner = targetDetail.querySelector<HTMLElement>(".faq-inner");
    if (!content || !inner) return;

    if (targetDetail.open) {
      targetDetail.classList.add("is-active");
      inner.style.opacity = "1";
      inner.style.transform = "translateY(0)";
    } else {
      inner.style.opacity = "0";
      inner.style.transform = "translateY(-10px)";
    }

    inner.style.transition =
      "opacity 0.3s ease, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)";
    content.style.transition = "height 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)";

    targetDetail.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest("summary")) return;

      e.preventDefault();

      details.forEach((otherDetail) => {
        if (
          otherDetail !== targetDetail &&
          otherDetail.hasAttribute("open")
        ) {
          const otherContent =
            otherDetail.querySelector<HTMLElement>(".faq-content");
          const otherInner =
            otherDetail.querySelector<HTMLElement>(".faq-inner");
          
          if (!otherContent || !otherInner) return;

          otherDetail.classList.remove("is-active");

          const startHeight = otherContent.scrollHeight;
          otherContent.style.height = `${startHeight}px`;

          requestAnimationFrame(() => {
            otherContent.style.height = "0px";
            otherInner.style.opacity = "0";
            otherInner.style.transform = "translateY(-10px)";
          });

          const onEnd = () => {
            otherDetail.removeAttribute("open");
            otherContent.style.height = "";
            otherContent.removeEventListener("transitionend", onEnd);
          };
          otherContent.addEventListener("transitionend", onEnd, {
            once: true,
          });
        }
      });

      if (targetDetail.classList.contains("is-active")) {
        targetDetail.classList.remove("is-active");

        const startHeight = content.scrollHeight;
        content.style.height = `${startHeight}px`;

        requestAnimationFrame(() => {
          content.style.height = "0px";
          inner.style.opacity = "0";
          inner.style.transform = "translateY(-10px)";
        });

        const onEnd = () => {
          targetDetail.removeAttribute("open");
          content.style.height = "";
          content.removeEventListener("transitionend", onEnd);
        };
        content.addEventListener("transitionend", onEnd, { once: true });
      } else {
        targetDetail.classList.add("is-active");
        targetDetail.setAttribute("open", "");

        content.style.height = "0px";
        inner.style.opacity = "0";
        inner.style.transform = "translateY(-10px)";

        requestAnimationFrame(() => {
          const endHeight = content.scrollHeight;
          content.style.height = `${endHeight}px`;
          inner.style.opacity = "1";
          inner.style.transform = "translateY(0)";
        });

        const onEnd = () => {
          content.style.height = "";
          content.removeEventListener("transitionend", onEnd);
        };
        content.addEventListener("transitionend", onEnd, { once: true });
      }
    });
  });
}
