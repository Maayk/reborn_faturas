RebornCore = nil
TriggerEvent('RebornCore:GetObject', function(obj) RebornCore = obj end)

RegisterServerEvent('RebornCore:Server:EnviaFatura')
AddEventHandler('RebornCore:Server:EnviaFatura', function(playerId,fvalor,ftitulo)
     local Player = RebornCore.Functions.GetPlayer(source)
     local targetplayer = tonumber(playerId)
     local jogador = RebornCore.Functions.GetPlayer(targetplayer)
     if Player and jogador then 
          local invoiceid = math.random(10000,60000)
          if jogador ~= nil then              
               exports.ghmattimysql:execute('INSERT INTO phone_invoices (citizenid, amount, invoiceid, sender, type) VALUES (@citizenid, @amount, @invoiceid, @sender, @type)', {
                    ['@citizenid'] = jogador.PlayerData.citizenid,
                    ['@amount'] = fvalor,
                    ['@invoiceid'] = invoiceid,
                    ['@sender'] = Player.PlayerData.citizenid,
                    ['@type'] = ftitulo,
                })
               TriggerClientEvent("reborn:mail:sendFaturaMail", playerId,fvalor)
               TriggerClientEvent("reborn-hud:naolidas", playerId, true)
               TriggerClientEvent("reborn:update:faturas", playerId)
               TriggerClientEvent('reborn:notify:send',playerId, "Fatura Recebida", ftitulo.." $<span style='color: yellow; font-weight: 800;'>"..fvalor,"sucesso", 7000)
          else
               return
          end
     end
end)