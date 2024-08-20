local function toggleNuiFrame(shouldShow)
    SetNuiFocus(shouldShow, shouldShow)
    SendSvelteMessage("setVisible", shouldShow)
end

RegisterCommand("show-nui", function()
    toggleNuiFrame(true)
    DebugPrint("Show NUI frame")
end, false)

RegisterNUICallback("hideFrame", function(_, cb)
    toggleNuiFrame(false)
    DebugPrint("Hide NUI frame")
    cb({})
end)

RegisterNUICallback("getClientData", function(data, cb)
    DebugPrint("Data sent by SvelteKit", json.encode(data))

    -- Let's send back client coords to the SvelteKit app for use
    local curCoords = GetEntityCoords(PlayerPedId())

    local retData <const> = { x = curCoords.x, y = curCoords.y, z = curCoords.z }
    cb(retData)
end)
