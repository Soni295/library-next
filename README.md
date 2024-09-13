To generate Database types execute 
```sh
$ npx prisma generate
```

generateSecret
```sh
$ openssl rand -base64 32 | xargs -I {} echo "NEXTAUTH_SECRET={}" > .env
```