# React Comments And Replays Template

Advanced comments and replays template, handles:

- increase/decrease comment or replay score
- add new comments
- remove comments, and a nice confirm popup when try to delete a comment, make it with `reactjs-popup`
- add/remove replay
- replay mention to users
- edit comment/replay
- comment time tracking
- get comments data with app services
- handle loading and errors status
- retry option, if error happened
- simple validation checks
- responsive design for mobile & desktop, using css grid system
- and more...

Build with modern web-builds tools includes, `Typescript` `@redux-toolkit` `Sass`, `Vite` `eslint` and more. Live Demo [Here](https://abdelrahman-mh.github.io/comments-replay-template/)

![screenshot](./docs/screenshot1.jpg)
![screenshot](./docs/screenshot2.jpg)


# How to test it

- First, you need to clone the repo:

  ```shell
  git clone https://github.com/abdelrahman-mh/comments-replay-template

  # Or using ssh
  git clone git@github.com:abdelrahman-mh/comments-replay-template.git
  ```

- and install dependencies with:

  ```shell
  npm install
  ```

- after, you can start the dev server by running:

  ```shell
  npm run dev
  ```

  > this will open a dev server host at [http://localhost:5173/](http://localhost:5173/)

- you can build a static app with:
  ```shell
  npm run build
  ```
  > this will build a app in `./dist/` dire, so you can open a html page on any browser

---

> ℹ️ **Info**
>
> if you work with windows OS, and fine a error like this:
>
> ```shell
> 'NODE_ENV'  is not recognized as an internal or external command,
> operable program or batch <file>
> ```
>
> this will help you => [https://blog.jimmydc.com/cross-env-for-environment-variables/](https://blog.jimmydc.com/cross-env-for-environment-variables/)
