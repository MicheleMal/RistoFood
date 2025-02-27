# API per la Gestione degli Ordini di un Locale

Questa API permette la gestione degli ordini e dei piatti del menu in un locale (ristorante, bar, etc.). È progettata per essere utilizzata da due ruoli principali:

- **Admin**: Gestisce il menu, gli ordini e visualizza le statistiche.
- **Staff**: Gestisce gli ordini senza la possibilità di gestire il menu o visualizzare le statistiche.

## Funzionalità principali

### Ruolo: Admin

L'Admin ha il controllo completo sul sistema. Le sue funzionalità includono:

- **Gestione Menu**:
  - Visualizzare tutto il menu, con la possibilità di filtrare per categoria (ad esempio primo, antipasto), per range di prezzo (prezzo minimo e massimo).
  - Aggiungere nuovi piatti al menu.
  - Modificare piatti esistenti.
  - Eliminare piatti dal menu.
  
- **Gestione Ordini**:
  - Visualizzare tutti gli ordini, con la possibilità di filtrare per stato.
  - Visualizzare gli ordini con stato "completed" di un determinato tavolo.
  - Creare nuovi ordini.
  - Modificare lo stato degli ordini (ad esempio, da "in attesa" a "completato"), il numero del tavolo e delle persone.
  - Modificare i piatti all'interno di un ordine. 
  - Eliminare ordini.

- **Statistiche**:
  - Visualizzare il numero di ordini e i guadagni del giorno corrente.
  - Visualizzare il numero di ordini e i guadagni del mese corrente.
  - Visualizzare i piatti più venduti in ordine decrescente, opzionalmente si può inserire la top (ad esempio i primi 5 piatti).

- **Gestione Profilo**:
  - Visualizzare le informazioni del proprio profilo (username, password e ruolo).
  - Modificare il proprio profilo (username, password e ruolo).
  - Modificare il ruolo di un utente, inserendo l'username.
  - Eliminare il proprio profilo.

### Ruolo: Staff

Il personale (camerieri, chef, etc.) ha accesso a funzionalità limitate, concentrandosi sulla gestione degli ordini:

- **Gestione Ordini**:
  - Visualizzare tutti gli ordini, con la possibilità di filtrare per stato.
  - Visualizzare gli ordini con stato "preparation" di un determinato tavolo.
  - Creare nuovi ordini.
  - Modificare lo stato degli ordini (ad esempio, da "in attesa" a "completato"), il numero del tavolo e delle persone.
  - Modificare i piatti all'interno di un ordine.
  - Eliminare ordini.

- **Gestione Profilo**:
  - Visualizzare le informazioni del proprio profilo (username, password e ruolo).
  - Modificare il proprio profilo (username, password).
  - Eliminare il proprio profilo.

### Autenticazione

Il sistema di autenticazione si basa su **JWT (JSON Web Token)**, con supporto per:

- **Login**: Gli utenti possono effettuare il login e ottenere un JWT valido per accedere alle API.
- **Registrazione**: Nuovi utenti possono registrarsi e ottenere un JWT.
- **Refresh Token**: Per ottenere un nuovo JWT quando quello attuale scade.
- **Logout**: Gli utenti possono fare il logout e invalidare il loro token JWT.

## Endpoints principali

### Autenticazione

- **POST /auth/login**: Effettua il login e ricevi un JWT.
- **POST /auth/register**: Registra un nuovo utente e ricevi un JWT.
- **POST /auth/logout**: Invalidare il token JWT attuale.
- **POST /auth/refresh**: Ottieni un nuovo token JWT utilizzando il refresh token.

### Gestione Menu (Admin)

- **GET /menu/all**: Ottieni la lista dei piatti nel menu.
- **POST /menu/insert**: Aggiungi un nuovo piatto al menu.
- **PATCH /menu/update/{id}**: Modifica un piatto esistente.
- **DELETE /menu/delete/{id}**: Rimuovi un piatto dal menu.

### Gestione Ordini

- **POST /orders/insert**: Crea un nuovo ordine.
- **GET /orders/all**: Ottieni la lista degli ordini.
- **GET /orders/table/{n_table}**: Ottieni l'ordine con stato "preparation" di un tavolo specifico.
- **PATCH /orders/update/{id}**: Modifica del numero di persone e/o del numero tavolo e/o dello stato di un ordine.
- **PUT /orders/update/{id}/dish/{id_dish}**: Modifica dei piatti all'interno di un ordine.
- **DELETE /orders/delete/{id}**: Elimina un ordine.

### Statistiche (Admin)

- **GET /orders/stats/daily**: Ottieni il numero di ordini e i guadagni del giorno corrente.
- **GET /orders/stats/monthly**: Ottieni il numero di ordini e i guadagni del mese corrente.
- **GET /orders/stats/top-dishes**: Ottieni il numero di ordini e i guadagni del mese corrente.

### Gestione Profilo

- **GET /users/profile**: Visualizza le informazioni del profilo dell'utente (username, password, ruolo).
- **PATCH /users/update**: Modifica il proprio profilo (username, password, ruolo).
- **PUT /users/update/role**: Modifica il ruolo di un utente specifico, inserendo l'username. Solo per gli utenti con ruolo **ADMIN**.
- **DELETE /users/delete**: Elimina il proprio profilo.

## Documentazione API
La documentazione completa delle API è disponibile tramite **Swagger** all'indirizzo locale:
```bash
  localhost:3000/api
```

## Tecnologie utilizzate

- **Nest.js** (per la logica delle API)
- **JWT** (per l'autenticazione)
- **MySQL** (o altro database) per la persistenza dei dati
- **TypeORM**: ORM per la gestione della persistenza dei dati in MySQL, che facilita l'interazione con il database.
- **Swagger**: Documentazione API

## Setup e Avvio

1. Clona il repository:
    ```bash
    git clone <repository-url>
    cd <directory>
    ```

2. Installa le dipendenze:
    ```bash
    npm install
    ```

3. Configura le variabili d'ambiente (per esempio, per il database, JWT secret, etc.):

4. Avvia il server:
    ```bash
    npm run start:dev
    ```

## Contributi

Contribuisci migliorando il codice, segnalando problemi o aggiungendo nuove funzionalità. Le pull request sono benvenute!

## Licenza

Questo progetto è concesso sotto la licenza MIT.
