# Cat Meme

Shows a hopefully funny cat meme from the interwebs.

![Screenshot](http://i68.tinypic.com/kdvgon.png)

## Install

```bash
$ npm install
```

## Run

```bash
$ npm start
```

## Note

On a remote linux server, you will additionally need the `xvfb` package.

```bash
$ apt-get update && apt-get install -y xvfb x11-xkb-utils xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic x11-apps clang libdbus-1-dev libgtk2.0-dev libnotify-dev libgnome-keyring-dev libgconf2-dev libasound2-dev libcap-dev libcups2-dev libxtst-dev libxss1 libnss3-dev gcc-multilib g++-multilib
```

Then, you will need to run the app with xvfb.

```bash
$ xvfb-run npm start
```
