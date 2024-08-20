import { browser } from "$app/environment";
import { isEnvBrowser } from "./isEnvBrowser";

const resourceName =
    browser && (window as any).GetParentResourceName
        ? (window as any).GetParentResourceName()
        : "nui-app";

export async function fetchNui<T = any>(eventName: string, data?: any, mockData?: T): Promise<T> {
    if (isEnvBrowser() && mockData) {
        return mockData;
    }
    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
    };
    const response = await fetch(`https://${resourceName}/${eventName}`, options);
    return await response.json();
}
