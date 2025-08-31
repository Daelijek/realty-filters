<template>
    <div class="empty">
        <div class="empty__icon" aria-hidden="true">{{ icon }}</div>
        <h3 class="empty__title">{{ title }}</h3>
        <p v-if="text" class="empty__text">{{ text }}</p>
        <button v-if="showReset" class="empty__btn" type="button" @click="$emit('reset')">
            Сбросить фильтры
        </button>
    </div>
</template>

<script>
export default {
    name: 'EmptyState',
    emits: ['reset'],
    props: {
        icon: { type: String, default: '🔍' },
        title: { type: String, required: true },
        text: { type: String, default: '' },
        showReset: { type: Boolean, default: true }
    }
};
</script>

<style scoped>
.empty {
    border: 1px dashed var(--border, #e5e7eb);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    color: var(--muted, #475569);
    background: var(--bg, #f8fafc);
    display: grid;
    gap: 8px;
    justify-items: center;
}

.empty__icon {
    font-size: 28px;
    line-height: 1;
}

.empty__title {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: var(--text, #0f172a);
}

.empty__text {
    margin: 0;
    font-size: 14px;
}

.empty__btn {
    margin-top: 6px;
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid var(--primary, #1A56DB);
    background: var(--primary, #1A56DB);
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    transition: transform .15s ease, box-shadow .15s ease, filter .15s ease;
}

.empty__btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px color-mix(in oklab, var(--primary, #1A56DB) 25%, transparent);
    filter: brightness(.98);
}

@media (max-width: 480px) {
    .empty__btn {
        width: 100%;
    }
}

@media (prefers-reduced-motion: reduce) {

    .empty__btn,
    .empty__btn:hover {
        transition: none;
        transform: none;
        box-shadow: none;
    }
}
</style>