const timeMap : Record<string, number> = {
    "07:00": 1,
    "08:30": 2,
    "10:00": 3,
    "11:30": 4,
    "13:00": 5,
    "14:30": 6,
    "16:00": 7,
    "17:30": 8,
    "19:00": 9,
    "20:30": 10,
    "22:00": 11
};

export default function parseSchedule(schedule : string) {
    const [start, end] = schedule.split('-').map(time => time.trim());

    const startRow = timeMap[start];
    const endRow = timeMap[end];

    if(!startRow || !endRow) return null;

    return {
        rowStart: startRow,
        span: endRow - startRow
    };
}