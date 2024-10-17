# Тестовое задание "Студенты и оценки"

## Переменные окружения
`Создайте .env файл`
```bash
cp .env.example .env
```

## Локальный запуск
`Установка зависимостей`
```bash
yarn install
```

`Миграции БД`
```bash
yarn prisma migrate dev
```

`Запуск приложения`
```bash
yarn start:dev
```

## Docker
При запуске в докере, на месте localhost в POSTGRES_URL необходимо указать название контейнера(postgres)
```bash
docker compose up -d --build
```

## Swagger link
`http://localhost:${PORT}/api/v1`

# Environment
| env                         | default value                                                | description                  |
|:----------------------------|:------------------------------------------------------------ |:------------------------     |
| PORT                        | 8080                                                         | Service port                 |
| POSTGRES_URL                | nats://192.162.246.63:4222                                   | NATS connection URL          |
| POSTGRES_URL                | postgresql://postgres:root@postgres:5432/core?schema=public  | Postgres connection URL      |
| POSTGRES_HOST               | localhost                                                    | Postgres host                |
| POSTGRES_PORT               | 5432                                                         | Postgres port                |
| POSTGRES_DB_NAME            | core                                                         | Postgres database name       |
| POSTGRES_USER               | postgres                                                     | Postgres user                |
| POSTGRES_PWD                | root                                                         | Postgres password            |
