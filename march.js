
;(() => {

    function dec2bin(dec){
       return (dec >>> 0).toString(2);
    }

    function printSet(s) {
       var set = new Set()
       s.forEach((value) => { set.add(dec2bin(value))})
       console.log(set)
    }

    function genNeighbors(n, bits) {
       var mask = 1;
       var neigbors = new Set();
       for(var i = 0; i < bits; i++) {
           neigbors.add(n^mask)
           mask<<=1;
       }
       return neigbors
    }

    function leadingLen(set) {
        for(var i = 0; i < SOLUTION_LEN; i++)
            if(!set.has(i))
                return i;
        return SOLUTION_LEN;
    }


    function permutateLetter(solutionSrc, letterSrc, letterName) {

        iterations++;

        if((iterations%1000000) == 0)
            console.log("Iterations: " + iterations + " solutions: " + solutionsNum);

        if(!letterName || isVictory)
            return

        
        let best = [];
        
        let origLL = leadingLen(letterSrc)

        for(let i = 0; i < SOLUTION_LEN; i++) {
            if(!solutionSrc[i]) {
                let setI = new Set([...letterSrc, ...genNeighbors(i, SOLUTION_BITS)])
                setI.add(i)

                let leadLen = leadingLen(setI)

                if(leadLen > origLL) {
                    best.push({size: setI.size, i: i, set: setI, ll : leadLen*setI.size})                    
                }
            }
        }

        best = best.sort(function (a, b) {
            if (a.ll > b.ll) {
                return -1;
            }
            if (a.ll < b.ll) {
                return 1;
            }
            return 0;
        })

        best.forEach((el, bestIndex, bestArr) => {

            if(bestIndex && bestArr[bestIndex - 1].ll == el.ll) {
                return;
            }


            let solution = solutionSrc.slice()
            solution[el.i] = letterName
            let letter = el.set

            let lettersNum = solution.filter(i => i === letterName).length

            if(letter.size == SOLUTION_LEN) {
                if(lettersNum <= shortest[letterName]) {

                    if(letterName == 'O') {
                        
                        let uNum = 0;
                        letterU = new Set();
                        for(let i = 0; i < SOLUTION_LEN; i++) {
                           if(!solution[i] || solution[i] == 'U') {
                               letterU = new Set([...letterU, ...genNeighbors(i, SOLUTION_BITS)])
                               letterU.add(i)
                               solution[i] = 'U'
                               uNum++;
                           }
                        }

                        solutionsNum++;

                        if(letterU.size > bestUSet) {
                            bestUSet = letterU.size
                            console.log('Solution for ' + letterName + ": " + solution)
                            console.log('Remaining U num: ' + uNum + " set: " + letterU.size);
                        }

                        if(letterU.size == SOLUTION_LEN) {
                            console.log('Victory!')
                            isVictory = true;
                        }
                        return;
                    }


                    let keys = Object.keys(letters)
                    let nextIndex = keys.indexOf(letterName) + 1;
                    permutateLetter(solution, letters[keys[nextIndex]], keys[nextIndex])

                    return
                }
            }

            if(lettersNum < shortest[letterName])
                permutateLetter(solution, letter, letterName)
        })
    }


//  var SOLUTION_BITS = 3
//  var SOLUTION_LEN = 8
//  var letters = {A: new Set(), B : new Set(), C: new Set()}
   
    var SOLUTION_BITS = 6
    var SOLUTION_LEN = 64
    var letters = {A: new Set(), E : new Set(), I: new Set(), O: new Set(), U: new Set()}
    var shortest = {A: 12, E : 12, I: 12, O: 12, U: 16}

    var isVictory = false;
    var iterations = 0;
    var solutionsNum = 0;
    var solutions = new Set();

    var bestUSet = 0;

    var solution = []

    console.log("started")

/*
    var verify = ['A','E','E','O','E','U','I','A','I','I','U','A','O','O','U','A','O','U','A','I','I','U','O',
        'E','E','U','U','U','A','O','I','E','U','O','A','U','U','I','U','O','I','U','O','E','A','E','E','I','E',
        'A','I','I','O','A','U','E','E','A','O','O','U','I','A','U'];

    for(let i = 0; i < SOLUTION_LEN; i++) {
       letters[verify[i]] = new Set([...letters[verify[i]], ...genNeighbors(i, SOLUTION_BITS)])
       letters[verify[i]].add(i)
    }

    printSet(letters['A'])

    console.log(letters)
    console.log(verify.join(''))
*/

/*
    // seed
    Object.keys(letters).map(function(letter, index) {        
        let i = 1 << index

        //console.log(dec2bin(i))
        solution[i] = letter
        letters[letter] = new Set([...letters[letter], ...genNeighbors(i, SOLUTION_BITS)])
        letters[letter].add(i)


        let j = i;
        for(var k = 0; k < SOLUTION_BITS; k++)
            j^=(1 << k)

        //console.log(dec2bin(j))
        solution[j] = letter
        letters[letter] = new Set([...letters[letter], ...genNeighbors(j, SOLUTION_BITS)])
        letters[letter].add(j)

    })

    console.log(letters)
    console.log("Seeded: " + solution)
*/

    permutateLetter(solution, letters['A'], 'A')

    console.log(letters)
    console.log(solution)
    console.log("finished")
    
})()