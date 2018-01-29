# Introduction
This project is a real time visualization of SF-Muni transport system in SF. It has been created as part of coding challenge for ThousandEyes.

# Dependencies
Following environment dependencies are required to run this project:
- `NodeJS` (v6 or greater)
- `npm` or `yarn`

# How to run
Please follow these instructions to run the project:
- `cd {project root}`
- `yarn` or `npm install`
- `yarn start` or `npm start`

The last command should automatically open a new tab in your browser. If it doesn't, please open `localhost:3000` in your browser.

# Technology Stack
- React
- D3
- Redux

# Features
Here are some of the notable features of this project:
- Makes D3 operate in collaboration with React and Redux.
  - React takes care of views and overall application.
  - Redux takes care of system state (communication goes inside Redux actions/thunks).
  - D3 takes care of visualizations.
- All D3 charts can be found in `d3` directory. All of those charts are standard D3 components, which don't require React or Redux to run. You can safely move them to another environment and run them there.
- D3 visualizations follow Mike Bostocks Reusable Charts pattern.
- Makes use of React's lifecycle hooks in `Visualization` component to prevent unnecessary re-renders, and to allow D3 charts run in isolation.
- The visualization responds to window `resize` event.

# Limitations
Here are some of the things that need improvement:
- City map data should be fetched dynamically, instead making it part of the build.
- Instead of requiring entire D3 library, modules should be included independently.
- City map can be rendered in `canvas` for performance improvement.
- Vehicles are simple `rect`s at the moment. `path`s can be used instead for more complex shapes.
- As number of vehicles grow, browser's performance can start going south. Again, `canvas` can be used for performance improvement.
- NextBus api for fetching vehicle locations is invoked every 15 seconds with with param `t` as `0`. This parameter can be used as per the documentation to reduce response payload size.

# Thank You
Thank you for taking a look at this project. If you have any thoughts or feedback to share, please reach out to me at `umar.mughal2@gmail.com`.