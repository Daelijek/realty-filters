<template>
    <div class="input-wrap">
        <input :placeholder="placeholder" class="input" type="text" :value="modelValue" @input="inputHandler">
    </div>
</template>

<script>
export default {
    name: 'MyInput',
    props: {
        modelValue: [String, Number],
        placeholder: { type: String, default: '' },
    },
    methods: {
        inputHandler(e) { this.$emit('update:modelValue', e.target.value) }
    }
}
</script>

<style scoped>
.input-wrap {
    width: 100%;
}

.input {
    width: 100%;
    padding: clamp(8px, 2.2vw, 12px) clamp(10px, 3vw, 14px);
    min-height: clamp(36px, 5vw, 44px);

    border: 1px solid #cbd5e1;
    border-radius: 10px;
    background-color: #ffffff;

    color: #0f172a;
    font-size: clamp(14px, 1.6vw, 16px);
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;

    box-shadow: 0 1px 2px rgba(16, 24, 40, .04), 0 1px 3px rgba(16, 24, 40, .06);
    transition: border-color .15s ease, box-shadow .15s ease, background-color .15s ease;
    -webkit-appearance: none;
}

.input::placeholder {
    color: #94a3b8;
}

.input:hover {
    border-color: #94a3b8;
}

.input:focus-visible {
    outline: none;
    border-color: #2a81dd;
    box-shadow: 0 0 0 3px rgba(42, 129, 221, .25);
    background-color: #fff;
}

.input:disabled {
    background: #f1f5f9;
    color: #94a3b8;
    cursor: not-allowed;
}

.input.input--error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, .15);
}

@media (max-width: 380px) {
    .input {
        font-size: 14px;
    }
}
</style>