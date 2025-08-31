<template>
    <section class="category">
        <h2>
            {{ title }}
            <small v-if="showCount && items && items.length">({{ items.length }})</small>
        </h2>

        <div v-if="items && items.length" class="cards">
            <RealEstateCard v-for="it in items" :key="it.id" :item="it" />
        </div>

        <EmptyState v-else :icon="emptyIcon" :title="emptyTitle" :text="emptyText" @reset="$emit('reset')" />
    </section>
</template>

<script>
import RealEstateCard from './RealEstateCard.vue';
import EmptyState from './EmptyState.vue';

export default {
    name: 'RealEstateCategory',
    components: { RealEstateCard, EmptyState },
    emits: ['reset'],
    props: {
        title: { type: String, required: true },
        items: { type: Array, default: () => [] },
        showCount: { type: Boolean, default: true },
        emptyIcon: { type: String, default: '🗂️' },
        emptyTitle: { type: String, default: 'Нет результатов' },
        emptyText: { type: String, default: 'Попробуйте изменить фильтры или поиск.' }
    }
};
</script>

<style scoped>
.category {
    display: grid;
    gap: 12px;
}

.category h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0;
    color: var(--primary, #1A56DB);
    font-size: clamp(20px, 2.6vw, 26px);
    font-weight: 800;
}

.category h2 small {
    font-weight: 600;
    color: var(--muted, #475569);
    font-size: clamp(12px, 1.6vw, 14px);
}

.cards {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: clamp(14px, 2.4vw, 22px);
    padding: 0 2px;
}

@media (min-width:640px) {
    .cards {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (min-width:900px) {
    .cards {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (min-width:1200px) {
    .cards {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
}
</style>