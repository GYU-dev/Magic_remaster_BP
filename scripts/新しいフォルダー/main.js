import * as mc from "@minecraft/server"; // APIのimport文 何があってもこいつらだけは消すな
import * as kalme from "./common"; // kalme:common
import * as database from "./database" // magicv2:database
import * as customBlockComponents from "./blockComponent" // magicv2:blockComponent

const V_magic = "v2 0.3.0" //略記バージョン
const VV_magic = { //詳細バージョン
	BP: "v2 0.3.0",
	data: "v2 0.3.0",
	script: "v2 0.3.0",
	RP: "v2 0.3.0",
	resource: "v2 0.3.0"
}

mc.Player.prototype.addandRemoveTag = function (tag){
	this.addTag(tag)
	mc.system.runTimeout(()=>{
		if (this.isValid()) this.removeTag(tag)
	},1)
}

mc.world.afterEvents.itemUse.subscribe(async(ev) => { // 純粋な右クリック
	const itemdata = ev.itemStack; //使用されたアイテム
	const user = ev.source; //使用者

	if ((itemdata.hasTag("magicv2:magic_book")) && (!user.hasTag("disabled_magic"))
		&& (itemdata.getComponent("minecraft:cooldown").getCooldownTicksRemaining(user) <= 0)
		) {
		const name = itemdata.nameTag ?? "default"; // 金床で付けられた名前
		const usedtype = itemdata.type.id.split("_")[2] // 階級

		kalme.consumeMainItem(user)

		const maintype = database.magicTypeList[usedtype].main
		user.addandRemoveTag(`magicv2:used_${"book"}.${maintype}_${name}`)
		user.addandRemoveTag(`magicv2:used_${"any"}.${maintype}_${name}`)
		for (const type of database.magicTypeList[usedtype].convertible) {
			user.addandRemoveTag(`magicv2:used_${"book"}.${type}_${name}`)
			user.addandRemoveTag(`magicv2:used_${"any"}.${type}_${name}`)
		}
		user.startItemCooldown("magic",100)
	}

	if ((itemdata.hasTag("magicv2:magic_wand")) && (!user.hasTag("disabled_magic"))
		&& (itemdata.getComponent("minecraft:cooldown").getCooldownTicksRemaining(user) <= 0)
		) {
		const name = itemdata.nameTag ?? "default"; // 金床で付けられた名前
		const usedtype = itemdata.type.id.split("_")[2] // 階級
		
		if (user.getGameMode() != "creative") {
			let damageChance = itemdata.getComponent("minecraft:durability").getDamageChance(itemdata.getComponent("minecraft:enchantable").getEnchantment("minecraft:unbreaking")?.level ?? 0)
			if (kalme.getRandomInt()+1 <= damageChance) {
				kalme.itemDamage(itemdata,1,user.getComponent("minecraft:equippable").getEquipmentSlot("Mainhand"))
			}
		}

		const maintype = database.magicTypeList[usedtype].main
		user.addandRemoveTag(`magicv2:used_${"wand"}.${maintype}_${name}`)
		user.addandRemoveTag(`magicv2:used_${"any"}.${maintype}_${name}`)
		for (const type of database.magicTypeList[usedtype].convertible) {
			user.addandRemoveTag(`magicv2:used_${"wand"}.${type}_${name}`)
			user.addandRemoveTag(`magicv2:used_${"any"}.${type}_${name}`)
		}
		user.startItemCooldown("magic",100)
	}

})

mc.world.afterEvents.itemCompleteUse.subscribe(async(ev) => {
	const itemdata = ev.itemStack
	const user = ev.source

})

mc.world.beforeEvents.playerInteractWithBlock.subscribe((ev)=>{
	const player = ev.player
	const itemdata = ev.itemStack
	const block = ev.block

})


mc.system.afterEvents.scriptEventReceive.subscribe(async(ev) => { // /scripteventの受信
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
			case "magic:v":
			case "magicv2:v":
			case "kalme:v_magic":
			case "kalme:v_magicv2":
			case "kalme:v_magic_v2":
				if (!rawopt)
					kalme.send(source,"GYU_magic: " + V_magic)
				else
					if (VV_magic.hasOwnProperty(opt)) {
						kalme.send(source,"GYU_magic: " + opt + ": " + VV_magic[opt])
					} else {
						kalme.send(source,`Error by /scriptevent\n  ${opt} not found in GYU_magic\n  expect in [BP,data,script,RP,resource]`)
					}
				break;
			case "magicv2:ping":
				kalme.send(source,"pong")
				break
		}
	}


	if (sourcetype == "Server") { //サーバーコンソールから
		switch (id) {
			case "kalme:v": //落下
			case "magic:v":
			case "magicv2:v":
			case "kalme:v_magic":
			case "kalme:v_magicv2":
			case "kalme:v_magic_v2":
				if (!rawopt)
					console.log("GYU_magic: " + V_magic)
				else
					if (VV_magic.hasOwnProperty(opt)) {
						console.log("GYU_magic: " + opt + ": " + VV_magic[opt])
					} else {
						kalme.error(`Error by /scriptevent\n\t${opt} not found in GYU_magic_v2\n\texpect in [BP,data,script,RP,resource]`)
					}
				break;
			case "magicv2:ping":
				console.log("pong")
				break
				
		}
	}

	})

mc.system.runInterval(() => {
	const dimensions = [mc.world.getDimension("overworld"),mc.world.getDimension("nether"),mc.world.getDimension("the_end")]
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
},0)

console.log(`Complete loading GYU_magic_v2 script ${VV_magic.script}`)