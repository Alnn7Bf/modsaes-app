const ignore = ['de', 'del', 'la', 'las', 'el', 'los', 'y', 'a', 'para', 'e', 'o', 'por'];

export default function toInitial(text: string) {
    if(!text.trim()) return '';
    
    const abb = text.trim().split(/\s+/);

    const filtered = abb.filter(word => !ignore.includes(word.toLowerCase()));

    if(filtered.length > 1) {
        return filtered
            .map(word => word[0])
            .join('')
            .toUpperCase();
    }

    return abb[0].slice(0, 3).toUpperCase();
}