/**
 * 3次元の空間ベクトルを構成し、操作します。
 */
export class Vector3 {
	x
	y
	z

	/**
	 * @remarks
	 * x,y,z成分から3次元ベクトルを構成します。
	 * 
	 * @param {number|{x:number,y:number,z:number}} x 
	 * ベクトルのx成分、あるいはx,y,z成分を含むオブジェクト。
	 * @param {number} y 
	 * ベクトルのy成分、xにオブジェクトを渡した場合は無視します。
	 * @param {number} z 
	 * ベクトルのz成分、xにオブジェクトを渡した場合は無視します。
	 * 
	 * @throws 
	 * 引数が正しく設定されていない場合、TypeErrorを発生させます。
	 */
	constructor(x,y=0,z=0){
		if (typeof x == "number") {
			if (typeof x == "number" && typeof y == "number" && typeof z == "number") {
				this.x = x
				this.y = y
				this.z = z
			} else {
				throw new TypeError("Vector3.constructor() arguments[1] and [2] should be number when argument[0] is number.")
			}
		} else {
			if (Object.keys(x).includes("x") && Object.keys(x).includes("y") &&Object.keys(x).includes("z")) {
				if (typeof x.x == "number" && typeof x.y == "number" && typeof x.z == "number") {
					this.x = x.x
					this.y = x.y
					this.z = x.z
				} else {
					throw new TypeError("Vector3.constructor() arguments[0] property 'x','y',and'z' should be number.")
				}
			} else {
				throw new TypeError("Vector3.constructor() arguments[0] should be number or have property 'x','y',and'z'.")
			}
		}
	}

	/**
	 * @remarks
	 * 元の3次元ベクトルに別のベクトルを足します。  
	 * このオブジェクトを変更します。
	 * 
	 * @param {number|{x:number,y:number,z:number}} x 
	 * ベクトルのx成分、あるいはx,y,z成分を含むオブジェクト。
	 * @param {number} y 
	 * ベクトルのy成分、xにオブジェクトを渡した場合は無視します。
	 * @param {number} z 
	 * ベクトルのz成分、xにオブジェクトを渡した場合は無視します。
	 * 
	 * @returns {Vector3}
	 * 計算後のベクトルを返します。
	 * 
	 * @throws 
	 * 引数が正しく設定されていない場合、TypeErrorを発生させます。
	 */
	add(x,y=0,z=0){
		if (typeof x == "number") {
			if (typeof x == "number" && typeof y == "number" && typeof z == "number") {
				this.x += x
				this.y += y
				this.z += z
			} else {
				throw new TypeError("Vector3.add() arguments[1] and [2] should be number when argument[0] is number.")
			}
		} else {
			if (Object.keys(x).includes("x") && Object.keys(x).includes("y") &&Object.keys(x).includes("z")) {
				if (typeof x.x == "number" && typeof x.y == "number" && typeof x.z == "number") {
					this.x += x.x
					this.y += x.y
					this.z += x.z
				} else {
					throw new TypeError("Vector3.add() arguments[0] property 'x','y',and'z' should be number.");
				}
			} else {
				throw new TypeError("Vector3.add() arguments[0] should be number or have property 'x','y',and'z'.")
			}
		}
		return this
	}

	/**
	 * @remarks  
	 * 元の3次元ベクトルから別のベクトルを引きます。  
	 * 結果は別のベクトルの終点から元の3次元ベクトルの終点までのベクトルになります。  
	 * このオブジェクトを変更します。
	 * 
	 * @param {number|{x:number,y:number,z:number}} x   
	 * ベクトルのx成分、あるいはx,y,z成分を含むオブジェクト。
	 * @param {number} y   
	 * ベクトルのy成分、xにオブジェクトを渡した場合は無視します。
	 * @param {number} z   
	 * ベクトルのz成分、xにオブジェクトを渡した場合は無視します。
	 * 
	 * @returns {Vector3}  
	 * 計算後のベクトルを返します。
	 * 
	 * @throws 
	 * 引数が正しく設定されていない場合、TypeErrorを発生させます。
	 */
	differFrom(x,y=0,z=0){
		if (typeof x == "number") {
			if (typeof x == "number" && typeof y == "number" && typeof z == "number") {
				this.x -= x
				this.y -= y
				this.z -= z
			} else {
				throw new TypeError("Vector3.differFrom() arguments[1] and [2] should be number when argument[0] is number.")
			}
		} else {
			if (Object.keys(x).includes("x") && Object.keys(x).includes("y") &&Object.keys(x).includes("z")) {
				if (typeof x.x == "number" && typeof x.y == "number" && typeof x.z == "number") {
					this.x -= x.x
					this.y -= x.y
					this.z -= x.z
				} else {
					throw new TypeError("Vector3.differFrom() arguments[0] property 'x','y',and'z' should be number.");
				}
			} else {
				throw new TypeError("Vector3.differFrom() arguments[0] should be number or have property 'x','y',and'z'.")
			}
		}
		return this
	}

	/**
	 * @remarks  
	 * 別のベクトルから元の3次元ベクトルを引きます。  
	 * 結果は元の3次元ベクトルの終点から別のベクトルの終点までのベクトルになります。  
	 * このオブジェクトを変更します。
	 * 
	 * @param {number|{x:number,y:number,z:number}} x   
	 * ベクトルのx成分、あるいはx,y,z成分を含むオブジェクト。
	 * @param {number} y   
	 * ベクトルのy成分、xにオブジェクトを渡した場合は無視します。
	 * @param {number} z   
	 * ベクトルのz成分、xにオブジェクトを渡した場合は無視します。
	 * 
	 * @returns {Vector3}  
	 * 計算後のベクトルを返します。
	 * 
	 * @throws 
	 * 引数が正しく設定されていない場合、TypeErrorを発生させます。
	 */
	differTo(x,y=0,z=0){
		if (typeof x == "number") {
			if (typeof x == "number" && typeof y == "number" && typeof z == "number") {
				this.x = x - this.x 
				this.y = y - this.y
				this.z = z - this.z
			} else {
				throw new TypeError("Vector3.differTo() arguments[1] and [2] should be number when argument[0] is number.")
			}
		} else {
			if (Object.keys(x).includes("x") && Object.keys(x).includes("y") &&Object.keys(x).includes("z")) {
				if (typeof x.x == "number" && typeof x.y == "number" && typeof x.z == "number") {
					this.x = x.x - this.x
					this.y = x.y - this.y
					this.z = x.z - this.z
				} else {
					throw new TypeError("Vector3.differTo() arguments[0] property 'x','y',and'z' should be number.");
				}
			} else {
				throw new TypeError("Vector3.differTo() arguments[0] should be number or have property 'x','y',and'z'.")
			}
		}
		return this
	}

	/**
	 * @remarks  
	 * 元の3次元ベクトルと別のベクトルとの内積を返します。  
	 * 
	 * @param {number|{x:number,y:number,z:number}} x   
	 * ベクトルのx成分、あるいはx,y,z成分を含むオブジェクト。
	 * @param {number} y   
	 * ベクトルのy成分、xにオブジェクトを渡した場合は無視します。
	 * @param {number} z   
	 * ベクトルのz成分、xにオブジェクトを渡した場合は無視します。
	 * 
	 * @returns {number}  
	 * 内積を返します。
	 * 
	 * @throws 
	 * 引数が正しく設定されていない場合、TypeErrorを発生させます。
	 */
	innerProduct(x,y=0,z=0){
		let xsum,ysum,zsum = 0
		if (typeof x == "number") {
			if (typeof x == "number" && typeof y == "number" && typeof z == "number") {
				xsum = this.x * x
				ysum = this.y * y
				zsum = this.z * z
			} else {
				throw new TypeError("Vector3.innerProduct() arguments[1] and [2] should be number when argument[0] is number.")
			}
		} else {
			if (Object.keys(x).includes("x") && Object.keys(x).includes("y") &&Object.keys(x).includes("z")) {
				if (typeof x.x == "number" && typeof x.y == "number" && typeof x.z == "number") {
					xsum = this.x * x.x
					ysum = this.y * x.y
					zsum = this.z * x.z
				} else {
					throw new TypeError("Vector3.innerProduct() arguments[0] property 'x','y',and'z' should be number.");
				}
			} else {
				throw new TypeError("Vector3.innerProduct() arguments[0] should be number or have property 'x','y',and'z'.")
			}
		}
		return xsum+ysum+zsum
	}

}