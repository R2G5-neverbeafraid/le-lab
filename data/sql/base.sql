-- Le Lab : base de démonstration Peer-Learning (SQLite)
-- Elle est recréée à chaque exécution : tu peux tout casser sans risque.

CREATE TABLE etudiants (
  id      INTEGER PRIMARY KEY,
  nom     TEXT    NOT NULL,
  promo   TEXT    NOT NULL,
  credits INTEGER NOT NULL
);

CREATE TABLE tuteurs (
  id      INTEGER PRIMARY KEY,
  nom     TEXT NOT NULL,
  matiere TEXT NOT NULL,
  etoiles REAL NOT NULL
);

CREATE TABLE seances (
  id          INTEGER PRIMARY KEY,
  etudiant_id INTEGER NOT NULL REFERENCES etudiants(id),
  tuteur_id   INTEGER NOT NULL REFERENCES tuteurs(id),
  duree       INTEGER NOT NULL   -- en minutes
);

INSERT INTO etudiants (id, nom, promo, credits) VALUES
  (1, 'Rahel', 'L1', 48),
  (2, 'Grace', 'L1', 60),
  (3, 'Jonathan', 'L2', 55),
  (4, 'Merveille', 'L1', 30),
  (5, 'Christian', 'L2', 60),
  (6, 'Divine', 'L3', 52);

INSERT INTO tuteurs (id, nom, matiere, etoiles) VALUES
  (1, 'Prisca', 'Python', 4.8),
  (2, 'Joël', 'CSS', 4.5),
  (3, 'Naomie', 'SQL', 4.9),
  (4, 'Fiston', 'JavaScript', 4.2),
  (5, 'Bénédicte', 'PHP', 4.6);

INSERT INTO seances (id, etudiant_id, tuteur_id, duree) VALUES
  (1, 1, 1, 60),
  (2, 1, 3, 45),
  (3, 4, 2, 30),
  (4, 2, 4, 90),
  (5, 3, 1, 60);
