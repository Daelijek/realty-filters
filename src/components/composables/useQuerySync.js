import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ALLOWED_SORT } from './useSort';

export function useQuerySync(filters, sort) {
    const route = useRoute();
    const router = useRouter();

    const q = route.query;
    if (typeof q.q === 'string') filters.q = q.q.slice(0, 100);
    if (q.areaFrom) filters.areaFrom = Number(q.areaFrom) || null;
    if (q.areaTo) filters.areaTo = Number(q.areaTo) || null;
    if (q.roomsFrom) filters.roomsFrom = Number(q.roomsFrom) || null;
    if (q.roomsTo) filters.roomsTo = Number(q.roomsTo) || null;
    if (typeof q.sort === 'string' && ALLOWED_SORT.includes(q.sort)) sort.value = q.sort;

    watch([filters, sort], () => {
        const next = {
            ...(filters.q ? { q: filters.q } : {}),
            ...(filters.areaFrom != null ? { areaFrom: filters.areaFrom } : {}),
            ...(filters.areaTo != null ? { areaTo: filters.areaTo } : {}),
            ...(filters.roomsFrom != null ? { roomsFrom: filters.roomsFrom } : {}),
            ...(filters.roomsTo != null ? { roomsTo: filters.roomsTo } : {}),
            ...(sort.value !== 'none' ? { sort: sort.value } : {})
        };
        router.replace({ query: next });
    }, { deep: true });
}