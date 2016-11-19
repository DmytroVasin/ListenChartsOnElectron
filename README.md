## ListenCharts On Electron:

[Click to download .dmg package of LCharts](https://github.com/DmytroVasin/ListenChartsOnElectron/raw/master/_readme/LCharts-0.0.1.dmg)

> Worked on: "OS X El Capitan ( Version 10.11.6 )"

#### Troubleshooting:
*When running an application on OS X, like Mac Imager CLI, you receive the error "Your security preferences allow installation of only apps from the Mac App Store and identified developers."*

- Open OS X System Preferences > Security & Privacy
- On the "General" tab click the lock in the lower left corner to unlock the general preference pane
- Under "Allow applications downloaded from:", select the "Anywhere" radio button


## What was implemented:

* Customized installation window:

![customize-instalations](https://raw.githubusercontent.com/DmytroVasin/ListenChartsOnElectron/master/_readme/customize-instalations.png)

* Tray based app, without Dock icon

* Position of the Tray window

![traywindow](https://raw.githubusercontent.com/DmytroVasin/ListenChartsOnElectron/master/_readme/traywindow.png)

* Small arrow that point to Tray Icon

![arrow](https://raw.githubusercontent.com/DmytroVasin/ListenChartsOnElectron/master/_readme/arrow.png)

* Transparent background of the app

* Ability to increase / decrease size of the window

![increase](https://raw.githubusercontent.com/DmytroVasin/ListenChartsOnElectron/master/_readme/increase.png)
![decrease](https://raw.githubusercontent.com/DmytroVasin/ListenChartsOnElectron/master/_readme/decrease.png)

* Hide window "on blur"

* Play audio of cause :)

![play_audio](https://raw.githubusercontent.com/DmytroVasin/ListenChartsOnElectron/master/_readme/play_audio.png)

* Dynamically change icons when audio is "ON" ( Somethig like 'equalizer' )

![equalizer](https://raw.githubusercontent.com/DmytroVasin/ListenChartsOnElectron/master/_readme/equalizer.png)

* Quit app by clicking on icon

* Open external link ( Open browser ) by clicking on icon

* Download audio by clicking on icon

![download](https://raw.githubusercontent.com/DmytroVasin/ListenChartsOnElectron/master/_readme/download.png)

* Notification after success downloading

![notification_after_downloading](https://raw.githubusercontent.com/DmytroVasin/ListenChartsOnElectron/master/_readme/Notification_after_downloading.png)

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
