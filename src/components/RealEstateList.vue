<template>
    <div class="real-estate-list">
        <EmptyState v-if="mode === 'all' && !sales.length && !rents.length" icon="🔍" title="Ничего не найдено"
            text="Попробуйте изменить фильтры или сбросить их." @reset="$emit('reset')" />

        <RealEstateCategory v-if="mode !== 'rent'" title="Продажа" :items="sales" empty-icon="🗂️"
            empty-title="По разделу «Продажа» нет результатов" empty-text="Расширьте диапазоны или измените запрос."
            @reset="$emit('reset')" />

        <RealEstateCategory v-if="mode !== 'sale'" title="Аренда" :items="rents" empty-icon="📂"
            empty-title="По разделу «Аренда» нет результатов" empty-text="Попробуйте изменить фильтры или поиск."
            @reset="$emit('reset')" />
    </div>
</template>

<script>
import realEstates from '@/components/data/real_estate.json';
import RealEstateCategory from '@/components/RealEstateCategory.vue';
import EmptyState from '@/components/EmptyState.vue';

const ALLOWED_SORT = ['none', 'area_asc', 'area_desc', 'addr_asc', 'addr_desc'];

export default {
    name: 'RealEstateList',
    components: { RealEstateCategory, EmptyState },
    emits: ['reset'],
    props: {
        mode: { type: String, default: 'all', validator: v => ['all', 'rent', 'sale'].includes(v) },
        filters: { type: Object, default: () => ({}) },
        sort: { type: String, default: 'none', validator: v => ALLOWED_SORT.includes(v) }
    },
    data() { return { realEstates }; },
    computed: {
        _q() { return (this.filters?.q || '').toString().toLowerCase().replace(/\s+/g, ' ').trim(); },
        sales() { return this.applySort(this.realEstates.filter(i => i.type === 'Продажа').filter(this.matches)); },
        rents() { return this.applySort(this.realEstates.filter(i => i.type === 'Аренда').filter(this.matches)); }
    },
    methods: {
        matches(i) {
            const f = this.filters || {};
            if (this._q && !String(i.address || '').toLowerCase().replace(/\s+/g, ' ').includes(this._q)) return false;
            const area = Number(i.area), rooms = Number(i.rooms);
            if (f.areaFrom != null && !(Number.isFinite(area) && area >= f.areaFrom)) return false;
            if (f.areaTo != null && !(Number.isFinite(area) && area <= f.areaTo)) return false;
            if (f.roomsFrom != null && !(Number.isFinite(rooms) && rooms >= f.roomsFrom)) return false;
            if (f.roomsTo != null && !(Number.isFinite(rooms) && rooms <= f.roomsTo)) return false;
            return true;
        },
        applySort(list) {
            if (!Array.isArray(list) || this.sort === 'none') return list;
            const arr = list.slice();
            if (this.sort === 'area_asc') arr.sort((a, b) => (+a.area || 0) - (+b.area || 0));
            if (this.sort === 'area_desc') arr.sort((a, b) => (+b.area || 0) - (+a.area || 0));
            if (this.sort === 'addr_asc') arr.sort((a, b) => String(a.address || '').localeCompare(String(b.address || ''), 'ru', { sensitivity: 'base' }));
            if (this.sort === 'addr_desc') arr.sort((a, b) => String(b.address || '').localeCompare(String(a.address || ''), 'ru', { sensitivity: 'base' }));
            return arr;
        }
    }
};
</script>

<style scoped>
.real-estate-list {
    --primary: #1A56DB;
    --surface: #ffffff;
    --bg: #f8fafc;
    --text: #0f172a;
    --muted: #475569;
    --border: #e5e7eb;

    width: 100%;
    margin: 0 auto;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
    display: grid;
    gap: clamp(22px, 3.4vw, 36px);
    color: var(--text);
}

@media (prefers-color-scheme: dark) {
    .real-estate-list {
        --surface: #2a81dd;
        --bg: #2a81dd;
        --text: #e5e7eb;
        --muted: #9aa7b4;
        --border: #2a81dd;
    }
}
</style>