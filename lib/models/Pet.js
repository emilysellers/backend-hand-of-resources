const pool = require('../utils/pool');

class Pet {
  name;
  type;

  constructor(row) {
    this.name = row.name;
    this.type = row.type;
  }

  static async insert({ name, type }) {
    const { rows } = await pool.query(
      `
    INSERT INTO pets
    (name, type)
    VALUES ($1, $2)
    RETURNING *`,
      [name, type]
    );
    return new Pet(rows[0]);
  }
}

module.exports = { Pet };
