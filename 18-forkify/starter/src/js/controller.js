// import icons from "../img/icons.svg";  // parcel 1

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    // getting the hash
    const id = window.location.hash.slice(1);

    // return if there is no id
    if (!id) return;

    // render spinner
    recipeView.renderSpinner();

    // 0. results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1. loading recipe
    await model.loadRecipe(id);

    // 2. render recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    // alert(error);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // render spinner
    resultsView.renderSpinner();

    // 1.get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. load search results
    await model.loadSearchResults(query);

    // 3. render results
    resultsView.render(model.getSearchResultsPage());

    // 4. render pagination
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  // 1. render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2. render pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update recipe servings (in state)
  model.updateServings(newServings);

  // update recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookMark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else model.deleteBookmark(model.state.recipe.id);

  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookMark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
