const gnbSearch = document.querySelector('.gnb-search')
const gnbSearchInput = gnbSearch.querySelector('input')
const gnbSearchHistory = gnbSearch.querySelector('.search-history')

const deleteAllButton = gnbSearchHistory.querySelector(
  '.search-history-header button'
)
const gnbSearchHistorylist = gnbSearch.querySelector('ol')

function closeGnbSearchHistory(e) {
  if (!gnbSearch.contains(e.target)) {
    gnbSearchHistory.classList.remove('is-active')
    window.removeEventListener('click', closeGnbSearchHistory)
  }
}

function openGnbSearchHistory() {
  if (gnbSearchHistorylist.children.length === 0) {
    return
  } else if (!gnbSearchHistory.classList.contains('is-active')) {
    window.addEventListener('click', closeGnbSearchHistory)
  }
  gnbSearchHistory.classList.add('is-active')
}

gnbSearchInput.addEventListener('focus', openGnbSearchHistory)

function deleteAllSearchHistoryItems() {
  gnbSearchHistorylist.innerHTML = ''
  gnbSearchHistory.classList.remove('is-active')
}

deleteAllButton.addEventListener('click', deleteAllSearchHistoryItems)
