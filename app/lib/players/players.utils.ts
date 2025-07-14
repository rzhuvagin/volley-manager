export function percentToColor(value: number): string {
    // Ограничиваем значение в диапазоне 0-100
    const clampedValue = Math.max(0, Math.min(100, value));

    let r: number, g: number, b: number;

    if (clampedValue <= 20) {
        // 0-20: чистый красный
        r = 255;
        g = 0;
        b = 0;
    } else if (clampedValue <= 50) {
        // 20-50: красный → жёлтый (R=255, G увеличивается)
        const ratio = (clampedValue - 20) / 30;
        r = 255;
        g = Math.floor(ratio * 255);
        b = 0;
    } else if (clampedValue <= 80) {
        // 50-80: жёлтый → зелёный (R уменьшается, G=255)
        const ratio = (clampedValue - 50) / 30;
        r = Math.floor((1 - ratio) * 255);
        g = 255;
        b = 0;
    } else if (clampedValue <= 90) {
        // 80-90: зелёный → синий (G уменьшается, B увеличивается)
        const ratio = (clampedValue - 80) / 10;
        r = 0;
        g = Math.floor((1 - ratio) * 255);
        b = Math.floor(ratio * 255);
    } else {
        // 90-100: синий → фиолетовый (R увеличивается, B=255)
        const ratio = (clampedValue - 90) / 10;
        r = Math.floor(ratio * 125);
        g = 0;
        b = 255;
    }

    // Преобразуем компоненты в шестнадцатеричную строку
    const toHex = (c: number) => Math.round(c).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b).toUpperCase()}`;
}