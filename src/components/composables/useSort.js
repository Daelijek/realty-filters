import { ref } from 'vue';
export const ALLOWED_SORT = ['none', 'area_asc', 'area_desc', 'addr_asc', 'addr_desc'];
export function useSort() { const sort = ref('none'); return { sort }; }