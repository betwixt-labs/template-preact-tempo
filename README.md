# Template: preact-tempo

[![Run on Repl.it](https://replit.com/badge/github/betwixt-labs/template-preact-tempo)](https://replit.com/new/github/betwixt-labs/template-preact-tempo)

This template demonstrates using the [`Tempo`](https://github.com/betwixt-labs/tempo) remote procedure call framework to add real-time, end-to-end typesafe APIs to a [`Preact`](https://preactjs.com) application.

[`App.tsx`](https://github.com/betwixt-labs/template-preact-tempo/blob/main/src/App.tsx) is the primary content of the app. It is configured to talk to a pre-hosted `greeter` service, however, you can change the URL to point to your own service by using the [Node.js template](https://github.com/betwixt-labs/template-nodejs-tempo-server).

Code generation is handled by [`Bebop`](https://github.com/betwixt-labs/bebop) and you can find an example schema in [`greeter.bop`](https://github.com/betwixt-labs/template-preact-tempo/blob/main/greeter.bop).

## Setup

To create a `my-project` directory using this template, run:

```sh
$ git clone  https://github.com/betwixt-labs/template-preact-tempo.git my-project
```

Then, install the dependencies:
```sh
$ cd my-project
$ npm install
# or
$ yarn install
# or
$ pnpm install
```

```sh

If you wish to generate code from your schemas run:
```sh
$ npm run build:schemas
# or
$ yarn build:schemas
# or
$ pnpm run build:schemas
```

## Development
To start the development server, run:
```sh
$ npm run dev
# or
$ yarn dev
# or
$ pnpm run dev
```