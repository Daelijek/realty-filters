<template>
    <div class="real-estate-card" tabindex="0">
        <div class="card-media">
            <img :src="`/images/${item.image}`" :alt="`Объект: ${item.address}`" loading="lazy" />
        </div>
        <div class="info">
            <p><strong>Адрес:</strong> {{ item.address }}</p>
            <p><strong>Комнат:</strong> {{ item.rooms }}</p>
            <p><strong>Площадь:</strong> {{ item.area }} м²</p>
            <p><strong>Тип:</strong> {{ item.type }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RealEstateCard',
    props: {
        item: {
            type: Object, required: true,
            validator(v) { return v && 'address' in v && 'rooms' in v && 'area' in v && 'type' in v; }
        }
    }
};
</script>

<style scoped>
.real-estate-card {
    border-radius: 14px;
    background: var(--surface, #fff);
    border: 1px solid var(--border, #e5e7eb);
    box-shadow: 0 1px 2px rgba(16, 24, 40, .04), 0 1px 3px rgba(16, 24, 40, .06);
    overflow: hidden;
    transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
    will-change: transform, box-shadow;
}

.real-estate-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(16, 24, 40, .12);
    border-color: color-mix(in oklab, var(--primary, #1A56DB) 35%, var(--border, #e5e7eb));
}

.real-estate-card:focus-within {
    outline: none;
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--primary, #1A56DB) 25%, transparent);
}

.card-media {
    position: relative;
    overflow: hidden;
    background: #f2f4f7;
    border-bottom: 1px solid var(--border, #e5e7eb);
    height: 180px;
}

@supports (aspect-ratio: 4 / 3) {
    .card-media {
        height: auto;
        aspect-ratio: 4 / 3;
    }
}

.card-media img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transform: scale(1);
    transform-origin: 50% 50%;
    transition: transform .4s ease;
    transition-delay: 0s;
    will-change: transform;
}

.real-estate-card:hover .card-media img,
.real-estate-card:focus-within .card-media img,
.real-estate-card:focus-visible .card-media img {
    transform: scale(var(--zoom-scale, 1.8));
    transition-delay: var(--zoom-delay, 1.5s);
}

/* Контент */
.info {
    padding: 12px 14px 14px;
    display: grid;
    gap: 6px;
    font-size: 14px;
    line-height: 1.5;
}

.info p {
    margin: 0;
}

.info strong {
    color: var(--text, #0f172a);
    font-weight: 600;
}

@media (max-width: 380px) {
    .info {
        font-size: 13.5px;
    }
}

@media (prefers-reduced-motion: reduce) {

    .real-estate-card,
    .real-estate-card:hover,
    .card-media img,
    .real-estate-card:hover .card-media img,
    .real-estate-card:focus-within .card-media img {
        transition: none !important;
        transform: none !important;
    }
}
</style>