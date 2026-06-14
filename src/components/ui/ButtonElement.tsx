interface ButtonProps{
  func: () => void;
  children: string;
}

export default function ButtonElement({ func, children } : ButtonProps) {
  return (
    <button
      type="button"
      className="bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 px-3! py-1! outline-transparent cursor-pointer"
      onClick={func}
    >
      {children}
    </button>
  )
}