<template>
    <div class="my-select">
        <label v-if="label" class="my-select__label" :for="id">{{ label }}</label>
        <select class="my-select__control" :id="id" :value="modelValue" :disabled="disabled"
            @change="$emit('update:modelValue', $event.target.value)" :aria-label="ariaLabel || label">
            <option v-if="placeholder" value="">{{ placeholder }}</option>
            <option v-for="opt in options" :key="opt.value" :value="opt.value">
                {{ opt.label }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'MySelect',
    props: {
        modelValue: { type: [String, Number], default: '' },
        options: { type: Array, default: () => [] },
        placeholder: { type: String, default: '' },
        disabled: { type: Boolean, default: false },
        id: { type: String, default: null },
        label: { type: String, default: '' },
        ariaLabel: { type: String, default: '' }
    },
    emits: ['update:modelValue']
}
</script>

<style scoped>
.my-select {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 10px;
    max-width: 100%;
    font-family: 'Arial';
}

@media (max-width: 520px) {
    .my-select {
        grid-template-columns: 1fr;
    }
}

.my-select__label {
    font-size: 14px;
    color: #334155;
}

.my-select__control {
    min-width: 220px;
    width: 100%;

    padding: clamp(8px, 2.2vw, 12px) clamp(10px, 3vw, 14px);
    min-height: clamp(36px, 5vw, 44px);

    border-radius: 10px;
    border: 1px solid #cbd5e1;
    background: #fff;
    color: #0f172a;
    font-size: clamp(14px, 1.6vw, 16px);

    box-shadow: 0 1px 2px rgba(16, 24, 40, .04), 0 1px 3px rgba(16, 24, 40, .06);

    appearance: auto;

    transition: border-color .15s ease, box-shadow .15s ease, background-color .15s ease;
}

.my-select__control:hover {
    border-color: #94a3b8;
}

.my-select__control:focus-visible {
    outline: none;
    border-color: #2a81dd;
    box-shadow: 0 0 0 3px rgba(42, 129, 221, .25);
}

.my-select__control:disabled {
    background: #f1f5f9;
    color: #94a3b8;
    cursor: not-allowed;
}

@media (max-width: 380px) {
    .my-select__control {
        min-width: 0;
    }
}
</style>