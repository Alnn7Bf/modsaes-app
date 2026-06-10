import { useState } from "react";
import ButtonElement from "./components/ButtonElement";
import Overlay from "./components/Overlay";
import useDismissible from "./hooks/useDismissible";

export default function App() {
  const hasSubjects = true;
  const [activeOverlay, setActiveOverlay] = useState(false);

  useDismissible(activeOverlay, () => setActiveOverlay(false));

  return (
    <td colSpan={2}>
      <div className="flex flex-col relative">
        <div className="flex flex-row w-full gap-2 m-2! justify-center"> 
          <input 
            id="search-input"
            type="text"
            placeholder="Buscar"
            autoComplete="off"
            onChange={() => {}}
            className="bg-transparent hover:bg-foreground/5 focus:bg-foreground/5 outline outline-foreground/20 hover:outline-transparent focus:outline-transparent rounded-global px-3! transition-colors duration-300"
          />
          <ButtonElement func={() => {setActiveOverlay((prev) => !prev)}}>Ver Selección</ButtonElement>
          <ButtonElement func={() => {}}>Limpiar Selección</ButtonElement>
        </div>
        <div className="flex flex-row w-full gap-2 m-2! justify-center">
          {
            hasSubjects? (
              <div>
                <table>
                  <tbody>

                  </tbody>
                </table>
              </div>
            ) : (
              <span className="text-red-500 text-sm">No existen grupos.</span>
            )
          }
        </div>
        {
          activeOverlay && (
            <Overlay onClose={() => setActiveOverlay(false)}/>
          )
        }
      </div>
    </td>
  )
}

