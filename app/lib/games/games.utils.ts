/**
 * Конвертирует день недели из числа в короткую текстовую запись
 * @param date дата
 * @returns краткое обозначение дня недели, например "пн"
 */
export function getWeekdayShort(date: Date): string {
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    return days[date.getDay()];
}

/**
 * Форматирование продолжительности из числа в строку
 * @param duration продолжительность в минутах
 * @returns строка формата `${hours}ч ${mins}м`
 */
export function formatDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const mins = duration % 60;
    return `${hours}ч ${mins}м`;
}

/**
 * Форматирование времени игры
 * @param startTime время начала в формате HH:MM:SS
 * @param duration продолжительность игры в минутах
 * @returns строка формата HH:MM—HH:MM со временами начала и конца игры
 */
export function formatTimeRange(startTime: string, duration: number): string {
    const [startHours, startMinutes] = startTime.split(':').map(Number);

    // Создаем объект Date с произвольной датой и временем startTime
    const startDate = new Date(0, 0, 0, startHours, startMinutes);
    // Прибавляем duration минут
    startDate.setMinutes(startDate.getMinutes() + duration);

    // Форматируем конечное время
    const endHours = String(startDate.getHours()).padStart(2, '0');
    const endMinutes = String(startDate.getMinutes()).padStart(2, '0');
    const endTimeFormat = `${endHours}:${endMinutes}`;

    return `${startTime.slice(0, 5)}—${endTimeFormat}`;
}

/**
 * Возвращает объект Date окончания игры, учитывая дату, время начала и продолжительность
 * @param startDate дата (используется только дата)
 * @param startTime время начала в формате HH:MM:SS
 * @param duration продолжительность в минутах
 * @returns объект Date окончания игры
 */
export function getEndGameDate(
    startDate: Date,
    startTime: string,
    duration: number
): Date {
    const [hours, minutes, seconds] = startTime.split(':').map(Number);

    // Создаем новый объект Date с датой из startDate и временем из startTime
    const endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        hours,
        minutes,
        seconds
    );

    // Прибавляем продолжительность
    endDate.setMinutes(endDate.getMinutes() + duration);

    return endDate;
}
