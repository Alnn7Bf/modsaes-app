import { variantStyle } from "../../types/types";
import { RemoveIcon, WarningIcon } from "./Icons";
import  type { VariantType } from "../../types/types";

interface ListProps {
    isVisible: boolean;
    onToggle: () => void;
    subject: string;
    teacher: string;
    group: string;
    variant?: VariantType[];
    onRemove: () => void;
}

export default function ListElement({ isVisible, onToggle, subject, teacher, group, variant, onRemove } : ListProps) {
    const isWarning = variant?.includes('repeated');

    return (
        <li className={`
            relative
            flex
            items-stretch
            justify-between
            bg-background
            ${isVisible? 'opacity-100' : 'opacity-25'}
            transition-all
            duration-100
        `}>
            {
                isWarning && (
                    <>
                        <div className="absolute top-1/2 -translate-1/2 items-center -left-5 text-primary">
                            <WarningIcon size={20}/>
                            <div className="absolute size-full -z-10 top-0 left-0 bg-background rounded-full blur-xs opacity-50"></div>
                        </div>
                        <div className="absolute bg-primary h-full w-1 ">

                        </div>
                    </>
                )
            }
            <div  
                className={`
                    flex
                    flex-1
                    min-h-12
                    px-4!
                    py-2!
                    max-w-64
                    outline-transparent
                    flex-col
                    ${variant
                        ?.map(v => v === 'base'? '' : variantStyle[v])
                        .join(' ')
                    }
                    cursor-pointer
                `}
                onClick={onToggle}
            >
                <p className="text-foreground leading-tight m-0!">
                    {subject}
                </p>
                <p className="opacity-60 text-xxs m-0!">
                    {`${teacher} - ${group}`}
                </p>
            </div>
            <button 
                type="button"
                onClick={onRemove}
                className="flex items-center justify-center px-4! bg-foreground/10 hover:bg-red-600/20 text-foreground hover:text-red-600/70 cursor-pointer transition duration-200"
            >
                <RemoveIcon size={20}/>
            </button>
        </li>
    )
}