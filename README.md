### .env files
## For server
DB_USERNAME=\
DB_PASSWORD=\
DB_DATABASE=\
DB_TABLE=\
DB_HOST=\
API_KEY=\
API_HOST=\
API_URL=\
API_BASE=\
PORT=\
## For client
REACT_APP_API_URL=
## DB table
CREATE TABLE exchange_rates (
    id SERIAL PRIMARY KEY,
    rate_date DATE NOT NULL,
    currency CHAR(3) NOT NULL CHECK (currency IN ('USD', 'EUR')),
    rate NUMERIC(10, 4) NOT NULL,
    UNIQUE (rate_date, currency)
);
