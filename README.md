## ListenCharts On Electron:

[Dmg package of Listen Charts](https://yarnpkg.com/en/docs/install)

Worked on: "OS X El Capitan ( Version 10.11.6 )"


```
brew install yarn // yarn == npm
yarn install
```

#### Start app in Dev:
```
yarn run b // run webpack dev server
yarn run e // run electron
```

#### Build OS X package:
```
yarn publish:dist
./dist // folder now has dmg package.
```

