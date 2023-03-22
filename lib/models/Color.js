const pool = require('../utils/pool');

class Color {
  id;
  colorName;
  hexColor;

  // (taking SQL object (row) and turning it into JS object for this instance of the class(this))
  constructor(row) {
    this.id = row.id;
    this.colorName = row.color_name;
    this.hexColor = row.hex_color;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT *
    FROM colors
    WHERE id = $1
    `,
      [id]
    );
    if (!rows[0]) return;
    return new Color(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(`
        SELECT * FROM colors
        `);
    return rows.map((row) => new Color(row));
  }

  static async insert({ color_name, hex_color }) {
    const { rows } = await pool.query(
      `
    INSERT INTO colors (color_name, hex_color)
    VALUES ($1, $2)
    RETURNING *`,
      [color_name, hex_color]
    );
    return new Color(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const color = await Color.getById(id);
    if (!color) return null;
    const updatedData = { ...color, ...newAttrs };
    const { rows } = await pool.query(
      `
    UPDATE colors
    SET color_name = $2, hex_color = $3
    WHERE id = $1
    RETURNING *;
    `,
      [id, updatedData.colorName, updatedData.hexColor]
    );
    return new Color(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE from colors
        WHERE id = $1
        RETURNING *
        `,
      [id]
    );
    return new Color(rows[0]);
  }
}

module.exports = { Color };
