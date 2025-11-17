<script lang="ts">
import { type DirectiveBinding, ref } from 'vue'

export default {
    directives: {
        // локальная директива v-click-outside
        clickOutside: {
            mounted(el: HTMLElement, binding: DirectiveBinding) {
                if (typeof binding.value !== 'function') {
                    console.warn('v-click-outside expects a function as the value')
                    return
                }

                // обработчик клика по документу (типизирован)
                const onDocumentClick = (event: MouseEvent) => {
                    const target = event.target as Node | null
                    // если клик вне элемента — вызываем переданную функцию
                    if (target && !el.contains(target)) {
                        binding.value(event)
                    }
                }

                // сохраняем ссылку на обработчик, чтобы удалить позже
                ;(el as any).__vClickOutside__ = onDocumentClick
                document.addEventListener('click', onDocumentClick)
            },
            unmounted(el: HTMLElement) {
                const handler = (el as any).__vClickOutside__ as EventListener | undefined
                if (handler) {
                    document.removeEventListener('click', handler)
                    delete (el as any).__vClickOutside__
                }
            },
        },
    },

    setup() {
        const showModal = ref(false)
        const showMenu = ref(false)

        const openModal = () => {
            showModal.value = true
        }
        const closeModal = () => {
            showModal.value = false
        }

        const toggleMenu = () => {
            showMenu.value = !showMenu.value
        }
        const hideMenu = () => {
            showMenu.value = false
        }

        return {
            showModal,
            showMenu,
            openModal,
            closeModal,
            toggleMenu,
            hideMenu,
        }
    },
}
</script>

<template>
    <div class="container">
        <button @click.stop="openModal" class="btn">Открыть модальное</button>

        <div v-if="showModal" class="overlay">
            <div v-click-outside="closeModal" class="modal">
                <h3>Модальное окно</h3>
                <p>Клик вне этого блока закроет модальное.</p>
                <button @click="closeModal" class="btn small">Закрыть</button>
            </div>
        </div>

        <div class="menu-wrapper">
            <button @click.stop="toggleMenu" class="btn">Тоггл меню</button>
            <div v-if="showMenu" v-click-outside="hideMenu" class="menu">
                <div class="menu-item">Пункт 1</div>
                <div class="menu-item">Пункт 2</div>
                <div class="menu-item">Пункт 3</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    padding: 16px;
    display: flex;
    gap: 16px;
    align-items: flex-start;
    flex-direction: column;
}

.btn {
    background: #3498db;
    color: #fff;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 4px;
}
.btn.small {
    padding: 6px 10px;
    font-size: 14px;
}

.overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
}

.modal {
    background: #fff;
    padding: 16px;
    border-radius: 8px;
    min-width: 280px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
}

.menu-wrapper {
    margin-top: 8px;
    position: relative;
}

.menu {
    position: absolute;
    top: 40px;
    left: 0;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 8px;
    min-width: 160px;
}

.menu-item {
    padding: 8px;
    cursor: pointer;
}
.menu-item:hover {
    background: #f5f5f5;
}
</style>
