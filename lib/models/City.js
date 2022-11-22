const pool = require('../utils/pool');

class City {
  id;
  cityName;
  country;

  constructor(row) {
    this.id = row.id;
    this.cityName = row.city_name;
    this.country = row.country;
  }

  static async insert({ city_name, country }) {
    const { rows } = await pool.query(
      `
        INSERT INTO cities (city_name, country)
            VALUES ($1, $2)
            RETURNING *`,
      [city_name, country]
    );
    return new City(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const city = await City.getById(id);
    if (!city) return null;
    const updatedCity = { ...city, ...newAttrs };
    const { rows } = await pool.query(
      `
    UPDATE cities
    SET city_name = $2, country =$3
    WHERE id =$1
    RETURNING *;
    `,
      [id, updatedCity.cityName, updatedCity.country]
    );
    return new City(rows[0]);
  }
  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT *
    FROM cities
    WHERE id = $1`,
      [id]
    );
    if (!rows[0]) return;
    return new City(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT *
    FROM cities`);
    return rows.map((row) => new City(row));
  }
}

module.exports = { City };
