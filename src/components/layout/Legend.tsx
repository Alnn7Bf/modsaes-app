import ButtonElement from "../ui/ButtonElement";
import { variantStyle } from "../../types/types";

interface LegendProps {
    onClose: () => void;
}

export default function Legend({ onClose } : LegendProps) {
    return (
        <div className="flex flex-3 items-center justify-center">
            <div className="grid grid-rows-2 bg-foreground/30 gap-x-10 gap-y-3 p-3!">
                <div className="flex flex-row h-min items-center gap-3">
                    <span className={`flex bg-background/20 size-5`}></span>
                    <p className="m-0! text-background">Disponible</p>
                </div>
                <div className="flex flex-row h-min items-center gap-3">
                    <span className={`flex ${variantStyle['overlap']} size-5`}></span>
                    <p className="m-0! text-background">Traslape</p>
                </div>
                <div className="flex flex-row h-min items-center gap-3">
                    <span className={`flex ${variantStyle['base']} size-5`}></span>
                    <p className="m-0! text-background">Ocupado</p>
                </div>
                <div className="flex flex-row h-min items-center gap-3">
                    <span className={`flex ${variantStyle['repeated']} size-5`}></span>
                    <p className="m-0! text-background">Repetido</p>
                </div>
                <div className="flex col-start-3 row-start-1 row-span-2 gap-4 m-2! items-center" >
                    <ButtonElement func={() => {}}>Descargar Horario</ButtonElement>
                    <ButtonElement func={onClose}>Cerrar</ButtonElement>
                </div>
            </div>
        </div>
    )
}