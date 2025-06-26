import * as mc from "@minecraft/server"
import s from "../library/scoreboardList"

mc.world.afterEvents.worldLoad.subscribe((ev)=>{
	const scoreboard = mc.world.scoreboard

	let autoCalcMana = mc.system.runInterval(()=>{
		const manaMax = scoreboard.getObjective(s.manaMax.id)
		const manaRec = scoreboard.getObjective(s.manaRec.id)
		const EXPNext = scoreboard.getObjective(s.EXPNext.id)
		for ( const player of mc.world.getAllPlayers()) {
			let wizardRank = 0
			try {wizardRank = scoreboard.getObjective(s.wizardRank.id).getScore(player) ?? 0}
			catch {wizardRank = 0}
			manaMax.setScore(player,wizardRank**2 + 20*wizardRank + 100)
			manaRec.setScore(player,0.03*manaMax.getScore(player))
			EXPNext.setScore(player,wizardRank**3 + 10*wizardRank**2 + 30*wizardRank + 100)
		}
	},1)

	mc.system.afterEvents.scriptEventReceive.subscribe((ev)=>{
		if (ev.id == "DEV:RESETSCORE" || ev.id == "DEV:STOPAutoCalc") {
			mc.system.clearRun(autoCalcMana)
			console.log("autoCalc was stopped. Reload this world to use magic again.")
		}
	})
})

console.log("autoCalcMana.js loaded")