const orderCta = document.querySelector('.order-cta')

const [orderCtaBookmarkButton, orderCtaBuyButton] = orderCta.children
const orderModal = document.querySelector('.order-form-modal')
const orderOverlay = document.querySelector('.overlay')

function openOrderModal() {
  orderModal.classList.add('is-open')
  orderOverlay.classList.add('is-active')
}

orderCtaBuyButton.addEventListener('click', openOrderModal)

function closeOrderModal() {
  orderModal.classList.remove('is-open')
  orderOverlay.classList.remove('is-active')
}

orderOverlay.addEventListener('click', closeOrderModal)
