import * as mc from "@minecraft/server"
import s from "./library/scoreboardList"

mc.world.afterEvents.worldLoad.subscribe((ev)=>{
	const scoreboard = mc.world.scoreboard

	for (const scoreboardObjKey in s) {
		const scoreboardObj = s[scoreboardObjKey]
		if (scoreboard.getObjective(scoreboardObj.id) == undefined) {
			scoreboard.addObjective(scoreboardObj.id,scoreboardObj.name)
			console.log(`Scoreboard ${scoreboardObj.id} was created.`)
		}
	}

	mc.system.afterEvents.scriptEventReceive.subscribe((ev)=>{
		if (ev.id == "DEV:RESETSCORE") {
			for (const scoreboardObjKey in s) {
				const scoreboardObj = s[scoreboardObjKey]
				scoreboard.removeObjective(scoreboardObj.id)
				console.log(`Scoreboard ${scoreboardObj.id} was removed.`)
			}
		}
	})
})

console.log("scoreboard.js loaded")