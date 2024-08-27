import { fetchNui } from "$lib/utils/fetchNui";
import { isEnvBrowser } from "$lib/utils/isEnvBrowser";
import { createWritableMessageActionStore } from "./messageActionStore";

function createVisible() {
    // Listen to the "setVisible" message, but allow writing to the store as well.
    const { subscribe, set } = createWritableMessageActionStore<boolean>("setVisible");

    return {
        subscribe,
        set: (value: boolean) => {
            if (value == false && !isEnvBrowser()) {
                fetchNui("hideFrame"); // Send event to Lua side to disable NUI focus
            }
            set(value);
        },
    };
}

export const visible = createVisible();
