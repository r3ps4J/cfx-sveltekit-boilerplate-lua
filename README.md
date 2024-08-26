# FiveM/RedM SvelteKit and Lua Boilerplate

This repository is a basic boilerplate for getting started with SvelteKit in NUI. It contains several helpful utilities and was generated with the `npm create svelte@latest`. It uses Svelte 5, and is set-up with ESLint and Prettier. It is for both browser and in-game based development workflows.

For in-game workflows, run `npm run watch` which will watch the files and build the application upon changes.

This version of the boilerplate is meant for the CfxLua runtime, but should work with other languages if you copy over the `web` folder and the required `fxmanifest.lua` entries.

This boilerplate is based on my [Angular boilerplate](https://github.com/r3ps4J/cfx-angular-boilerplate-lua), which was heavily inspired by the [React boilerplate](https://github.com/project-error/fivem-react-boilerplate-lua) made by Project Error.

## Requirements

-   [A modern version of Node.js](https://nodejs.org/en/)

Be familiar with Svelte and SvelteKit, to get started check out [https://kit.svelte.dev/docs/introduction](https://kit.svelte.dev/docs/introduction).

## Getting Started

First clone the repository or use the template option and place it within your `resources` folder

### Installation

Install dependencies by navigating to the `web` folder within a terminal of your choice and type `npm i`.

## Features

This boilerplate comes with some utilities and examples to work off of.

### Lua Utils

**SendSvelteMessage**

This is a small wrapper for dispatching NUI messages. This is designed to be used with the `createMessageActionStore` function in SvelteKit.

Signature

```lua
---@param action string The action you wish to target
---@param data any The data you wish to send along with this action
SendSvelteMessage(action, data)
```

Usage

```lua
SendSvelteMessage("setVisible", true)
```

**DebugPrint**

A debug printing utility that is dependent on a convar,
if the convar is set this will print out to the console.

The convar is dependent on the name given to the resource.
It follows this format `YOUR_RESOURCE_NAME-debugMode`

To turn on debugMode add `setr YOUR_RESOURCE_NAME-debugMode 1` to
your server.cfg or use the `setr` console command instead.

Signature (Replicates `print`)

```lua
---@param ... any[] The arguments you wish to send
DebugPrint(...)
```

Usage

```lua
DebugPrint("Is Svelte better than React?", true, someOtherVar)
```

### SvelteKit Utils

Signatures are not included for these utilities as the type definitions are sufficient enough.

**createMessageActionStore**

This function returns a store which can be subscribed to to receive updates for a certain action. This is the primary way of creating passive listeners.

_Notes:_

- _You can subscribe to the same action as many times as you want._
- _When you subscribe to an event that was received before, the current value of the store will be emitted after subscribing._
- _If a message is received but the value hasn't changed, the listener will not be called. This means you cannot use this if you update the state on the NUI side, like with setVisible. Take a look at `createWritableMessageActionStore` if you need this._

**Usage**

```ts
let visible = $state(false);

createMessageActionStore<boolean>("setVisible").subscribe((value) => {
    visible = value;
});
```

**createWritableMessageActionStore**

This function returns a store which can be subscribed to to receive updates for a certain action. Use this if you need write access to a store on the NUI side. If you do not, it's better to use the regular `createMessageActionStore`.

**Usage**

```ts
let visible = createMessageActionStore<boolean>("setVisible")

visible.subscribe((value) => {
    if (value) {
        console.log("Hello!");
    } else {
        console.log("Goodbye!");
    }
})

visible.set(true); // Will print "Hello!"
visible.set(false); // Will print "Goodbye!"
```

_Note: if you subscribe to the same event somewhere else in your application, it will also have the updated state regardless of whether you subscribed to a writeable or readable version of the store. You can also wrap this in a custom store for easier refactoring later on!_

**fetchNui**

This is a simple NUI focused wrapper around the standard `fetch` API. This is the main way to accomplish active NUI data fetching or to trigger NUI callbacks in the game scripts.

When using this, you should always at least callback using `{}` in the gamescripts.

_This can be heavily customized to your use case_

**Usage**

```ts
// First argument is the callback event name.
fetchNui<ReturnData>("getClientData")
    .then((returnData) => {
        console.log("Got return data from client scripts:");
        console.dir(returnData);
        clientData = returnData;
    })
    .catch((error) => {
        console.error("Setting mock data due to error", error);
        clientData = { x: 500, y: 300, z: 200 };
    });
```

**dispatchDebugMessage**

This is a function allowing for mocking dispatched game script actions in a browser environment. It will trigger `createMessageActionStore` stores as if they were dispatched by the game scripts. **It will only fire if the current environment is a regular browser and not CEF**

**Usage**

```ts
// This will target the fromMessageAction observers registered with `setVisible`
// and pass them the data of `true`
dispatchDebugMessages([
    {
        action: "setVisible",
        data: true,
    },
]);
```

**Misc Utils**

These are small but useful included utilities.

-   `isEnvBrowser()` - Will return a boolean indicating if the current
    environment is a regular browser. (Useful for logic in development)

## Development Workflow

This boilerplate was designed with development workflow in mind. It includes some helpful scripts to accomplish that.

**Hot Builds In-Game**

When developing in-game, it's best to use `npm run watch`. This is similar to `npm run dev`, but it builds the application. Meaning all that is required is a resource restart to update the game script.

**Usage**

```sh
npm run watch
```

**Production Builds**

When you are done with development phase for your resource. You must create a production build that is optimized and minimized.

You can do this by running the following:

```sh
npm run build
```

## About server-side rendering and routing

The entire application is set up to generate a static website, server-side rendering is not possible unless the application is hosted on a separate server.

This boilerplate contains a hook in `web/src/hooks.ts` to make it compatible with the way FiveM and RedM load html files. It tells SvelteKit to treat the `index.html` route (which is what is loaded as the `ui_page` in `fxmanifest.lua`) as the base route. This ensures that SvelteKit works in the NUI environment, and doesn't throw a 404 not found error.

To navigate within the SvelteKit application using an origin-relative path, make sure you include the [`base` variable from the `$app/paths`](https://kit.svelte.dev/docs/modules#$app-paths-base) module to make sure it won't navigate outside the build folder.

## Additional Notes

If you want to contact me or require help you could join my [discord server](https://discord.gg/bEWmBbg), I can't guarantee that I will be able to help you.
