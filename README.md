# React Project State

[![CodeQL](https://github.com/futugyou/react-project/actions/workflows/codeql.yml/badge.svg?branch=master)](https://github.com/futugyou/react-project/actions/workflows/codeql.yml)
[![Dependabot](https://github.com/futugyou/react-project/actions/workflows/dependabot-auto.yml/badge.svg)](https://github.com/futugyou/react-project/actions/workflows/dependabot-auto.yml)
[![Markdown](https://github.com/futugyou/react-project/actions/workflows/markdownlint.yml/badge.svg)](https://github.com/futugyou/react-project/actions/workflows/markdownlint.yml)
![CircleCI](https://img.shields.io/circleci/build/github/futugyou/react-project/master?logo=CircleCI&label=circle-ci)
![GitHub deployments](https://img.shields.io/github/deployments/futugyou/react-project/Preview?logo=vercel&label=Vercel%20Preview)
![GitHub deployments](https://img.shields.io/github/deployments/futugyou/react-project/Production?logo=vercel&label=Vercel%20Production)

## document

1. [overview](./doc/01.overview.md)

## reference

- [react](https://react.dev/)

- [reacr route](https://reactrouter.com/en/main)

- [icon](https://react-icons.github.io/react-icons/icons?name=bs)

- [react-simple-animate](https://github.com/beekai-oss/react-simple-animate)

- [motion](https://github.com/framer/motion)

- [reactflow](https://reactflow.dev/)

- [lodashjs](https://www.lodashjs.com/)

- [react-color](https://github.com/uiwjs/react-color/)

- [react-reader](https://github.com/gerhardsletten/react-reader)

- [cytoscape](https://js.cytoscape.org/)

- [cloudscape](https://cloudscape.design/)

- [react-query](https://tanstack.com/query/latest/docs/react/overview)

- [fluidframework](https://fluidframework.com/)

- [excalidraw](https://docs.excalidraw.com/docs)

- [tldraw](https://canary.tldraw.dev/)

- [TODO material-ui](https://mui.com/material-ui)

## update all package

```sh
npx npm-check-updates -u
npm install
```

## remove unused package

```sh
npm install -g depcheck
depcheck
```

## JavaScript heap out of memory

```sh
export NODE_OPTIONS="--max-old-space-size=8192"
Set NODE_OPTIONS="--max-old-space-size=8192"
node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))'
```

## 

```sh
npm config list
npm config set registry https://registry.npmjs.org/
npm config set registry https://mirrors.tencent.com/npm/
```
