const { readFile } = require('fs/promises');
// É a ideia de uma classe abstrata, onde ela precisa ser implementada em outra classe concreta
class BaseRepository {
  constructor({ file }) {
    this.file = file;
  }

  async find(itemId) {
    const content = JSON.parse(await readFile(this.file));
    if (!itemId) return content;

    return content.find(({ id }) => id === itemId)
  }
}

module.exports = BaseRepository;