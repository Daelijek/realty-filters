<template>
    <div class="sort">
        <MySelect :id="id" :label="label" :modelValue="modelValue" :options="opts"
            @update:modelValue="$emit('update:modelValue', $event)" />
    </div>
</template>

<script>
import MySelect from '@/components/UI/MySelect.vue';

export const ALLOWED_SORT = ['none', 'area_asc', 'area_desc', 'addr_asc', 'addr_desc'];

export default {
    name: 'SortSelect',
    components: { MySelect },
    props: {
        modelValue: { type: String, default: 'none' },
        id: { type: String, default: 'sort' },
        label: { type: String, default: 'Сортировка:' }
    },
    emits: ['update:modelValue'],
    computed: {
        opts() {
            return [
                { value: 'none', label: 'По умолчанию' },
                { value: 'area_asc', label: 'Площадь: по возрастанию' },
                { value: 'area_desc', label: 'Площадь: по убыванию' },
                { value: 'addr_asc', label: 'Адрес: A→Я' },
                { value: 'addr_desc', label: 'Адрес: Я→A' }
            ];
        }
    }
}
</script>

<style scoped>
.sort {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    margin: 10px 0 16px;
}

@media (max-width: 640px) {
    .sort {
        justify-content: stretch;
    }

    .sort :deep(.my-select) {
        width: 100%;
    }
}
</style>