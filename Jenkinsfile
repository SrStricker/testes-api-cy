pipeline{
    agent any

    stages {
        stage('instalar dependencias'){
            steps{
                sh 'npm install'
            }
        }
          stage('executar testes'){
            steps{
                sh 'NO_COLOR=1 npm run cy:run-ci | true'
                sh 'npm run cy:report'
            }
        }
        stage('relatorio'){
            steps{
                publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'mochawesome-report', reportFiles: 'report.html', reportName: 'teste api', reportTitles: '', useWrapperFileDirectly: true])
            }
        }
    }
}