#how to run this project
*go to backend ,type "npm install" to install all dependencies , create .env in backend folder , paste the DATABASE_URL (postgreSQL connection string), use this string to generate your own prisma accelerate string , paste this accelerate string to wrangler.toml




*after db is initiated , type "npx prisma migrate dev" to migrate your schema to posthres db
*type "npx prisma generate --no-engine" to generate the prisma client
*type "npm install" again to bootstrap everything
*run the backend using "npm run dev" ![image](https://github.com/user-attachments/assets/e5848b45-7354-452b-9765-9c09d77c4320)

backend is up and running 


*switch to other terminal , go to frontend folder , "npm install" to install all dependencies
*then type"npm run dev" ![image](https://github.com/user-attachments/assets/91efa93f-698e-412d-aa20-b9c537c4a454)
both are running on different ports , access backend via frontend.
