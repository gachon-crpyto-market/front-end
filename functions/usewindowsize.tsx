import { useEffect, useState } from "react";

interface Size {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize(): Size {
  const [windowSize, setWindowSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Check if window object is defined
      if (typeof window !== 'undefined') {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    }

    // Add event listener if window object is defined
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}
