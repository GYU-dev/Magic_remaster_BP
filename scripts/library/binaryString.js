/*
 文字列を16bitのバイナリ配列のように扱います。
 */

 /**
  * バイナリとして解釈可能な文字列を初期化して返します。
  * @param {number} length 初期化する文字列の長さ
  * @returns ゼロ埋めされたバイナリとして解釈可能な文字列
  */
export function binaryInit(length){
	let string = ""
	for (let i = 0; i<length; i++) {
		string += String.fromCharCode(0b0000000000000000)
	}
	return string
}

/**
 * 1桁のバイナリを読み込みます。
 * @param {string} string バイナリと解釈する文字列
 * @param {number} pos 読み込む文字の位置(左からゼロスタート)
 * @param {number} digit 1文字の中の読み込む桁(左から0~15)
 * @returns {boolean} 読み込んだバイナリの真偽値
 */
export function readBinary(string,pos,digit){
	let bin = string.charCodeAt(pos).toString(2)
	while (bin.length < 16) {
		bin = "0" + bin
	}
	return Boolean(Number(bin[digit]))
}

/**
 * バイナリに1桁書き込みます。
 * @param {string} string バイナリと解釈する文字列
 * @param {number} pos 書き込む文字の位置(左からゼロスタート)
 * @param {number} digit 1文字の中の書き込む桁(左から0~15)
 * @param {boolean} bool 書き込む真偽値
 * @returns {string} 書き込んだ後のバイナリ
 */
export function writeBinary(string,pos,digit,bool){
	let bin = string.charCodeAt(pos).toString(2)
	while (bin.length < 16) {
		bin = "0" + bin
	}
	bin = bin.slice(0,digit).concat(Number(bool).toString(2),bin.slice(digit+1))
	let ret = string
	ret = ret.slice(0,pos).concat(String.fromCharCode(Number("0b"+bin)),ret.slice(pos+1))
	return ret
}

console.log("binaryString.js loaded")