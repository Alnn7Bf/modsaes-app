import { useState } from "react";
import { PlusIcon, GitHubIcon, InstagramIcon } from "../ui/Icons";

export default function SocialMedia() {
    const [activeIcons, setActiveIcons] = useState(false);
    
    return (
        <div className="flex flex-row flex-2 gap-3 justify-start items-center">
            <p className="h-min p-3! bg-foreground text-background">Desarrollo: Alan Bf</p>
        <div 
            className="h-min cursor-pointer hover:bg-foreground hover:text-background transition-colors duration-400" 
            onClick={() => setActiveIcons(prev => !prev)}
        >
            <div className="h-min p-1!">
                <PlusIcon size={35} status={activeIcons}/>
            </div>
        </div>
        <div className={`flex text-background gap-2 ${activeIcons? 'max-w-28' : 'max-w-0'} overflow-hidden transition-all duration-400`}>
            <a className={`flex text-foreground! p-3! ${activeIcons? 'opacity-100 delay-100' : 'opacity-0'} hover:text-background! hover:bg-foreground h-min transition-all duration-300`} href="https://github.com/Alnn7Bf" target="_blank" rel="noopener noreferrer">
                <GitHubIcon size={21}/>
            </a>
            <a className={`flex text-foreground! p-3! ${activeIcons? 'opacity-100 delay-100' : 'opacity-0'} hover:text-background! hover:bg-foreground h-min transition-all duration-300`} href="https://www.instagram.com/alnn7_bf" target="_blank" rel="noopener noreferrer">
                <InstagramIcon size={21}/>
            </a>
        </div>
    </div>
    )
}