import {
    world,
    system,
    Player,
    Entity,
    Block,
    ItemStack
} from "@minecraft/server"; // APIのimport文 何があってもこいつらだけは消すな
import {} from "./performance"
import {} from "./customcomponent"
import {} from "./blockComponent"
import {} from "./library/playerDynamicProperty"
import {} from "./scoreboard"
import {} from "./mana_scoreboard/autoCalcManaMax"
import {} from "./mana_scoreboard/manaHeal"
import {} from "./mana_scoreboard/magicEXP"
import {} from "./scoreboard_calc"
// import {} from "./achievement"
// import {} from "./library/savedataUpdater"
import * as tagList from "./library/tagList"
import * as kalme from "./common"

const V_magic = "1.0.0" //略記バージョン
const VV_magic = { //詳細バージョン
    BP: "1.0.0",
    data: "1.0.0",
    script: "1.0.0",
    RP: "1.0.0",
    resource: "1.0.0"
}

system.afterEvents.scriptEventReceive.subscribe(async(ev) => { // /scripteventの受信
    const id = ev.id.toLowerCase(); // /scriptevent名
    const opt = (ev.message??"").toString(); // /scripteventの第二引数 多分必須じゃなかったと思う
    const rawopt = ev.message // 第二引数の元データ　これオブジェクトとか回ってくる可能性があるらしい
    const sourcetype = ev.sourceType;
    // /scripteventの実行元 "Block":ブロック "Entity":エンティティ "NPCDialogue":NPC "Server":コンソールなど
    const source = ev.sourceEntity
    const source_other = ev.sourceBlock ?? ev.initiator
    // /scripteventを実行した物 全部一つにまとめているためsourcetypeでのフィルタ必須

    if (sourcetype == "Entity") { //エンティティから実行されたものまとめ
        switch (id) {
            case "kalme:v": //落下
            case "kalme:v_magic":
                if (!rawopt)
                    kalme.send(source,"Magic_remaster: " + V_magic)
                else
                    if (VV_magic.hasOwnProperty(opt)) {
                        kalme.send(source,"Magic_remaster: " + opt + ": " + VV_magic[opt])
                    } else {
                        kalme.send(source,Error(["Error by /scriptevent ",` ${opt} not found in Magic_remaster `," expect in [BP,data,script,RP,resource]"]))
                    }
            break;
        }
    }

    if (sourcetype == "Server") { //サーバーコンソールから
        switch (id) {
            case "kalme:v": //落下
            case "kalme:v_magic":
                if (!rawopt)
                    console.log("Magic_remaster: " + V_magic)
                else
                    if (VV_magic.hasOwnProperty(opt)) {
                        console.log("Magic_remaster: " + opt + ": " + VV_magic[opt])
                    } else {
                        console.error(["Error by /scriptevent ",` ${opt} not found in Magic_remaster `," expect in [BP,data,script,RP,resource]"])
                    }
            break;
        }
    }  
})

system.runInterval(() => {
    const dimensions = [world.getDimension("overworld"),world.getDimension("nether"),world.getDimension("the_end")]
    for (const dimension of dimensions) {
        const entities = dimension.getEntities({tags: [tagList.Remove_entity]})
        for (const entity of entities) {
            if (entity.typeId != "minecraft:player") {
                entity.remove()
            } else {
                entity.removeTag(tagList.Remove_entity)
            }
        }
    }
},0)

console.log("main.js loaded")
console.log(`Complete loading Magic_remaster script ${VV_magic.script}`)