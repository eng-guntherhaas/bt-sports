import { useEffect, useState } from "react";

export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>
) {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setAberto(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);

  return [aberto, setAberto] as const;
}
