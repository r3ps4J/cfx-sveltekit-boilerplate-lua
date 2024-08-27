import { browser } from "$app/environment";
import type { NuiMessage } from "$lib/interfaces/NuiMessage";
import { onDestroy } from "svelte";

type ActionHandler<T = any> = (data: T) => void;

const actionListeners: Record<string, ActionHandler[]> = {};

if (browser) {
    window.addEventListener("message", (event: MessageEvent<NuiMessage>) => {
        if (actionListeners[event.data.action]) {
            for (const handler of actionListeners[event.data.action]) {
                handler(event.data.data);
            }
        }
    });
}

export function onMessageAction<T = any>(action: string, handler: ActionHandler<T>) {
    if (!actionListeners[action]) {
        actionListeners[action] = [];
    }

    actionListeners[action].push(handler);

    onDestroy(() => {
        if (actionListeners[action]) {
            actionListeners[action] = actionListeners[action].filter((h) => h !== handler);

            if (actionListeners[action].length === 0) {
                delete actionListeners[action];
            }
        }
    });
}
