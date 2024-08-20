import { type Reroute } from "@sveltejs/kit";

export const reroute: Reroute = ({ url }) => {
    // Treat index.html route as base route
    const indexSuffix = "index.html";
    if (url.pathname.endsWith(indexSuffix)) {
        return url.pathname.slice(0, -indexSuffix.length);
    }
};
