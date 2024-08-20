<script lang="ts">
    import { createMessageActionStore } from "$lib/stores/messageActionStore";
    import { visible } from "$lib/stores/visibleStore";
    import { dispatchDebugMessages } from "$lib/utils/dispatchDebugMessages";

    let { children } = $props();

    // Listen to the "setVisible" message
    createMessageActionStore<boolean>("setVisible").subscribe((value) => {
        visible.set(value);
    });

    // This will set the NUI to visible if we are developing in a browser
    dispatchDebugMessages([
        {
            action: "setVisible",
            data: true,
        },
    ]);
</script>

{#if $visible}
    {@render children()}
{/if}
