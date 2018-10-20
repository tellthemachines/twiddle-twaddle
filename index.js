const RiTa = require('rita')
const fs = require('fs')

const inputFile = process.argv[2] // typeof is always string

const output = process.argv[3] || 'console'

const markov = new RiTa.RiMarkov(3)

/* RiTa sentence generator chokes on raw chatlogs because
there's usually no punctuation or caps, and sentences are separated by newlines.
We replace newlines with full stops and capitalize the first letter of every "sentence"
*/
const cleanText = (text) => {
  const textArray = text.split(/\n+/)
  let formattedArray = []
  for (let i = 0; i < textArray.length; i++ ) {
    formattedArray.push(textArray[i].charAt(0).toUpperCase() + textArray[i].slice(1))
  }
  return formattedArray.join('. ')
}

fs.lstat(inputFile, (err,stats) => {
 if (!stats.isFile()) {
   console.log("Error: invalid file path.")
   return 
 }
 fs.readFile(inputFile, 'utf8', (err, data) => {
  markov.loadText(cleanText(data))
  /* Re-format as a chatlog, with new lines at each sentence break.
  Also remove redundant full stops.
  */
  const result = markov.generateSentences(20).join('\n').replace(/\'/g, `'`).replace(/(\.|\?|!)\./g, '$1')
  
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


