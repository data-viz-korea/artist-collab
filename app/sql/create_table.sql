CREATE DATABASE IF NOT EXISTS artist_collab;

CREATE TABLE IF NOT EXISTS song  (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100),
    rank_min INTEGER,
    rank_mean5 DOUBLE PRECISION,
    rank_mean DOUBLE PRECISION,
    rank_median DOUBLE PRECISION,
    weeks_on_chart DOUBLE PRECISION,
    week_min TIMESTAMP,
    week_max TIMESTAMP,
    applemusic_url VARCHAR(200),
    spotify_url VARCHAR(200),
    youtube_url VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS artist (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100),
    week_min TIMESTAMP,
    week_max TIMESTAMP,
    weeks_on_chart_total INTEGER,
    weeks_on_chart_longest DOUBLE PRECISION,
    weeks_on_chart_mean DOUBLE PRECISION,
    rank_min INTEGER,
    rank_mean5 DOUBLE PRECISION,
    rank_mean DOUBLE PRECISION,
    rank_median DOUBLE PRECISION,
    rank_min_mean5 DOUBLE PRECISION,
    rank_min_mean DOUBLE PRECISION,
    rank_min_median DOUBLE PRECISION,
    num_songs INTEGER,
    y_min DOUBLE PRECISION,
    y_max DOUBLE PRECISION,
    photo_url VARCHAR(200),
    wiki_url VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS collaborate (
    id SERIAL PRIMARY KEY,
    artist_id INTEGER,
    song_id INTEGER,
    FOREIGN KEY(artist_id) REFERENCES artist(id),
    FOREIGN KEY(song_id) REFERENCES song(id)
)
