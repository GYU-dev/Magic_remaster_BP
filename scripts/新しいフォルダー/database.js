export {magicTypeList}

/*
magicTypeList: 使用する階級とその変換性を定義する。
	キー名(任意): {
		main: 主要な階級 省略時はキー名と同じ
		convertible: その階級が使用できる他の階級 mainと同値を含んではいけない
	}
*/
const magicTypeList = {
	basic: {
		main: "basic",
		convertible: ["any"]
	}
}