
[72a9521249919.webm](https://github.com/user-attachments/assets/ec7cd03a-69d9-42c6-b2f2-3b585a83bdee)


# AdShield Next.js App

A web application to detect and analyze social media ad scams using AI with Self-Learning capabilities.

## Setup

1.  **Clone:** `Clone the codebase & have latest NPM installed on you device`
2.  **Install:** `npm install`
3.  **Environment Variables:** Create a `.env.local` file in the root and set the following:
    -   `MONGODB_URI`: Your MongoDB connection string.
    -   `NEXTAUTH_SECRET`: Your secret key for NextAuth.js.
    -   `META_APP_ID`: Meta app ID to use for Meta Graph API.
    -   `META_APP_SECRET`: Meta secret ID.
    -   `META_ACCESS_TOKEN`: Meta access token.
    -  `NEXT_PUBLIC_FASTAPI_API_URI`: URL for the backend FastAPI application.

4.  **Run Dev Server:** `npm run dev` (starts on `http://localhost:3000`)
5.  **Generate Docs:** `npm run docs` (outputs to `public/docs`)

## Tech

-   Next.js (React)
-   TypeScript
-   Tailwind CSS
-   NextUI
-   Mongoose
-   NextAuth.js
-   Google Generative AI

## Folder Structure

-   `.`: Root config files (`.gitignore`, `next.config.mjs`, etc.)
-   `documents/`: Markdown documentation.
-   `lib/`: Core logic (`auth.ts`, `mongodb.ts`).
-  `models/`: Database schemas (`Users.ts`).
 -  `schemas/`:  Interfaces for request data (`index.ts`)
-   `src/`: Application source code.
    -   `components/`: Reusable UI components.
        -  `components/` : Further grouping of components based on functionality.
            - `accounts` - Account related components
            - `auth`: Authentication layout and form components.
             - `awarness` : Components to show awareness categories.
             - `charts` : Charts components.
              - `home`: Home page dashboard components.
            - `hooks` - React hooks
             - `icons` - Icon components
              - `layout`: Application layout components.
              - `navbar`: Navigation bar components.
              - `search-terms` - Components related to search terms
              - `settings`: Component for managing settings.
              - `sidebar`: Components for the application sidebar.
              - `stats`: Components for the stats page.
              - `table`: Components related to tables.
        -   `layout/`: Main layout for app content.
        -   `providers/`: Provider components like NextUI.
        - `ui/`: General UI components (`Form.tsx`,`Toast.tsx`).
             - `table`: components related to tables.
   -  `middleware.ts`: Authentication middleware.
    - `pages/`: Application pages (public, admin, API).
        - `admin/`: Admin dashboard and management pages.
            -   `accounts.tsx`: Accounts page.
            -    `stats.tsx` : Statistics page
            -   `awareness.tsx`: Awareness page.
            -   `index.tsx`: Admin dashboard page.
            -   `login-ws.tsx`:  Page for websocket login for meta ads.
            -   `scanned.tsx`: Page displaying scanned ads.
            -   `search-terms.tsx`: Page for managing search terms.
             -  `settings.tsx`: Page to manage app settings.
        - `api/`: Api routes.
            -   `auth/`: Authentication related api routes.
                -   `[...nextauth].ts`: NextAuth.js configuration API route.
                -`generate-token.ts`: API to generate jwt tokens.
                -   `signup.ts`: API route for user signup.
                -   `verify-token.ts`: API route to verify tokens.
            -  `hello.ts` : Example api route.
             - `meta-ads.ts`: API route to fetch data from meta ads API.
         - `fonts/`: Custom fonts used in the application.
            - `GeistMonoVF.woff`: A woff font file.
            - `GeistVF.woff`: A woff font file.
        - `awareness.tsx` : Public awareness page.
        - `index.tsx` : Public Homepage.
        - `login.tsx`: Login Page.
        - `signup.tsx`: Signup Page.
-   `styles/`: Global CSS styles for the application.
    - `globals.css`: Global CSS styles for the application.

-   `utils/`: General Utilities and custom API calls.
    - `api.ts`: API calls for the application.

## `package.json` Scripts

-   `dev`: Runs the Next.js development server (`next dev`).
-   `build`: Builds the production-ready application (`next build`).
-   `start`: Starts the Next.js production server (`next start`).
-   `lint`: Runs ESLint to check code style (`next lint`).
-   `docs`: Generates project documentation using TypeDoc (`npx typedoc`).

## Key Points

-   TypeScript for type safety.
-   NextAuth for authentication.
-   Mongoose for database interaction.
-   Next-UI and Tailwind for styling.
-   API endpoints proxied to a FastAPI app (`NEXT_PUBLIC_FASTAPI_API_URI`).
-   API documentation generated in `/public/docs`.
