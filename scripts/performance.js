import * as mc from "@minecraft/server"


let gamerule_itemcleartime = 30
let tickofclear = 0

const notClearItemId = [
    "",
    "",
    "",
]

function sendall(message,recordlog = false) { //全プレイヤーへのメッセージの送信 message: Strings/rawmessage
    mc.world.sendMessage(message);
    if (recordlog)console.log(message.toString())
}

function error(condition = true,message = "Something went wrong. :(") {
    if (condition) throw new Error(message)
}

mc.system.afterEvents.scriptEventReceive.subscribe(async(ev) => {
    const id = ev.id.toLowerCase(); // /scriptevent名
    const opt = (ev.message??"").toString(); // /scripteventの第二引数 多分必須じゃなかったと思う

    switch (id) {
        case "kalme:gamerule_itemcleartime":
            if (parseFloat(opt) > 0) {
                sendall(`kalme:gamerule itemcleartime was set to ${parseFloat(opt)*60*20}(${parseFloat(opt)}min).`,true)
                gamerule_itemcleartime = parseFloat(opt)
            } else {
                error(true,`ev.message ("${opt}") is invalid option.`,true)
            }
            break;
        case "kalme:removeDropItem":
            let removeItems = []
            removeItems = removeItems.concat(mc.world.getDimension("overworld").getEntities({type:"minecraft:item"}))
            removeItems = removeItems.concat(mc.world.getDimension("nether").getEntities({type:"minecraft:item"}))
            removeItems = removeItems.concat(mc.world.getDimension("the_end").getEntities({type:"minecraft:item"}))
            for (const item of removeItems) {
                const itemStack = item.getComponent("minecraft:item").itemStack
                if (notClearItemId.includes(itemStack.type.id)) continue
                else item.remove()
            }
            tickofclear = -1
            sendall("管理者の操作で,世界のドロップアイテムが削除されました.")
            sendall("Dropped items were removed by Operetor.")
        default:
            break;
    }
})

mc.system.runInterval(() => {
    if (tickofclear == gamerule_itemcleartime*60*20 - 5*60*20){
        sendall("あと5分で世界のドロップアイテムの強制削除を行います.")
        sendall("Dropped items will be removed after 5 minutes.")
    }
    if (tickofclear == gamerule_itemcleartime*60*20 - 1*60*20){
        sendall("あと1分で世界のドロップアイテムの強制削除を行います.")
        sendall("Dropped items will be removed after 1 minutes.")
    }
    if (tickofclear == gamerule_itemcleartime*60*20 - 10*20){
        sendall("あと10秒で世界のドロップアイテムの強制削除を行います.")
        sendall("Dropped items will be removed after 10 seconds.")
    }
    if (tickofclear >= gamerule_itemcleartime*60*20) {
        let removeItems = []
        removeItems = removeItems.concat(mc.world.getDimension("overworld").getEntities({type:"minecraft:item"}))
        removeItems = removeItems.concat(mc.world.getDimension("nether").getEntities({type:"minecraft:item"}))
        removeItems = removeItems.concat(mc.world.getDimension("the_end").getEntities({type:"minecraft:item"}))
        for (const item of removeItems) {
            const itemStack = item.getComponent("minecraft:item").itemStack
            if (notClearItemId.includes(itemStack.type.id)) continue
            else item.remove()
        }
        tickofclear = -1
        sendall("パフォーマンス維持のため,世界のドロップアイテムが削除されました.")
        sendall("Dropped items were removed to maintain performance.")
    }
    tickofclear++
  },0)
  
console.log("performance.js loaded")