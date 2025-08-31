<template>
    <div class="filters-panel" role="search">
        <div class="search">
            <MyInput v-model="searchLocal" placeholder="Поиск по адресу…" :maxlength="100" @keydown.enter="doSearch"
                aria-label="Поиск по адресу" />
            <MyButton @click="doSearch">Поиск</MyButton>
        </div>

        <div class="filter">
            <div class="btn">
                <MyButton @click="showModal">Фильтры</MyButton>
            </div>

            <MyModal v-model:show="stateModal" aria-label="Фильтры">
                <div class="group">
                    <div class="area">
                        <h3 class="label">Площадь, м²</h3>
                        <MyInput v-model="areaFromRaw" placeholder="От" />
                        <MyInput v-model="areaToRaw" placeholder="До" />
                        <small id="area-hint" class="hint">Диапазон: {{ LIMITS.area.min }}–{{ LIMITS.area.max }}</small>
                        <small id="area-err" class="error" v-if="errors.area">{{ errors.area }}</small>
                    </div>

                    <div class="rooms">
                        <h3 class="label">Количество комнат</h3>
                        <MyInput v-model="roomsFromRaw" placeholder="От" />
                        <MyInput v-model="roomsToRaw" placeholder="До" />
                        <small id="rooms-hint" class="hint">Целые: {{ LIMITS.rooms.min }}–{{ LIMITS.rooms.max }}</small>
                        <small id="rooms-err" class="error" v-if="errors.rooms">{{ errors.rooms }}</small>
                    </div>
                </div>

                <div class="modal_btns">
                    <MyButton class="apply__btn" :disabled="hasErrors" @click="applyFilters">Принять</MyButton>
                    <MyButton class="reset__btn" @click="resetFilters">Сбросить</MyButton>
                </div>
            </MyModal>
        </div>
    </div>
</template>


<script>
export default {
    name: "FiltersPanel",
    props: {
        search: { type: String, default: '' }
    },
    emits: ['update:search', 'search', 'apply', 'reset'],
    data() {
        return {
            stateModal: false,
            areaFromRaw: '', areaToRaw: '',
            roomsFromRaw: '', roomsToRaw: '',
            searchLocal: this.search || '',
            searchDebounceTimer: null,
            LIMITS: Object.freeze({
                area: { min: 0, max: 1000 },
                rooms: { min: 1, max: 10 }
            })
        };
    },
    computed: {
        parsed() {
            const toNum = (v, { int = false, min = 0 } = {}) => {
                if (v === null || v === undefined || v === '') return null;
                const s = String(v).replace(',', '.').trim();
                const cleaned = s.replace(/[^0-9.+-]/g, '');
                if (!cleaned || cleaned === '-' || cleaned === '+') return null;
                const n = int ? Number.parseInt(cleaned, 10) : Number(cleaned);
                if (!Number.isFinite(n)) return NaN;
                if (int && !Number.isInteger(n)) return NaN;
                if (n < min) return NaN;
                return n;
            };
            return {
                areaFrom: toNum(this.areaFromRaw, { min: this.LIMITS.area.min }),
                areaTo: toNum(this.areaToRaw, { min: this.LIMITS.area.min }),
                roomsFrom: toNum(this.roomsFromRaw, { int: true, min: this.LIMITS.rooms.min }),
                roomsTo: toNum(this.roomsToRaw, { int: true, min: this.LIMITS.rooms.min })
            };
        },
        errors() {
            const e = { area: '', rooms: '' };
            const { area, rooms } = this.LIMITS;
            const { areaFrom, areaTo, roomsFrom, roomsTo } = this.parsed;

            if (Number.isNaN(areaFrom) || Number.isNaN(areaTo)) {
                e.area = 'Площадь — число (можно с точкой/запятой).';
            } else {
                if (areaFrom != null && (areaFrom < area.min || areaFrom > area.max)) e.area = `Минимум ${area.min}, максимум ${area.max}.`;
                if (!e.area && areaTo != null && (areaTo < area.min || areaTo > area.max)) e.area = `Минимум ${area.min}, максимум ${area.max}.`;
                if (!e.area && areaFrom != null && areaTo != null && areaFrom === areaTo) e.area = 'Диапазон «От» и «До» не должен совпадать.';
            }

            if (Number.isNaN(roomsFrom) || Number.isNaN(roomsTo)) {
                e.rooms = 'Количество комнат — целое число.';
            } else {
                if (roomsFrom != null && (roomsFrom < rooms.min || roomsFrom > rooms.max)) e.rooms = `Допустимо ${rooms.min}–${rooms.max}.`;
                if (!e.rooms && roomsTo != null && (roomsTo < rooms.min || roomsTo > rooms.max)) e.rooms = `Допустимо ${rooms.min}–${rooms.max}.`;
                if (!e.rooms && roomsFrom != null && roomsTo != null && roomsFrom > roomsTo) e.rooms = '«От» не может быть больше «До».';
            }
            return e;
        },
        hasErrors() { return Boolean(this.errors.area || this.errors.rooms); }
    },
    watch: {
        searchLocal(val) {
            clearTimeout(this.searchDebounceTimer);
            this.searchDebounceTimer = setTimeout(() => {
                const t = (val || '').trim();
                this.$emit('update:search', t);
                this.$emit('search', t);
            }, 300);
        },
        search(newVal) {
            if ((this.searchLocal || '') !== (newVal || '')) this.searchLocal = newVal || '';
        }
    },
    methods: {
        showModal() { this.stateModal = true; },
        doSearch() {
            const t = (this.searchLocal || '').trim();
            this.$emit('update:search', t);
            this.$emit('search', t);
        },
        applyFilters() {
            if (this.hasErrors) return;

            let { areaFrom, areaTo, roomsFrom, roomsTo } = this.parsed;
            const clamp = (n, min, max) => (n == null ? null : Math.min(Math.max(n, min), max));

            areaFrom = clamp(areaFrom, this.LIMITS.area.min, this.LIMITS.area.max);
            areaTo = clamp(areaTo, this.LIMITS.area.min, this.LIMITS.area.max);
            roomsFrom = clamp(roomsFrom, this.LIMITS.rooms.min, this.LIMITS.rooms.max);
            roomsTo = clamp(roomsTo, this.LIMITS.rooms.min, this.LIMITS.rooms.max);

            if (areaFrom != null && areaTo != null && areaFrom > areaTo) [areaFrom, areaTo] = [areaTo, areaFrom];
            if (roomsFrom != null && roomsTo != null && roomsFrom > roomsTo) [roomsFrom, roomsTo] = [roomsTo, roomsFrom];

            this.$emit('apply', {
                q: (this.searchLocal || '').trim(),
                areaFrom, areaTo, roomsFrom, roomsTo
            });
            this.stateModal = false;
        },
        resetFilters() {
            this.searchLocal = '';
            this.areaFromRaw = this.areaToRaw = this.roomsFromRaw = this.roomsToRaw = '';
            this.$emit('update:search', '');
            this.$emit('reset');
            this.stateModal = false;
        }
    }
};
</script>

<style scoped>
.hint {
    display: block;
    margin-top: 6px;
    font-size: 12px;
    color: #64748b;
}

.error {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    color: #dc2626;
}

.apply__btn:disabled {
    opacity: .6;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
}

.filters-panel {
    --panel-bg: #ffcc66;
    --panel-border: #e5e7eb;
    --accent: #1A56DB;

    width: 100%;
    background-color: var(--panel-bg);
    border: 1px solid var(--panel-border);
    border-radius: 16px;
    box-shadow: 0 1px 2px rgba(16, 24, 40, .04), 0 1px 3px rgba(16, 24, 40, .06);

    padding: clamp(12px, 2.6vw, 20px);
    display: grid;
    gap: clamp(12px, 2vw, 18px);
}

.search {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: clamp(10px, 2vw, 16px);
    align-items: center;
}

@media (max-width: 640px) {
    .search {
        grid-template-columns: 1fr;
    }

    :deep(.btn) {
        width: 100%;
        min-width: 0;
    }
}

.filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.btn {
    display: inline-flex;
}

.group {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(14px, 2.2vw, 22px);
    margin-bottom: 12px;
    text-align: left;
}

@media (max-width: 720px) {
    .group {
        grid-template-columns: 1fr;
    }
}

.label {
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
    font-weight: 700;
    font-size: 16px;
    margin: 0 0 8px;
    color: #0f172a;
}

.area,
.rooms {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    background: #fff;
    transition: border-color .15s ease, box-shadow .15s ease, transform .15s ease;
}

.area:hover,
.rooms:hover {
    border-color: rgba(26, 86, 219, .35);
    box-shadow: 0 6px 14px rgba(16, 24, 40, .08);
    transform: translateY(-1px);
}

.area:hover .label {
    color: #1A56DB;
}

.rooms:hover .label {
    color: #FF9900;
}

.modal_btns {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: center;
    margin-top: 4px;
}

:deep(.apply__btn) {}

:deep(.reset__btn) {}

:deep(.apply__btn:hover) {
    filter: brightness(0.95);
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(26, 86, 219, .18);
}

:deep(.reset__btn:hover) {
    filter: brightness(0.98);
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(15, 23, 42, .08);
}

@media (prefers-reduced-motion: reduce) {

    .area,
    .rooms,
    .modal_btns :deep(button),
    .search :deep(button) {
        transition: none !important;
        transform: none !important;
        box-shadow: none !important;
    }
}
</style>