# React Project State

[![CodeQL](https://github.com/futugyou/react-project/actions/workflows/codeql.yml/badge.svg?branch=master)](https://github.com/futugyou/react-project/actions/workflows/codeql.yml)
[![Dependabot](https://github.com/futugyou/react-project/actions/workflows/dependabot-auto.yml/badge.svg?branch=master)](https://github.com/futugyou/react-project/actions/workflows/dependabot-auto.yml)
[![Markdown](https://github.com/futugyou/react-project/actions/workflows/markdownlint.yml/badge.svg)](https://github.com/futugyou/react-project/actions/workflows/markdownlint.yml)
![CircleCI](https://img.shields.io/circleci/build/github/futugyou/react-project/master?logo=CircleCI&label=circle-ci)
![GitHub deployments](https://img.shields.io/github/deployments/futugyou/react-project/Preview?logo=vercel&label=Vercel%20Preview)
![GitHub deployments](https://img.shields.io/github/deployments/futugyou/react-project/Production?logo=vercel&label=Vercel%20Production)

[react](https://react.dev/)

[reacr route](https://reactrouter.com/en/main)

[icon](https://react-icons.github.io/react-icons/icons?name=bs)

[react-simple-animate](https://github.com/beekai-oss/react-simple-animate)

[motion](https://github.com/framer/motion)

[reactflow](https://reactflow.dev/)

[lodashjs](https://www.lodashjs.com/)

[react-color](https://github.com/uiwjs/react-color/)

[react-reader](https://github.com/gerhardsletten/react-reader)

[cytoscape](https://js.cytoscape.org/)

[cloudscape](https://cloudscape.design/)

[react-query](https://tanstack.com/query/latest/docs/react/overview)

## update all package

```sh
npx npm-check-updates -u
npm install 
```

## kiota

```sh
npm install '@microsoft/kiota-abstractions'
npm install '@microsoft/kiota-http-fetchlibrary'
npm install '@microsoft/kiota-serialization-form'
npm install '@microsoft/kiota-serialization-json'
npm install '@microsoft/kiota-serialization-text'
npm install '@microsoft/kiota-serialization-multipart'
kiota generate -l typescript -d https://github.com/futugyou/goproject/blob/master/openai-web/swagger/openapi.yml -c PostsClient -o ./src/kiota-client
```
