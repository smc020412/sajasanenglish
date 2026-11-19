// 책임: 제품 메뉴의 주소 해시에 따라 한 제품만 표시한다.
// 입력: 제품 링크, 제품 섹션, location.hash. 출력: hidden과 aria-current.
// 소유 상태: 현재 주소가 선택 상태의 기준이다. 외부 의존성: 브라우저 DOM·History.
// 생명주기: 이 페이지 로드 시 초기화하고 hashchange에서 뒤로/앞으로 가기를 반영한다.
const productPanels = Array.from(document.querySelectorAll('[data-product-panel]'));
const productLinks = Array.from(document.querySelectorAll('[data-product-link]'));

function showSelectedProduct() {
  const requestedId = window.location.hash.slice(1);
  const selected = productPanels.find((panel) => panel.id === requestedId) || productPanels[0];

  productPanels.forEach((panel) => {
    panel.hidden = panel !== selected;
  });
  productLinks.forEach((link) => {
    if (link.hash === `#${selected.id}`) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

productLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    // Keep standard browser behavior for opening a link in another tab.
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (window.location.hash !== link.hash) window.history.pushState(null, '', link.hash);
    showSelectedProduct();
  });
});

window.addEventListener('hashchange', showSelectedProduct);
showSelectedProduct();
