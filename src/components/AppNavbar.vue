<template>
    <header class="app-header">
        <div class="header__inner">
            <router-link to="/" class="header__logo" aria-label="На главную">
                <img src="@/assets/logo.svg" alt="Логотип" />
            </router-link>

            <button class="header__toggle" type="button" :aria-expanded="open.toString()" aria-label="Меню"
                @click="open = !open">
                <span class="bar" />
                <span class="bar" />
                <span class="bar" />
            </button>

            <nav class="header__nav" :class="{ 'is-open': open }">
                <ul class="header__menu">
                    <li>
                        <router-link to="/sale" @click="open = false">Продажа</router-link>
                    </li>
                    <li>
                        <router-link to="/rent" @click="open = false">Аренда</router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    name: "AppNavbar",
    data() {
        return { open: false };
    },
    watch: {
        $route() { this.open = false; }
    }
};
</script>

<style scoped>
.app-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .06);
    font-family: "Arial";
}

.header__inner {
    max-width: 1440px;
    margin: 0 auto;
    padding: 10px clamp(12px, 2.4vw, 20px);
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.header__logo {
    display: inline-flex;
    align-items: center;
    min-height: 40px;
}

.header__logo img {
    display: block;
    height: clamp(26px, 4vw, 32px);
    width: auto;
}

.header__toggle {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    width: 42px;
    height: 38px;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 1px 2px rgba(16, 24, 40, .04);
    transition: box-shadow .15s ease, transform .15s ease, border-color .15s ease;
}

.header__toggle:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(42, 129, 221, .25);
    border-color: #2a81dd;
}

.header__toggle:hover {
    transform: translateY(-1px);
}

.header__toggle .bar {
    display: block;
    width: 18px;
    height: 2px;
    margin: 0 auto;
    background: #1f2937;
    border-radius: 2px;
}

.header__nav {
    display: none;
}

.header__nav.is-open {
    display: block;
}

.header__menu {
    list-style: none;
    margin: 0;
    padding: 8px 0 0;
    display: grid;
    gap: 6px;
}

.header__menu a {
    display: block;
    padding: 10px 12px;
    border-radius: 10px;
    color: #1e293b;
    font-size: 16px;
    text-decoration: none;
    transition: background-color .15s ease, color .15s ease;
}

.header__menu a:hover {
    background: #f1f5f9;
    color: #1a56db;
}

@media (min-width: 768px) {
    .header__inner {
        grid-template-columns: auto 1fr;
    }

    .header__toggle {
        display: none;
    }

    .header__nav {
        display: block !important;
        justify-self: end;
    }

    .header__menu {
        display: inline-grid;
        grid-auto-flow: column;
        gap: clamp(16px, 2.6vw, 28px);
        padding: 0;
        align-items: center;
    }

    .header__menu a {
        padding: 8px 0;
        border-radius: 8px;
        font-size: clamp(15px, 1.6vw, 18px);
        background: transparent;
    }

    .header__menu a:hover {
        background: transparent;
        color: #1a56db;
    }

    .header__menu a.router-link-active,
    .header__menu a.router-link-exact-active {
        color: #1a56db;
        text-decoration: underline;
    }
}

@media (max-width: 360px) {
    .header__menu a {
        font-size: 15px;
    }
}
</style>