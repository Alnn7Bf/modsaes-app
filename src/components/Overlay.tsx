import { useState, type ReactNode } from "react"
import { PlusIcon, GitHubIcon, InstagramIcon, RemoveIcon } from "./Icons";
import ButtonElement from "./ButtonElement";

const headers = ['Horario', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const schedules = ['7:00 - 8:30', '8:30 - 10:00', '10:00 - 11:30', '11:30 - 13:00', '13:00 - 14:30', '14:30 - 16:00', '16:00 - 17:30', '17:30 - 19:00', '19:00 - 20:30', '20:30 - 22:00'];

const variantStyle = {
  none: '', 
  normal: 'bg-primary text-background', 
  overlap: 'bg-overlap text-foreground', 
  repeated: 'outline-2 outline-background text-background'
}

type variantType = keyof typeof variantStyle;

interface gridProps {
    children: ReactNode;
    variant: variantType;
}

const GridElement = ({children, variant} : gridProps) => {
  return (
    <>
      <div className={`flex items-center justify-center px-2! py-1! ${variantStyle[variant]} rounded-global`}>
        {children}
      </div>
    </>
  )
}

interface listProps {
    subject: string;
    teacher: string;
    variant: variantType;
}

const ListElement = ({subject, teacher, variant} : listProps) => {
    return (
        <>
            <li className={`px-4! py-2! ${variantStyle[variant]}`}>
                <div className="flex justify-between items-center gap-6">
                    <div className="py-1!">
                        <p className="text-foreground m-0!">
                            {subject}
                        </p>
                        <p className="text-foreground/60 text-xs m-0!">
                            {teacher}
                        </p>
                    </div>
                    <button className="bg-primary rounded-global h-min text-background cursor-pointer">
                        <RemoveIcon size={25}/>
                    </button>
                </div>
            </li>
        </>
    )
}

interface overlayProps {
    onClose: () => void;
}

function Overlay({onClose} : overlayProps) {
    const [activeIcons, setActiveIcons] = useState(false);

    return (
        <>
            <div className={`fixed z-50 top-0 left-0 h-full w-full flex flex-col items-center bg-foreground/50 backdrop-blur-xs`}>
                <div className="w-full flex items-center justify-center bg-background/60 p-2!">
                    <span>Presiona Esc para salir</span>
                </div>
                <div className="flex flex-row w-full justify-evenly gap-6 my-12!">
                    <div className="grid grid-cols-7 gap-1">
                        <div className="grid col-span-7 grid-cols-subgrid">
                            {
                                headers.map((day, i) => (
                                    <GridElement key={`1-${i}`} variant={'normal'}>
                                        {day}
                                    </GridElement>
                                ))
                            }
                        </div>
                        <div className="grid row-span-10 grid-rows-subgrid">
                            {
                                schedules.map((schedule, i) => (
                                    <GridElement key={`${i}-1`} variant={'normal'}>
                                        {schedule}
                                    </GridElement>
                                ))
                            }
                        </div>
                        <div className="grid row-span-10 col-span-6 grid-rows-subgrid grid-cols-subgrid">
                            {

                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="bg-primary text-center px-6! py-2! rounded-global text-background m-0!">Materias Seleccionadas:</p>
                        <ul className="bg-background rounded-global">
                            {
                                <ListElement subject={'BIOLOGIA CELULAR'} teacher={'DIAZ VALDES ELBA - 1BM1'} variant={'none'}/>
                            }
                        </ul>
                    </div>
                </div>
                <div className="flex flex-1 gap-3 w-full items-center justify-around">
                    <div className="flex flex-3 items-center justify-center">
                        <div className="grid grid-rows-2 bg-foreground/30 gap-x-10 gap-y-3 p-3! rounded-global">
                            <div className="flex flex-row h-min items-center gap-3">
                                <span className='grid bg-background/20 size-5 rounded-global'></span>
                                <p className="m-0! text-background">Disponible</p>
                            </div>
                            <div className="flex flex-row h-min items-center gap-3">
                                <span className='grid bg-overlap size-5 rounded-global'></span>
                                <p className="m-0! text-background">Traslape</p>
                            </div>
                            <div className="flex flex-row h-min items-center gap-3">
                                <span className='grid bg-primary size-5 rounded-global'></span>
                                <p className="m-0! text-background">Ocupado</p>
                            </div>
                            <div className="flex flex-row h-min items-center gap-3">
                                <span className='grid outline-2 outline-background size-5 rounded-global'></span>
                                <p className="m-0! text-background">Repetido</p>
                            </div>
                            <div className="flex col-start-3 row-start-1 row-span-2 gap-4 m-2! items-center" >
                                <ButtonElement func={() => {}}>Descargar Horario</ButtonElement>
                                <ButtonElement func={onClose}>Cerrar</ButtonElement>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-2 gap-2 justify-center items-center">
                        <p className="h-min p-3! bg-foreground text-background rounded-global">Desarrollo: Alan Bf</p>
                        <div 
                            className="h-min cursor-pointer hover:bg-foreground hover:text-background rounded-global transition-colors duration-400" 
                            onClick={() => setActiveIcons(!activeIcons)}
                        >
                            <div className="rounded-global h-min p-1!">
                                <PlusIcon size={35} status={activeIcons}/>
                            </div>
                        </div>
                        <div className={`flex text-background gap-2 ${activeIcons? 'w-28' : 'w-0'} overflow-hidden transition-all duration-400`}>
                            <div className={`text-foreground! ${activeIcons? 'opacity-100' : 'opacity-0'} hover:text-background! hover:bg-foreground cursor-pointer rounded-global h-min p-3! transition-all duration-400`}>
                                <a className="text-inherit!" href="https://github.com/Alnn7Bf" target="_blank" rel="noopener noreferrer">
                                    <GitHubIcon size={21}/>
                                </a>
                            </div>
                            <div className={`text-foreground! ${activeIcons? 'opacity-100' : 'opacity-0'} hover:text-background! hover:bg-foreground cursor-pointer rounded-global h-min p-3! transition-all duration-400`}>
                                <a className="text-inherit!" href="https://www.instagram.com/alnn7_bf" target="_blank" rel="noopener noreferrer">
                                    <InstagramIcon size={21}/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Overlay