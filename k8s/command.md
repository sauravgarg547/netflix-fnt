
<h1 align="center">Deployment Netflix Frontend Application on Kubernets✨</h1>

![Demo App](https://i.imgur.com/FLNs9Qy.jpg))




## 🚀 Getting Started

# **Netflix-Inspired Project on Kubernetes**

This guide provides complete steps to deploy your Netflix-inspired project on Kubernetes using `kind` and `kubectl`.

---

## **Prerequisites**
- Install [Docker](https://docs.docker.com/get-docker/)
- Install [kubectl](https://kubernetes.io/docs/tasks/tools/)
- Install [kind](https://kind.sigs.k8s.io/)

---

# 🛠 Installation
## 1. Creating and Managing Kubernetes Cluster with Kind
- Create a 3-node Kubernetes cluster using Kind config file inside k8s folder:

  ```bash
  kind create cluster --config=config.yml
  ```

- Check cluster information:
  ```bash
  kubectl cluster-info --context kind-kind
  ```
  ```bash
  kubectl get nodes
  ```
  ```bash
  kind get clusters
  ```

---

## 2. Installing kubectl

- Download `kubectl` for managing Kubernetes clusters:
  ```bash
  curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.19.6/2021-01-05/bin/linux/amd64/kubectl
  ```
  ```bash
  chmod +x ./kubectl
  ```
  ```bash
  sudo mv ./kubectl /usr/local/bin
  ```
  ```bash
  kubectl version --short --client
  ```

---

## 3. Managing Docker and Kubernetes Pods

  ```bash
  sudo usermod -aG docker $USER && newgrp docker
  ```
- Check Docker containers running:
  ```bash
  docker ps
  ```

- List all Kubernetes pods in all namespaces:
  ```bash
  kubectl get pods -A
  ```

---

1. **Clone the Repository**

```bash
git clone https://github.com/sauravgarg547/netflix-fnt.git
```
```bash
cd netflix-fnt
```

2. **Go to K8s folder and run command**

```bash
cd k8s
```
3. **Apply Namespace**
-Create a namespace for the project to organize resources.

```bash
kubectl apply -f namespace.yml
```

4. **Apply Deployment**

-Create a deployment for the application.
```bash
kubectl apply -f deployment.yml
```

5. **Apply Service**
-Create a service for the deployment to expose it to the outside world.
```bash
kubectl apply -f service.yml
```
 6. **Port Forwarding**
 -Forward a local port to the service port to access the application from outside the cluster.

 -Forward local port 3000 to the service in the ott namespace, making it accessible on 0.0.0.0.

```bash
kubectl port-forward service/netflix-service -n ott 3000:3000 --address=0.0.0.0
```

## Access the Application 
-Open a web browser and navigate to `http://<your-ip>:3000` to access the application





Feel free to reach out if you have any questions or feedback on Linkdin 
@Sauravgarg547 or Sauravgarg5922@gmail.com. Happy Learning Devops!

---
