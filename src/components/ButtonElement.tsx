interface buttonProps{
  func: () => void;
  children: string;
}

export default function ButtonElement({ func, children } : buttonProps) {
  return (
    <button
      type="button"
      className="bg-foreground/5 hover:bg-foreground/10 active:bg-foreground/20 px-2! py-1! outline outline-foreground/20 rounded-global cursor-pointer"
      onClick={func}
    >
      {children}
    </button>
  )
}