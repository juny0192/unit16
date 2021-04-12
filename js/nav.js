"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  const $appendedProfile = $("#addedProfile");
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $appendedProfile.hide();
  $favoriteList.hide();
  $ownStoriesList.hide();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  $navUserStory.show();
  $loginForm.hide();
  $signupForm.hide();

  userProfile();
}

function navStorySubmitClick(evt) {
  const $appendedProfile = $("#addedProfile");
  console.debug("navStorySubmitClick", evt);
  $storyForm.slideDown();
  $appendedProfile.hide();
  $favoriteList.hide();
  $allStoriesList.show();
  $ownStoriesList.hide();
}

$navStorySubmit.on("click", navStorySubmitClick);

function profileClick(evt) {
  const $appendedProfile = $("#addedProfile");
  console.debug("profileClicked", evt);
  hidePageComponents();
  $appendedProfile.slideDown();
  $favoriteList.hide();
  $ownStoriesList.hide();
}

$navUserProfile.on("click", profileClick);

function favoriteClick(evt) {
  const $appendedProfile = $("#addedProfile");
  console.debug("favoriteClicked", evt);
  hidePageComponents();
  $appendedProfile.hide();
  $ownStoriesList.hide();

  putFavoritesOnPage();
}

$navFavorites.on("click", favoriteClick);

function myStoriesClick(evt) {
  const $appendedProfile = $("#addedProfile");
  console.debug("myStoriesClicked", evt);
  hidePageComponents();
  $appendedProfile.hide();
  $favoriteList.hide();

  putOwnStoriesOnPage();
}

$navMyStories.on("click", myStoriesClick);
