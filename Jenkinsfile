pipeline{
    agent any

    stages {
        stage('setup'){
            steps{
                sh 'npm install'
            }
        }
        stage('executar testes'){
            steps{
                sh 'NO_COLOR=1 npm run cy:run-ci'
                sh 'npm test'            
            }
        }
    }
}