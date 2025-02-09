const { Client } = require('pg');
require('dotenv').config();

const SQL = `CREATE TABLE IF NOT EXISTS games (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, game VARCHAR(255), genre VARCHAR(255), developer VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS developers (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, game_id VARCHAR(255), developer VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS genres (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, game_id VARCHAR(255), genre VARCHAR(255)
);

INSERT INTO games (game, genre, developer)
VALUES
    ('Pokemon Soul Silver', 'RPG', 'Nintendo'),
    ('Minecraft', 'Survival', 'Mojang'),
    ('Fortnite', 'Battle Royale', 'Epic Games'),
    ('Dark Souls III', 'Soulslike', 'FromSoftware'),
    ('Apex Legends', 'Battle Royale', 'Respawn Entertainment'),
    ('Overwatch', 'FPS', 'Blizzard Entertainment'),
    ('Bloodborne', 'Soulslike', 'FromSoftware'),
    ('Super Mario Odyssey', '3D Platformer', 'Nintendo'),
    ('World of Warcraft', 'MMORPG', 'Blizzard Entertainment'),
    ('Unreal Tournament 4', 'FPS', 'Epic Games'),
    ('The Witcher', 'Action RPG', 'CD Projekt Red'),
    ('CS:GO', 'FPS', 'Valve'),
    ('Left 4 Dead 2', 'Survival Horror', 'Valve'),
    ('Gears of War 2', 'Third-Person Shooter', 'Valve'),
    ('Super-Mario Galaxy', '3D Platformer', 'Nintendo');

INSERT INTO genres (game_id, genre)
VALUES
    (1, 'RPG'),
    (2, 'Survival'),
    (3, 'Battle Royale'),
    (4, 'Soulslike'),
    (5, 'Battle Royale'),
    (6, 'FPS'),
    (7, 'Soulslike'),
    (8, '3D Platformer'),
    (9, 'MMORPG'),
    (10, 'FPS'),
    (11, 'Action RPG'),
    (12, 'FPS'),
    (13, 'Survival Horror'),
    (14, 'Third-Person Shoter'),
    (15, '3D Platformer');

INSERT INTO developers (game_id, developer)
VALUES
    (1, 'Nintendo'),
    (2, 'Mojang'),
    (3, 'Epic Games'),
    (4, 'FromSoftware'),
    (5, 'Respawn Entertainment'),
    (6, 'Blizzard Entertainment'),
    (7, 'FromSoftware'),
    (8, 'Respawn Entertainment'),
    (9, 'Blizzard Entertainment'),
    (10, 'Epic Games'),
    (11, 'CD Projekt Red'),
    (12, 'Valve'),
    (13, 'Valve'),
    (14, 'Valve'),
    (15, 'Nintendo');
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.env.CONNECTIONSTRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
