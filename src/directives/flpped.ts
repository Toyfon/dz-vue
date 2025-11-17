import type { Directive } from 'vue'

const flipped: Directive<HTMLElement, boolean> = {
    mounted(el, binding) {
        if (binding.value) el.classList.add('flipped')
    },
    updated(el, binding) {
        if (binding.value) el.classList.add('flipped')
        else el.classList.remove('flipped')
    },
    unmounted(el) {
        el.classList.remove('flipped')
    },
}

export default flipped
