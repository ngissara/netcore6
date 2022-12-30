import groovy.json.JsonSlurperClassic

def jsonParse(def json) {
    new groovy.json.JsonSlurperClassic().parseText(json)
}
pipeline {

    agent any 
    environment {
        appName = "variable" 
    }
    stages {

        stage("Paso 1 - Lectura de parametros"){          
              steps {
                  script {			
                  sh "echo 'hola mundo desde GIT'"
                  sh "pwd"
                  sh "ls -ltr"
                  sh "echo '##################Aca podemos hacer lectura de algunos parametros -- ##################' "
      
                      
                }
              }
        }
        stage("paso 2 - Compilacion de codigo"){
            
              steps {
                  script {			
                  sh "echo 'COMPILANDO CODIGO'"   
                  sh 'pwd'
                  sh 'ls -ltr'
                  sh 'javac HolaMundo.java'
                  sh 'ls -ltr'   
                  sh 'sleep 5'             
                  sh 'jar -cf HolaMundo.jar HolaMundo.class'    
                  sh 'jar cmf temp.mf HolaMundo.jar HolaMundo.class'
                  sh 'ls -ltr'
                  sh 'java -jar HolaMundo.jar'
                  sh "echo '####Compilacion exitosa ###' "
                  sh 'cp HolaMundo.jar /tmp/'
                }
              }
        }
         stage("paso 3 - Compilacion de codigo en docker"){
            
              steps {
                  script {			
                  sh "echo 'COMPILANDO CODIGO'"   
                  sh 'pwd'
                  sh 'ls -ltr'
                  //sh 'cd ./project'
                  sh 'ls -ltr'   
                  sh 'pwd'
                  sh 'sleep 5'
                      
                  sh 'docker build -t netcoredemocurso:v5 ./project'    
                  sh 'docker run -d -p 86:80 netcoredemocurso:v5'
                  sh "echo '####Compilacion exitosa ###' "
                }
              }
        }
    }
    post {

          always {          
              deleteDir()
              sh "echo 'ESTA FASE SIEMPRE SE EJECUTA SIN IMPORTAR SI FUE FALLIDO O NO'"
              sh "ls -ltr"
          }
          success {
                sh "echo 'ESTA FASE SE EJECUTA SOLAMENTE SI FUE EXITOSO'"
                sh "ls -ltr"
            }

          failure {
                sh "echo 'ESTA FASE SE EJECUTA SI FUE FALLIDO'"
                sh "ls -ltr"
          }
        
    }
}  

def inputGetFile(String savedfile = null) {
    def filedata = null
    def filename = null
    // Get file using input step, will put it in build directory
    // the filename will not be included in the upload data, so optionally allow it to be specified

    if (savedfile == null) {
        def inputFile = input message: 'Upload file', parameters: [file(name: 'library_data_upload'), string(name: 'filename', defaultValue: 'demo-backend-1.0-SNAPSHOT.jar')]
        filedata = inputFile['library_data_upload']
        filename = inputFile['filename']
    } else {
        def inputFile = input message: 'Upload file', parameters: [file(name: 'library_data_upload')]
        filedata = inputFile
        filename = savedfile
    }

    // Read contents and write to workspace
    writeFile(file: filename, encoding: 'Base64', text: filedata.read().getBytes().encodeBase64().toString())
    // Remove the file from the master to avoid stuff like secret leakage
    filedata.delete()
    return filename
}
