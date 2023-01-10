# Project-ITS

The game is getting published automatically on GitHub Pages. Click [here](https://genfood.github.io/Project-ITS/out/) to play the game! 😏  
Best playable using Firefox. 🔥🦊

## Getting started

You can also compile the game by yourself:

1. Download [Tweego](https://www.motoslave.net/tweego/)
2. Overide `[Tweego folder]/storyformats/harlowe-3/format.js` with [format.js](./format.js)
3. Set the location of Tweego binary to the path variable, that the default terminal can run tweego commands.

### Tweego only

To just compile the current project with Tweego, do the follwig steps in the commandline:

4. Go to the project directory
5. Run `tweego -o ./out/story.html ./src`
6. The compiled story can be found in the `out` directory

### VisualStudio Code

#### requirements

- Firefox Browser
- VisualStudio Code
- Install the recommanded Plugins (after opening the git repo in VisualStudio Code, recommendations should be displayed):
  - `cyrusfirheir.twee3-language-tools`
  - `firefox-devtools.vscode-firefox-debug`

4. Open the directory of this git in VisualStudio Code
5. The project can now be compiled in normal or debug mode, in VisualStudio Code. Just press `F5` or use the `Run and Debug` Tab.  

## Known Bugs

- Using Chrome or Safari can cause a problems clicking on collectable items. Clicking several times is a solution, or use Firefox. 🤡
