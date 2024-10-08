--- A simple wrapper around SendNUIMessage that you can use to
--- dispatch actions to the SvelteKit app.
---
---@param action string The action you wish to target
---@param data any The data you wish to send along with this action
function SendSvelteMessage(action, data)
    SendNUIMessage({
        action = action,
        data = data
    })
end

local currentResourceName = GetCurrentResourceName()
local debugIsEnabled = GetConvarInt(('%s-debugMode'):format(currentResourceName), 0) == 1

--- A simple debug print function that is dependent on a convar
--- will output a nice prettified message if debugMode is on
function DebugPrint(...)
    if not debugIsEnabled then return end
    local args <const> = { ... }

    local appendStr = ''
    for _, v in ipairs(args) do
        appendStr = appendStr .. ' ' .. tostring(v)
    end
    local msgTemplate = '^3[%s]^0%s'
    local finalMsg = msgTemplate:format(currentResourceName, appendStr)
    print(finalMsg)
end
