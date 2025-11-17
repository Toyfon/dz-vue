<!--
// **Описание**: Создайте пользовательскую директиву v-lazy-load, которая загружает изображения только при их появлении в области видимости
//
// **Входные данные**: Директива принимает URL изображения в качестве значения
//
// **Выходные данные**: Изображение загружается и отображается только когда элемент попадает в область видимости браузера
//
// **Ограничения**:
// - Директива должна быть зарегистрирована локально в компоненте
// - Используйте Intersection Observer API для отслеживания видимости элемента
// - Используйте хуки mounted и unmounted для управления наблюдателем
// - Установите placeholder изображение до загрузки основного
// - При появлении элемента в области видимости замените src на переданный URL
//
// **Примеры**:
// Input: <img v-lazy-load="'https://example.com/image1.jpg'" alt="Картинка 1">
// Output: Изображение загружается только при скролле до него
//
// Input: <img v-lazy-load="'https://example.com/image2.jpg'" alt="Картинка 2">
// Output: При попадании в область видимости src меняется на переданный URL
-->

<template>
    <div>
        <h2>Ленивая загрузка изображений</h2>

        <!-- Пример использования директивы -->
        <img v-lazy-load="'https://example.com/image1.jpg'" alt="Картинка 1" />

        <!-- Ваш код здесь -->
    </div>
</template>

<script lang="ts">
import type { DirectiveBinding } from 'vue'

export default {
    directives: {
        // Ваш код здесь

        lazyLoad: {
            mounted(el: HTMLImageElement, binding: DirectiveBinding) {
                if (!(el instanceof HTMLImageElement)) return

                // Небольшой inline placeholder (светло-серый фон)
                const placeholder =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect fill="%23eeeeee" width="100%" height="100%"/></svg>'

                el.src = placeholder
                // Сохраняем URL в dataset в виде строки (или пустой строки)
                el.dataset.lazySrc = binding.value ?? ''

                const observer = new IntersectionObserver(
                    (entries, observer) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                const src = el.dataset.lazySrc || ''
                                if (!src) {
                                    // Если URL отсутствует — просто перестаём наблюдать
                                    observer.unobserve(el)
                                    return
                                }

                                const tmp = new Image()
                                tmp.onload = () => {
                                    el.src = src
                                }
                                tmp.onerror = () => {
                                    // При ошибке можно оставить placeholder или установить изображение ошибки
                                }
                                // Устанавливаем src только если он точно строка
                                tmp.src = src

                                observer.unobserve(el)
                            }
                        })
                    },
                    { threshold: 0.1, rootMargin: '100px', root: null },
                )

                observer.observe(el)

                // Сохраняем наблюдатель для очистки в unmounted
                ;(el as any)._lazyObserver = observer
            },


            unmounted(el: HTMLImageElement) {
                const obs = (el as any)._lazyObserver as IntersectionObserver | undefined;
                if (obs) {
                    try {
                        obs.unobserve(el);
                        obs.disconnect();
                    } catch (e) {
                        // игнорируем ошибки при очистке
                    }
                    delete (el as any)._lazyObserver;
                }
            }
        },
    },
}
</script>

<style scoped>
/* Ваши стили здесь */
img {
    display: block;
    max-width: 100%;
    height: auto;
    background: #eee;
}
</style>
