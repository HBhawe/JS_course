import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1, there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `${this._nextButtonMarkup(currentPage)}`;
    }

    // last page
    if (currentPage === numPages && numPages > 1) {
      return `${this._prevButtonMarkup(currentPage)}`;
    }
    // some other page
    if (currentPage < numPages) {
      return `${this._prevButtonMarkup(currentPage)} ${this._nextButtonMarkup(
        currentPage
      )}`;
    }

    // page 1 and no other pages
    return ``;
  }

  _prevButtonMarkup(currentPage) {
    return `
    <button data-goto=${
      currentPage - 1
    } class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
         <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
    </button>`;
  }

  _nextButtonMarkup(currentPage) {
    return `
            <button data-goto=${
              currentPage + 1
            } class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
  }
}

export default new PaginationView();
