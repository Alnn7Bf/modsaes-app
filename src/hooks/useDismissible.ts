import { useEffect } from "react"

export default function useDismissible(enabled : boolean, onDismiss: () => void) {
    useEffect(() => {

        const handleKeyDown = (e : KeyboardEvent) => {
            if (e.key === "Escape") {
                onDismiss();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [enabled, onDismiss]);
}