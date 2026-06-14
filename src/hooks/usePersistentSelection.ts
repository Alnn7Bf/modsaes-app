import { useState, useEffect } from "react";

const STORAGE_KEY = "selectedSubjects";

export default function usePersistentSelections() {
    const [selected, setSelected] = useState<Set<string>>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if(!saved) return new Set();
        return new Set(JSON.parse(saved));
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...selected]));
    }, [selected]);

    const toggle = (id : string) => {
        setSelected(prev => {
            const updated = new Set(prev);

            if(updated.has(id)) {
                updated.delete(id);
            } else {
                updated.add(id);
            }
            
            return updated;
        });
    };

    const isSelected = (id : string) => {
        return selected.has(id);
    }

    const clear = () => {
        setSelected(new Set());
    }

    const remove = (id : string) => {
        setSelected(prev => {
            const updated = new Set(prev);
            updated.delete(id);
            return updated;
        })
    }

    return {
        selected,
        toggle,
        isSelected,
        clear,
        remove
    }
}