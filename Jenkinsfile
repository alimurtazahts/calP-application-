pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'calculator-app'
        DOCKER_REPO = 'your-dockerhub-username/calculator-app'
        EC2_HOST = 'your-ec2-public-ip'
        SSH_KEY = '/path/to/your-key.pem'
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/your-repo.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE} .'
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_CREDENTIALS_ID) {
                        sh 'docker tag ${DOCKER_IMAGE} ${DOCKER_REPO}'
                        sh 'docker push ${DOCKER_REPO}'
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    sh """
                    ssh -i ${SSH_KEY} ec2-user@${EC2_HOST} << EOF
                        docker pull ${DOCKER_REPO}
                        docker stop calculator-app || true
                        docker rm calculator-app || true
                        docker run -d -p 80:80 --name calculator-app ${DOCKER_REPO}
                    EOF
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
