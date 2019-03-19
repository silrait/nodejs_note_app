const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
  return "To implement"
}

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNotes = notes.filter( (note) => note.title === title )

  if(duplicateNotes.length === 0){
    notes.push({
      title: title,
      body: body    
    })
  
    saveNotes(notes);
    console.log( chalk.green.inverse('New note added!'))
  } else {
    console.log( chalk.red.inverse('Note title taken!'))
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const removeNote = (title) => {
  const notes = loadNotes()  
  const notesToKeep = notes.filter( (note) => note.title !== title )
  
  console.log( (notesToKeep.length !== notes.length)? chalk.green.inverse('Note removed!') : chalk.red.inverse('No note found!') )

  saveNotes(notesToKeep)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (error) {
    return []
  }
}

const listNotes = () => {
  console.log(chalk.white.inverse("Notes List!"))
  console.log()

  const notes = loadNotes()
  notes.forEach(note => {
    console.log(note.title)
  })
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes
}
