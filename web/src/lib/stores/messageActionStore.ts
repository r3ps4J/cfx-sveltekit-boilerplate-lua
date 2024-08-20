import { browser } from "$app/environment";
import type { NuiMessage } from "$lib/interfaces/NuiMessage";
import { readonly, writable, type Readable, type Writable } from "svelte/store";

const actionStores: Record<string, Writable<any>> = {};

if (browser) {
    window.addEventListener("message", (event: MessageEvent<NuiMessage>) => {
        if (actionStores[event.data.action]) {
            actionStores[event.data.action].set(event.data.data);
        }
    });
}

export function createMessageActionStore<T = any>(action: string): Readable<T> {
    if (!actionStores[action]) {
        actionStores[action] = writable<T>();
    }
    return readonly(actionStores[action]);
}
