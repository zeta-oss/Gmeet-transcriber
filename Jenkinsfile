pipeline {
    environment {
        NODE_VERSION="18.9.0"
    }
    agent any
    stages {
        stage('git clone') {
            steps {
                git clone https://preeti_dev@bitbucket.org/zetaengg/gmeet-transcribe.git
            }
        }
        stage('docker build') {
            steps {
                docker build . -f Dockerfile -t transcribe
            }
        }
        stage('docker run') { 
            steps {
                docker run transcribe 
            }
        }
    }
}