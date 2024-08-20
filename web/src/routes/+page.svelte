<script lang="ts">
    import ExampleContainer from "$lib/components/ExampleContainer.svelte";
    import { visible } from "$lib/stores/visibleStore";
    import { fetchNui } from "$lib/utils/fetchNui";
    import { isEnvBrowser } from "$lib/utils/isEnvBrowser";

    function handleKeyboardEvent(event: KeyboardEvent): void {
        if (["Backspace", "Escape"].includes(event.code)) {
            if (!isEnvBrowser()) {
                fetchNui("hideFrame");
            }
            visible.set(false);
        }
    }
</script>

<ExampleContainer></ExampleContainer>

<svelte:window on:keydown={handleKeyboardEvent} />
