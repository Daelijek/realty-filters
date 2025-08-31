<template>
    <div v-if="show" class="modal" @click.stop="hideModal">
        <div class="modal__content" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyModal',
    props: {
        show: { type: Boolean, required: true, default: false }
    },
    methods: {
        hideModal() { this.$emit('update:show', false); }
    }
}
</script>

<style scoped>
.modal {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(15, 23, 42, 0.45);
    backdrop-filter: blur(2px);
    z-index: 1000;

    animation: fadeIn .15s ease;
}

.modal__content {
    background-color: #fff;
    border-radius: 14px;
    box-shadow: 0 10px 24px rgba(0, 0, 0, .18);
    border: 1px solid #e5e7eb;

    width: min(680px, 92vw);
    max-height: 85vh;
    overflow: auto;

    padding: 20px;
    animation: popIn .18s ease;
}

@media (max-width: 640px) {
    .modal {
        align-items: flex-end;
    }

    .modal__content {
        width: 100vw;
        max-height: 86vh;
        border-radius: 16px 16px 0 0;
        padding: 16px;
        animation: slideUp .18s ease;
    }
}

@media (prefers-reduced-motion: reduce) {

    .modal,
    .modal__content {
        animation: none !important;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0
    }

    to {
        opacity: 1
    }
}

@keyframes popIn {
    from {
        transform: scale(.98);
        opacity: 0
    }

    to {
        transform: scale(1);
        opacity: 1
    }
}

@keyframes slideUp {
    from {
        transform: translateY(16px);
        opacity: 0
    }

    to {
        transform: translateY(0);
        opacity: 1
    }
}
</style>