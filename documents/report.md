# Project Report: AdShield - Advanced Scam Detection API

## 1. Introduction

This report offers a detailed look at the AdShield project, a FastAPI-based backend API aimed at detecting scam patterns in online ads. We've built it to be more than just a basic API, using modern technologies like Google's Gemini AI, the Facebook Meta Ads Library API, and a MongoDB database. AdShield includes various features for analyzing text, images, and combinations of both. It's designed to run smoothly in different environments using Docker. Our main goal with AdShield is to provide a useful tool for identifying and reducing fraudulent advertising, hopefully making the online experience a bit safer.

## 2. Project Goals

The AdShield project was conceived with several overarching goals, each requiring meticulous planning and execution:

- **Automated Scam Detection (Advanced & Adaptive):**
  - To develop a highly accurate AI-driven system capable of detecting an extensive range of scam patterns across diverse advertising formats and content types.
  - To integrate dynamic learning mechanisms enabling the system to adapt to novel and evolving scam techniques, maintaining its efficacy over time.
  - To minimize false positives and negatives through precision, sensitivity and constant monitoring, to ensure accurate, reliable detection.
  - To incorporate detailed analysis that not only flags the scam but also identifies specific scam patterns, thereby improving transparency and understanding.
- **Meta Ads Data Collection (Comprehensive & Robust):**
  - To implement an efficient and scalable system for fetching large quantities of advertisement data from the Facebook Meta Ads Library API, ensuring robust data capture.
  - To develop intelligent mechanisms to handle API rate limits, errors, and data irregularities, ensuring continuous and reliable operation without interruption.
  - To integrate automated data sanitization, validation, and preprocessing steps, guaranteeing data integrity and quality prior to analysis.
  - To fetch specific ad data such as screenshots and creative links for in-depth analysis.
- **Data Storage and Management (Scalable & Efficient):**
  - To design and implement a flexible, scalable, and performant database schema within MongoDB to manage diverse data types such as raw ad data, AI analysis results, user-generated reports, and application settings.
  - To utilize optimized indexing and query strategies to enable efficient retrieval and processing of data, minimizing latency and enhancing overall system responsiveness.
  - To ensure data integrity and consistency using transactions and appropriate data validation techniques.
- **Scalability and Portability (Dockerized & Orchestrable):**
  - To create fully containerized applications using Docker that can operate consistently across various environments and platforms, avoiding deployment incompatibilities, and simplifying the process.
  - To produce highly optimized Docker images that are lightweight, secure, and designed for maximum runtime performance.
  - To develop the application with an eye towards future scalability, incorporating best practices that enable seamless integration with container orchestration tools such as Kubernetes or Docker Swarm.
- **Real-Time Analysis and Responsiveness:**
- To provide low latency API endpoints that support real time analysis, so that the frontend can get a fast and responsive experience.
- To ensure the application is efficient and can handle large numbers of requests, and that it can be horizontally scaled if needed.
- **Intuitive User Experience:**
  - To design an application with a easy-to-use, intuitive user experience for end users.
  - The application should provide all the tools and functionalities with a simple UI that is easy to understand and navigate.

## 3. Technology Stack

### 3.1. Backend (FastAPI)

- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python)
  - **Rationale:** FastAPI was selected for its exceptional performance, built-in support for asynchronous operations (`asyncio`), automatic data validation using Pydantic, and ease of API development and deployment. Its intuitive and modern approach allows for building robust APIs quickly.
  - **Features:** Leverages Python type hints for data validation, automatic API documentation generation (Swagger UI, ReDoc), dependency injection, and support for WebSocket connections.
- **AI Model:** [Google Gemini](https://ai.google.dev/gemini-api)
  - **Rationale:** Gemini was chosen for its cutting-edge multimodal capabilities, enabling simultaneous analysis of text and images. It provides high-quality results and offers advanced contextual understanding necessary for identifying complex scam patterns.
  - **Implementation**: It is used to analyze the ad data for scam detection and also for providing translations in multiple languages and for search grounding. The prompts and settings are configurable.
- **Database:** [MongoDB](https://www.mongodb.com/)
  - **Rationale:** MongoDB is utilized due to its flexible, schema-less nature, which is ideal for handling the dynamic and semi-structured data of ads and analysis results. It's scalability and high availability were also considered during selection.
  - **Implementation**: Uses the async `motor` library, and is configured with indexes to improve performance.
- **Web Scraping:** [Playwright](https://playwright.dev/)
  - **Rationale**: Playwright provides multi browser support and also has built in methods to interact with web pages, and perform actions like taking full page screenshots and waiting for elements to load etc.
  - **Implementation**: It is used to take screenshots of web pages, and the logic is abstracted in utility functions.
- **HTTP Client:** [httpx](https://www.python-httpx.org/)
  - **Rationale:** `httpx` is chosen due to its robust support for asynchronous http calls.
  - **Implementation**: Used for making http requests to the meta ads api, handling all possible error scenarios and providing response data.
- **Task Scheduling:** [APScheduler](https://apscheduler.readthedocs.io/en/3.x/)
  - **Rationale:** APScheduler is employed to schedule periodic data fetching and processing tasks, enabling the automated collection of data from Meta Ads Library API, it provides more control than other simple schedulers.
  - **Implementation:** Used with a background thread pool and is used to schedule data fetching for every two hours.
- **Containerization:** [Docker](https://www.docker.com/)
  - **Rationale:** Docker is used for the creation of reproducible and portable environments, providing consistent runtime behavior and simplifies the deployment process across different environments.
  - **Implementation**: The `Dockerfile` is well structured to minimize the image size and uses docker caching for fast builds.
- **Asynchronous Operations:** `asyncio` and `motor`
  - **Rationale:** `asyncio` allows the application to handle multiple concurrent tasks without blocking, and combined with the MongoDB async client using `motor` the system provides optimal performance for the data heavy tasks.
  - **Implementation:** All the data heavy tasks, such as accessing external APIs, data processing and database interactions, are performed using asynchronous code.
- **Environment Variables:** [python-dotenv](https://pypi.org/project/python-dotenv/)
  - **Rationale:** Using environment variables separates configuration from the application code and enhances security and portability.
  - **Implementation:** The application uses the `.env` file to store all the configurations and uses the `python-dotenv` to load those configurations.

### 3.2. Frontend

- **Framework:** [Next.js](https://nextjs.org/) (JavaScript/TypeScript)
  - **Rationale:** Next.js was chosen for its server-side rendering (SSR), static site generation (SSG), and client-side rendering (CSR) capabilities. It offers excellent performance and supports a component-based architecture that makes complex UI building easy.
  - It provides built in features like routing and rendering.
- **API Interaction:**
  - **Implementation**: Uses RESTful API endpoints of the FastAPI backend, and makes requests using standard libraries or modules like fetch, or axios. It also uses custom hooks to manage the data fetching process.
  - Responses are handled in JSON format.
- **UI Components:**
  - **Rationale:** A pre-built UI library or a custom component library helps maintain consistency and enhances the development speed.
  - **Implementation**: Could use libraries like Material UI, Chakra UI, Tailwind CSS, Ant Design, or custom styles.
- **State Management:**
  - **Rationale:** Effective state management is crucial for handling complex application data.
  - **Implementation**: Uses Redux, React Context API, Zustand, or similar for global state management. This ensures that updates are handled efficiently across all components, especially when multiple users are interacting with the system.

## 4. System Architecture

The architecture of the AdShield system is meticulously designed around several key interconnected components:

1.  **API Endpoints (Detailed Specifications):**

    - `/api/analyze/text`:
      - **Method:** `POST`
      - **Request Body:** JSON object with a `text` field containing the text to be analyzed (e.g., `{"text": "This is a test message."}`).
      - **Response Body:** JSON object with fields like `is_scam` (boolean), `reason` (string, optional), and `keywords` (array of strings, optional) (e.g., `{"is_scam": true, "reason": "Contains suspicious terms", "keywords": ["test", "message"]}`).
    - `/api/analyze/image`:
      - **Method:** `POST`
      - **Request Body:** JSON object with `image_base64` (string, base64 encoded image) and `mime_type` (string) (e.g., `{"image_base64": "/9j/4AAQSkZJRgABAQ...", "mime_type": "image/jpeg"}`).
      - **Response Body:** JSON object similar to text analysis, but based on image analysis results.
    - `/api/analyze/multimodal`:
      - **Method:** `POST`
      - **Request Body:** JSON object with `text` (string), `image_base64` (string), and `mime_type` (string) (e.g., `{"text": "Check this image.", "image_base64": "/9j/4AAQSkZJRgABAQ...", "mime_type": "image/png"}`).
      - **Response Body:** JSON object indicating scam detection results based on both text and image analysis.
    - `/api/analyze/search`:
      - **Method:** `POST`
    - **Request Body:** JSON object with a `query` field containing the search query (e.g., `{"query": "test search"}`).
    - **Response Body:** JSON object with field `gemini_response` which contains the search results.
    - `/api/translate`:
      - **Method:** `POST`
      - **Request Body:** JSON object with a `text` field to be translated (e.g., `{"text": "hello"}`).
      - **Response Body:** JSON object with fields `tamil` , `hindi`, and `telugu` translations.
    - `/api/meta-ads`:
      - **Method:** `GET`
      - **Query Parameters:** Supports optional parameters like `limit` (number of ads), `after` (pagination), `ad_delivery_date_min` (start date), `search_terms` (keywords), and `ad_reached_countries` (list of countries).
      - **Response Body:** JSON object with Meta Ads data, including fields like `ad_creative_link_captions`, `ad_creative_link_descriptions`, `ad_snapshot_url`, `page_id`, `page_name`, `publisher_platforms`, and `ad_delivery_date`.
    - `/api/screenshot`:
      - **Method:** `POST`
      - **Request Body:** JSON object containing a `url` (string) to capture (e.g., `{"url": "https://www.example.com"}`).
      - **Response Body:** JSON object containing a `base64_string` field with base64 encoded full page screenshot.
    - `/api/meta-login`:
      - **Method**: `POST`
      - **Request Body**: None
      - **Response Body**: JSON object with status message and list of screenshots for different steps
    - `/api/meta-login-ws`:
      - **Method**: `Websocket`
      - **Request Body**: Captcha or 2FA input via a JSON message over websocket
      - **Response Body**: Real time JSON messages to send data such as screenshots, and status over websocket.
    - `/api/test-db`:
      - **Method:** `GET`
      - **Request Body:** None
      - **Response Body:** JSON object with the result of the MongoDB connection test.
    - `/api/settings`:
      - **Method:** `GET` for fetching settings and `POST` for updating settings.
    - **Request Body:** `{"results_limit": 10}` for `POST`, none for `GET`
    - **Response Body:** JSON object with the result limits configuration data.
    - `/api/access-token`:
    - **Method**: `GET` for fetching the current access token, `POST` for updating the access token
    - **Request Body**: `{"token":"<access_token>"}` for `POST`, none for `GET`
    - **Response Body:** JSON object with access token data.
    - `/api/search-terms`:
      - **Method:** `GET` for getting all terms, `POST` for creating new, `PUT` for updating, `DELETE` for deleting.
      - **Request Body** : JSON object with fields `term`, `translated_terms`, and extracted (e.g.,`{"term": "test", "translated_terms": ["test_tamil", "test_hindi"], "extracted":true}` )
      - **Response Body:** JSON object for all operations.
    - `/api/search-terms-all`:
      - **Method**: `GET`
      - **Request Body**: None
      - **Response Body:** JSON object with list of all available search terms.
    - `/api/checked-meta-ads`:
    - **Method**: `GET`
    - **Query Parameters** : `limit` (optional) for setting the number of ads to fetch per page, `offset` (optional) to set the number of ads to skip.
    - **Request Body** : None
    - **Response Body:** List of JSON object containing all the fetched ads data.
    - `/api/checked-meta-ads/{ad_id}`:
      - **Method**: `GET`
      - **Request Body**: None
      - **Response Body**: JSON object with ad data for the specific ad id.
    - `/api/public-awareness`:
      - **Method:** `POST`
      - **Request Body:** JSON object with `category_name`, `common_pattern`, and `potential_user_targets` (array of strings) to create public awareness information.
      - **Response Body:** JSON object for the created public awareness data.
    - `/api/categories`:
      - **Method**: `GET`
      - **Request Body** : None
      - **Response Body**: A list of all available categories in the database.
    - `/api/stats`:
      - **Method:** `GET`
      - **Request Body:** None
      - **Response Body:** JSON object with statistics data.
    - `/api/reported-ads`:
      - **Method:** `POST`
      - **Request Body:** JSON object with the `ad_id` and `report_reason` to create a reported ad (e.g., `{"ad_id": "1234", "report_reason": "Scam"}`).
      - **Response Body:** JSON object with created reported ad data.
    - `/api/reported-ads/{ad_id}`:
      - **Method:** `GET` to get the reported ad data, `PUT` to update an existing reported ad data, `DELETE` to delete a reported ad.
      - **Request Body:** JSON object with `reported` set to `true` or `false` for updating an ad. (e.g., `{"reported": true}`)
      - **Response Body**: JSON object of the requested data.
    - `/api/reported-ads-all`:
      - **Method**: `GET`
      - **Request Body**: None
      - **Response Body:** List of all reported ads data in JSON.
    - `/api/reported-ads-pending`:
      - **Method**: `GET`
      - **Request Body**: None
      - **Response Body:** List of all pending reported ads data in JSON.
    - `/api/export/reported-ads`:
      - **Method**: `GET`
      - **Request Body**: None
      - **Response Body**: CSV data of all the reported ads.
    - `/api/export/meta-ads`:
      - **Method**: `GET`
      - **Request Body**: None
      - **Response Body**: CSV data of all the meta ads excluding the base64 strings.

2.  **Data Fetching and Processing:**

    - **Meta Ads Data:** Fetches ads data using the Meta Ads Library API, and manages pagination.
    - **Screenshot Capture:** Leverages Playwright to create full-page screenshots of landing pages and creative links, handling scenarios such as complex JavaScript and dynamic content.
    - **Gemini Analysis:** Uses the Gemini API with custom prompts, that are designed to provide a balance between precision and performance, and used to identify patterns indicative of a scam.
    - Includes text, image and multimodal analysis.
    - Also includes a category identification module for categorization of ads.
    - **Data Sanitization:** All data is sanitized before processing, removing any null values or unexpected characters.

3.  **Database Interaction :**

    - The MongoDB connection is set up using an asynchronous client (`motor`).
    - Data is stored using proper schema in collections for different types of data.
    - Each collection is indexed to optimize search and retrieval, and improve query performance.
    - Includes support for update operations, and data manipulation.
    - All database operations are asynchronous to prevent blocking.

4.  **User Interface :**

    - The frontend displays user interfaces using a UI library.
    - The user can submit text, image or URLs for analysis, and see the results.
    - The results include screenshots, gemini analysis data, and also the option to report the ads.
    - The user can also manage the meta ad keywords, and review the search terms.
    - Provides data visualizations and dashboards.

5.  **Containerization (Comprehensive):**
    - The application is containerized with a multi-stage build process in the Dockerfile to optimize the image size.
    - The `Dockerfile` utilizes a lightweight python base image, which minimizes the image size.
    - It uses docker caching to reduce the build time.
    - The `CMD` instruction ensures that the docker container is run using `fastapi run` when the container starts.

## 5. Key Features

- **Text Analysis (Sophisticated):**
  - Advanced text processing techniques and fine-tuned Gemini prompts are used for identifying complex scam patterns.
  - Returns comprehensive data with keywords and reasons
- **Image Analysis (Advanced):**
  - The Gemini model is configured with appropriate parameters to ensure accurate visual processing for scam detection.
  - Returns a JSON response with details about the scan status, keywords and reasons.
- **Multimodal Analysis (Comprehensive):**
  - The system combines text and image data and performs an analysis using the multimodal capabilities of Gemini to detect complex scams.
  - Provides detailed data with all the information.
- **Search Grounding (Advanced):**
  - Uses the search grounding feature of Gemini to perform a search on the query provided.
- **Translation (Advanced):**
  - Uses gemini to provide translations in multiple languages such as Tamil, Hindi, and Telugu.
- **Meta Ads Data Fetching (Robust):**
  - Fetches data from the Meta Ads Library using appropriate filtering parameters to collect targeted data.
  - Includes logic to retry failed requests due to rate limiting or network errors.
- **Web Scraping (Efficient)**:
  - Uses playwright to efficiently capture screenshots of web pages with support for complex and dynamic web pages.
  - The logic is implemented with appropriate timeout and wait conditions to handle varied scenarios.
- **Real-time meta login (Interactive)**:
  - Uses playwright and provides real time response for each step of the login process.
  - It uses websocket connection for real time communication, which is also used to send data for captcha and 2FA to the backend.
- **Database Integration (Scalable):**
  - Uses MongoDB to store the results and to manage ad data, and user reports.
  - Data is stored with optimized schemas and appropriate indexes for efficient retrieval.
- **Scheduled Tasks (Customizable):**
  - APScheduler is used to automate the process of meta ads data collection at fixed intervals.
  - This also helps to minimize the manual interventions and ensures consistent data flow in the system.
- **API Endpoints (Comprehensive)**:
  - Provides a REST API for all the functionalities that the system has.
  - Each API endpoint is documented with detailed specifications.
- **CSV export (Efficient):**
  - Data can be exported as CSV to enable users to use the data offline and perform further analysis.
- **Dockerized Deployment (Portable):**
  - The application is deployed using docker and all the dependencies are included in the docker image which can be deployed to any docker supported environment.

## 6. Code Structure

The project's code structure has been deliberately organized to ensure modularity, maintainability, and scalability:

- `.dockerignore`:
  - Purpose: Contains a list of patterns for files and directories that Docker should ignore during the build process.
  - Contents: Usually includes `.env` files, `__pycache__` directories, and other files that are not needed in the production container.
- `.gitignore`:
  - Purpose: Specifies files and directories that Git should ignore during version control.
  - Contents: Includes `__pycache__` directories, Python byte code files (`*.pyc`), log files, virtual environment directories, etc.
- `Dockerfile`:
  - Purpose: Contains instructions for creating the Docker image, including the base image, build steps, and runtime command.
  - Key Sections:
    - `FROM python:3.13.1`: Sets the base image as the official Python 3.13.1 image.
    - `WORKDIR /code`: Sets the working directory within the Docker image.
    - `COPY ./requirements.txt /code/requirements.txt`: Copies the requirements file to the Docker container.
    - `RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt`: Installs all python dependencies in the requirements file.
    - `RUN playwright install`: Installs playwright browser automation library.
    - `RUN playwright install-deps`: Installs playwright dependencies.
    - `COPY ./app /code/app`: Copies the entire `/app` directory, containing all the source code.
    - `CMD ["fastapi", "run", "app/main.py", "--port", "80"]`: Specifies the command to start the application.
- `app/`:
  - `__init__.py`:
    - Purpose: Used to mark the `app` directory as a Python package and to enable relative imports.
    - Contents: Often empty but essential.
  - `api/`:
    - Purpose: Houses the code for all API route definitions.
    - `gemini.py`: Contains API endpoints specifically designed for interaction with Google’s Gemini API.
    - `meta.py`: Includes API endpoints for fetching data from the Meta Ads Library API and for interacting with Playwright for screenshots.
    - `mongodb.py`: Contains API routes for various database operations.
  - `main.py`:
    - Purpose: The main entry point of the FastAPI application.
    - **Functionality:** This file sets up the FastAPI application, the CORS middleware, includes the routes, establishes the database connection, starts the scheduler, and has the lifespan setup.
  - `mongodb.py`:
    - Purpose: Contains MongoDB connection configurations and methods.
    - Functionality: Handles the database connections using the `motor` library, and also has the method to close the connection gracefully.
  - `scheduler_utils.py`:
    - Purpose: Houses the functions for scheduling tasks such as fetching ad data and analysis.
    - Functionality: Has logic to fetch meta ads and perform all the processing, also has a category identification module.
  - `schemas.py`:
    - Purpose: Defines Pydantic models for all the incoming request and outgoing response data.
    - Functionality: Ensures that all the incoming and outgoing data conforms to the defined schema.
  - `utils.py`:
    - Purpose: Contains utility functions and shared logic.
    - Functionality: Has methods for all data handling operations such as interacting with external APIs, processing responses, data analysis, screenshot capture etc.
- `requirements.txt`:
  - Purpose: Specifies all Python packages and versions used by the application.
  - Contents: Includes `fastapi`, `uvicorn`, `httpx`, `motor`, `google-generativeai`, `apscheduler`, `python-dotenv`, `playwright` and other dependencies.

## 7. Key Implementation Details (Extensive)

- **Asynchronous Programming:**
  - All I/O bound operations are performed using `asyncio`, to avoid blocking the main thread and improve performance.
  - Async database connections are used by the `motor` library which provides non blocking IO.
- **Docker Layer Caching**: The docker file is optimized for caching by keeping the `COPY ./app /code/app` at the end of the file, since that is more likely to be changed, which results in less build time.
- **Environment Variables:**
  - The application reads environment variables using `python-dotenv` library.
  - Sensitive data such as API keys, database uris and passwords are stored in the `.env` file.
- **Pydantic Models:**
  - Pydantic is used for data validation, serialization and schema definition for all request and response bodies.
  - This ensures that all incoming and outgoing data matches the intended format and are also validated.
  - These models are also used for generating the API documentation.
- **Error Handling:**
  - The application uses `HTTPException` from FastAPI to provide consistent error responses.
  - Includes global error handling middleware to catch and log exceptions.
- **Logging:**
  - Logging is configured using the standard python `logging` module.
  - The application logs important events such as start and end of a scheduled task, new ad insertion and any exceptions that occur.
  - This allows proper tracking of the system and makes it easier to debug any issues.
- **CORS Middleware**:
  - CORS middleware from FastAPI is used to allow cross origin resource sharing, to allow clients from different domains to access the API.

## 8. Challenges (Detailed Analysis)

- **API Rate Limiting:**
  - **Specific Challenge:** The Meta Ads Library API has strict rate limits which vary based on the access level, if these limits are exceeded, the system has to handle this situation gracefully and should implement mechanisms to wait and retry, or store the data for later processing.
  - **Mitigation:** Implemented exponential backoff with jitter to prevent requests from overloading the API when errors occur and also implement caching mechanisms to reduce repeated requests.
- **Gemini AI Model Limitations:**
  - **Specific Challenge:** Gemini is a large language model which is not 100% accurate and might provide wrong responses to certain prompts or data input. The prompts have to be carefully designed to get the best possible results.
  - The model might also have some bias in the data it is trained on which results in some biased analysis results.
  - **Mitigation:** Using a well designed prompt that specifies clear instructions for Gemini can improve accuracy and also add manual review process to improve the results.
- **Playwright Instability:**
  - **Specific Challenge:** Playwright can face issues while scraping websites due to complex javascript or dynamic content loading, and it needs proper configuration to wait for these resources to load.
  - Websites change regularly, and the playwright locators might fail due to these changes.
  - **Mitigation:** Setting proper wait conditions for playwright can mitigate loading issues, also implement proper error handling to handle locators that are not found.
- **Handling Captcha and 2FA:**
  - **Specific Challenge:** During login process in the `meta-login` api endpoint, the facebook login page can sometimes show captcha verification or two factor authentication process, which is very difficult to automate.
  - **Mitigation:** The websocket connection in `meta-login-ws` api endpoint allows client to receive the screenshot and send back the data, this works for most captcha and 2FA scenarios.
- **API Verification:**
  - **Specific Challenge:** The Meta Ads Library API has strict verification process, and without proper verification the api access will be severely restricted and rate limited.
  - **Mitigation:** The verification process has to be initiated with the Meta developer team and has to comply with all the policies and rules.
- **Database Performance:**
  - **Specific Challenge:** As the data volume grows, poorly designed schemas or inefficient indexes will result in slow performance.
  - **Mitigation:** Ensure all data collections are properly indexed, and optimize query parameters to retrieve data efficiently.

## 9. Future Enhancements (Comprehensive)

- **Advanced Gemini Prompts and Fine-Tuning:**
  - **Enhancement:** Explore advanced prompt engineering techniques, such as few-shot learning, chain-of-thought reasoning, and fine-tuning Gemini to improve its accuracy and to add more data such as more detailed scam information, categories and affected users.
- **Advanced Error Handling and Logging:**
  - **Enhancement:** Implement advanced logging strategies using log levels, log rotation and log aggregation to better monitor and debug the application. Add integration with tools like Sentry or ELK stack for better logging and error tracking.
  - Customize `HTTPException` responses for different error scenarios and also include error codes for better clarity.
- **User Authentication and Authorization:**
  - **Enhancement:** Implement user authentication using OAuth 2.0, JSON Web Tokens (JWT), or similar methods, to protect API endpoints.
  - Implement fine grained control using role based access controls for various functions.
- **Advanced Scheduler Configurations:**
  - **Enhancement**: Enable support for cron expressions for scheduling, to implement more advanced scheduling rules and control data fetching during different times of the day.
- **Improved Captcha Handling**:
  - **Enhancement:** Implement an automated captcha solving mechanism using a 3rd party service, or a more robust mechanism that can handle most captcha or 2FA methods with minimal user intervention.
- **Performance Optimization:**
  - **Enhancement:** Optimize database queries, code, and image processing to improve speed and efficiency. Also add support for caching frequently accessed data to reduce load on the database.
- **Real-time Updates via WebSockets:**
  - **Enhancement:** Implement WebSocket connections to provide real-time updates to the user interface, such as updates when new ads are analyzed, when reports are generated, or when any database operations are performed.
- **Improved Reporting and Visualization:**
  - **Enhancement**: Add support for detailed reporting and data visualizations for admin users.
  - The data can be displayed using various chart libraries such as plotly or chart.js
- **Frontend Enhancements**:
  - **Enhancement**: Add support for filtering and searching data, advanced settings for controlling the data processing, and for reviewing the reports that are generated.

## 10. Conclusion

The AdShield project is our attempt at creating a useful way to detect and reduce online ad scams. Using FastAPI, Google's Gemini AI, the Meta Ads Library API, and MongoDB, we hope it provides a helpful platform for finding malicious patterns, managing data, and providing some useful information. We've aimed to make AdShield scalable, flexible, and easy to use, and the Docker setup should make it simple to deploy in different environments. Our goal is making the internet a bit safer.
