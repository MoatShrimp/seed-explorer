//Copy of the Unity's .Random class
class Random {

	seed: number[];

	constructor(firstSeed = 51113926) {		
		/*Info: the three pseudo-seeds in Unity are generated from: 
		  [uint seed = (uint)(1812433253 * (uint)previousSeed + 1)]*/
		
		//splitting 1812433253 into two factors to stay under Number.MAX_SAFE_INTEGER during multiplication
		firstSeed = toUInt32(firstSeed);
		const nextSeed = (seed:number):number => toUInt32(1289 * toUInt32(1406077 * seed) + 1);
		
		const secondSeed = nextSeed(firstSeed),
			  thirdSeed = nextSeed(secondSeed);
			
		this.seed = [
			firstSeed,
			secondSeed,
			thirdSeed,
			nextSeed(thirdSeed)//fourthSeed
		];
	}

	//get, set seed array
	get state() {
		return [...this.seed];
	}
	set state(oldState) {
		this.seed = [...oldState];
	}
	
	//next random int based on xorshift128
	get nextInt():number {
		return this.nextUInt % 0x7FFFFFFF; //mod Int.MaxValue
	}	 
	//alias for nextInt
	get next():number { 
		return this.nextInt;
	} 
	
	//return a float between 0.0 and 1.0, not matching Unity
	get value():number {
		return 1 - this.rangeFloat();
	}	
	
	//next random uint based on xorshift128
	get nextUInt():number {
		let x = this.seed.shift(); //drops first value in array and retuns value
		let y = this.seed[2];

		x ^= x << 11;
		x ^= x >>> 8;
		
		y ^= y >>> 19;
		y = toUInt32(y ^ x);
		
		this.seed.push(y);
		return y;
	}
	
	getWeight (table) {
		return table.reduce((totalWeight, currentItem) => totalWeight + currentItem.weight, 0);
	}

	getItem (table, masterTable, randomNum) {
	   return masterTable.relic[table.find((currentItem) => ((randomNum -= currentItem.weight) <= 0)).masterIndex].display
	}

	//return uint between min and max
	range (min = 0, max = 2) {
		if (max < min){ 
			[min, max] = [max, min];
		}		
		return this.nextUInt % (max - min) + min;
	}
	
	//return float between min and max, not matching Unity in output
	rangeFloat (min = 0, max = 1) {
		if (max < min){
			[min, max] = [max, min];
		}
		return (max - min) * (toUInt32(this.nextUInt << 9) / 0xFFFFFFFF) + min;
	}

	//Copy of rangeInclusive from Undermine
	rangeInclusive(min:number, max:number) {
		return this.range(min, max + 1);
	}	 
	
	//Item picker based on Undermines thor.rand() class
	getWeightedElement (table: Array<any>) {	 
		let output = 0;
		let totalWeight = table.reduce((totalWeight, currentItem) => totalWeight + currentItem.weight, 0);
		let randWeight = this.rangeInclusive(1, totalWeight);
		try {output = table.find((currentItem) => ((randWeight -= currentItem.weight) <= 0)).masterIndex;}
		catch {output = 156}
		return output

	}
	//alias for getWeightedElement
	loot (table) {
		return this.getWeightedElement(table);
	}
	
	//Item picker based on Undermines thor.rand() class
	getWeightedTable (table: Array<any>) {			
		let totalWeight = table.reduce((totalWeight, currentItem) => totalWeight + currentItem.weight, 0);
		let randWeight = this.rangeInclusive(1, totalWeight);
		
		return table.find((currentItem) => ((randWeight -= currentItem.weight) <= 0));

	}
}