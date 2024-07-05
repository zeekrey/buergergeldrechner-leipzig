import { useState, useEffect } from "react";

export type TContainer = {
  name: string;
  ref: React.RefObject<HTMLElement>;
};

export const useScrollSpy = (containers: TContainer[]): TContainer["name"] => {
  const [mostVisibleContainer, setMostVisibleContainer] =
    useState<TContainer["name"]>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxVisibleRatio = 0;
        let mostVisibleName = "";

        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > maxVisibleRatio
          ) {
            const matchedContainer = containers.find(
              (container) => container.ref.current === entry.target
            );
            if (matchedContainer) {
              maxVisibleRatio = entry.intersectionRatio;
              mostVisibleName = matchedContainer.name;
            }
          }
        });

        setMostVisibleContainer(mostVisibleName);
      },
      { threshold: 0.5 }
    );

    containers.forEach((container) => {
      if (container.ref.current) {
        observer.observe(container.ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [containers]);

  return mostVisibleContainer;
};
