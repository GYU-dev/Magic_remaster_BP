import * as mc from "@minecraft/server"
import s from "../library/scoreboardList"

/**
 * @param {mc.Player} player 経験値を獲得するプレイヤー
 * @param {number} amount 経験値の獲得量
 */
export function getmagicEXP(player,amount) {
	const scoreboard = mc.world.scoreboard
	const EXPObject = scoreboard.getObjective(s.EXP.id)

	if (EXPObject == undefined) {
		throw new Error("Scoreboard not found. Try reload to create scoreboard again.")
	}

	const EXP = EXPObject.getScore(player) || 0
	
	EXPObject.setScore(player,EXP + amount)
}

mc.world.afterEvents.worldLoad.subscribe((ev)=>{
	const scoreboard = mc.world.scoreboard
	const rankObject = scoreboard.getObjective(s.wizardRank.id)
	const EXPObject = scoreboard.getObjective(s.EXP.id)
	const EXPNextObject = scoreboard.getObjective(s.EXPNext.id)

	let autoEXPCalc = mc.system.runInterval(()=>{
		for (const player of mc.world.getAllPlayers()) {
			const rank = rankObject.getScore(player) || 0
			const EXP = EXPObject.getScore(player) || 0
			const EXPNext = EXPNextObject.getScore(player)

			if (EXP >= EXPNext) {
				rankObject.setScore(player,rank + 1)
				EXPObject.setScore(player,EXP - EXPNext)
				// ランクアップ
				mc.world.sendMessage(`${player.nameTag || player.name} がランク${rank + 1}に到達しました!`)
			}
		}
	},1)

	mc.system.afterEvents.scriptEventReceive.subscribe((ev)=>{
		if (ev.id == "DEV:RESETSCORE" || ev.id == "DEV:STOPAutoEXPCalc") {
			mc.system.clearRun(autoEXPCalc)
			console.log("autoEXPCalc was stopped. Reload this world to start autoEXPcalc again.")
		}
	})
})

console.log("magicEXP.js loaded")