<!-- **Описание**: Создайте пользовательскую директиву v-auto-resize, которая автоматически изменяет высоту textarea в зависимости от содержимого -->
<!-- **Входные данные**: Директива применяется к элементу textarea без дополнительных параметров -->
<!-- **Выходные данные**: Textarea автоматически увеличивает свою высоту при добавлении текста и уменьшает при удалении -->
<!-- **Ограничения**: -->
<!-- - Директива должна быть зарегистрирована локально в компоненте -->
<!-- - Используйте хуки mounted и unmounted для управления обработчиками событий -->
<!-- - Обработчик должен срабатывать на события input и change -->
<!-- - Установите минимальную высоту textarea равной одной строке -->
<!-- - Высота должна изменяться плавно без скачков -->
<!-- -->
<!-- Input: <textarea v-auto-resize placeholder="Введите текст"></textarea> -->
<!-- Output: При вводе текста высота textarea увеличивается автоматически -->
<!-- -->
<!-- Input: Пользователь удаляет часть текста из textarea -->
<!-- Output: Высота textarea уменьшается соответственно количеству строк -->

<script  lang="ts">
import type { DirectiveBinding } from 'vue'

export default {
    directives: {
        autoResize: {
            mounted(el: HTMLTextAreaElement, binding: DirectiveBinding) {
                if (!(el instanceof HTMLTextAreaElement)) return
                const computed = window.getComputedStyle(el)
                const lineHeight = parseFloat(computed.lineHeight) || 16
                const paddingTop = parseFloat(computed.paddingTop) || 0
                const paddingBottom = parseFloat(computed.paddingBottom) || 0

                // минимальная высота = высота одной строки + внутренние отступы (контентная высота)
                const minHeight = lineHeight + paddingTop + paddingBottom
                el.style.minHeight = `${minHeight}px`
                el.style.overflow = 'hidden'
                el.style.resize = 'none' // отключаем ручное изменение размера
                // плавный переход без резких скачков
                el.style.transition = 'height 120ms ease'

                let rafId: number | null = null

                const doResize = () => {
                    if (rafId) cancelAnimationFrame(rafId)
                    rafId = requestAnimationFrame(() => {
                        el.style.height = 'auto' // сбрасываем, чтобы получить корректный scrollHeight
                        // scrollHeight уже включает паддинги, поэтому просто используем его
                        el.style.height = `${el.scrollHeight}px`
                    })
                }

                // начальная подгонка
                doResize()

                el.addEventListener('input', doResize)
                el.addEventListener('change', doResize)
                // на ресайз окна пересчитываем (например, если изменился шрифт/контейнер)
                window.addEventListener('resize', doResize)

                ;(el as any).__vAutoResize__ = {
                    handler: doResize,
                    raf: () => {
                        if (rafId) {
                            cancelAnimationFrame(rafId)
                            rafId = null
                        }
                    }
                }
            },
            unmounted(el: HTMLTextAreaElement) {
                const saved = (el as any).__vAutoResize__
                if (saved && saved.handler) {
                    el.removeEventListener('input', saved.handler)
                    el.removeEventListener('change', saved.handler)
                    window.removeEventListener('resize', saved.handler)
                    saved.raf()
                    delete (el as any).__vAutoResize__
                }
            },
        },
    }
}

</script>

<template>
    <div>
        <h2>Автоматическое изменение размера textarea</h2>
        <textarea v-auto-resize placeholder="Введите текст"></textarea>
    </div>
</template>

<style scoped>
textarea {
    width: 100%;
    padding: 8px 10px;
    font-size: 14px;
    line-height: 20px;
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    background: #fff;
    color: #222;
    /* transition уже устанавливается директивой, но оставим запасной вариант */
    transition: height 120ms ease;
}
</style>
