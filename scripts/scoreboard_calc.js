// nameSpace: calc

import * as mc from "@minecraft/server"
import * as kalme from "./common"

mc.system.afterEvents.scriptEventReceive.subscribe((ev)=>{
	const nameSpace = kalme.nameSpace(ev.id)
	if(nameSpace != "calc") return

	const id = kalme.outNameSpace(ev.id)
	const message = ev.message

	switch (id) {
		/*
		 スコア計算
		 id: calc:score
		 message: {"emurate":$emurate,"score":$score,"operator":$operator,"operand":[$first,$secound?],"operandEmurate?":[$first,$secound?]}
		 $emurate: フェイクプレイヤー名
		 $score: スコアボードID
		 $operator: 演算子
		  "+" "+=" "add" : 加算
		  "-" "-=" "remove" : 減算
		  "*" "*=" "mul" : 乗算
		  "/" "/=" "div" : 除算
		  "^" "**" "pow" : べき乗算
		  "=" "==" "eq" : 代入(等値代入)/等価確認
		 $first: 第一オペランド 数値あるいはスコアボードID
		 $secound: 第二オペランド 数値あるいはスコアボードID
		  +,*(系列)では$secoundを省略可能(省略時$scoreが入る)
		  -,/,^(系列)では$secound省略時、$firstが$secoundにあるものとして$firstに$scoreが入る
		  =(系列)は$secoundを省略するかどうかで処理が変わる
		   省略時: $scoreに$firstを代入
		   非省略時: $firstと$secoundが等価なら1,そうでなければ0を$scoreに代入
		 */
		case "score":{
			const messageObject = JSON.parse(message)
			const emurate = messageObject.emurate
			const score = messageObject.score
			const operator = messageObject.operator
			const operand = messageObject.operand
			const existSecound = operand.length -1
			const operandEmurate = messageObject.operandEmurate ?? [undefined,undefined]

			const scoreboard = mc.world.scoreboard

			switch (operator) {
				case "+":
				case "+=":
				case "add":
					scoreboard.getObjective(score).setScore(emurate,parseScore(operand[0],operandEmurate[0] ?? emurate) + (parseScore(operand[1],operandEmurate[1] ?? emurate) ?? parseScore(score,operandEmurate[1] ?? emurate)))
					break;
				case "-":
				case "-=":
				case "remove":
					if(existSecound){
						scoreboard.getObjective(score).setScore(emurate,parseScore(operand[0],operandEmurate[0] ?? emurate) - parseScore(operand[1],operandEmurate[1] ?? emurate))
					}else{
						scoreboard.getObjective(score).setScore(emurate,parseScore(score,emurate) - parseScore(operand[0],operandEmurate[0] ?? emurate))
					}
					break;
				case "*":
				case "*=":
				case "mul":
					scoreboard.getObjective(score).setScore(emurate,parseScore(operand[0],operandEmurate[0] ?? emurate) * (parseScore(operand[1],operandEmurate[1] ?? emurate) ?? parseScore(score,operandEmurate[1] ?? emurate)))
					break;
				case "/":
				case "/=":
				case "div":
					if(existSecound){
						scoreboard.getObjective(score).setScore(emurate,parseScore(operand[0],operandEmurate[0] ?? emurate) / parseScore(operand[1],operandEmurate[1] ?? emurate))
					}else{
						scoreboard.getObjective(score).setScore(emurate,parseScore(score,emurate) / parseScore(operand[0],operandEmurate[0] ?? emurate))
					}
					break;
				case "^":
				case "**":
				case "pow":
					if(existSecound){
						scoreboard.getObjective(score).setScore(emurate,parseScore(operand[0],operandEmurate[0] ?? emurate) == parseScore(operand[1],operandEmurate[1] ?? emurate))
					}else{
						scoreboard.getObjective(score).setScore(emurate,parseScore(score,emurate) ** parseScore(operand[0],operandEmurate[0] ?? emurate))
					}
					break;
				case "=":
				case "==":
				case "eq":
					if(existSecound){
						scoreboard.getObjective(score).setScore(emurate,parseScore(operand[0],operandEmurate[0] ?? emurate) / parseScore(operand[1],operandEmurate[1] ?? emurate))
					}else{
						scoreboard.getObjective(score).setScore(parseScore(operand[0],operandEmurate[0] ?? emurate))
					}
					break;
			
				default:
					break;
			}
		}
	}

})

function parseScore(arg,emurate) {
	if (typeof arg == "number") {
		return arg
	}
	if (typeof arg == "string") {
		mc.world.scoreboard.getObjective(arg).getScore(emurate)
	}
	if (typeof arg == "undefined") {
		return undefined
	}
}

console.log("scoreboard_calc.js loaded")