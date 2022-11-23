const pool = require('../utils/pool');

class Park {
  id;
  name;
  state;
  nationalPark;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.state = row.state;
    this.nationalPark = row.national_park;
  }

  static async insert({ name, state, national_park }) {
    const { rows } = await pool.query(
      `
    INSERT INTO parks (name, state, national_park)
    VALUES ($1, $2, $3)
    RETURNING *`,
      [name, state, national_park]
    );
    return new Park(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * FROM parks`);
    return rows.map((row) => new Park(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM parks
    WHERE id = $1`,
      [id]
    );
    return new Park(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const park = await Park.getById(id);
    if (!park) return null;
    const updatedPark = { ...park, ...newAttrs };
    const { rows } = await pool.query(
      `
    UPDATE parks
    SET name = $2, state = $3, national_park =$4
    WHERE id = $1
    RETURNING *`,
      [id, updatedPark.name, updatedPark.state, updatedPark.nationalPark]
    );
    return new Park(rows[0]);
  }
}

module.exports = { Park };
