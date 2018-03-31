console.log("started")

const verifyHypothesis = (hypothesis, weightsNum) => {

	let hits = 0
	let curOne = -1
	
	const verify = (weights) => {
		
		for (let combination of hypothesis) {
			let sum = combination.reduce((a, cur) => a + weights[cur - 1], 0);
			if(sum > weightsNum)
				return false
		}
		return true
	}

	const permute = (arr, m = []) => {
		if (arr.length === 0) {
			if(m[0] != curOne && verify(m)) {
				hits++;
				curOne = m[0]

				if(hits == 2)
					return false
			}

		} else {
			for (let i = 0; i < arr.length; i++) {
					let curr = arr.slice();
					let next = curr.splice(i, 1);
					if(!permute(curr.slice(), m.concat(next)))
						return false
				}
		}
		return true
	}

	return permute([...Array(weightsNum).keys()].map(x => ++x))	
}

const combinations = function*(elements, length) {
  for (let i = 0; i < elements.length; i++) {
    if (length === 1) {
      yield [elements[i]]
    } else {
      let remaining = combinations(elements.slice(i + 1, elements.length), length - 1)
      for (let next of remaining) {
        yield [elements[i], ...next]
      }
    }
  }
}

const MAX_WEIGHT = 9

let template = []
for(let i = 2; i < MAX_WEIGHT - 2; i++)
	template.push(...Array.from(combinations([...Array(MAX_WEIGHT).keys()].map(x => ++x), i)))

template = template.filter(item => item.reduce((a, b) => a + b, 0) <= MAX_WEIGHT)
console.log(template)

let attepmts = Array.from(combinations(template, 4));
attepmts.reverse();

//console.log(attepmts)
console.log(attepmts.length)

var args = process.argv.slice(2);
var core = args[0]

console.log(verifyHypothesis([ [ 2, 7 ], [ 1, 2, 6 ], [ 1, 3, 4 ], [ 1, 3, 5 ] ], 9))

for(let k = 0; k < attepmts.length; k++) {

	let el = attepmts[k];

	if(k%1000 == 0) {
		console.log("iter: " + k + " len: " + el.length )
		console.log(el);
	}

	if(core && k%4 != core)
		continue

	if(verifyHypothesis(el, MAX_WEIGHT)) {
		console.log("SOLVED on iteration " + k)
		console.log(el);
		//break;
	}
}

