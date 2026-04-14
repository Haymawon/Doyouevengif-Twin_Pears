export const scrollMemory = {
  position: 0,
  save() {
    this.position = window.scrollY
  },
  restore() {
    if (this.position > 0) {
      window.scrollTo({ top: this.position, behavior: 'smooth' })
    }
  },
  reset() {
    this.position = 0
  }
}