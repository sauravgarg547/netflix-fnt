pipeline {
    agent any
    stages {
        stage('Code clone') {
            steps {
                git url: 'https://github.com/sauravgarg547/netflix-fnt.git', branch: 'main'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t netflix-app:latest .'
            }
        }

        stage('Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'dockerHubUser', passwordVariable: 'dockerHubPass')]) {
                    sh 'docker login -u ${dockerHubUser} -p ${dockerHubPass}'
                    sh 'docker image tag netflix-app:latest ${dockerHubUser}/netflix-app:latest'
                    sh 'docker push ${dockerHubUser}/netflix-app:latest'
                }
            }
        }
    }
}
