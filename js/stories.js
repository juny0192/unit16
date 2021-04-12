"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;
/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

// async addFavorite(story) {
//   this.favorites.push(story);
//   await this.addOrRemoveFavorite("add", story);
// }

// async removeFavorite(story) {
//   for (let userStory of this.favorites) {
//     if (story.storyId === userStory.storyId) {
//       await this.addOrRemoveFavorite("remove", userStory);
//     }
//   }
// }

function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage");

  $favoriteList.empty();

  if (currentUser.favorites.length === 0) {
    $favoriteList.append("<h4>No favorites added!</h4>");
  } else {
    for (let favorite of currentUser.favorites) {
      const $favorites = generateStoryMarkup(favorite);
      $favoriteList.append($favorites);
    }
  }
  $favoriteList.show();
}

async function toggleFavorite(evt) {
  try {
    console.debug("toggleFavorite");

    const $target = $(evt.tatget);
    const $closestLi = $target.closest("li");
    const storyId = $closestLi.attr("id");
    const targetStory = storyList.stories.find((s) => s.storyId === storyId);

    if ($target.hasClass("fas")) {
      await currentUser.removeFavorite(targetStory);
      $target.closest("i").toggleClass("fas far");
    } else {
      await currentUser.addFavorite(targetStory);
      $target.closest("i").toggleClass("fas far");
    }
  } catch (err) {
    console.log(err);
  }
}

$allStoriesList.on("click", ".heart", toggleFavorite);

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */
function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  const showHeart = Boolean(currentUser);

  const hostName = story.getHostName(); // this is prototype function from instance story made in model.js
  return $(`
      <li id="${story.storyId}">
        ${showHeart ? getHeart(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

function getHeart(story, user) {
  const isFavorite = user.isFavorite(story);
  const heartType = isFavorite ? "fas" : "far";
  return `
  <span class="heart">
  <i class="${heartType} fa-heart"></i>
  </span>`;
}
/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  // console.log(storyList);
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

// async addStory(user, { title, author, url }) {
//   let token = user.loginToken;
//   const response = await axios({
//     url: `${BASE_URL}/stories`,
//     method: "POST",
//     data: { token, story: { title, author, url } },
//   });
//   const newStory = new Story(response.data.story);
//   this.stories.unshift(newStory);
//   user.ownStories.unshift(newStory);
//   return newStory;
// }

async function addStoryOnList(evt) {
  evt.preventDefault();

  const author = $authorNameIpt.val();
  const title = $titleNameIpt.val();
  const url = $urlAddressIpt.val();

  const story = await storyList.addStory(currentUser, { title, author, url });

  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);

  $authorNameIpt.val("");
  $titleNameIpt.val("");
  $urlAddressIpt.val("");
  $storyForm.slideUp();
}

$storyForm.on("submit", addStoryOnList);
