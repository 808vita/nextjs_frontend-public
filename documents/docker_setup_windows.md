# Docker Setup on Windows

This document outlines the steps to set up Docker on a Windows system.

## Prerequisites

- **Windows 10/11 64-bit:** Docker Desktop requires a 64-bit version of Windows 10 or 11 Pro, Enterprise, or Education. For Home editions, Docker Desktop may be installed with limitations or require WSL2 backend.
- **Hardware Virtualization:** Ensure that hardware virtualization is enabled in your computer's BIOS/UEFI settings.
- **WSL2 (Windows Subsystem for Linux 2):** WSL2 is highly recommended for better performance.

## Installation Steps

1.  **Download Docker Desktop:**

    - Go to the [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/) download page.
    - Download the installer.

2.  **Run the Installer:**

    - Double-click the downloaded `.exe` file to start the installation process.
    - Follow the on-screen instructions.
    - During installation, ensure you check the box to install with WSL2 backend , if prompted, or enable it if you have a windows pro edition.
    - Docker Desktop will install Docker Engine, Docker CLI, Docker Compose and other necessary components.

3.  **Restart Your System:**

    - After installation, you may be prompted to restart your computer. Do so to complete the setup.

4.  **Launch Docker Desktop:**

    - Search for "Docker Desktop" in the Windows start menu and run it.
    - The Docker Desktop app will start and may take a few minutes to initialize.

5.  **Verify Installation:**
    - Open PowerShell or Command Prompt.
    - Run the command `docker --version`.
    - If Docker is installed correctly, you'll see the version of Docker Engine.
    - Run the command `docker run hello-world`. This will download a test container image and run it to ensure that Docker is working correctly.

## Using Docker

- **Docker CLI:** You can use the Docker CLI (`docker`) from PowerShell or Command Prompt to manage images, containers, volumes, and more.
- **Docker Desktop GUI:** Docker Desktop provides a user-friendly interface to manage Docker resources.

## Common Issues

- **WSL2 Not Enabled:** If you encounter issues, ensure that WSL2 is installed and enabled. You can install WSL2 following Microsoft's documentation, and enable it in the Docker desktop settings.
- **Hardware Virtualization:** Docker requires hardware virtualization. If you experience errors related to virtualization, verify it is enabled in your BIOS/UEFI settings.
- **Conflicting Hypervisors:** Ensure other hypervisors (like Hyper-V if not used for WSL2) are disabled or configured to work correctly with Docker.

## Links

- [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
- [Install WSL](https://learn.microsoft.com/windows/wsl/install)
- [Docker Documentation](https://docs.docker.com/)
