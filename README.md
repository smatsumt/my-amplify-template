# my-amplify-template

## Project setup
```bash
git clone -o upstream-template https://github.com/smatsumt/my-amplify-template.git NEW_PROJ_NAME
cd NEW_PROJ_NAME

npm install

amplify init
amplify add auth
amplify add api  # デフォルトの Todo モデルを入れる
amplify mock api  # GraphQL 関係のコードが生成される

amplify add hosting
amplify push
amplify publish
```

### Compiles and hot-reloads for development
```bash
npm run serve
```

### Compiles and minifies for production
```bash
npm run build
```

### Lints and fixes files
```bash
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Reference: Initial creation

```bash
vue create my-amplify-template
cd my-amplify-template

vue add vuetify
vue add router
vue add vuex
amplify init
npm install aws-amplify aws-amplify-vue --save
npm i @aws-amplify/pubsub@2.1.9 --save  # 警告でたので手動でいれた

amplify add auth
amplify add api  # デフォルトの Todo モデルを入れる
amplify mock api  # GraphQL 関係のコードが生成される

amplify add hosting
amplify push
amplify publish

```
