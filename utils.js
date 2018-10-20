const fs = require('fs')

const inputFile = process.argv[2]

const platform = process.argv[3]

// for previous version of logs where dates and names are separate
const removeHangoutDates = (text) => {
  return text.replace(/[a-zA-Z]+,\s[0-9]+\s[a-zA-Z]+\s[0-9]+\s[0-9:]+/g, '')
}

const removeHangoutsFormatting = (text) => {
  return text.replace(/[a-zA-Z\s]+\s-\s\d\d:\d\d/g, '')
}

const removeWhatsAppFormatting = (text) => {
  return text.replace(/[\d\/]+,\s[\d:]+\s-\s[a-zA-Z\s']+:?/g, '').replace(/<Media omitted>/g,'')
}

fs.lstat(inputFile, (err,stats) => {
  if (!stats.isFile()) {
    console.log("Error: invalid file path.")
    return 
  }
  fs.readFile(inputFile, 'utf8', (err, data) => {
    let cleanText
    if (platform === 'hangouts') {
      cleanText = removeHangoutsFormatting(data)
    } else if (platform === 'whatsapp') {
      cleanText = removeWhatsAppFormatting(data)
    }    
   fs.writeFile(`clean-${inputFile}`, cleanText, (err) => {
    if (err) throw err;
    console.log('File created!');
   })
  })
 })