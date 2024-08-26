import { createWritableMessageActionStore } from "./messageActionStore";

function createVisible() {
    // Listen to the "setVisible" message, but allow writing to the store as well.
    return createWritableMessageActionStore<boolean>("setVisible");
}

export const visible = createVisible();
