const sectionHeaderIconButton = document.querySelector(
  '.product-shipment .product-section-header.sm-only .icon-button'
)

function showFullSection() {
  const sectionHeader = this.parentNode.parentNode
  sectionHeader.classList.add('is-open')
}

sectionHeaderIconButton.addEventListener('click', showFullSection)
