# Zenoid 👾

## Usage ⚙️

```bash
yarn && \
yarn build:cli && \
yarn start:cli
```

```bash
docker image build -t zenoid .
docker container run --rm -it zenoid
```

## How to play 🕹

Press left arrow to go left and right arrow to go right.  
**No need to keep pressing arrows (it could make the game slow).**

Wanna go faster? Press space key to dash.

## Make your own levels 🧱

`@zenoid/core` exposes `levelBuilder` so you can make your own level.  
It takes a *level* as parameter which is a `string` representing the level (i.e. `levels` folder in `@zenoid/core`).

`useZenoid` hook takes an *array* of *level* (transformed using `levelBuilder`).  
Default levels are located in `@zenoid/core` `levels` folder.

Constants you can use to describe your level:

* `B`: regular brick
* `U`: bump brick *(unbreakable like walls)*
* `Q`: short bar *(makes you shorter)*
* `W`: long bar *(makes you bigger)*
* `E`: slow game
* `R`: fast game
* `T`: life *(gives you one more life)*
