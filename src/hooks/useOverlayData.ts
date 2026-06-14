import { useMemo } from "react"

import parseSchedule from "../utils/parseSchedule";
import toInitial from "../utils/toInitial";

import type { Subject, ScheduleBlock, ListBlock, VariantType, ColType, RowType, SpanType } from "../types/types";

type DayKey = | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";

const dayMap : Record<DayKey, number> = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6
}

export default function useOverlayData(selected : Set<string>) {
    const selectedSubjects = [...selected];
    
    const subjects : Subject[] = useMemo(() =>
        JSON.parse(localStorage.getItem('saesSubjects') || '[]')
    , []);

    const subjectMap = useMemo(() => {
        return new Map(
            subjects.map(subject => [subject.id, subject])
        );
    }, [subjects]);

    const selectedData = selectedSubjects
        .map(id => subjectMap.get(id))
        .filter((subject) : subject is Subject => !!subject);

    const repeatedSubjects = useMemo(() => {
        const countMap = new Map<string, number>();

        for(const subject of selectedData) {
            countMap.set(
                subject.subject,
                (countMap.get(subject.subject) ?? 0) + 1
            );
        }

        return selectedData
            .filter(subject => (countMap.get(subject.subject) ?? 0) > 1)
            .map(subject => subject.id);
    }, [selectedData]);

    const { scheduleBlocks, overlapSubjects } = useMemo(() => {
        const overlapSet = new Set<string>();
        
        const raw = selectedData.flatMap(subject => 
            (Object.entries(dayMap) as [DayKey, number][]).flatMap(([day, column]) => {
                const schedule = subject[day as keyof Subject];
                if(!schedule) return [];

                const parsed = parseSchedule(schedule);
                if(!parsed) return [];

                const isRepeated = repeatedSubjects.includes(subject.id);

                const variant : VariantType[] = 
                    isRepeated
                        ? ['base', 'repeated'] 
                        : ['base'];

                return [{
                    id:`${subject.id}-${day}`,
                    subjectIds: [subject.id],
                    
                    subjects: [subject.subject],
                    abbSubjects: [toInitial(subject.subject)],
                    groups: [subject.group],

                    column: column as ColType,
                    rowStart: parsed.rowStart as RowType,
                    span: parsed.span as SpanType,

                    variant
                }]
            })
        );

        const processed = new Set<string>();
        const merged : ScheduleBlock[] = [];

        for(const block of raw) {
            if(processed.has(block.id)) continue;

            const queue = [block];
            const allBlocks: ScheduleBlock[] = [];

            while(queue.length > 0) {
                const current = queue.shift();
                if(!current) continue;
                if(processed.has(current.id)) continue;

                processed.add(current.id);
                allBlocks.push(current);

                const currentStart = current.rowStart;
                const currentEnd = current.rowStart + current.span;

                const overlaps = raw.filter(other => {
                    if(other.id === current.id) return false;
                    if(processed.has(other.id)) return false;
                    if(other.column !== current.column) return false;

                    const otherStart = other.rowStart;
                    const otherEnd = other.rowStart + other.span;

                    return currentStart < otherEnd && otherStart < currentEnd;
                });

                queue.push(...overlaps);
            }

            if(allBlocks.length > 1) {
                allBlocks
                    .flatMap(item => item.subjectIds)
                    .forEach(id => overlapSet.add(id));
            }

            const start = Math.min(
                ...allBlocks.map(item => item.rowStart)
            );
            const end = Math.max(
                ...allBlocks.map(item => item.rowStart + item.span)
            );

            if(allBlocks.length === 1) {
                merged.push(allBlocks[0]);
                continue;
            }

            allBlocks.forEach(item => processed.add(item.id));

            const variant : VariantType[] = [
                ...new Set<VariantType>([
                    ...allBlocks
                        .flatMap(item => item.variant)
                        .filter(v => v !== 'base'),
                    'overlap'
                ])
            ];

            merged.push({
                id: allBlocks
                    .map(item => item.id)
                    .join(' - '),
                subjectIds: allBlocks
                    .flatMap(item => item.subjectIds),
                subjects: [
                    ...new Set(
                        allBlocks.flatMap(item => item.subjects)
                    )
                ],
                abbSubjects: [
                    ...new Set(
                        allBlocks.flatMap(item => item.abbSubjects)
                    )
                ],
                groups: [
                    ...new Set(
                        allBlocks.flatMap(item => item.groups)
                    )
                ],

                column: block.column,
                rowStart: start as RowType,
                span: (end - start) as SpanType,
                
                variant
            })
        }
        return {
            scheduleBlocks: merged,
            overlapSubjects: overlapSet
        };
    }, [selected]);

    const listBlocks = useMemo<ListBlock[]>(() => {
        const blocks : ListBlock[] = [];
        
        selectedData.forEach(sub => {
            const variants : VariantType[] = [];

            if(repeatedSubjects.includes(sub.id)) variants.push('repeated');
            
            overlapSubjects.has(sub.id) 
                ? variants.push('overlap') 
                : variants.push('base');

            blocks.push({
                id: sub.id,
                subject: sub.subject,
                teacher: sub.teacher,
                group: sub.group,
                variants
            })
        })

        return blocks
            .sort((a, b) =>
                a.subject.localeCompare(b.subject) ||
                a.group.localeCompare(b.group, undefined, { numeric: true })
            )
    }, [selectedData, repeatedSubjects, overlapSubjects]);

    return {
        scheduleBlocks,
        listBlocks
    }
}