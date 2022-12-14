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

        stage("paso 1"){
            
              steps {
                  script {			
                  sh "echo 'hola mundo desde GIT'"
                  sh "pwd"
                  sh "ls -ltr"
                  
                  //sh 'dotnet build --source project/HolaMundo.csproj -c Release'
                  sh 'cp -r ./project /tmp/'
                  sh 'ls -ltr /tmp/project'
                  
                  sh 'cp -r /tmp/project .'    
                  sh 'pwd'
                  sh 'ls -ltr'
                  sh 'cat project/buil.sh'
                  sh 'dotnet --version'                  
                      //sh 'project/./buil.sh'
                  //def file_in_workspace = inputGetFile('Jenkinsfile');
                  //sh 'dotnet build --source /tmp/project/HolaMundo.csproj -c Release'
                  //dotnet build --source /tmp/project/HolaMundo.csproj -c Release
                  sh 'sleep 5'
                      
                }
              }
        }
        stage("paso 2"){
            
              steps {
                  script {			
                  sh "echo 'COMPILANDO'"   
                  sh 'pwd'
                  sh 'ls -ltr ./project'
                  //sh '/tmp/project/./buil.sh'
                  sh 'ls -ltr'   
                  sh 'sleep 5'                     
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
