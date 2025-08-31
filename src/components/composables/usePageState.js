import { useFilters } from './useFilters';
import { useSort } from './useSort';
import { useQuerySync } from './useQuerySync';
import { useListings } from './useListings';

export function usePageState() {
    const { filters, errors, apply, reset } = useFilters();
    const { sort } = useSort();
    useQuerySync(filters, sort);
    const { sales, rents } = useListings(filters, sort);
    return { filters, errors, apply, reset, sort, sales, rents };
}