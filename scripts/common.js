//v4
import * as mc from "@minecraft/server" // APIのimport文 何があってもこいつらだけは消すな

export const trueable = [
    true,
    "true",
    "t"
]

export const falseable = [
    false,
    "false",
    "f"
]

export function nearlyEqual(value1,value2){
    if (value1 == value2) return true; else return false
}

/**
 * エラーオブジェクトを含む独自のオブジェクト
 * @typedef {Object} throwedError
 * @property {Error} error 発生させた、または発生させようと試みたエラー
 * @property {boolean} isthrowed そのエラーがerror()で実際に発生されたか
 */

/**
 * メッセージを特定のプレイヤーに送信
 * @param {mc.Player|mc.Player[]} players
 * @param {string|mc.RawMessage|(string|mc.RawMessage)[]} message
 * @returns {void}
 */
export function send(players, message) {
    const sendlist = []
    sendlist.push(players)
    for (const player of sendlist) {
        player.sendMessage(message)
    }
}

/**
 * メッセージを全てのプレイヤーに送信
 * @param {string|mc.RawMessage|(string|mc.RawMessage)[]} message
 * @returns {void}
 */
export function sendall(message) {
    mc.world.sendMessage(message);
}

/**
 * コマンドを特定のプレイヤーから実行
 * @param {mc.Entity|mc.Entity[]} entities
 * @param {string} command
 * @returns {void}
 */
export function runc(entities, command) {
    const runlist = []
    runlist.push(entities)
    for (const entity of runlist) {
        entity.runCommand(command)
    }
}

/**
 * エラーを発生させる
 * @param {string} [message] エラーメッセージ
 * @param {boolean} [condition] エラーを発生させる際に判定する条件
 * @param {string} [type] エラータイプ
 * @param {any} [cause] 発生元のErrorオブジェクトなどの提供する追加情報
 * @returns {throwedError} エラーオブジェクトを含む独自のオブジェクト
 */
export function error(message = "Something went wrong. :(",condition = true,type = "Error",cause = {}) {
    let errorObject = Error(message,{cause: cause})
    errorObject.name = type
    if (condition) throw errorObject
    return {error: errorObject,isthrowed: condition}
}

/**
 * 範囲内の整数の乱数を発生させる
 * @param {number} [max] 乱数の最大値(含まない) 省略時100
 * @param {number} [min] 乱数の最小値 省略時0
 * @returns {number} 発生させた乱数
 */
export function getRandomInt(max=100,min=0) {
    return Math.floor(Math.random() * (max-min) + min)
}

/**
 * アイテムの耐久値にダメージを与える
 * @param {mc.ItemStack} itemData ダメージを与えるアイテム
 * @param {number} damageAmount ダメージ量
 * @param {mc.ContainerSlot} itemSlot アイテムが配置されていたスロット
 * @returns {void}
 */
export function itemDamage (itemData,damageAmount,itemSlot) {
    let itemDataOverRide = itemData
    
    if (itemData.getComponent("minecraft:durability").damage + damageAmount <= itemData.getComponent("minecraft:durability").maxDurability) {
        itemDataOverRide.getComponent("minecraft:durability").damage = itemDataOverRide.getComponent("minecraft:durability").damage + damageAmount //この先にsetItem打てば治るらしいです！！！１
        itemSlot.setItem(itemDataOverRide)
    } else {
        itemSlot.setItem(new mc.ItemStack("minecraft:air"))
    }
}

/**
 * メインハンドのアイテムを消費する
 * @param {mc.Player} user 
 * @param {number} [amount] default: 1
 * @param {boolean} [force] default: false
 */
export function consumeMainItem(user,amount = 1,force = false) {
    if (user.getGameMode() == mc.GameMode.Creative) return
    const mainHand = user.getComponent("minecraft:equippable").getEquipmentSlot("Mainhand")
    if (!force && mainHand.getItem().getComponent("minecraft:durability")) {
        return itemDamage(mainHand.getItem(),amount,mainHand)
    } else {
        if (mainHand.amount - amount > 0) {
            mainHand.amount -= amount
        } else {
            mainHand.setItem()
        }
    }
}

/**
 * 名前空間を返す
 * @param {string} string 
 * @returns {string}
 */
export function nameSpace(string) {
    return string.split(":")[0]
}

/**
 * 名前空間を排除した文字列を返す
 * @param {string} string 
 * @returns {string}
 */
export function outNameSpace(string) {
    return string.split(":")[1]
}

console.log("using kalme:common.js module")