# How to Run This Project

## Backend Setup
1. Navigate to the `backend` directory.
2. Install all dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and paste your PostgreSQL connection string as `DATABASE_URL`.
4. Generate your Prisma Accelerate connection string from the PostgreSQL connection string and paste it into `wrangler.toml`.

5. Initialize the database schema:
   ```bash
   npx prisma migrate dev
   ```
6. Generate the Prisma client:
   ```bash
   npx prisma generate --no-engine
   ```
7. Install dependencies again to ensure everything is bootstrapped:
   ```bash
   npm install
   ```
8. Run the backend:
   ```bash
   npm run dev
   ```

The backend should now be running.

---

## Frontend Setup
1. Open a new terminal.
2. Navigate to the `frontend` directory.
3. Install all dependencies:
   ```bash
   npm install
   ```
4. Run the frontend:
   ```bash
   npm run dev
   ```

---

## Accessing the Application
- The backend and frontend will be running on different ports.
- Use the frontend to interact with the backend services.

---

### Notes
- Ensure you have your PostgreSQL database set up before running the Prisma commands.
- Replace the placeholder strings with your actual connection and configuration details in `.env` and `wrangler.toml`.

Enjoy building!

