import * as mc from "@minecraft/server"

/**
 * @param {object} contents ログの基礎となるオブジェクト
 * @param {mc.player} player ログに記録される動作を行ったプレイヤー
 * @param {string} event イベント名
 */
export function log(contents,player,event = contents.event) {
	const timestamp = new Date()
	timestamp.setHours(timestamp.getHours() + 9)

	contents.timestamp = timestamp.toISOString().replace("T", " ").replace("Z", " +09:00")
	contents.event = event
	contents.player = player.name
	contents.location = player.location
	
	console.log(JSON.stringify(contents))
}