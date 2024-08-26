<script lang="ts">
    import { visible } from "$lib/stores/visibleStore";
    import { dispatchDebugMessages } from "$lib/utils/dispatchDebugMessages";
    import { fetchNui } from "$lib/utils/fetchNui";
    import { isEnvBrowser } from "$lib/utils/isEnvBrowser";

    let { children } = $props();

    // This will set the NUI to visible if we are developing in a browser
    dispatchDebugMessages([
        {
            action: "setVisible",
            data: true,
        },
    ]);

    function handleKeyboardEvent(event: KeyboardEvent): void {
        if (["Backspace", "Escape"].includes(event.code)) {
            if (!isEnvBrowser()) {
                fetchNui("hideFrame");
            }
            visible.set(false);
        }
    }
</script>

<svelte:window on:keydown={handleKeyboardEvent} />

{#if $visible}
    {@render children()}
{/if}
