const pool = require('../utils/pool');

class Pet {
  id;
  name;
  type;

  constructor(row) {
    this.id = row.id;
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

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * FROM pets`);
    return rows.map((row) => new Pet(row));
  }
}

module.exports = { Pet };
