DROP TYPE IF EXISTS categ_produs;
DROP TYPE IF EXISTS tipuri_produs;
DROP TYPE IF EXISTS unitate_masura;

CREATE TYPE categ_produs AS ENUM( 'produse vegetale', 'ingrijire corp', 'ingrijire par', 'snacks', 'ghiduri', 'carti retete');
CREATE TYPE tipuri_produs AS ENUM('aliment', 'ingrijire', 'carti');
CREATE TYPE unitate_masura AS ENUM('grame', 'mililitrii', 'pagini');


CREATE TABLE IF NOT EXISTS produse (
   id serial PRIMARY KEY,
   nume VARCHAR(50) UNIQUE NOT NULL,
   descriere TEXT,
   pret NUMERIC(8,2) NOT NULL,
   cantitate INT NOT NULL CHECK (cantitate>0),   
   tip_produs tipuri_produs DEFAULT 'aliment',
   unit_masura unitate_masura DEFAULT 'grame',
   categorie categ_produs DEFAULT 'produse vegetale',
   ingrediente VARCHAR [], --pot sa nu fie specificare deci nu punem NOT NULL
   reducere BOOLEAN NOT NULL DEFAULT FALSE,
   cale_imagine VARCHAR(300),
   data_adaugare TIMESTAMP DEFAULT current_timestamp
);

INSERT into produse (nume, descriere, pret, cantitate, tip_produs, unit_masura, categorie, ingrediente, reducere, cale_imagine) VALUES 
('Pizza Bacon', 'Pizza cu alternativa la bacon vegana', 15 , 350, 'aliment', 'grame', 'produse vegetale', '{"faina","proteina din mazare","cascalav vegetal","sos de rosii", "ulei"}', False, 'Verdino-Pizza-Bacon.png'),

('Lapte migdale', 'Lapte bio de midgale', 9 , 1000, 'aliment', 'mililitrii', 'produse vegetale', '{"migdale","lapte de orez","agent de ingrosare","apa"}', True, 'rude-health-almond-drink-milk-1l.png'),

('Iaurt din caju', 'Iaurt bio din caju Filgud', 5 , 150, 'aliment', 'grame', 'snacks', '{"nuci caju","culturi lactice","arome naturale","apa"}', False, 'filgud-specialitate-bio-din-caju.png'),

('Chiftelute vegetale in sos bolognese ', 'Chiftelute vegetale in sos bolognese semipreparate', 20 , 350, 'aliment', 'grame', 'produse vegetale', '{"proteina din mazare","proteina din soia","sos de rosii", "ulei", "ceapa", "arome naturale"}', True, 'green-course-sos-bolognese-vegetal.png'),

('Fursecuri cu ovaz si chia', 'Fursecuri bio cu ovaz si chia', 12 , 125, 'aliment', 'grame', 'snacks', '{"faina de ovaz","chia","unt de cocos", "seminte de chia"}', True, 'vantastic-foods-fursecuri-cu-chia.png'),

('Deodorant solid stick vegan Sweet & Soft', 'Deodorant solid stick vegan Sweet & Soft We love the Planet', 15 , 65, 'ingrijire', 'grame', 'ingrijire corp', '{"amidon de porumb","ulei de cocos","ceara", "unt shea"}', False, 'we-love-the-planet-sticks-sweet-soft.png'),

('Crema cu unt de shea si rodie', 'Crema cu unt de shea si extract de rodie', 22 , 100, 'ingrijire', 'mililitrii', 'ingrijire corp', '{"unt de cocos","extract de rosie", "unt shea"}', False, 'eubiona-corp-unt-shea-cu-rodie-si-aloe-vera.png'),

('Crema de corp hidratanta cu probiotice', 'Crema de corp bio hidratanta cu probiotice', 30 , 50, 'ingrijire', 'mililitrii', 'ingrijire corp', '{"Apa","ulei de cocos","glicerina", "probiotice"}', True, 'crema-bio-hidratanta-cu-probotice-si-ulei-cocos.png'),

('Sampon solid pentru stralucire', 'Sampon vegan solid pentru stralucirea parului', 21 , 60, 'ingrijire', 'grame', 'ingrijire par', '{"apa","unt shea","sulfat de sodiu", "unt de cacao"}', False, 'sante-sampon-solid-pentru-stralucire-vegan.png'),

('Gel natural de stilizare a parului', 'Gel vegan natural de stilizare a parului', 18 , 50, 'ingrijire', 'mililitrii', 'ingrijire par', '{"sorbitol","acid citric","parfum", "extract mesteacan"}', True, 'sante-gel-styling-par.png'),

('Ghidul Eat Clean', 'Ghidul Eat Clean de Carmen Lipovan', 70 , 150, 'carti', 'pagini', 'ghiduri', '{}', False, 'EAT-CLEA-BY-CARMEN-LIPOVAN-COPERTA.png'),

('Studiul China: carte de bucate', 'Studiul China: carte de bucate – LeAnne Campbell', 40 , 75, 'carti', 'pagini', 'carti retete', '{}', True, 'studiul-china-carte-de-bucate.png');

