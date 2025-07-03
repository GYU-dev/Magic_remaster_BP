import * as mc from "@minecraft/server"

export class worldDynamicProperty {
	lastValue
	id
	type

	/**@param {string} propertyIdentifier @returns {worldDynamicProperty}*/
	constructor(propertyIdentifier){
		this.id = propertyIdentifier
		this.lastValue = mc.world.getDynamicProperty(this.id)
		this.type = typeof this.lastValue
	}

	get(){
		this.lastValue = mc.world.getDynamicProperty(this.id)
		this.type = typeof this.lastValue
		return this.lastValue
	}

	/**@param {boolean|number|string|mc.Vector3|undefined} argment*/
	set(argment){
		mc.world.setDynamicProperty(this.id,argment)
		this.lastValue = argment
		this.type = typeof this.lastValue
	}

	/**@param {number|string} argment @returns {number|string}*/
	add(argment){
		const argType = typeof argment
		if (this.type == "number" && argType == "number") {
			this.set(this.get() + argment)
			return this.lastValue
		} else if (this.type == "string" && argType == "string") {
			this.set(this.get() + argment)
			return this.lastValue
		} else if (this.type == "undefined" && (argType == "number" || argType == "string")) {
			this.set(argment)
			return this.lastValue
		} else {
			return this.lastValue
		}
	}
}

export class playerDynamicProperty extends worldDynamicProperty{
	playerId

	/**@param {string} playerId @param {string} propertyIdentifier  */
	constructor(playerId,propertyIdentifier){
		super(playerId + propertyIdentifier)
		this.playerId = playerId
	}

	/**@param {mc.Player} player @param {string} propertyIdentifier */
	static fromPlayer(player,propertyIdentifier){
		return new playerDynamicProperty(player.name,propertyIdentifier)
	}

	get player(){
		return mc.world.getAllPlayers().find((value)=>{return value.name == this.playerId})
	}
}

console.log("playerDynamicProperty.js loaded")