To generate Database types execute 
```sh
$ npx prisma generate
```

generateSecret
```sh
$ touch .env
$ openssl rand -base64 32 | xargs -I {} echo "NEXTAUTH_SECRET={}" >> .env
$ echo "NEXTAUTH_URL=http://localhost:3000" >> .env
```

generate Database
```sh
$ npm run build:db
```

generate uploads files
```sh
$ mkdir -p ./public/uploads/{products,marks}
```