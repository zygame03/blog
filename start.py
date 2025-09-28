import os
import subprocess
import threading

def start_backend():
    backend_cmd_dir = os.path.join(os.getcwd(), "backend", "cmd")
    subprocess.run(["go", "run", "main.go"], cwd=backend_cmd_dir, check=True)

def start_frontend():
    frontend_dir = os.path.join(os.getcwd(), "frontend")

    npm_cmd = "npm"
    if os.name == "nt":
        npm_cmd = "npm.cmd"
    subprocess.run([npm_cmd, "run", "dev"], cwd=frontend_dir, check=True)

def main():
    t1 = threading.Thread(target=start_backend)
    t2 = threading.Thread(target=start_frontend)

    t1.start()
    t2.start()

    t1.join()
    t2.join()

if __name__ == "__main__":
    main()
