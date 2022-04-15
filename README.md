# Cloudza

Monetization Weather API project

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
MySQL,Node.js, NPM
```

### Installing API

A step by step series of examples that tell you how to get a development env running

Install dependencies from package.json

```
npm install
```

Edit your .env file with correct values
```
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USER=
DATABASE_PASS=
DATABASE_NAME=
JWT_SECRET=
STRIPE_API_KEY=
```

Setup Database

```
Create database in MySQL - when running application it will sync the schema
```

Seed random data
```
npx nestjs-command generate:data
```

Finally run dev server
```
npm run start:dev
```

### Installing Frontend

A step by step series of examples that tell you how to get a development env running

Install dependencies from package.json

```
npm install
```
Edit your .env file with correct values
```
NEXT_PUBLIC_API_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
```

Note: Make sure JWT_SECRET and NEXTAUTH_SECRET are the same value

Startup dev server

```
npm run dev
```

## Deployment

### For Backend

```
npm run start:prod
```

### For Frontend

```
npm run build
npm run start
```

### Docker
Run docker compose with command:
```
docker-compose --env-file ./.env up  
```

Ensure all .env files are set

If using in localhost change NEXT_PUBLIC_API_URL to a local ip instead of localhost

Change db host DATABASE_HOST to name of container (mysql)

## Built With

* [Nest.js](https://nestjs.com/) - API Backend
* [Next.js](https://nextjs.org/) - Frontend

## Authors

* **Luka Patarčić** - *web developer* - [LukaPatarcic](https://github.com/LukaPatarcic)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
