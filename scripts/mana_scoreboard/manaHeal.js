import * as mc from "@minecraft/server"
import s from "../library/scoreboardList"

/**
 * @param {mc.Player} player 魔力を回復するプレイヤー
 * @param {number} power 魔力の回復量
 * @param {boolean} overmax 最大値を超過するか
 */
export function manaHeal(player,power,overmax = false) {
	const scoreboard = mc.world.scoreboard
	const manaObject = scoreboard.getObjective(s.Mana.id)
	const manaMaxObject = scoreboard.getObjective(s.manaMax.id)

	if (manaObject == undefined || manaMaxObject == undefined) {
		throw new Error("Scoreboard not found. Try reload to create scoreboard again.")
	}

	const mana = manaObject.getScore(player) || 0
	const manaMax = manaMaxObject.getScore(player)
	
	if (mana + power > manaMax && !overmax) {
		manaObject.setScore(player,manaMax)
	} else {
		manaObject.setScore(player,mana + power)
	}
}

mc.world.afterEvents.worldLoad.subscribe((ev)=>{
	const scoreboard = mc.world.scoreboard

	let autoHealing = mc.system.runInterval(()=>{
		for (const player of mc.world.getAllPlayers()) {
			manaHeal(player,scoreboard.getObjective(s.manaRec.id).getScore(player))
		}
	},200)

	mc.system.afterEvents.scriptEventReceive.subscribe((ev)=>{
		if (ev.id == "DEV:RESETSCORE" || ev.id == "DEV:STOPAutoHealing") {
			mc.system.clearRun(autoHealing)
			console.log("autoHealing was stopped. Reload this world to start autoHealing again.")
		}
	})
})

console.log("manaHeal.js loaded")