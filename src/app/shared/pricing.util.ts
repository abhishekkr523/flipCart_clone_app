export function getDiscountPercent(mrp: number, price: number): number {
    if (!mrp || mrp <= price) {
        return 0;
    }
    return Math.round(((mrp - price) / mrp) * 100);
}
