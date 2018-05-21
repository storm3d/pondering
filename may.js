/*
	Example:

   	A B C D E F G

   	ADE-BCG
	AG-BE
	AC-DG

*/

const verifySolution = (solution, hypotheses) => {

	let signSet = new Set()

	for(let hypothesis of hypotheses) {
		let signs = verifyHypothesis(solution, hypothesis)
		if(signSet.has(signs))
			return false

		signSet.add(signs)
	}

	//console.log(signSet)
	return true
}

const verifyHypothesis = (solution, hypothesis) => {

	//console.log(hypothesis)

	let signs = ''
	for (let eq of solution) {
		let left = 0
		let right = 0

		for(let i = 0; i < eq[0].length; i++)
			for(let l of hypothesis)
				if(eq[0][i] == l)
					left--;

		for(let i = 0; i < eq[1].length; i++)
			for(let l of hypothesis)
				if(eq[1][i] == l)
					right--;
		
		//console.log(eq)
		//console.log(`${left} ${right}`)

		signs+=left < right ? '<' : left  > right ? '>' : '='
	}
	return signs
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

console.log("started")

/*
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
const solution = [['ADE', 'BCG'],
					['AG', 'BE'],
					['AC', 'DG']]

const solutionBasis = ['ADE', 'BCG']
*/


const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
const solution = [ [ 'ABCDE', 'FGHIJ' ],
  [ 'ABF', 'CDG' ],
  [ 'ACH', 'EIJ' ],
  [ 'BGI', 'DFJ' ] ]
const solutionBasis = ['ABCDE', 'FGHIJ']

let hypotheses = []

for(let i = 0; i < letters.length; i++)
	for(let j = i + 1; j < letters.length; j++)
		hypotheses.push([letters[i], letters[j]])

console.log(verifySolution(solution, hypotheses))

let template = []
for(let i = 3; i > 2; i--)
	template.push(...Array.from(combinations(letters.slice(0, -1), i)).map(x => x.join('')))

let pairs = []
for(let first of template) {
	for(let second of template) {
		if(first.length != second.length)
			continue

		if(first > second)
			continue

		let nope = false
		for(let i = 0; i < first.length && !nope; i++)
			for(let j = 0; j < second.length; j++)
				if(first[i] === second[j]) {
					nope = true
					break
				}
		if(nope)
			continue

		pairs.push([first, second])
	}
}

let iter = 0
let citer = 0
let iterator = combinations([...Array(pairs.length).keys()], 3)
for(let v of iterator) {
	
	iter++ 		
	let solution = [solutionBasis]
	let p1 = pairs[v[0]]
	let p2 = pairs[v[1]]
	let p3 = pairs[v[2]]

	if(p1[0] == p2[0] || p1[0] == p2[1] || p1[0] == p3[0] || p1[0] == p3[1] 
		|| p1[1] == p2[0] || p1[1] == p2[1] || p1[1] == p3[0] || p1[1] == p3[1]
		|| p2[0] == p3[0] || p2[0] == p3[1] 
		|| p2[1] == p3[0] || p2[1] == p3[1])
		continue

	solution.push(p1);
	solution.push(p2);
	solution.push(p3);


	if(verifySolution(solution, hypotheses)) {
		console.log(solution)
		console.log("SOLVED")
		break
	}

	if(iter%1000000 == 0) {
		console.log(iter + " " + citer + " " + iter/1541295700 )
		console.log(solution)
	}
	
	citer++
}

console.log(iter + " " + citer)

