import { useMemo, useState } from "react";
import ButtonElement from "./components/ui/ButtonElement";
import Overlay from "./components/layout/Overlay";
import usePersistentSelections from "./hooks/usePersistentSelection";

import type { Subject } from "./types/types";
import { BackSpaceIcon, SearchIcon } from "./components/ui/Icons";
import useDismissible from "./hooks/useDismissible";

export default function App() {
  const [activeOverlay, setActiveOverlay] = useState(false);
  useDismissible(activeOverlay, () => setActiveOverlay(false));

  const currentPage = useMemo(() => (
    JSON.parse(localStorage.getItem('saesCurrentPage') || '{}')
  ), []);

  const subjects : Subject[] = useMemo(() => (
    JSON.parse(localStorage.getItem('saesSubjects') || '[]')
  ), []);

  const filteredSubjects = subjects.filter(sub => (
    `${sub.career}-${sub.shift}-${sub.plan}-${sub.semester}` === currentPage.filter
  ));

  const hasSubjects = filteredSubjects.length > 0;

  const { selected, toggle, isSelected, clear, remove } = usePersistentSelections();

  const [search, setSearch] = useState('');

  const searchedData = useMemo(() => {
    const content = search.toLowerCase().trim();
    
    return filteredSubjects.filter(sub => {
      if(!content) return true;

      return (
        sub.subject.toLowerCase().includes(search.toLowerCase()) ||
        sub.teacher.toLowerCase().includes(search.toLowerCase()) ||
        sub.group.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [search, filteredSubjects]);
  
  return (
    <td colSpan={2}>
      <div className="flex flex-col relative">
        <div className="flex flex-row w-full gap-2 m-2! justify-center"> 
          <div className="flex relative group">
              <input 
              id="search-input"
              type="text"
              value={search}
              placeholder="Buscar"
              autoComplete="off"
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent hover:bg-foreground/5 focus:bg-foreground/5 outline outline-foreground/20 hover:outline-transparent focus:outline-transparent px-3! transition-colors duration-300 group-hover:bg-foreground/5 group-hover:outline-transparent"
            />
            <button
              type="button"
              onClick={() => {
                search !== ''
                  ? setSearch('')
                  : document.getElementById('search-input')?.focus();
              }}
              className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {
                search !== ''? (
                  <BackSpaceIcon size={18} />
                ) : (
                  <SearchIcon size={15}/>
                )
              }
            </button>
          </div>
          <ButtonElement func={() => {setActiveOverlay(prev => !prev)}}>Ver Selección</ButtonElement>
          <ButtonElement func={clear}>Limpiar Selección</ButtonElement>
        </div>
        <div className="flex flex-row w-full gap-2 m-2! justify-center overflow-auto">
          {
            hasSubjects && (
              <div className="text-[10px] text-center w-full max-h-64 overflow-y-auto">
                <table className="w-full border-collapse">
                  <thead className="sticky top-0 z-10">
                    <tr className="text-white">
                      <th className="bg-primary font-normal w-11">Grupo</th>
                      <th className="bg-primary font-normal w-30">Asignatura</th>
                      <th className="bg-primary font-normal w-22">Profesor</th>
                      <th className="bg-primary font-normal w-10.5">Edificio</th>
                      <th className="bg-primary font-normal w-9">Salón</th>
                      <th className="bg-primary font-normal w-1">Lun</th>
                      <th className="bg-primary font-normal w-1">Mar</th>
                      <th className="bg-primary font-normal w-1">Mie</th>
                      <th className="bg-primary font-normal w-1">Jue</th>
                      <th className="bg-primary font-normal w-1">Vie</th>
                      <th className="bg-primary font-normal w-1">Sab</th>
                      <th className="bg-primary font-normal w-1">#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      searchedData.map((subject, index) => (
                        <tr key={subject.id} className={index % 2 == 0? 'bg-white' : 'bg-neutral-100'} >
                          <td className="font-light">{subject.group}</td>
                          <td className="font-light">{subject.subject}</td>
                          <td className="font-light">{subject.teacher}</td>
                          <td className="font-light">{subject.building}</td>
                          <td className="font-light">{subject.classroom}</td>
                          <td className="font-light">{subject.monday || "-"}</td>
                          <td className="font-light">{subject.tuesday || "-"}</td>
                          <td className="font-light">{subject.wednesday || "-"}</td>
                          <td className="font-light">{subject.thursday || "-"}</td>
                          <td className="font-light">{subject.friday || "-"}</td>
                          <td className="font-light">{subject.saturday || "-"}</td>
                          <td className="font-light">
                            <input 
                              type="checkbox" 
                              checked={isSelected(subject.id)}
                              onChange={() => toggle(subject.id)}
                            />
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            )
          }
        </div>
          {
            activeOverlay && (
              <Overlay onClose={() => setActiveOverlay(false)} selected={selected} remove={remove}/>
            )
          }
      </div>
    </td>
  )
}

