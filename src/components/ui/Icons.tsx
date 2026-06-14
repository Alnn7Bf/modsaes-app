interface IconProps {
    size: number;
    status?: boolean;
}

export const PlusIcon = ({ size, status } : IconProps) => {
    return  <>
        <svg 
            width={size} 
            height={size} 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5" 
            viewBox="0 0 24 24"
        >
            <path d={`M6 ${status? '12H18' : '12H12M18 12H12M12 12V6M12 12V18'}`}></path>
        </svg>
    </>
};

export const BackSpaceIcon = ({ size } : IconProps) => {
    return  <>
        <svg 
            width={size} 
            height={size} 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5" 
            viewBox="0 0 24 24"
        >
            <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"></path>
        </svg>
    </>
};

export const SearchIcon = ({ size } : IconProps) => {
    return  <>
        <svg 
            width={size} 
            height={size} 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5" 
            viewBox="0 0 24 24"
        >
            <path d="M17 17L21 21"></path>
            <path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z"></path>
                    
        </svg>
    </>
};

export const GitHubIcon = ({ size } : IconProps) => {
    return  <>
        <svg 
            width={size} 
            height={size} 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5" 
            viewBox="0 0 24 24"
        >
            <path d="M16 22.0268V19.1568C16.0375 18.68 15.9731 18.2006 15.811 17.7506C15.6489 17.3006 15.3929 16.8902 15.06 16.5468C18.2 16.1968 21.5 15.0068 21.5 9.54679C21.4997 8.15062 20.9627 6.80799 20 5.79679C20.4558 4.5753 20.4236 3.22514 19.91 2.02679C19.91 2.02679 18.73 1.67679 16 3.50679C13.708 2.88561 11.292 2.88561 8.99999 3.50679C6.26999 1.67679 5.08999 2.02679 5.08999 2.02679C4.57636 3.22514 4.54413 4.5753 4.99999 5.79679C4.03011 6.81549 3.49251 8.17026 3.49999 9.57679C3.49999 14.9968 6.79998 16.1868 9.93998 16.5768C9.61098 16.9168 9.35725 17.3222 9.19529 17.7667C9.03334 18.2112 8.96679 18.6849 8.99999 19.1568V22.0268"></path>
            <path d="M9 20.0267C6 20.9999 3.5 20.0267 2 17.0267"></path>
        </svg>
    </>
};

export const InstagramIcon = ({ size } : IconProps) => {
    return  <>
        <svg 
            width={size} 
            height={size} 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5" 
            viewBox="0 0 24 24"
        >
            <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"></path>
            <path d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z"></path>
            <path d="M17.5 6.51L17.51 6.49889"></path>
        </svg>
    </>
};

export const RemoveIcon = ({ size } : IconProps) => {
    return  <>
        <svg 
            width={size} 
            height={size} 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5" 
            viewBox="0 0 24 24"
        >
            <path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9"></path>
            <path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6"></path>
        </svg>
    </>
};

export const WarningIcon = ({ size } : IconProps) => {
    return  <>
        <svg 
            width={size} 
            height={size} 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5" 
            viewBox="0 0 24 24"
        >
            <path d="M12 7L12 13"></path>
            <path d="M12 17.01L12.01 16.9989"></path>
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
        </svg>
    </>
};