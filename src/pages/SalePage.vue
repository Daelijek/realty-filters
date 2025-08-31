<template>
    <section class="page">
        <FiltersPanel v-model:search="filters.q" v-model:filters="filters" @apply="apply" @reset="reset" />

        <div class="page__controls">
            <SortSelect v-model="sort" />
        </div>

        <RealEstateList mode="sale" :filters="filters" :sort="sort" @reset="reset" />
    </section>
</template>

<script>
import FiltersPanel from '@/components/FiltersPanel.vue';
import SortSelect from '@/components/SortSelect.vue';
import RealEstateList from '@/components/RealEstateList.vue';
import { usePageState } from '@/components/composables/usePageState';

export default {
    name: 'SalePage',
    components: { FiltersPanel, SortSelect, RealEstateList },
    setup() {
        const { filters, sort, apply, reset } = usePageState();
        return { filters, sort, apply, reset };
    }
};
</script>

<style scoped>
.page {
    max-width: 1200px;
    margin: 0 auto;
    padding: clamp(12px, 2.5vw, 24px);
    display: grid;
    gap: clamp(12px, 2.6vw, 20px);
    box-sizing: border-box;
}

.page__controls {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

@media (max-width: 640px) {
    .page__controls {
        justify-content: stretch;
    }

    .page__controls :deep(.my-select) {
        width: 100%;
    }
}

@media (prefers-reduced-motion: reduce) {

    .page,
    .page__controls {
        scroll-behavior: auto;
    }
}
</style>