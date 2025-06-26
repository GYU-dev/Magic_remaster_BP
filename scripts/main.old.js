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
import {} from "./library/playerDynamicProperty"
import {} from "./scoreboard"
import {} from "./scoreboard_calc"
import * as kalme from "./common"

const V_magic = "1.0.0" //略記バージョン
const VV_magic = { //詳細バージョン
    BP: "1.0.0",
    data: "1.0.0",
    script: "1.0.0",
    RP: "1.0.0",
    resource: "1.0.0"
}

function send(players, message) { // メッセージの送信 player: Player/Player[] message: Strings/rawmessage
    const sendlist = []
    sendlist.push(players)
    for (const player of sendlist) {
        player.sendMessage(message);
    }
}

function sendall(message) { //全プレイヤーへのメッセージの送信 message: Strings/rawmessage
    world.sendMessage(message);
}

function runc(entities, command) { // コマンドの実行 entity: Entity/Entity[] command: Strings
    const runlist = []
    runlist.push(entities)
    for (const entity of runlist) {
        entity.runCommandAsync(command);
    }
}

function Error(message) {
    console.error(message)
    return message.toString()
}

const magicTypeList =[
    "glass",
    "red",
    "light_blue",
    "lime",
    "brown",
    "purple",
    "blue",
    "white",
    "black",
    "pink",
    "gray",
    "green",
    "orange",
    "light_gray"
]
const magicScaleList = [
    "undefined",
    "copper",
    "iron",
    "gold",
    "diamond"
]

function magicSave(offhand,user) {
    const mainhand = user.getComponent("minecraft:equippable").getEquipment("Mainhand")
    const slot_1 = user.getComponent("minecraft:inventory").container.getItem(9)
    const slot_2 = user.getComponent("minecraft:inventory").container.getItem(10)

    let Loreinput = {
        magic: "undefined", 
        type: "undefined",
        scale: "undefined",
        extend: ""
    }
    
    if(mainhand.hasTag("kalme:magic_book")){
        Loreinput.magic = mainhand?.type.id.split("_")[2]
    }
    if(mainhand.hasTag("kalme:magic_save")){ //今後使用する可能性のある領域
        let lore = mainhand.getLore()
        if (lore[0] == null) {
            lore = ["null"]
        }

        lore[0] = lore[0].concat(...lore.slice(1,1 + (lore.length - 3)))
        lore = [lore[0],lore[(lore.length - 3 + 1)],lore[(lore.length - 3 + 2)]]

        Loreinput.magic = "save：(".concat(lore.join("|"),")")
    }
    if(Loreinput.magic.length > 45) {
        Loreinput.extend = Loreinput.magic
        Loreinput.magic = ""
    }

    const dyeRegex = /minecraft:([\w_]*)_dye/
    if (dyeRegex.test(slot_1?.type.id)) {
        const matchResult = dyeRegex.exec(slot_1.type.id)
        Loreinput.type = matchResult[1]
    }
    if (slot_1?.type.id == "minecraft:glass") {
        Loreinput.type = "glass"
    }
    
    if (slot_2?.type.id == "minecraft:copper_ingot") {
        Loreinput.scale = "copper"
    }
    if (slot_2?.type.id == "minecraft:iron_ingot") {
        Loreinput.scale = "iron"
    }
    if (slot_2?.type.id == "minecraft:gold_ingot") {
        Loreinput.scale = "gold"
    }   
    if (slot_2?.type.id == "minecraft:diamond") {
        send(user,{translate: "magic_save_toolong"})
        return
    }

    let LoreArray = [`book：${Loreinput.magic}`,`Slot 1：${Loreinput.type}`,`Slot 2：${Loreinput.scale}`]
    while (Loreinput.extend.length > 0) {
        LoreArray.splice(1 + (LoreArray.length - 3), 0, Loreinput.extend.slice(0,50))
        Loreinput.extend = Loreinput.extend.slice(50)
    }
    if (LoreArray.length > 20) {
        send(user,{translate: "magic_save_toolong"})
        return
    }

    offhand.setLore(LoreArray)
}

function magicLoad(savebookLore) { //ちょっとここ複雑なのでしっかり解説します
    let lore = savebookLore
    //savebookLore expect like Array / 引数例
    //["magicbook：fire","type:red","scale:copper"]
    //["magicbook：save_book：(magicbook：xxx|Slot 1：yyy|Slot 2：zzz)","type:aaa","scale:bbb"]

    let returnObject = {
        magicbook:"",         //魔導書の識別記号
        magicbookid:"",       //魔導書のアイテムID
        issavedsave:false,    //魔導書がsave_bookかどうか
        saveddescription:{},  //save_bookの中身
        type:"",              //インベントリスロット1
        typeNum:NaN,          //スロット1のアイテムの内部処理番号
        scale:"",             //インベントリスロット2
        scaleNum:NaN,         //スロット2のアイテムの内部処理番号
        lore:lore             //Lore全体 自動改行は除く
    } //型はそれぞれここで定義されている型になる　未定義でもundefinedにならずそのまま返される

    // .magicbookの処理 magicbook領域から読みだす
    if (lore[0].length == 5) {     //magicbookが2行以降続いている時用の処理
        lore[0] = lore[0].concat(...lore.slice(1,1 + (lore.length - 3)))
        lore = [lore[0],lore[(lore.length - 3 + 1)],lore[(lore.length - 3 + 2)]]
    }
    returnObject.magicbook = lore[0]?.split("：")[1] //：以降を取得する ...：save_book：...にも対応できる
    if (returnObject.magicbook == "save"){     //取得の結果がsave_bookだった場合の処理
        returnObject.issavedsave = true
            //.issavedsaveをtrueにセットする
            //これ以降はsave_bookの中身の解析をして.saveddescriptionにセットする処理
        let newsavebookLore = lore[0].split("：").slice(2).join("：")
            //magicbook領域を：で分割し前2つ(magicbook：save_book：)を削除して戻す
      	newsavebookLore = newsavebookLore
                        .slice(1,newsavebookLore.length - 1)
                            //先ほどのステップを踏むと両端に()が残るためそれを削除する
                        .split("").reverse().join("")
                        .replace("|","@@").replace("|","@@")
                        .split("").reverse().join("")
                            //文字列を反転させたり、後ろから文字を変換させる直接のメソッドがないため
                            //1文字1要素で配列化 →配列の順序反転 →結合して文字列化
                            //最初の | を@@に変換 ×2 →再度配列化、反転、結合している
      	            .split("@@")
                //@@は基本的にLore領域内に含まれる操作がないため入れ子式解析の予約語にしている
        
        returnObject.saveddescription = magicLoad(newsavebookLore)
    }
    // .magicbookidの処理 magicbookの派生
    returnObject.magicbookid = returnObject.issavedsave? "kalme:magic_save_book"
                                                       : `kalme:magic_book_${returnObject.magicbook}`
        //.issavedsaveがtrueならmagic_save_bookを、そうでなければmagic_book_の後に識別記号を付けてセットする
        //複数行に分けても良いが三項演算子を使用
    
    // .typeの処理 Slot 1領域から読みだす
    returnObject.type = lore[1]?.split("：")[1] //：以降を取得する
    returnObject.typeNum = magicTypeList.findIndex((element) => element == returnObject.type)
        //magicTypeListからtypeと同じ内容の場所をtypeNumとしてセットする
    // .scaleの処理 Slot 2領域から読みだす
    returnObject.scale = lore[2]?.split("：")[1] //：以降を取得する
    returnObject.scaleNum = magicScaleList.findIndex((element) => element == returnObject.scale)
        //magicTypeListからtypeと同じ内容の場所をtypeNumとしてセットする    
        //これら2つはどちらも元が違うだけで同じ処理　
    
    returnObject.lore = lore

    return returnObject //これまでの処理結果をすべて返す
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
    
    if (id == "kalme:qtime" || id == "kalme:q_time") { //どこからでも実行可能
        const time = world.getTimeOfDay()
        let scoreboard = world.scoreboard.getObjective("magic_times")
        if (scoreboard == undefined) {
            scoreboard = world.scoreboard.addObjective("magic_times")
        }
        scoreboard.setScore("$daytime",time)
        return
    }

    if (sourcetype == "Entity") { //エンティティから実行されたものまとめ
        switch (id) {
            case "kalme:spawntp":
                if (source.typeId == "minecraft:player") {
                    const tploc = source.getSpawnPoint();
                    if (tploc == undefined) {
                        send(source,{translate: "magic_spawntp_undefined"})
                        break
                    }
                    const result = source.tryTeleport({x:tploc.x,y:tploc.y,z:tploc.z},{dimension: tploc.dimension,checkForBlocks:true});
                    if (result) {
                        send(source,{translate: "magic_spawntp_success"})
                    } else {
                        send(source,{translate: "magic_spawntp_failed"})
                    }
                    break
                }
                break
                case "kalme:v": //落下
                case "kalme:v_magic":
                    if (!rawopt)
                        send(source,"Magic_remaster: " + V_magic)
                    else
                        if (VV_magic.hasOwnProperty(opt)) {
                            send(source,"Magic_remaster: " + opt + ": " + VV_magic[opt])
                        } else {
                            send(source,Error(["Error by /scriptevent ",` ${opt} not found in Magic_remaster `," expect in [BP,data,script,RP,resource]"]))
                        }
                    break;
        }
    }
  
    if (sourcetype == "Block") {
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
        const entities = dimension.getEntities({tags: ["!!remove"]})
        for (const entity of entities) {
            if (entity.typeId != "minecraft:player") {
                entity.remove()
            } else {
                entity.removeTag("!!remove")
            }
        }
    }
    world.getAllPlayers().forEach(element => {
        if (element.getComponent("minecraft:equippable")?.getEquipment("Mainhand")?.hasTag("kalme:magic_save") && element.isSneaking) {
            const data = magicLoad(element.getComponent("minecraft:equippable").getEquipment("Mainhand").getLore() ?? [])
            element.onScreenDisplay.setActionBar(data.lore.join(",").replaceAll("：",":"))
        }
    });
},0)

console.log("main.js loaded")