
  # Interactive Personal Website

  This is a code bundle for Interactive Personal Website. The original project is available at https://www.figma.com/design/NfMfCkqEEzhf1opZkzGWJN/Interactive-Personal-Website.

  ## Running the code

  Run `npm i` to install the dependencies.

  Copy `.env.example` to `.env` and set your MongoDB values:

  - `MONGODB_URI`
  - `MONGODB_DB_NAME`
  - `MONGODB_COLLECTION`
  - `PORT` (optional, default `4000`)

  Run `npm run dev` to start the development server.

  This now starts both:

  - Vite frontend
  - Express API that saves quiz data in MongoDB by participant name
  # About_me
