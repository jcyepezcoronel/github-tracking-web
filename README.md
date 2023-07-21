Adicionalmente, me tome la libertad de poder listar los distintos repositorios asociados a la cuenta de git, donde podemos ver los commits que se han realizado en cada uno, Ademas de poder cambiar de cuentas de GitHub con el login del sistema, es decir, yo puedo tener login de usuarios diferentes que se asocian a repositorios diferentes. Quise hacer ese adicional para que tuviera un alcance mas robusto.

In addition, I took the liberty of being able to list the different repositories associated with the git account, where we can see the commits that have been made in each one, in addition to being able to change GitHub accounts with the system login, in other way, I can have different user logins that are associated with different repositories. I wanted to make that additional so that it would have a more robust reach.

1 - set env variables, create `.env` file and set values with variables name look like into `.env.example` file.

`VITE_GITHUB_OAUTH_CLIENT_ID=`
`VITE_GITHUB_OAUTH_SCOPE=`
`VITE_SERVER_DOMAIN_URL=`

2 - install despendencies `npm i`

3 - run proyect `npm run dev`
