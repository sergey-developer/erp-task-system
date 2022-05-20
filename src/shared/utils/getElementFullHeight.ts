/**
 * Возвращает высоту элемента, учитывая свойство margin
 * @function getElementFullHeight
 * @param {HTMLElement} el - элемент, высоту которого требуется определить
 * @returns {number} высота элемента
 */

export const getElementFullHeight = (el: HTMLElement): number => {
  const height = el.offsetHeight
  const style = window.getComputedStyle(el)

  return height + parseInt(style.marginTop) + parseInt(style.marginBottom)
}
