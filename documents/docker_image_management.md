# Managing Docker Images and Containers with Latest Changes

This document explains how to pull the latest changes into your Docker image and run it in a container, based on the provided `Dockerfile`.

## Workflow Overview

The typical workflow for updating your application with Docker involves the following steps:

1.  **Make Code Changes:** Modify your application code in the `app` directory.
2.  **Update Dependencies:** If necessary, update your `requirements.txt` file with new or modified dependencies.
3.  **Build a New Docker Image:** Use the `docker build` command to create a new Docker image with your latest changes.
4.  **Stop and Remove the Old Container:** If you have a running container, you need to stop and remove it.
5.  **Run the New Container:** Start a new container using the updated image.

## Step-by-Step Guide

### 1. Make Code Changes

- Modify the files in your `app` directory as needed. This is where your FastAPI application code resides.
- If you've added, removed, or updated any Python dependencies, also update the `requirements.txt` file.

### 2. Build a New Docker Image

- Open your terminal or command prompt in the same directory as your `Dockerfile`.
- Run the following command to build a new Docker image:

  ```bash
  docker build -t myimage .
  ```

  - `docker build`: This command initiates the build process.
  - `-t myimage`: This tags your image with the name `myimage`. You can choose any name you prefer.
  - `.`: The dot indicates that the `Dockerfile` is located in the current directory.

  **Explanation of the Build Process based on your `Dockerfile`:**

  - **Base Image**: The process begins with the `FROM python:3.13.1` line, using the official Python image as the base.
  - **Working Directory**: It sets the working directory inside the container with `WORKDIR /code`.
  - **Copy Requirements:** The `COPY ./requirements.txt /code/requirements.txt` copies the requirements file.
  - **Install Dependencies**: The `RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt` installs the required Python packages, leveraging pip's caching if available from the last build.
  - **Install Playwright**: the `RUN playwright install` and `RUN playwright install-deps` installs playwright browser automation and dependencies.
  - **Copy Application Code:** The `COPY ./app /code/app` copies your application code to `/code/app`.
  - **Command**: The `CMD [ "fastapi","run","app/main.py","--port","80" ]` specifies the command that will be used when the docker container is run.

  Docker uses a caching mechanism, so if your `requirements.txt` and/or the code in your `app` folder is unchanged, the corresponding steps will use the cached layer making build time faster.
  If the requirements.txt changes docker will not use the cache for this step or any following steps

### 3. Stop and Remove the Old Container (If Running)

- If you have a running container using the old image, you need to stop it first:

  ```bash
  docker stop mycontainer
  ```

  - `docker stop mycontainer`: This command stops the container named `mycontainer`. Replace `mycontainer` with the name of your container, if it's different.

- Remove the old container:

  ```bash
  docker rm mycontainer
  ```

  - `docker rm mycontainer`: This command removes the container named `mycontainer`. Replace `mycontainer` with the name of your container, if it's different.

### 4. Run the New Container

- Run a new container using the updated image:

  ```bash
  docker run -d --name mycontainer -p 80:80 myimage
  ```

  - `docker run`: This command starts a new container.
  - `-d`: Runs the container in detached mode (in the background).
  - `--name mycontainer`: Assigns the name `mycontainer` to the container.
  - `-p 80:80`: Maps port 80 on your host machine to port 80 inside the container.
  - `myimage`: Specifies the name of the Docker image to use.

  If you want to use the environment file use the below command
  ```bash
  docker run -d --name mycontainer --env-file .env -p 80:80 myimage

  ```

  ```

## Important Notes

- **Docker Cache:** Docker caches layers of your image during builds. If only your application code in `/app` has changed, docker will use the cache up to that point, speeding up the build process.
- **Image Tagging:** Tagging your images with meaningful names (e.g., `myimage:v1`, `myimage:latest`) helps manage different versions of your application.
- **Container Names:** Use descriptive container names to easily manage your containers.
- **Port Mapping:** Make sure the port mapping in the `docker run` command matches the port your FastAPI application is running on (80 in this case).

## Links

- [Docker Documentation](https://docs.docker.com/)
- [Docker build command](https://docs.docker.com/engine/reference/commandline/build/)
- [Docker run command](https://docs.docker.com/engine/reference/commandline/run/)
- [Docker stop command](https://docs.docker.com/engine/reference/commandline/stop/)
- [Docker rm command](https://docs.docker.com/engine/reference/commandline/rm/)
