import { DirectiveBinding } from 'vue'

type ClickOutsideElement = HTMLElement & { _clickOutside?: (event: Event) => void }

export const vClickOutside = {
  mounted(el: ClickOutsideElement, binding: DirectiveBinding) {
    el._clickOutside = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el: ClickOutsideElement) {
    if (el._clickOutside) {
      document.removeEventListener('click', el._clickOutside)
      delete el._clickOutside
    }
  }
}