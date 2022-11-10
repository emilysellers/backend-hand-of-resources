const pool = require('../utils/pool');

class Color {
  id;
  color_name;
  hex_color;

  // (taking SQL object (row) and turning it into JS object for this instance of the class(this))
  constructor(row) {
    this.id = row.id;
    this.colorName = row.color_name;
    this.hexColor = row.hex_color;
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
}

module.exports = { Color };