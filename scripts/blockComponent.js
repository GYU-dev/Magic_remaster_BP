import * as mc from "@minecraft/server"
import * as kalme from "./common"
import {Vector3} from "./library/Vector"

/**
 * ターゲットブロックの周囲を参照しランダムにブロックを変化させる
 * @param {mc.Block} target 変化させるブロック
 * @param {{blockName:String,addProbability:number,placeLimit?:("above"|"below"|"east"|"north"|"south"|"west")[],permutation?:{sTaTeId:string|number|boolean}}[]} blockList 周囲で探すブロックとそれによる変化率の増分
 * @param {string|mc.BlockType} transformTo 変化先のブロックID
 */
function transformByEnviron(target,blockList,transformTo) {
	let transformProbability = 0
	for (const itemInList of blockList) {
		if (itemInList.placeLimit == undefined) itemInList.placeLimit = ["above","below","east","north","south","west"]
		const serchblocks = [
			itemInList.placeLimit.includes("above")?target.above():undefined,
			itemInList.placeLimit.includes("below")?target.below():undefined,
			itemInList.placeLimit.includes("east")?target.east():undefined,
			itemInList.placeLimit.includes("north")?target.north():undefined,
			itemInList.placeLimit.includes("south")?target.south():undefined,
			itemInList.placeLimit.includes("west")?target.west():undefined]
		for (const block of serchblocks) {
			if (block?.type == undefined) continue
			if (block.type.id != itemInList.blockName) continue
			if (!block.permutation.matches(block.type.id,itemInList.permutation)) continue
			transformProbability += itemInList.addProbability
		}
	}
	if (kalme.getRandomInt() + 1 <= transformProbability) target.setType(transformTo)
}

function raw_magic_crystal_RandomTickTransform(ev) {
	const block = ev.block
	transformByEnviron(block,[
		{
			blockName: "minecraft:redstone_block",addProbability: 15
		},
		{
			blockName: "minecraft:redstone_wire",addProbability: 5,
			placeLimit: null,permutation: {
				redstone_signal: 15
			}
		},
		{
			blockName: "minecraft:powered_repeater",addProbability: 5
		},

	],"magic_remaster:raw_magic_crystal_unstable")
}

mc.system.beforeEvents.startup.subscribe((ev)=>{
	ev.blockComponentRegistry.registerCustomComponent("magic_remaster:raw_magic_crystal",{
		onRandomTick: raw_magic_crystal_RandomTickTransform
	}),
	ev.blockComponentRegistry.registerCustomComponent("magic_remaster:raw_magic_crystal_unstable",{
		onRandomTick: (none,a)=>{}
	})

	ev.blockComponentRegistry.registerCustomComponent("magic_remaster:magical_crafting_table_component",{
		onPlayerInteract: (ev,params)=>{
			const block = ev.block
			const player = ev.player
			if (player === undefined) {
				return
			}
			const itemStack = player.getComponent(mc.EntityComponentTypes.Equippable).getEquipment(mc.EquipmentSlot.Mainhand)
			if (itemStack !== undefined) switch (itemStack.type.id) {
				case "magic_remaster:magic_powder":
					block.setPermutation(block.permutation.withState("magic_remaster:crafting_table_type","powder"))
					kalme.consumeMainItem(player,1,true)
					break;
			
				default:
					break;
			}
			return
		}
	})
})

mc.world.beforeEvents.playerInteractWithBlock.subscribe((ev)=>{
	switch (ev.block.type.id){
		case "magic_remaster:magical_crafting_table":{
			if ((ev.block.permutation.getState("magic_remaster:crafting_table_type") != "none" && ev.player.isSneaking)) {
				const itemStack = ev.player.getComponent(mc.EntityComponentTypes.Equippable).getEquipment(mc.EquipmentSlot.Mainhand)
				const block = ev.block
				if (itemStack === undefined) {
					switch (block.permutation.getState("magic_remaster:crafting_table_type")) {
						case "none":
							break;
						case "powder":
							mc.system.run(()=>{
								block.setPermutation(block.permutation.withState("magic_remaster:crafting_table_type","none"))
								block.dimension.spawnItem(new mc.ItemStack("magic_remaster:magic_powder"),new Vector3(block.location).getAdd(0.5,0.7,0.5))
								block.dimension.playSound("random.pop",new Vector3(block.location).getAdd(0.5,1,0.5))
							})
							break;
				
						default:
							break;
					}
					ev.cancel = true
				}
			}
		}
	}
})