PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS Configuracao_Risco;
DROP TABLE IF EXISTS Alerta;
DROP TABLE IF EXISTS Intervencao;
DROP TABLE IF EXISTS Ocorrencia;
DROP TABLE IF EXISTS Nota;
DROP TABLE IF EXISTS Frequencia;
DROP TABLE IF EXISTS Aluno;
DROP TABLE IF EXISTS Turma;
DROP TABLE IF EXISTS Disciplina;
DROP TABLE IF EXISTS Curso;
DROP TABLE IF EXISTS Responsavel;
DROP TABLE IF EXISTS Usuario;
DROP TABLE IF EXISTS Perfil;

CREATE TABLE Perfil (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL CHECK(length(trim(nome)) > 0)
);

CREATE TABLE Usuario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL CHECK(length(trim(nome)) > 0),
  email TEXT NOT NULL UNIQUE CHECK(length(trim(email)) > 0),
  senha_hash TEXT NOT NULL CHECK(length(trim(senha_hash)) > 0),
  perfil_id INTEGER NOT NULL,
  FOREIGN KEY (perfil_id) REFERENCES Perfil(id)
);

CREATE TABLE Responsavel (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL CHECK(length(trim(nome)) > 0),
  telefone TEXT,
  email TEXT
);

CREATE TABLE Curso (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL CHECK(length(trim(nome)) > 0)
);

CREATE TABLE Turma (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL CHECK(length(trim(nome)) > 0),
  ano_letivo INTEGER,
  curso_id INTEGER NOT NULL,
  FOREIGN KEY (curso_id) REFERENCES Curso(id)
);

CREATE TABLE Aluno (
  id_aluno INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL CHECK(length(trim(nome)) > 0),
  matricula TEXT NOT NULL UNIQUE CHECK(length(trim(matricula)) > 0),
  turma_id INTEGER NOT NULL,
  responsavel_id INTEGER NOT NULL,
  FOREIGN KEY (turma_id) REFERENCES Turma(id),
  FOREIGN KEY (responsavel_id) REFERENCES Responsavel(id)
);

CREATE TABLE Disciplina (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL CHECK(length(trim(nome)) > 0)
);

CREATE TABLE Frequencia (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_aluno INTEGER NOT NULL,
  id_turma INTEGER NOT NULL,
  data DATE NOT NULL,
  presente BOOLEAN NOT NULL CHECK(presente IN (0,1)),
  falta_justificada BOOLEAN NOT NULL DEFAULT 0 CHECK(falta_justificada IN (0,1)),
  FOREIGN KEY (id_aluno) REFERENCES Aluno(id_aluno),
  FOREIGN KEY (id_turma) REFERENCES Turma(id)
);

CREATE TABLE Nota (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  aluno_id INTEGER NOT NULL,
  disciplina_id INTEGER NOT NULL,
  valor REAL NOT NULL CHECK(valor >= 0),
  periodo TEXT,
  FOREIGN KEY (aluno_id) REFERENCES Aluno(id_aluno),
  FOREIGN KEY (disciplina_id) REFERENCES Disciplina(id)
);

CREATE TABLE Ocorrencia (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  aluno_id INTEGER NOT NULL,
  usuario_id INTEGER NOT NULL,
  data DATE NOT NULL,
  tipo TEXT,
  descricao TEXT NOT NULL CHECK(length(trim(descricao)) > 0),
  FOREIGN KEY (aluno_id) REFERENCES Aluno(id_aluno),
  FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

CREATE TABLE Intervencao (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  aluno_id INTEGER NOT NULL,
  usuario_id INTEGER NOT NULL,
  data DATE NOT NULL,
  descricao TEXT NOT NULL CHECK(length(trim(descricao)) > 0),
  status TEXT CHECK(status IN ('planejada', 'em andamento', 'concluída')),
  resultado_esperado TEXT,
  FOREIGN KEY (aluno_id) REFERENCES Aluno(id_aluno),
  FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

CREATE TABLE Alerta (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  aluno_id INTEGER NOT NULL,
  data_geracao DATETIME DEFAULT CURRENT_TIMESTAMP,
  motivo TEXT NOT NULL CHECK(length(trim(motivo)) > 0),
  lido BOOLEAN NOT NULL DEFAULT 0 CHECK(lido IN (0,1)),
  FOREIGN KEY (aluno_id) REFERENCES Aluno(id_aluno)
);

CREATE TABLE Configuracao_Risco (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  parametro TEXT NOT NULL UNIQUE CHECK(length(trim(parametro)) > 0),
  valor REAL NOT NULL,
  descricao TEXT
);

INSERT INTO Perfil (nome) VALUES
  ('Gestor'),
  ('Coordenador'),
  ('Professor'),
  ('Assistente Social');

INSERT INTO Usuario (nome, email, senha_hash, perfil_id) VALUES
  ('Gestor Administrativo', 'gestor@sime.local', 'hash_demo_gestor', 1),
  ('Coordenador Pedagógico', 'coordenador@sime.local', 'hash_demo_coord', 2),
  ('Professor de Matemática', 'professor@sime.local', 'hash_demo_prof', 3),
  ('Assistente Social', 'social@sime.local', 'hash_demo_social', 4);

INSERT INTO Responsavel (nome, telefone, email) VALUES
  ('Maria da Silva', '(11) 90000-0001', 'maria.silva@email.com'),
  ('José Oliveira', '(11) 90000-0002', 'jose.oliveira@email.com'),
  ('Ana Souza', '(11) 90000-0003', 'ana.souza@email.com');

INSERT INTO Curso (nome) VALUES
  ('Ensino Médio'),
  ('Técnico em Informática');

INSERT INTO Turma (nome, ano_letivo, curso_id) VALUES
  ('1A', 2026, 1),
  ('2B', 2026, 2);

INSERT INTO Aluno (nome, matricula, turma_id, responsavel_id) VALUES
  ('João Silva', '20260001', 1, 1),
  ('Maria Oliveira', '20260002', 1, 2),
  ('Pedro Souza', '20260003', 2, 3);

INSERT INTO Disciplina (nome) VALUES
  ('Matemática'),
  ('Português'),
  ('História');

INSERT INTO Frequencia (id_aluno, id_turma, data, presente, falta_justificada) VALUES
  (1, 1, '2026-08-01', 1, 0),
  (1, 1, '2026-08-02', 0, 0),
  (2, 1, '2026-08-01', 1, 0),
  (3, 2, '2026-08-01', 1, 0);

INSERT INTO Nota (aluno_id, disciplina_id, valor, periodo) VALUES
  (1, 1, 6.5, '1º Bimestre'),
  (1, 2, 7.2, '1º Bimestre'),
  (2, 1, 5.8, '1º Bimestre'),
  (3, 1, 8.0, '1º Bimestre');

INSERT INTO Ocorrencia (aluno_id, usuario_id, data, tipo, descricao) VALUES
  (2, 2, '2026-08-03', 'Atenção', 'Baixa frequência observada em duas semanas.');

INSERT INTO Intervencao (aluno_id, usuario_id, data, descricao, status, resultado_esperado) VALUES
  (2, 4, '2026-08-04', 'Contato com a família e acompanhamento da frequência', 'planejada', 'Melhorar a presença escolar');

INSERT INTO Alerta (aluno_id, data_geracao, motivo, lido) VALUES
  (2, CURRENT_TIMESTAMP, '5 faltas consecutivas injustificadas', 0);

INSERT INTO Configuracao_Risco (parametro, valor, descricao) VALUES
  ('limite_faltas_consecutivas', 5.0, 'Limite de faltas consecutivas para alerta'),
  ('nota_minima', 6.0, 'Nota mínima considerada para risco pedagógico');
