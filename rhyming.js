const RiTa = require('rita')
const fs = require('fs')

const inputFile = process.argv[2] // typeof is always string

const output = process.argv[3] || 'console'

const makeWordLists = (wordString) => {
    const words= RiTa.tokenize(wordString)

    let verbs= []
    let nouns = []
    let adjectives = []
    let adverbs = []
    let other = []
    for (let i = 0; i < words.length; i++ ) {
        if (RiTa.isVerb(words[i])) {
            verbs.push(words[i])
        } else if (RiTa.isNoun(words[i])) {
            nouns.push(words[i])
        } else if (RiTa.isAdjective(words[i])) {
            adjectives.push(words[i])
        } else if (RiTa.isAdverb(words[i])) {
            adverbs.push(words[i]) 
        } else if (!RiTa.isPunctuation(words[i])) {
            other.push(words[i])
        }
    }

    return {
        verbs: verbs,
        nouns: nouns,
        adjectives: adjectives,
        adverbs: adverbs,
        other: other,
    }
}

// TODO: generate rhyming grammar from output of makeWordLists function

fs.lstat(inputFile, (err,stats) => {
    if (!stats.isFile()) {
      console.log("Error: invalid file path.")
      return 
    }
    fs.readFile(inputFile, 'utf8', (err, data) => {
     
     const result = makeWordLists(data)
     console.log(RiTa.similarBySound("hello"))
     if (output !== 'console') {
       fs.writeFile(output, result, (err) => {
         if (err) throw err;
         console.log('File created!');
        })
     } else {
       console.log(result)
     }
    })
   })