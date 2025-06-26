import * as mc from "@minecraft/server"
import {consumeMainItem,outNameSpace} from "./common"
import * as tagList from "./library/tagList"
import {manaHeal} from "./mana_scoreboard/manaHeal"
import { log } from "./log"

mc.system.beforeEvents.startup.subscribe((ev)=>{
	ev.itemComponentRegistry.registerCustomComponent(
		"magic_remaster:magic_book_component",
		{
			onUse: ((ev,params)=>{
				const itemStack = ev.itemStack
				const sourcePlayer = ev.source
				if(sourcePlayer.hasTag(tagList.Disabled_magic))return
				
				consumeMainItem(sourcePlayer)
				const bookId = outNameSpace(itemStack.type.id).split("_")[2]
				const magicName = itemStack.nameTag
				sourcePlayer.addTag(`used_magic_book_${bookId}`)
				if(magicName !== undefined)sourcePlayer.addTag(`used_magic_name_${magicName}`);

				sourcePlayer.startItemCooldown("magic_remaster:magic_book",20)

				sourcePlayer.playSound("block.enchanting_table.use")

				mc.system.runTimeout(()=>{
					sourcePlayer.removeTag(`used_magic_book_${bookId}`)
					if(magicName !== undefined)sourcePlayer.removeTag(`used_magic_name_${magicName}`);
				},1)

			})
		}
	)
	ev.itemComponentRegistry.registerCustomComponent(
		"magic_remaster:magic_wand_component",{
			onUse: ((ev,params)=>{
				const itemStack = ev.itemStack
				const sourcePlayer = ev.source
				if(sourcePlayer.hasTag(tagList.Disabled_magic))return
				
				consumeMainItem(sourcePlayer)
				const wandId = outNameSpace(itemStack.type.id).split("_")[2]
				const magicName = itemStack.nameTag
				sourcePlayer.addTag(`used_magic_wand_${wandId}`)
				if(magicName !== undefined)sourcePlayer.addTag(`used_magic_name_${magicName}`);

				sourcePlayer.startItemCooldown("magic_remaster:magic_wand",200)

				sourcePlayer.playSound("block.enchanting_table.use")

				mc.system.runTimeout(()=>{
					sourcePlayer.removeTag(`used_magic_wand_${wandId}`)
					if(magicName !== undefined)sourcePlayer.removeTag(`used_magic_name_${magicName}`);
				},1)
			})
		}
	)

	ev.itemComponentRegistry.registerCustomComponent(
		"magic_remaster:mana_potion_component",
		{
			onConsume: ((ev,params)=>{
				const itemStack = ev.itemStack
				const sourcePlayer = ev.source
				params = params.params

				const power = params.power

				manaHeal(sourcePlayer,power)
			})
		}
	)

})

console.log("customcomponent.js loaded")