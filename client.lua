local toggle = "none"

RegisterCommand('fatura',function(source,args,rawCommand)
	local jogador1 = PlayerPedId()
	if jogador1 then
		TriggerEvent('reborn:open:fatura')
	end	
end)

RegisterNetEvent('reborn:open:fatura')
AddEventHandler('reborn:open:fatura', function()
	if toggle == "none" then
		SendNUIMessage({
			desativar = "flex"
		})
          toggle = "flex"
          SetNuiFocus(true, true)
	elseif toggle == "flex" then
		SendNUIMessage({
			desativar = "none"
		})
          toggle = "none"
          SetNuiFocus(false, false)
	end
end)

RegisterNUICallback('fechar-faturas', function(data, cb)
	TriggerEvent("reborn:open:fatura")
	cb('ok')
end)

RegisterNUICallback('fatura-dados', function(data, cb)
     if tonumber(data.id) and tonumber(data.valor) > 1 then
          TriggerServerEvent('RebornCore:Server:EnviaFatura',data.id,data.valor,data.titulo)
     else
          -- notificação de erro com valores errados.
          return
     end
end)