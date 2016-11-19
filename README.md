## ListenCharts On Electron:

[Dmg package of Listen Charts](https://yarnpkg.com/en/docs/install)

> Worked on: "OS X El Capitan ( Version 10.11.6 )"

## What was implemented:

* Customized installation window:

![customize-instalations](https://cloud.githubusercontent.com/assets/1914001/20455695/80cd3198-ae6a-11e6-8e81-4d08d1ed9ddb.png)

* Tray based app, without Dock icon

* Position of the Tray window

![traywindow](https://cloud.githubusercontent.com/assets/1914001/20455702/80f150d2-ae6a-11e6-98ea-dab446a3b484.png)

* Small arrow that point to Tray Icon

![arrow](https://cloud.githubusercontent.com/assets/1914001/20455694/80ad0db4-ae6a-11e6-8be9-fed52b8b8570.png)

* Transparent background of the app

* Ability to increase / decrease size of the window

![increase](https://cloud.githubusercontent.com/assets/1914001/20455699/80d7ec96-ae6a-11e6-93d5-33f9fb409514.png)
![decrease](https://cloud.githubusercontent.com/assets/1914001/20455696/80d59cac-ae6a-11e6-83b4-e90abdb50fad.png)

* Hide window "on blur"

* Play audio of cause :)

![play_audio](https://cloud.githubusercontent.com/assets/1914001/20455701/80e66f8c-ae6a-11e6-8480-b8fba7acf277.png)

* Dynamically change icons when audio is "ON" ( Somethig like 'equalizer' )

![equalizer](https://cloud.githubusercontent.com/assets/1914001/20455697/80d63040-ae6a-11e6-8522-7b450bb3fbac.png)

* Quit app by clicking on icon

* Open external link ( Open browser ) by clicking on icon

* Download audio by clicking on icon

![download](https://cloud.githubusercontent.com/assets/1914001/20455698/80d6924c-ae6a-11e6-96ee-df1ba11a59a5.png)

* Notification after success downloading

![notification_after_downloading](https://cloud.githubusercontent.com/assets/1914001/20455700/80d8aad2-ae6a-11e6-97ef-68a87f6165ed.png)

* Save App state on quit. On Reopen user will have preset Mute, Volume, Song, Replay, Shuffle options


## Setup:

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
