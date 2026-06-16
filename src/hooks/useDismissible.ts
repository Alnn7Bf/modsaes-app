import { type RefObject, useEffect } from "react"

export default function useDismissible(enabled : boolean, onDismiss: () => void, ref?: RefObject<HTMLElement | null>) {
    useEffect(() => {
        if(!enabled) return;

        const handleKeyDown = (e : KeyboardEvent) => {
            if (e.key === "Escape") {
                onDismiss();
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if(!ref?.current) return;
            const target = e.target as Node;
            if(!ref.current.contains(target)) onDismiss();
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [enabled, ref, onDismiss]);
}