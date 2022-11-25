const pool = require('../utils/pool');

class Shark {
  id;
  commonName;
  distinctiveFeature;
  lengthFt;

  constructor(row) {
    this.id = row.id;
    this.commonName = row.common_name;
    this.distinctiveFeature = row.distinctive_feature;
    this.lengthFt = row.length_ft;
  }
  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM sharks 
    WHERE id = $1`,
      [id]
    );
    if (!rows[0]) return;
    return new Shark(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * FROM sharks`);
    return rows.map((row) => new Shark(row));
  }

  static async insert({ common_name, distinctive_feature, length_ft }) {
    const { rows } = await pool.query(
      `
    INSERT INTO sharks (common_name, distinctive_feature, length_ft)
    VALUES ($1, $2, $3)
    RETURNING *`,
      [common_name, distinctive_feature, length_ft]
    );
    return new Shark(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const shark = await Shark.getById(id);
    if (!shark) return null;
    const updatedShark = { ...shark, ...newAttrs };
    const { rows } = await pool.query(
      `
    UPDATE sharks
    SET common_name = $2
    WHERE id = $1
    RETURNING *;
    `,
      [id, updatedShark.commonName]
    );
    return new Shark(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE from sharks
        WHERE id = $1
        RETURNING *
        `,
      [id]
    );
    return new Shark(rows[0]);
  }
}

module.exports = { Shark };
