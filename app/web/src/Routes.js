// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'
import emojiData from './emoji.json'
import emoji from './emoji';

window.emoji = emoji.buildIndex(emojiData);
console.log(window.emoji);

const Routes = () => {
  return (
    <Router>
      <Route path="/emojis/new" page={NewEmojiPage} name="newEmoji" />
      <Route path="/emojis/{id}/edit" page={EditEmojiPage} name="editEmoji" />
      <Route path="/emojis/{id}" page={EmojiPage} name="emoji" />
      <Route path="/emojis" page={EmojisPage} name="emojis" />
      <Route path="/stories/new" page={NewStoryPage} name="newStory" />
      <Route path="/stories/{id}/edit" page={EditStoryPage} name="editStory" />
      <Route path="/stories/{id}" page={StoryPage} name="story" />
      <Route path="/stories" page={StoriesPage} name="stories" />
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/game" page={GamePage} name="game" />
      <Route path="/games" page={GamesPage} name="games" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
