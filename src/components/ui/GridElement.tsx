import type { ReactNode } from "react";
import { variantStyle, colStyle, rowStyle, spanStyle } from "../../types/types";
import type { VariantType, ColType, RowType, SpanType } from "../../types/types";

interface GridProps {
  active?: boolean;
  children: ReactNode;
  variant?: VariantType[];
  placement?: [ColType | 'auto', RowType | 'auto', SpanType]
}

export default function GridElement ({ active = true, children, variant, placement = ['auto', 'auto', 1] } : GridProps) {
  const [col, row, span] = placement;
  return (
    <div className={`
      min-h-9
      flex
      flex-col
      items-center
      justify-center
      px-4!
      py-1!
      outline-background
      ${variant?.map(v => variantStyle[v]).join(' ')}
      ${col === 'auto'? 'col-start-auto' : colStyle[col]}
      ${row === 'auto'? 'row-start-auto' : rowStyle[row]}
      ${spanStyle[span]}
      ${active? 'opacity-100' : 'opacity-25'}
      transition-all
      duration-100
    `}>
        {children}
    </div>
  )
}