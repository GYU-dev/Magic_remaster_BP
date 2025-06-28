/**
 * @remarks
 * 3次元の空間ベクトルを構成し、操作します。
 */
export class Vector3 {
	/**
	 * @remarks  
	 * 3次元ベクトルのx成分
	 */
	x
	/**
	 * @remarks  
	 * 3次元ベクトルのy成分
	 */
	y
	/**
	 * @remarks  
	 * 3次元ベクトルのz成分
	 */
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
	 * 元の3次元ベクトルに別のベクトルを足します。  
	 * オブジェクトを変更せず、新しいオブジェクトを返します。
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
	getAdd(x,y=0,z=0){
		let new_x = 0,new_y = 0,new_z = 0
		if (typeof x == "number") {
			if (typeof x == "number" && typeof y == "number" && typeof z == "number") {
				new_x = this.x + x
				new_y = this.y + y
				new_z = this.z + z
			} else {
				throw new TypeError("Vector3.getAdd() arguments[1] and [2] should be number when argument[0] is number.")
			}
		} else {
			if (Object.keys(x).includes("x") && Object.keys(x).includes("y") &&Object.keys(x).includes("z")) {
				if (typeof x.x == "number" && typeof x.y == "number" && typeof x.z == "number") {
					new_x = this.x + x.x
					new_y = this.y + x.y
					new_z = this.z + x.z
				} else {
					throw new TypeError("Vector3.getAdd() arguments[0] property 'x','y',and'z' should be number.");
				}
			} else {
				throw new TypeError("Vector3.getAdd() arguments[0] should be number or have property 'x','y',and'z'.")
			}
		}
		return new Vector3(new_x,new_y,new_z)
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
	 * 元の3次元ベクトルから別のベクトルを引きます。  
	 * 結果は別のベクトルの終点から元の3次元ベクトルの終点までのベクトルになります。  
	 * オブジェクトを変更せず、新しいオブジェクトを返します。
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
	getDifferFrom(x,y=0,z=0){
		let new_x = 0,new_y = 0,new_z = 0
		if (typeof x == "number") {
			if (typeof x == "number" && typeof y == "number" && typeof z == "number") {
				new_x = this.x - x
				new_y = this.y - y
				new_z = this.z - z
			} else {
				throw new TypeError("Vector3.getDifferFrom() arguments[1] and [2] should be number when argument[0] is number.")
			}
		} else {
			if (Object.keys(x).includes("x") && Object.keys(x).includes("y") &&Object.keys(x).includes("z")) {
				if (typeof x.x == "number" && typeof x.y == "number" && typeof x.z == "number") {
					new_x = this.x - x.x
					new_y = this.y - x.y
					new_z = this.z - x.z
				} else {
					throw new TypeError("Vector3.getDifferFrom() arguments[0] property 'x','y',and'z' should be number.");
				}
			} else {
				throw new TypeError("Vector3.getDifferFrom() arguments[0] should be number or have property 'x','y',and'z'.")
			}
		}
		return new Vector3(new_x,new_y,new_z)
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
	 * 別のベクトルから元の3次元ベクトルを引きます。  
	 * 結果は元の3次元ベクトルの終点から別のベクトルの終点までのベクトルになります。  
	 * オブジェクトを変更せず、新しいオブジェクトを返します。
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
	getDifferTo(x,y=0,z=0){
		let new_x = 0,new_y = 0,new_z = 0
		if (typeof x == "number") {
			if (typeof x == "number" && typeof y == "number" && typeof z == "number") {
				new_x = x - this.x
				new_y = y - this.y
				new_z = z - this.z
			} else {
				throw new TypeError("Vector3.getDifferTo() arguments[1] and [2] should be number when argument[0] is number.")
			}
		} else {
			if (Object.keys(x).includes("x") && Object.keys(x).includes("y") &&Object.keys(x).includes("z")) {
				if (typeof x.x == "number" && typeof x.y == "number" && typeof x.z == "number") {
					new_x = x - this.x
					new_y = y - this.y
					new_z = z - this.z
				} else {
					throw new TypeError("Vector3.getDifferTo() arguments[0] property 'x','y',and'z' should be number.");
				}
			} else {
				throw new TypeError("Vector3.getDifferTo() arguments[0] should be number or have property 'x','y',and'z'.")
			}
		}
		return new Vector3(new_x,new_y,new_z)
	}

		/**
	 * @remarks
	 * 3次元ベクトルをスカラー倍します。  
	 * このオブジェクトを変更します。
	 * 
	 * @param {number} m 乗数
	 * 
	 * @returns {Vector3}  
	 * 計算後のベクトルを返します。
	 * 
	 * @throws 
	 * 引数が正しく設定されていない場合、TypeErrorを発生させます。
	 */
	scalarMul(m){
		if(typeof m == "number"){
			this.x *= m
			this.y *= m
			this.z *= m
		} else {
			throw new TypeError("Vector3.scalarMul() arguments[0] should be number.");
		}
		return this
	}

	/**
	 * @remarks
	 * 3次元ベクトルをスカラー倍します。  
	 * オブジェクトを変更せず、新しいオブジェクトを返します。
	 * 
	 * @param {number} m 乗数
	 * 
	 * @returns {Vector3}  
	 * 計算後のベクトルを返します。
	 * 
	 * @throws 
	 * 引数が正しく設定されていない場合、TypeErrorを発生させます。
	 */
	getScalarMul(m){
		let new_x = 0,new_y = 0,new_z = 0
		if(typeof m == "number"){
			new_x = this.x * m
			new_y = this.y * m
			new_z = this.z * m
		} else {
			throw new TypeError("Vector3.getScalarMul() arguments[0] should be number.");
		}
		return new Vector3(new_x,new_y,new_z)
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
	getInnerProduct(x,y=0,z=0){
		let xsum = 0,ysum = 0,zsum = 0
		if (typeof x == "number") {
			if (typeof x == "number" && typeof y == "number" && typeof z == "number") {
				xsum = this.x * x
				ysum = this.y * y
				zsum = this.z * z
			} else {
				throw new TypeError("Vector3.getInnerProduct() arguments[1] and [2] should be number when argument[0] is number.")
			}
		} else {
			if (Object.keys(x).includes("x") && Object.keys(x).includes("y") &&Object.keys(x).includes("z")) {
				if (typeof x.x == "number" && typeof x.y == "number" && typeof x.z == "number") {
					xsum = this.x * x.x
					ysum = this.y * x.y
					zsum = this.z * x.z
				} else {
					throw new TypeError("Vector3.getInnerProduct() arguments[0] property 'x','y',and'z' should be number.");
				}
			} else {
				throw new TypeError("Vector3.getInnerProduct() arguments[0] should be number or have property 'x','y',and'z'.")
			}
		}
		return xsum+ysum+zsum
	}

	/**
	 * @remarks  
	 * 元の3次元ベクトルと別のベクトルとの外積を返します。  
	 * オブジェクトを変更せず、新しいオブジェクトを返します。
	 * 
	 * @param {number|{x:number,y:number,z:number}} x   
	 * ベクトルのx成分、あるいはx,y,z成分を含むオブジェクト。
	 * @param {number} y   
	 * ベクトルのy成分、xにオブジェクトを渡した場合は無視します。
	 * @param {number} z   
	 * ベクトルのz成分、xにオブジェクトを渡した場合は無視します。
	 * 
	 * @returns {Vector3}  
	 * 外積のベクトルを返します。
	 * 
	 * @throws 
	 * 引数が正しく設定されていない場合、TypeErrorを発生させます。
	 */
	getOuterProduct(x,y=0,z=0){
		let new_x = 0,new_y = 0,new_z = 0
		if (typeof x == "number") {
			if (typeof x == "number" && typeof y == "number" && typeof z == "number") {
				new_x = this.y * z - this.z * y
				new_y = this.z * x - this.x * z
				new_z = this.x * y - this.y * x
			} else {
				throw new TypeError("Vector3.getOuterProduct() arguments[1] and [2] should be number when argument[0] is number.")
			}
		} else {
			if (Object.keys(x).includes("x") && Object.keys(x).includes("y") &&Object.keys(x).includes("z")) {
				if (typeof x.x == "number" && typeof x.y == "number" && typeof x.z == "number") {
				new_x = this.y * x.z - this.z * x.y
				new_y = this.z * x.x - this.x * x.z
				new_z = this.x * x.y - this.y * x.x
				} else {
					throw new TypeError("Vector3.getOuterProduct() arguments[0] property 'x','y',and'z' should be number.");
				}
			} else {
				throw new TypeError("Vector3.getOuterProduct() arguments[0] should be number or have property 'x','y',and'z'.")
			}
		}
		return new Vector3(new_x,new_y,new_z)
	}

	/**
	 * @remarks  
	 * 3次元ベクトルの大きさ
	 */
	get size(){
//		return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2)
		return Math.hypot(this.x,this.y,this.z)
	}

	/**
	 * @remarks
	 * 3次元ベクトルのx軸プラス方向と成すラジアン単位の角  
	 * ベクトルが零ベクトルである場合、NaNを返します。
	 */
	get angleX(){
		if (this.size == 0){
			return NaN
		} else{
			return Math.acos(this.getInnerProduct(1,0,0) / this.size)
		}
	}

	/**
	 * @remarks
	 * 3次元ベクトルのy軸プラス方向と成すラジアン単位の角  
	 * ベクトルが零ベクトルである場合、NaNを返します。
	 */
	get angleY(){
		if (this.size == 0){
			return NaN
		} else{
			return Math.acos(this.getInnerProduct(0,1,0) / this.size)
		}
	}

	/**
	 * @remarks
	 * 3次元ベクトルのz軸プラス方向と成すラジアン単位の角  
	 * ベクトルが零ベクトルである場合、NaNを返します。
	 */
	get angleZ(){
		if (this.size == 0){
			return NaN
		} else{
			return Math.acos(this.getInnerProduct(0,0,1) / this.size)
		}
	}

	/**
	 * @remarks  
	 * 3次元ベクトルをx軸を基準にy/zプラス方向に回転します。  
	 * このオブジェクトを変更します。
	 * 
	 * @remarks  
	 * この関数は正しく機能しない可能性があります。
	 * 
	 * @param {number} rad x軸と成すラジアン単位の角
	 * 
	 * @returns {Vector3} 回転した後のベクトル
	 * 
	 * @throws 
	 * 引数が正しく設定されていない場合、TypeErrorを発生させます。
	 */
	rotateX(rad){
		if (typeof rad == "number") {
			this.x *= (1 + 0 + 0)
			this.y *= (0 + Math.cos(rad) - Math.sin(rad))
			this.z *= (0 + Math.sin(rad) + Math.cos(rad))

		} else {
			throw new TypeError("Vector3.rotateX() arguments[0] should be number.")
		}
		return this
	}

	/**
	 * @remarks  
	 * 3次元ベクトルをx軸を基準にy/zプラス方向に回転します。  
	 * オブジェクトを変更せず、新しいオブジェクトを返します。
	 * 
	 * @remarks  
	 * この関数は正しく機能しない可能性があります。
	 * 
	 * @param {number} rad x軸と成すラジアン単位の角
	 * 
	 * @returns {Vector3} 回転した後のベクトル
	 * 
	 * @throws 
	 * 引数が正しく設定されていない場合、TypeErrorを発生させます。
	 */
	getRotateX(rad){
		let new_x=0,new_y=0,new_z=0
		if (typeof rad == "number") {
			new_x = this.x * (1 + 0 + 0)
			new_y = this.y * (0 + Math.cos(rad) - Math.sin(rad))
			new_z = this.z * (0 + Math.sin(rad) + Math.cos(rad))

		} else {
			throw new TypeError("Vector3.getRotateX() arguments[0] should be number.")
		}
		return new Vector3(new_x,new_y,new_z)
	}

	/**
	 * @remarks  
	 * 3次元ベクトルをy軸を基準にx/zプラス方向に回転します。  
	 * このオブジェクトを変更します。
	 * 
	 * @remarks  
	 * この関数は正しく機能しない可能性があります。
	 * 
	 * @param {number} rad y軸と成すラジアン単位の角
	 * 
	 * @returns {Vector3} 回転した後のベクトル
	 * 
	 * @throws 
	 * 引数が正しく設定されていない場合、TypeErrorを発生させます。
	 */
	rotateY(rad){
		if (typeof rad == "number") {
			this.x *= (Math.cos(rad) + 0 + Math.sin(rad))
			this.y *= (0 + 1 + 0)
			this.z *= (-1*Math.sin(rad) + 0 + Math.cos(rad))

		} else {
			throw new TypeError("Vector3.rotateY() arguments[0] should be number.")
		}
		return this
	}

	/**
	 * @remarks  
	 * 3次元ベクトルをy軸を基準にx/zプラス方向に回転します。  
	 * オブジェクトを変更せず、新しいオブジェクトを返します。
	 * 
	 * @remarks  
	 * この関数は正しく機能しない可能性があります。
	 * 
	 * @param {number} rad y軸と成すラジアン単位の角
	 * 
	 * @returns {Vector3} 回転した後のベクトル
	 * 
	 * @throws 
	 * 引数が正しく設定されていない場合、TypeErrorを発生させます。
	 */
	getRotateY(rad){
		let new_x=0,new_y=0,new_z=0
		if (typeof rad == "number") {
			new_x = this.x * (Math.cos(rad) + 0 + Math.sin(rad))
			new_y = this.y * (0 + 1 + 0)
			new_z = this.z * (-1*Math.sin(rad) + 0 + Math.cos(rad))

		} else {
			throw new TypeError("Vector3.getRotateY() arguments[0] should be number.")
		}
		return new Vector3(new_x,new_y,new_z)
	}

	/**
	 * @remarks  
	 * 3次元ベクトルをz軸を基準にx/zプラス方向に回転します。  
	 * このオブジェクトを変更します。
	 * 
	 * @remarks  
	 * この関数は正しく機能しない可能性があります。
	 * 
	 * @param {number} rad z軸と成すラジアン単位の角
	 * 
	 * @returns {Vector3} 回転した後のベクトル
	 * 
	 * @throws 
	 * 引数が正しく設定されていない場合、TypeErrorを発生させます。
	 */
	rotateZ(rad){
		if (typeof rad == "number") {
			this.x *= (Math.cos(rad) - Math.sin(rad) + 0)
			this.y *= (Math.sin(rad) - Math.cos(rad) + 0)
			this.z *= (0 + 0 + 1)

		} else {
			throw new TypeError("Vector3.rotateZ() arguments[0] should be number.")
		}
		return this
	}

	/**
	 * @remarks  
	 * 3次元ベクトルをz軸を基準にx/zプラス方向に回転します。  
	 * オブジェクトを変更せず、新しいオブジェクトを返します。
	 * 
	 * @remarks  
	 * この関数は正しく機能しない可能性があります。
	 * 
	 * @param {number} rad z軸と成すラジアン単位の角
	 * 
	 * @returns {Vector3} 回転した後のベクトル
	 * 
	 * @throws 
	 * 引数が正しく設定されていない場合、TypeErrorを発生させます。
	 */
	getRotateZ(rad){
		let new_x=0,new_y=0,new_z=0
		if (typeof rad == "number") {
			new_x = this.x * (Math.cos(rad) - Math.sin(rad) + 0)
			new_y = this.y * (Math.sin(rad) - Math.cos(rad) + 0)
			new_z = this.z * (0 + 0 + 1)

		} else {
			throw new TypeError("Vector3.getRotateZ() arguments[0] should be number.")
		}
		return new Vector3(new_x,new_y,new_z)
	}
	
}