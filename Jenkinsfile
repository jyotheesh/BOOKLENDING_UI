pipeline {

    agent any 

    stages {

        stage('checkout') { 

            steps {

                git url:'https://github.com/jyotheesh/BOOKLENDING_UI.git'

            }

        }

        
          stage('Build') { 

            steps {

                sh '''
              npm install
              ng build --base-href="./"

            '''

            }

        }
  stage('Deploy') { 

            steps {

                sh '''

                cd /var/lib/jenkins/workspace/pipeline-front-end/dist

                chmod -R 777 BookLendSystem

                cp -rf BookLendSystem /opt/apache-tomcat-9.0.26/webapps/

            '''

            }

        }

    }

}
