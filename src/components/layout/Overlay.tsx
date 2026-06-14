import ListPanel from "./ListPanel";
import SocialMedia from "./SocialMedia";
import Legend from "./Legend";
import GridPanel from "./GridPanel";
import useOverlayData from "../../hooks/useOverlayData";
import { useState } from "react";

interface OverlayProps {
    onClose: () => void;
    selected: Set<string>;
    remove: (id : string) => void;
}

export default function Overlay({onClose, selected, remove} : OverlayProps) {
    const { scheduleBlocks, listBlocks } = useOverlayData(selected);

    const [active, setActive] = useState('');

    const handleClick = (id: string) => {
        active === id? setActive('') : setActive(id);
    }

    return (
        <div className={`fixed z-50 top-0 left-0 h-full w-full flex flex-col items-center bg-foreground/50 backdrop-blur-xs`}>
            <div className="w-full flex items-center justify-center bg-background/60 p-2!">
                <span>Presiona Esc para salir</span>
            </div>
            <div className="flex flex-row w-full justify-around gap-6 my-8!">
                <GridPanel active={active} scheduleBlocks={scheduleBlocks}/>
                <ListPanel listBlocks={listBlocks} active={active} setActive={handleClick} remove={remove}/>
            </div>
            <div className="flex flex-1 gap-3 w-full items-center justify-around">
                <Legend onClose={onClose}/>
                <SocialMedia />
            </div>
        </div>
    )
}