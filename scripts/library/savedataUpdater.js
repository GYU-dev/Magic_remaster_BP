import * as mc from "@minecraft/server"
import {worldDynamicProperty, playerDynamicProperty} from "./playerDynamicProperty"
import * as ui from "@minecraft/server-ui"

const savedataNewerVer = 0

mc.world.afterEvents.playerSpawn.subscribe((ev)=>{
	if (!ev.initialSpawn) return
	const playerName = ev.player.name

	const savedataDP = new playerDynamicProperty(playerName,"savedataVer")
	const playerVer = savedataDP.get()

	if (playerVer === "undefined") {
		new ui.MessageFormData()
		.title("Welcome")
		.body(`セーブデータがありません。\n
			   このアドオンの機能を利用するためには、ワールドにあなたのセーブデータを保存することに同意していただく必要があります。\n
			   同意された場合、セーブデータを作成を開始します。\n
		       (セーブデータの作成中はこのアドオンの機能を使用できないことがあります。)
			   (セーブデータの作成には数十秒かかることがあります。)`)
		.button1("同意する")
		.button2("同意せずはじめる")
		.show().finally()
		// 101 Error
	} else if (typeof playerVer === "number") {
		// 104 Error
	} else if (playerVer < savedataNewerVer) {
		// 102 Error
	} else if (playerVer > savedataNewerVer) {
		// 103 Error
		new ui.MessageFormData()
		.title("セーブデータエラー：103")
		.body(`保存されているセーブデータに異常があります。\n
			   このデータはワールドで使用しているデータより新しいバージョンです。\n
			   データを使用することができません。
			   データを保存すると破損する可能性がありますが、本当によろしいですか?`)
		.show()
	} else if (playerVer == savedataNewerVer) {
		// TESTClear
	}
})
