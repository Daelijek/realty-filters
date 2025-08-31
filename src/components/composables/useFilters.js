import { reactive, computed } from 'vue';
import { parseDecimal, parseIntSafe, clamp, swapIfReversed } from '../utils/numbers';

export const LIMITS = Object.freeze({ area: { min: 0, max: 1000 }, rooms: { min: 1, max: 10 } });

export function useFilters() {
    const filters = reactive({ q: '', areaFrom: null, areaTo: null, roomsFrom: null, roomsTo: null });

    const errors = computed(() => {
        const e = { area: '', rooms: '' };
        const { area, rooms } = LIMITS;
        const { areaFrom: aF, areaTo: aT, roomsFrom: rF, roomsTo: rT } = filters;

        if (aF != null && (aF < area.min || aF > area.max)) e.area = `Площадь: ${area.min}–${area.max}`;
        if (!e.area && aT != null && (aT < area.min || aT > area.max)) e.area = `Площадь: ${area.min}–${area.max}`;
        if (!e.area && aF != null && aT != null && aF === aT) e.area = '«От» и «До» не должны совпадать';

        if (rF != null && (rF < rooms.min || rF > rooms.max)) e.rooms = `Комнаты: ${rooms.min}–${rooms.max}`;
        if (!e.rooms && rT != null && (rT < rooms.min || rT > rooms.max)) e.rooms = `Комнаты: ${rooms.min}–${rooms.max}`;
        if (!e.rooms && rF != null && rT != null && rF > rT) e.rooms = '«От» не может быть больше «До»';

        return e;
    });

    function apply(raw) {
        let aF = parseDecimal(raw.areaFrom, { min: LIMITS.area.min });
        let aT = parseDecimal(raw.areaTo, { min: LIMITS.area.min });
        let rF = parseIntSafe(raw.roomsFrom, { min: LIMITS.rooms.min });
        let rT = parseIntSafe(raw.roomsTo, { min: LIMITS.rooms.min });

        if ([aF, aT, rF, rT].some(Number.isNaN)) return;

        [aF, aT] = swapIfReversed(aF, aT);
        [rF, rT] = swapIfReversed(rF, rT);

        filters.areaFrom = aF != null ? clamp(aF, LIMITS.area.min, LIMITS.area.max) : null;
        filters.areaTo = aT != null ? clamp(aT, LIMITS.area.min, LIMITS.area.max) : null;
        filters.roomsFrom = rF != null ? clamp(rF, LIMITS.rooms.min, LIMITS.rooms.max) : null;
        filters.roomsTo = rT != null ? clamp(rT, LIMITS.rooms.min, LIMITS.rooms.max) : null;
        filters.q = (raw.q || '').trim().slice(0, 100);
    }

    function reset() {
        filters.q = ''; filters.areaFrom = filters.areaTo = filters.roomsFrom = filters.roomsTo = null;
    }

    return { filters, errors, apply, reset };
}