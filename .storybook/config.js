import { configure } from '@kadira/storybook'

function loadStories(){
  require('../src/stories/imager')
}

configure(loadStories, module)
