<script lang="ts">
    import { fetchNui } from "$lib/utils/fetchNui";

    interface ReturnData {
        x: number;
        y: number;
        z: number;
    }

    let clientData = $state<ReturnData | null>(null);

    function handleGetClientData() {
        fetchNui<ReturnData>("getClientData")
            .then((returnData) => {
                console.log("Got return data from client scripts:");
                console.dir(returnData);
                clientData = returnData;
            })
            .catch((error) => {
                console.error("Setting mock data due to error", error);
                clientData = { x: 500, y: 300, z: 200 };
            });
    }
</script>

<div class="nui-wrapper">
    <div class="popup-thing">
        <div>
            <h1>This is the NUI Pop-up!</h1>
            <p>Exit with the escape key</p>
            <button onclick={() => handleGetClientData()}>Get Client Data</button>
            {#if clientData}
                <h5>Returned Data:</h5>
                <pre>
                    <code>
                        {JSON.stringify(clientData)}
                    </code>
                </pre>
            {/if}
        </div>
    </div>
</div>

<style>
    .nui-wrapper {
        text-align: center;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .nui-wrapper .popup-thing {
        background: #282c34;
        border-radius: 10px;
        width: 500px;
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }

    .nui-wrapper .popup-thing pre {
        counter-reset: line-numbering;
        background: #2c3e50;
        padding: 12px 0px 14px 0;
        color: #ecf0f1;
        line-height: 140%;
    }
</style>
