import { writable } from "svelte/store";

function createVisible() {
    return writable<boolean>(false);
}

export const visible = createVisible();
