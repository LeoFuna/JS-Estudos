const { readFile } = require('fs/promises');
const { error } = require('./constants');
const User = require('./user')

const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age']
}

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);
    const validation = File.isValid(content);
    if (!validation.isValid) throw new Error(validation.error);

    const users = File.parseCSVToJSON(content);
    return users;
  }

  static async getFileContent(filePath) {
    const fileBuffer = await readFile(filePath);
    return fileBuffer.toString('utf8');
  }

  static isValid(csvString, options = DEFAULT_OPTION) {
    const [header, ...fileData] = csvString.split('\n');
    const isHeaderValid = header === options.fields.join(',');
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        isValid: false
      }
    }

    const isContentLengthAccepted = (
      fileData.length > 0 &&
      fileData.length <= options.maxLines
    )
    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        isValid: false
      }
    }

    return { isValid: true }
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split('\n')
    const firstLine = lines.shift();
    const header = firstLine.split(',')
    const users = lines.map(line => {
      const columns = line.split(',')
      let user = {}
      for (const index in columns) {
        user[header[index]] = columns[index]
      }
      return new User(user)
    })
    return users
  }
}

module.exports = File;