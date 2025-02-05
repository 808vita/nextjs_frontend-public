# Codebase Overview

This document provides a summary of the codebase structure and functionality based on the provided files.


## File Descriptions

### Configuration Files

*   **`.dockerignore`**: Specifies files and directories to be ignored by Docker during image builds.
    *   Ignores files like `.env` , `conda_scraper`, and `app/__pycache__`.
*   **`.gitignore`**: Specifies files and directories that should be ignored by Git.
    *   Ignores python bytecode, build, distribution, test, environment, IDE related files/folders and `crawl_project.py` , `project_structure.txt` etc.

### Docker Configuration

*   **`Dockerfile`**: Defines the steps to create a Docker image for the application.
    *   Uses a base Python image (`python:3.13.1`).
    *   Sets the working directory to `/code`.
    *   Copies and installs dependencies from `requirements.txt`.
    *   Installs playwright browser and dependencies.
    *   Copies the `app` directory to `/code/app`.
    *   Specifies the command to run the FastAPI application using `fastapi run app/main.py --port 80`.

### Application Code (`app/`)

*   **`app/__init__.py`**: An empty initialization file, marking the `app` directory as a Python package.
*   **`app/api/`**: Contains files defining API endpoints.
    *   **`gemini.py`**: Defines API routes for interacting with the Gemini AI model for text, image, multimodal, search grounding and translation analysis.
    *   **`meta.py`**: Defines API routes for fetching ads data from Meta Ad Library and handling login with playwright. Includes routes `/meta-ads` `/screenshot`, `/meta-login` and a websocket `/meta-login-ws` for facebook login.
    *   **`mongodb.py`**: Defines API routes for testing db connection, accessing and modifying data related to settings, search terms, checked meta ads, categories and reported ads data from mongodb.
*   **`app/main.py`**: The main application file.
    *   Initializes the FastAPI application.
    *   Configures CORS middleware.
    *   Includes the API routers from `gemini.py`, `meta.py` and `mongodb.py`.
    *   Defines a scheduled background task to fetch meta ads data using apscheduler.
    *   Configures Gemini AI model with API key.
    *   Starts the mongodb connection and scheduler using `lifespan` context manager.
*    **`app/mongodb.py`**: Manages the MongoDB connection.
      *   Establishes a reusable database connection using `AsyncIOMotorClient`.
      *   Includes functions to connect and close the database.
*   **`app/scheduler_utils.py`**: Contains utilities and functions for scheduling tasks and data processing.
    *   Includes function to process ads fetched from meta, analyze with Gemini and store it to db.
    *   Includes function to analyze ads for category with Gemini.
    *   Includes function to fetch ads from meta ad api.
*   **`app/schemas.py`**: Defines data models using Pydantic for request and response validation.
    *   Includes schemas for  text, image, multimodal, and search grounding analysis requests and responses.
    *   Includes schemas for  meta ad requests, screenshots, search terms, settings, access token, categories, reported ads,  and public awareness.
*   **`app/utils.py`**: Contains utility functions.
    *   Includes functions for text, image and multimodal analysis using Gemini.
    *   Includes search grounding with Gemini.
    *   Includes functions for interacting with Meta Ad Library API, such as fetching ad data and generating screenshot URLs.
    *   Includes full page screenshots with playwright
    *   Includes database interaction functions.
    *   Includes functions to create, update, delete, fetch data for settings, access token, search terms, and reported ads.
    *   Includes utility function for gemini based translation
    *    Includes utility to fetch stats for ads scanned, is scam, search terms, category, search terms extracted etc.

## Key Functionality

*   **API Endpoints**: The application exposes a set of API endpoints for various functionalities including Gemini AI integration, Meta Ads data retrieval, and database interaction.
*   **Gemini AI Integration**: Uses Gemini for analyzing text, images, multimodal data, and search queries, also for translation.
*   **Meta Ads Library Integration**: Fetches ad data from the Meta Ad Library using the Meta API.
*   **Database Integration**: Utilizes MongoDB to store and retrieve application data.
*  **Screenshot**: Takes a full page screenshot with playwright.
*   **Scheduled Tasks**: Includes a background scheduler to periodically fetch ads data from Meta API and process it.
*   **Data Validation**: Uses Pydantic for data validation.
* **Login**: Allows login to facebook by using playwright.