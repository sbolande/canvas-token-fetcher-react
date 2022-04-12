# Canvas Token Fetcher (React)

Save a few clicks and fetch a new [Canvas API token](https://canvas.instructure.com/doc/api/file.oauth.html#manual-token-generation) from Canvas' admin login.

Powered by [Electron-Forge](https://www.electronforge.io/guides/framework-integration/react), [Puppeteer](https://pptr.dev/), and [React](https://reactjs.org/)!

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Running in developer mode](#dev-mode)

---

## Installation

**Requirements:** Git, Node, and NPM.
Clone this repository and run a basic NPM install.

```sh
# navigate to the folder you want to clone to, then clone down
git clone https://github.com/sbolande/canvas-token-fetcher.git
cd canvas-token-fetcher
npm install
# run "electron-forge make" command
npm run make
```

The created setup application can be found in the `/out` directory (either a .exe, .dmg, or .zip of some kind).
Running this application will create a desktop shortcut to run the application.

---

## Usage

Once you've run the installer (or run `npm start`), the application will start up.
The app takes the following inputs:

1. **Username**: Your Canvas admin username.
2. **Password**
3. **Subdomain**: The URL subdomain -> `{subdomain}.instructure.com`.
4. **Purpose**: The purpose for retrieving a token, _optional_.
5. **Expires**: The expiration date-time of the token, defaults to upcoming Friday.
6. **Remember Me**: Save your username, subdomain, and purpose for next time. **Password is not saved**. These presets are saved locally using [electron-store](https://github.com/sindresorhus/electron-store#readme), so be aware!

Press `FETCH TOKEN` and Puppeteer will run and grab a new token for you. If successful, press `Copy to clipboard` and paste your token wherever you need!

---

## Dev Mode

Wish you could watch Puppeteer work its magic? Well you can in Dev Mode!

Use "`npm run dev`" on the root directory to run in Dev Mode. This will open DevTools in Electron and run Puppeteer in non-headless mode.

---

#### [Back to top](#table-of-contents)
