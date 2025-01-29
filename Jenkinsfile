pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "netflix-app:${env.BRANCH_NAME}"  // Branch-specific Docker tags
        SONARQUBE_TOKEN = credentials('sonarqube-token') 
    }
    stages {
        // Stage 1: Code Clone
        stage('Code Clone') {
            steps {
                git url: 'https://github.com/sauravgarg547/netflix-fnt.git', 
                     branch: "${env.BRANCH_NAME}"
            }
        }

        // Stage 2: SonarQube Scan (Skip for feature branches)
        stage('Code Quality Check') {
            when { 
                not { branch 'feature/*' } 
            }
            steps {
                withSonarQubeEnv('sonarqube-server') {
                    sh """
                        sonar-scanner \
                        -Dsonar.projectKey=netflix-${env.BRANCH_NAME} \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://your-sonarqube-server:9000 \
                        -Dsonar.login=${SONARQUBE_TOKEN}
                    """
                }
            }
        }

        // Stage 3: Build Docker Image
        stage('Build') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }

        // Stage 4: Trivy Security Scan
        stage('Security Scan') {
            steps {
                sh """
                    trivy image --exit-code 1 \
                    --severity CRITICAL,HIGH \
                    ${DOCKER_IMAGE}
                """
            }
        }

        // Stage 5: Push to DockerHub (Only dev/main branches)
        stage('Push to DockerHub') {
            when { 
                anyOf { 
                    branch 'dev'; 
                    branch 'main' 
                } 
            }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub', 
                    usernameVariable: 'DOCKER_USER', 
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                        docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}
                        docker tag ${DOCKER_IMAGE} ${DOCKER_USER}/netflix-app:${env.BRANCH_NAME}
                        docker push ${DOCKER_USER}/netflix-app:${env.BRANCH_NAME}
                    """
                }
            }
        }
    }

    // Post-Build Actions
    post {
        always {
            cleanWs()  // Workspace clean karo
            sh "docker rmi -f ${DOCKER_IMAGE}"  // Local image delete karo
        }
        success {
            echo "✅ Pipeline successful! ${env.BRANCH_NAME} branch processed!"
        }
        failure {
            echo "❌ Pipeline failed! Check logs."
        }
    }
}
