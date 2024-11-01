// import icons from "../img/icons.svg";  // parcel 1

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // getting the hash
    const id = window.location.hash.slice(1);

    // return if there is no id
    if (!id) return;

    // render spinner
    recipeView.renderSpinner();

    // 1. loading recipe
    await model.loadRecipe(id);

    // 2. render recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    // alert(error);
    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
