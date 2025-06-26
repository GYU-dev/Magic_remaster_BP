import * as mc from "@minecraft/server"
import * as kalme from "./common"

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

	})
})