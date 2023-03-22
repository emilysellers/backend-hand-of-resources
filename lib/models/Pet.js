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

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM pets 
    WHERE id = $1`,
      [id]
    );
    if (!rows[0]) return;
    return new Pet(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const pet = await Pet.getById(id);
    const updatedPet = { ...pet, ...newAttrs };
    const { rows } = await pool.query(
      `
    UPDATE pets
    SET name = $2, type = $3
    WHERE id = $1
    RETURNING *
    `,
      [id, updatedPet.name, updatedPet.type]
    );
    return new Pet(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM pets
    WHERE id = $1
    RETURNING *`,
      [id]
    );
    return new Pet(rows[0]);
  }
}

module.exports = { Pet };
