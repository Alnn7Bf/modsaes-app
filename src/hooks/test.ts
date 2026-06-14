/*import { useEffect, useMemo } from "react"
import parseSchedule from "../utils/parseSchedule";
import toInitial from "../utils/toInitial";

import type { Subject, ScheduleBlock, VariantType, ColType, RowType, SpanType } from "../types/types";

type DayKey = | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";

const dayMap : Record<DayKey, number> = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6
}

export default function useOverlayData(selected: Set<string>) {
    const selectedSubjects = [...selected];

    const subjects : Subject[] = useMemo(() => {
        return JSON.parse(localStorage.getItem('saesSubjects') || '[]');
    }, []);

    const subjectMap = useMemo(() => {
        return new Map(
            subjects.map(subject => [subject.id, subject])
        );
    }, [subjects]);

    const selectedData = selectedSubjects
        .map(id => subjectMap.get(id))
        .filter((subject) : subject is Subject => !!subject);

    const repeatedSubjectsMap = useMemo(() => {
        const countMap = new Map<string, number>();
        const result = new Map<string, boolean>();

        for (const subject of selectedData) {
            const key = subject.subject;
            countMap.set(key, (countMap.get(key) ?? 0) + 1);
        }

        for (const subject of selectedData) {
            const isRepeated = (countMap.get(subject.subject) ?? 0) > 1;
            result.set(subject.id, isRepeated);
        }

        return result;
    }, [selectedData]);

    const scheduleBlocks = useMemo<ScheduleBlock[]>(() => {
        const raw = selectedData.flatMap(subject =>
            (Object.entries(dayMap) as [DayKey, number][]).flatMap(([day, column]) => {
                const schedule = subject[day as keyof Subject];
                if(!schedule) return [];

                const parsed = parseSchedule(schedule);
                if(!parsed) return [];

                const isRepeated = repeatedSubjectsMap.get(subject.id) === true;

                return [{
                    id: `${subject.id}-${day}`,
                    subjectId: subject.id,

                    fullSubject: subject.subject,
                    subject: toInitial(subject.subject),
                    teacher: subject.teacher,
                    group: subject.group,

                    column: column as ColType,
                    rowStart: parsed.rowStart as RowType,
                    span: parsed.span as SpanType,
                    
                    variant: (isRepeated? ['base', 'repeated'] : ['base']) as VariantType[],
                }];
            })
        );

        const processed = new Set<string>();
        const merged : ScheduleBlock[] = [];

        for(const block of raw) {
            if(processed.has(block.id)) continue;

            const blockStart = block.rowStart;
            const blockEnd = block.rowStart + block.span;

            const overlaps = raw.filter(other => {
                if(other.id === block.id) return false;
                if(processed.has(other.id)) return false;
                if(other.column !== block.column) return false;

                const otherStart = other.rowStart;
                const otherEnd = other.rowStart + other.span;

                return blockStart < otherEnd && otherStart < blockEnd;
            });

            const allBlocks = [block, ...overlaps];

            const start = Math.min(...allBlocks.map(item => item.rowStart));
            const end = Math.max(...allBlocks.map(item => item.rowStart + item.span));

            allBlocks.forEach(item => processed.add(item.id));

            if(overlaps.length === 0) {
                merged.push({
                    ...block,
                    subjectIds: [block.subjectId],
                    variant: [...block.variant]
                })

                processed.add(block.id);
                continue;
            }

            merged.push({
                id: allBlocks.map(item => item.id).join('-'),
                subjectIds: allBlocks.map(item => item.subjectId),
                subject: [...new Set(allBlocks.map(item => item.subject))].join(' - '),
                fullSubject: [...new Set(allBlocks.map(item => item.fullSubject))].join(' - '),
                group: [...new Set(allBlocks.map(item => item.group))].join(' - '),
                teacher: [...new Set(allBlocks.map(item => item.teacher))].join(' - '),

                column: block.column,
                rowStart: start as RowType,
                span: (end - start) as SpanType,
                
                variant: block.variant
                    .filter(v => v !== 'base')
                    .concat('overlap')
            });
        }
        return merged;
    }, [selectedData]);

    const subjectVariants = useMemo(() => {
        const map = new Map<string, VariantType[]>();

        for(const block of scheduleBlocks) {
            for(const subjectId of block.subjectIds) {
                const current = map.get(subjectId) ?? [];

                block.variant.forEach(v => {
                    if(!current.includes(v)) current.push(v);
                });
                map.set(subjectId, current);
            }
        }
        return map;
    }, [scheduleBlocks]);

    useEffect(() => {
        console.log(repeatedSubjectsMap);
        console.log(scheduleBlocks);
    })

    return {
        selectedData,
        scheduleBlocks,
        subjectVariants
    }
}*/