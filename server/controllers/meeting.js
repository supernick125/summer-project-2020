const pool = require('../db/');

const getMeetings = async (req, res) => {
  try {
    const meetings = await pool.query(
      'SELECT * FROM MEETINGS ORDER BY meeting_id ASC'
    )
  } catch (error) {
    return res.status(500).json({ message: 'There was an error while searching. Please try again later.'})
  }
}

module.exports = {
  getMeetings
}
