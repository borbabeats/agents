const formatter = new Intl.RelativeTimeFormat('pt-BR', { style: 'short' });

export function formatRelativeDate(date: Date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return formatter.format(-years, 'year');
    } else if (months > 0) {
        return formatter.format(-months, 'month');
    } else if (days > 0) {
        return formatter.format(-days, 'day');
    } else if (hours > 0) {
        return formatter.format(-hours, 'hour');
    } else if (minutes > 0) {
        return formatter.format(-minutes, 'minute');
    } else {
        return formatter.format(-seconds, 'second');
    }
}