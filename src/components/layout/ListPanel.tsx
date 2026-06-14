import ListElement from "../ui/ListElement";
import type { ListBlock } from "../../types/types";

interface PanelProps {
    listBlocks: ListBlock[];
    active: string;
    setActive: (id: string) => void;
    remove: (id : string) => void;
}

export default function ListPanel({ listBlocks, active, setActive, remove } : PanelProps) {
    return (
        <div className="flex gap-px flex-col w-74 h-110">
            <p className="bg-primary text-center px-6! py-2! text-background m-0!">Materias Seleccionadas:</p>
            <ul className="flex flex-col gap-px">
                {
                    listBlocks.map(block => (
                        <ListElement 
                            key={block.id}
                            active={active === '' || active === block.id}
                            setActive={() => setActive(block.id)}
                            subject={block.subject}
                            teacher={block.teacher}
                            group={block.group}
                            variant={block.variants}
                            onRemove={() => remove(block.id)}
                        />
                    ))
                }
            </ul>
        </div>
    )
}