<template>
    <button class="btn" type="button">
        <slot></slot>
    </button>
</template>

<script>
export default { name: "MyButton" }
</script>

<style scoped>
.btn {
    --btn-bg: #2a81dd;
    --btn-fg: #fff;
    --btn-border: #2a81dd;
    --btn-bg-hover: #1f6cc0;
    --btn-fg-hover: #fff;
    --btn-bg-active: #1a5aa6;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    min-height: clamp(36px, 5.2vw, 44px);
    padding: clamp(8px, 2.4vw, 12px) clamp(12px, 3.2vw, 16px);
    min-width: clamp(96px, 28vw, 140px);

    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
    font-size: clamp(14px, 1.6vw, 16px);
    font-weight: 600;

    color: var(--btn-fg);
    background-color: var(--btn-bg);
    border: 1px solid var(--btn-border);
    border-radius: 10px;
    box-shadow: 0 1px 2px rgba(16, 24, 40, .04), 0 1px 3px rgba(16, 24, 40, .06);

    cursor: pointer;
    transition: transform .15s ease, box-shadow .15s ease, background-color .15s ease, border-color .15s ease;
}

.btn:hover {
    background-color: var(--btn-bg-hover);
    color: var(--btn-fg-hover);
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(42, 129, 221, .20);
}

.btn:active {
    background-color: var(--btn-bg-active);
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(16, 24, 40, .06);
}

.btn:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(42, 129, 221, .25);
}

.btn[disabled] {
    opacity: .6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: 0 1px 2px rgba(16, 24, 40, .04);
}

.btn.btn--block {
    width: 100%;
}

@media (prefers-reduced-motion: reduce) {

    .btn,
    .btn:hover,
    .btn:active {
        transition: none;
        transform: none;
    }
}
</style>