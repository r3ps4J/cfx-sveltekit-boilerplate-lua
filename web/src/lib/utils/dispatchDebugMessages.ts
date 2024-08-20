import { browser, dev } from "$app/environment";
import type { NuiMessage } from "$lib/interfaces/NuiMessage";
import { isEnvBrowser } from "./isEnvBrowser";

export function dispatchDebugMessages<T = any>(events: NuiMessage<T>[], timeout = 1000): void {
    if (browser && dev && isEnvBrowser()) {
        for (const event of events) {
            setTimeout(() => {
                window.dispatchEvent(new MessageEvent("message", { data: event }));
            }, timeout);
        }
    }
}
