import { useState, useRef } from "react";
import useOverlayData from "../../hooks/useOverlayData";
import GridPanel from "../sections/GridPanel";
import ListPanel from "../sections/ListPanel";
import Legend from "../sections/Legend";
import SocialMedia from "../sections/SocialMedia";
import { exportSchedulePNG } from "../../utils/exportSchedule";

interface OverlayProps {
    onClose: () => void;
    selected: Set<string>;
    remove: (id : string) => void;
}

export default function Overlay({onClose, selected, remove} : OverlayProps) {
    const { scheduleBlocks, listBlocks } = useOverlayData(selected);

    const [active, setActive] = useState<string | null>(null);

    const handleClick = (id : string) => {
        active === id? setActive(null) : setActive(id);
    }

    const handleRemove = (id : string) => {
        if(active === id) setActive(null);
        remove(id);
    }

    const gridRef = useRef<HTMLDivElement>(null);

    return (
        <div className={`fixed z-50 top-0 left-0 h-full w-full flex flex-col items-center bg-foreground/50 backdrop-blur-xs`}>
            <div className="w-full flex items-center justify-center bg-background/60 p-2!">
                <span>Presiona Esc para salir</span>
            </div>
            <div className="flex flex-row w-full justify-around gap-6 my-8!">
                <GridPanel ref={gridRef} active={active} scheduleBlocks={scheduleBlocks}/>
                <ListPanel listBlocks={listBlocks} active={active} setActive={handleClick} remove={handleRemove}/>
            </div>
            <div className="flex flex-1 gap-3 w-full items-center justify-around">
                <Legend 
                    onSave={async () => {
                        if(!gridRef.current) return;
                        await exportSchedulePNG(gridRef.current);
                    }} 
                    onClose={onClose}>
                </Legend>
                <SocialMedia />
            </div>
        </div>
    )
}