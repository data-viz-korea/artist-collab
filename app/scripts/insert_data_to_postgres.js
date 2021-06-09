const { Pool } = require('pg')
const pool = new Pool({
    host: 'localhost',
    database: 'artist_collab',
    port: 5432
});

const getCollaborateData = () => {
    const songJson = require('./data/songs_table.json');
    const data = songJson.data;
    const result = [];
    data.forEach(d => {
        const collaborators_id = d.collaborators_id;
        collaborators_id.forEach(c => {
            const text =
              `INSERT INTO collaborate(
                artist_id, 
                song_id
                ) VALUES($1, $2)`;
            const values = [c, d.index];
            result.push({
                sql: text,
                value: values
            });
        });
    });
    return result;
};

const getSongData = () => {
    const songJson = require('./data/songs_table.json');
    const data = songJson.data;
    const result = data.map((d, idx) => {
        const text =
          `INSERT INTO song(
            id, 
            name, 
            rank_min, 
            rank_mean5, 
            rank_mean, 
            rank_median, 
            weeks_on_chart, 
            week_min, 
            week_max
            ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
        const values = [d.index, d.song_name, d.rank_min, d.rank_mean5, d.rank_mean,
            d.rank_median, d.weeks_on_chart, d.week_min, d.week_max];

        return {
            sql: text,
            value: values
        };
    });
    return result;
}

const getArtistData = () => {
    const artistJson = require('./data/artists_table.json');
    const data = artistJson.data;
    const result = data.map(d => {
        const text =
          `INSERT INTO artist(
            id, 
            name, 
            week_min,
            week_max,
            weeks_on_chart_total, 
            weeks_on_chart_longest, 
            weeks_on_chart_mean, 
            rank_min, 
            rank_mean5, 
            rank_mean, 
            rank_median,
            rank_min_mean,
            rank_min_mean5,
            rank_min_median,
            num_songs,
            y_min,
            y_max 
        ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`;
        const values = [d.index, d.artist_name, d.week_min, d.week_max, d.weeks_on_chart_total,
            d.weeks_on_chart_longest, d.weeks_on_chart_mean, d.rank_min, d.rank_mean5, d.rank_mean,
            d.rank_median, d.rank_min_mean, d.rank_min_mean5, d.rank_min_median, d.num_songs,
            d.y_min, d.y_max];

        return {
            sql: text,
            value: values
        };
    });
    return result;
}

const insertData = async (data) => {
    const client = await pool.connect()

    try {
        const res = await client.query(data.sql, data.value)
        // console.log(res.rows[0])
    } finally {
        client.release()
    }
}

(async () => {
    /*
    console.log('Start to insert artist data');
    const artistData = getArtistData();
    for (const d of artistData) {
        await insertData(d);
    }
    console.log(`Finish artist data >>> ${artistData.length}`);

    console.log('Start to insert song data');
    const songData = getSongData();
    for (const d of songData) {
        await insertData(d);
    }
    console.log(`Finish song data >>> ${songData.length}`);
    */

    console.log('Start to insert collaborate data');
    const collaborateData = getCollaborateData();
    for (const d of collaborateData) {
        await insertData(d);
    }
    console.log(`Finish collaborate data >>> ${collaborateData.length}`);

    await pool.end();
})().catch(err => console.log(err))