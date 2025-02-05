# Using Docker for FastAPI Backend

This document explains how to use Docker to containerize and deploy a FastAPI backend application.

## Benefits of Using Docker for FastAPI

1.  **Consistent Environment:** Docker ensures that your FastAPI application runs in the same environment across different machines. This helps avoid the "it works on my machine" problem.
2.  **Simplified Deployment:** Deploying a Docker container is much easier compared to setting up and configuring all the dependencies on a server.
3.  **Scalability:** Docker containers are lightweight and can easily be scaled up or down based on demand using container orchestration tools like Docker Swarm or Kubernetes.
4.  **Isolation:** Docker containers provide isolation between the FastAPI application and the host system, preventing conflicts between different application dependencies.
5.  **Easy to Share:** You can easily share your application via docker images using docker hub or other container registries.

## Dockerfile for FastAPI

The provided `Dockerfile` in the main documentation can be broken down in the below steps:

1.  **Base Image:**

    ```dockerfile
    FROM python:3.13.1
    ```

    This line specifies that we are using the official `python:3.13.1` image as the base for our container.

2.  **Set Working Directory:**

    ```dockerfile
    WORKDIR /code
    ```

    This sets the working directory inside the container to `/code`. This is where we will put our application files.

3.  **Copy Requirements:**

    ```dockerfile
    COPY ./requirements.txt /code/requirements.txt
    ```

    This copies the `requirements.txt` file from the host to the `/code` directory inside the container.

4.  **Install Dependencies:**

    ```dockerfile
    RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
    ```

    This command installs the required Python packages specified in the `/code/requirements.txt` file. The `--no-cache-dir` option prevents `pip` from caching downloaded packages inside the container, which reduces the image size. The `--upgrade` option upgrades the packages if they are already installed.

5.  **Install Playwright**

    ```dockerfile
    RUN playwright install
    RUN playwright install-deps
    ```

    This command will install playwright and its dependencies

6.  **Copy Application Code:**

    ```dockerfile
    COPY ./app /code/app
    ```

    This copies the `/app` directory from the host machine to the `/code/app` directory inside the container. This includes all the files for your FastAPI application.

7.  **Run Command**
    ```dockerfile
    CMD [ "fastapi","run","app/main.py","--port","80" ]
    ```
    This line specifies the command to run when the container starts, this will start the FastAPI application using `fastapi run app/main.py --port 80` command, which uses Uvicorn server.

## Building and Running the Docker Image

1.  **Build the Image:**

    ```bash
    docker build -t myimage .
    ```

    This command builds a Docker image with the tag `myimage`. The `.` at the end specifies that the Dockerfile is in the current directory.

2.  **Run the Container:**
    ```bash
    docker run -d --name mycontainer -p 80:80 myimage
    ```
    This command runs the Docker container:
    - `-d` runs the container in detached mode (in the background).
    - `--name mycontainer` gives the container a name.
    - `-p 80:80` maps port 80 on the host to port 80 in the container.
      You can access your FastAPI application at `http://localhost:80` (or your docker host ip).

## Accessing the FastAPI Application

After running the docker container, you can access your fastapi application through the port exposed. For example, accessing `http://localhost:80/docs` on your local machine will open the interactive docs of your FastAPI application.

## Links

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Docker Documentation](https://docs.docker.com/)
