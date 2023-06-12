pipeline{
    agent any

    stages {
        stage('instalar dependencias'){
            steps{
                pipeline{
    agent any

    stages {
        stage('instalar dependencias'){
            steps{
                git branch: 'main', url: 'https://github.com/SrStricker/testes-api-cy.git'
                sh 'npm install'
            }
        }
          stage('executar testes'){
            steps{
                sh 'npx start-server-and-test start http://localhost:3000/ test | true'
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
