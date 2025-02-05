# Codebase Overview

This document provides a concise overview of the Next.js codebase structure, key components, and their purposes.

## Folder Structure

- **`./` (Root):**
    - `.gitignore`: Specifies intentionally untracked files that Git should ignore.
    - `next.config.mjs`: Next.js configuration file.
    - `package.json`: Lists project dependencies and scripts.
    - `postcss.config.mjs`: Configuration for PostCSS, including Tailwind CSS.
    - `tsconfig.json`: TypeScript configuration file.
    - `typedoc.json`: Configuration for TypeDoc documentation generation.


- **`documents/`:**
    - `test.md`: A test markdown document.

- **`lib/`:**
    - `auth.ts`: Configuration for NextAuth.js authentication.
    - `mongodb.ts`: Manages the connection to MongoDB using Mongoose.

- **`models/`:**
    - `Users.ts`: Defines the Mongoose schema and model for user data.

-  **`schemas/`:**
    - `index.ts`: Defines TypeScript interfaces for request data (e.g., `SignupRequest`, `LoginRequest`).

- **`src/`:**
    - **`components/`:**
        - **`components/`:** Reusable components
            - **`accounts/`:** Components for user accounts management.
                - `add-user.tsx`: Modal form to add new users.
                - `index.tsx`:  Displays a list of accounts with search and action options.
            - **`auth/`:** Layout and authentication components.
                - `authLayout.tsx`: Layout wrapper for authentication pages.
                - `login.tsx`: Implements the login form.
                - `register.tsx`: Implements the registration form.
             -  **`awarness/`:** Components for public awareness sections.
                -`AwarenessCategory.tsx`: Displays information about an awareness category.
             - **`charts/`:** Components for data visualization
                -  `TreeMapChart.tsx`: Displays data in a treemap chart.
                -`steam.tsx`: Displays data in a steam chart.
             -  **`home/`:** Components for the home dashboard.
                - `admin-dashboard.tsx`: The main dashboard page when the user is an admin.
                - `card-agents.tsx`, `card-balance1.tsx` etc: components that displays statistics.
                 - `content.tsx`: component for the main home page content.
                - `demo.tsx`: Live demo page with functionality to test multimodal analysis.
                - `features.tsx`: Page describing the application features.
                 -`hero.tsx`: landing page component for public homepage.
            - **`hooks/`:** Custom React hooks.
                - `useBodyLock.ts`: Custom hook to manage body scrolling.
                -`useIsomorphicLayoutEffect.ts` : Custom hook to manage layout effcets.
                 -`useSettings.ts`: Custom hook for handling settings.
            -  **`icons/`:** SVG icons. Organized into sub-folders based on their function
                - `accounts/`: Icons for the accounts page.
                - `breadcrumb/`: Icons for the breadcrumb navigation.
                 -`navbar/`: Icons for the navbar.
                  -`sidebar/`: Icons for the sidebar.
                  -`table/` : Icons for the tables.
                - `acme-icon.tsx`: Logo for the application.
                - `acmelogo.tsx`: Second logo for the application.
                -`community.tsx` A community related icon.
                 -`searchicon.tsx`: Icon used for search functionality.
            -  **`layout/`:** Layout components.
                -`adminLayout.tsx`: Layout for the admin pages including sidebar,navbar and content area.
                - `layout-context.ts`: React Context for sidebar state management.
            - **`navbar/`:** Components for the top navigation bar
                -`burguer-button.tsx` component for burger menu in small screens.
                - `darkmodeswitch.tsx`: Dark mode switch.
                - `navbar.styles.ts`: styles for the navbar.
                - `navbar.tsx`: Main navbar component
                -`notifications-dropdown.tsx`: Notification component
                - `user-dropdown.tsx`: User profile settings dropdown menu.
            - **`search-terms/`:** Components for managing search terms.
               - `add-search-term-modal.tsx`: A modal for adding new search terms.
                -`search-term-table.tsx`:  Displays a table of search terms.
            - **`settings/`:** Settings components.
                - `SettingsInput.tsx`: A reusable input for settings.
           -   **`sidebar/`:** Components for the sidebar.
                 -`OOFLOGO.tsx`: Logo for the sidebar.
               - `collapse-items.tsx`: Component for collapsible menu items in sidebar.
                -`companies-dropdown.tsx`: Dropdown for company selection in the sidebar.
                -`sidebar-item.tsx`:  Individual sidebar item components.
                - `sidebar-menu.tsx`: Groups sidebar items under a common title.
               -`sidebar.styles.ts`: styles for the sidebar.
                - `sidebar.tsx`:  Main sidebar structure.
            - **`stats/`:** Components for stats dashboard
                -`StatCard.tsx`  card component that shows a particular stat.
                - `StatsContent.tsx`:  Displays all the stats on the page.
            - **`table/`:** Components for table data
                 - `data.ts`: sample data for the tables.
                 - `render-cell.tsx`: renders a cell in the table.
                -  `table.tsx`: A reusable table component.
        -   **`layout/`:** Layout Provider component
            - `Layout.tsx`:  Provides the base layout for the application.
        - **`providers/`:** Provider components
            - `ProviderNextUI.tsx`: Sets up the NextUI provider.
         - **`ui/`:** Reusable UI components.
            -`AdCard.tsx` : Reusable component to render Ads data.
             -`AdList.tsx` : Component to list a number of AdCards
            -`Form.tsx`: Reusable form component.
            - `LoginSocket.tsx`: Component to establish the Websocket connection for Meta login.
            -`MultimodalAnalysis.tsx`:  Component that handles multimodal analysis.
            -`Toast.tsx` : Shows a success or failure message in a popup.
            -  **`table/`:** Table related components
                - `AdsTable.tsx`: component to display ads data.
                 - `Table.tsx`: Reusable table component with pagination.
                 - `render-cell.tsx` : renders cells for table component.

    - **`middleware.ts`:** Defines middleware functions that run before routes.

    - **`pages/`:**
        - `_app.tsx`: Custom App component to wraps the pages with layout, session and providers.
        -`_document.tsx`: Custom document component.
        - **`admin/`:** Pages for the admin panel.
            -   `accounts.tsx`: Accounts page.
            -   `awareness.tsx`: Awareness page.
            -   `index.tsx`: Admin dashboard page.
            -   `login-ws.tsx`:  Page for websocket login for meta ads.
            -   `scanned.tsx`: Page displaying scanned ads.
            -   `search-terms.tsx`: Page for managing search terms.
             -  `settings.tsx`: Page to manage app settings.
              -`stats.tsx`: Page that renders stats for the application.
        - **`api/`:** API routes.
            -   **`auth/`:** API routes related to authentication.
                -   `[...nextauth].ts`: NextAuth.js configuration API route.
                 -`generate-token.ts`: API to generate jwt tokens.
                -   `signup.ts`: API route for user signup.
                -   `verify-token.ts`: API route to verify tokens.
            -  `hello.ts` : Example api route.
            -  `meta-ads.ts`: API route to fetch data from meta ads API.
        -`awareness.tsx` : Public awareness page.
         - **`fonts/`:** Custom font files
             - `GeistMonoVF.woff`: A woff font file.
             - `GeistVF.woff`: A woff font file.
        -`index.tsx` : Public home page
         -`login.tsx`: Login page for the application.
        -`signup.tsx`: Signup page for the application.

    -   **`styles/`:** Global CSS files.
        -   `globals.css`: Global CSS styles for the application.

-   **`utils/`:** Utility functions.
    -`api.ts`: API calls for the application.
## Key Technologies

-   **Next.js:** React framework for building web applications.
-   **NextAuth.js:** Authentication library for Next.js.
-   **Mongoose:** MongoDB object modeling tool.
-   **Tailwind CSS:** Utility-first CSS framework.
-   **NextUI:** A React UI library.
-   **Formik:** Library to manage the state of forms.
-   **TypeDoc** Documentation generation tool for typescript
## Page Names
   - **Public Pages:**
      - `/` - Homepage
      - `/awareness` - public awareness page.
     - `/login` - Login page.
     - `/signup` - Register page.
    - **Admin Pages:**
      - `/admin` - Admin dashboard.
      - `/admin/accounts` - Accounts listing page.
       -`/admin/stats` - Statistics listing page.
      - `/admin/awareness` - Admin awareness page.
      - `/admin/scanned` - List of all scanned ads.
     - `/admin/search-terms` - Search term management page
     - `/admin/settings` - Settings page
      -`/admin/login-ws`:  Meta login with websocket page.

##  Important notes for a new developer

-  **API Routes**: all api routes reside within `pages/api` folder
-   **Component Organization:** Components are grouped by functionality within the `src/components` directory (UI components, layout, features, etc.)
-   **Type Safety:** TypeScript is used throughout the project for type checking.
-   **State Management**: React Context, Hooks and useState are used to manage application states.
-  **Authentication**: Next-Auth is being used to handle authentication.
-  **Database**: Mongoose is being used to manage the database interactions.
-  **UI Library**: Next-UI is being used to style the components.
-  **Validation:** Yup and Formik is used for form validation.
-   **Documentation**: Typedoc is set up to generate API documentation in `/public/docs` when running the `docs` script.

This overview should help a new developer understand the basic structure and organization of the project.