import GridElement from "../ui/GridElement"
import type { ScheduleBlock } from "../../types/types";
import type { RefObject } from "react";

const headers = ['Horario', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const schedules = ['7:00 - 8:30', '8:30 - 10:00', '10:00 - 11:30', '11:30 - 13:00', '13:00 - 14:30', '14:30 - 16:00', '16:00 - 17:30', '17:30 - 19:00', '19:00 - 20:30', '20:30 - 22:00'];

interface PanelProps {
    ref: RefObject<HTMLDivElement | null>;
    active: string | null;
    scheduleBlocks: ScheduleBlock[];
}

export default function GridPanel({ ref, active, scheduleBlocks } : PanelProps) {
    return (
        <div ref={ref} className="grid grid-cols-7 gap-px grid-rows-[repeat(11,38px)] gap-y-border">
            <div className="grid col-span-7 grid-cols-subgrid bg-primary text-background">
                {
                    headers.map((day, i) => (
                        <GridElement key={`1-${i}`}>
                            {day}
                        </GridElement>
                    ))
                }
            </div>
            <div className="grid row-span-10 grid-rows-subgrid">
                {
                    schedules.map((schedule, i) => (
                        <GridElement 
                            key={`${i}-1`} 
                            variant={['base']}
                        >
                            {schedule}
                        </GridElement>
                    ))
                }
            </div>
            <div className="grid row-span-10 col-span-6 grid-rows-subgrid grid-cols-subgrid">
                {
                    scheduleBlocks.map(schedule => (
                        <GridElement 
                            key={schedule.id}
                            isVisible={ !active || schedule.subjectIds.includes(active) }
                            variant={schedule.variant}
                            placement={[
                                schedule.column,
                                schedule.rowStart,
                                schedule.span
                            ]}
                        >
                            <p className="leading-tight m-0!">{schedule.abbSubjects.join(' - ')}</p>
                            <p className="font-extralight opacity-60 text-xxs m-0!">{schedule.groups.join(' - ')}</p>
                        </GridElement>
                    ))
                }
            </div>
        </div>
    )
}