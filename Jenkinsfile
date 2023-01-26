import groovy.json.JsonSlurperClassic

def jsonParse(def json) {
    new groovy.json.JsonSlurperClassic().parseText(json)
}

def ParametroUno
def ParametroDos
def task
def BUILDVERSION
def taskRun

pipeline {

    agent any 
    environment {
        appName = "variable" 
    }
    stages {
        
        
          stage("Paso lectura TAGs lambdas"){          
              steps {
                  script {			
                  sh "echo 'Inicio lectura de TAGS'"
                   try {
                     sh "aws lambda list-tags --resource arn:aws:lambda:us-east-1:134383757275:function:test"
                     //sh "echo fecha: ${BUILDVERSION}"

                           
                  } catch (Exception e) {
                     sh "echo error capturando arn definicion de tareas"
                     sh 'Handle the exception!'
                  }
                  //sh 'Handle the exception!'
                }
              }
        }
      
        
        
         stage("Paso 0 - Captura fecha"){          
              steps {
                  script {			
                  sh "echo 'hola mundo desde GIT'"
                   try {
                     BUILDVERSION = sh(script: "echo `date +%s`", returnStdout: true).trim()
                     //sh "taskDef=\$(aws cloudformation describe-stacks --stack-name mystacktestv1 --query Stacks[0].Outputs[0].OutputValue --output text)"  
                     //task= sh(script: "aws cloudformation describe-stacks --stack-name mystacktestv1 --query Stacks[0].Outputs[0].OutputValue --output text", returnStdout: true).trim()
                     sh "echo fecha: ${BUILDVERSION}"
                     //sh "echo task: ${task}"
                     //taskRun = sh(script: "aws ecs list-tasks --cluster 'ClusterCurso' --service 'ServicioUnoCurso' --output text --query taskArns[0]", returnStdout: true).trim()
                     //sh "aws ecs stop-task --cluster ClusterCurso --task ${taskRun}"
                           
                  } catch (Exception e) {
                     sh "echo error capturando arn definicion de tareas"
                     sh 'Handle the exception!'
                  }
                  //sh 'Handle the exception!'
                }
              }
        }

        
        
        
        stage("Paso 1 - Lectura de parametros"){          
              steps {
                  script {			
                  sh "echo 'hola mundo desde GIT'"
                  //sh "pwd"
                  //sh "ls -ltr"
                  sh "echo '##################Aca podemos hacer lectura de algunos parametros -- ##################' "      
                  ParametroUno="134383757275.dkr.ecr.us-east-1.amazonaws.com/juantestrepo1:netcoredemocurso-${BUILDVERSION}";
                  ParametroDos="134383757275.dkr.ecr.us-east-1.amazonaws.com/juantestrepo1:netcoredemocurso-v5";
                      
                }
              }
        }

        stage("paso 2 - Compilacion de codigo"){       
              steps {
                  script {			
                  sh "echo 'COMPILANDO CODIGO'"   
                  sh 'pwd'
                  //sh 'ls -ltr'
                  sh 'javac HolaMundo.java'
                  //sh 'ls -ltr'   
                  //sh 'sleep 5'             
                  sh 'jar -cf HolaMundo.jar HolaMundo.class'    
                  sh 'jar cmf temp.mf HolaMundo.jar HolaMundo.class'
                  sh 'java -jar HolaMundo.jar'
                  sh "echo '####Compilacion exitosa.. ###' "
                  sh 'cp HolaMundo.jar /tmp/'
                }
              }
        }

         stage("paso 3 - Compilacion de codigo en docker"){
            
              steps {
                  script {			
                      sh "echo '####################  --- COMPILANDO CODIGO NET CORE 6 --- ###########################'"      
                      sh "echo '####################  --- TOMA LA Configuracion del dockerbuild y genera una imagen nueva a partir de esa conf y el nombre que se pasa  --- ###########################'"    
                      //El codigo se descarga del repo y esta en la carpeta project
                      sh "docker build -t netcoredemocurso:${BUILDVERSION} ./project"    
                         //   try {
                         //       sh 'docker kill curso'
                         //        sh 'docker rm curso'
                         //   } catch (Exception e) {
                         //       echo 'Exception occurred: ' + e.toString()
                         //       //sh 'Handle the exception!'
                         //   }
                         //BUILDVERSION    
                         //Toma la imagen creada y le coloca el nombre "curso" al docker para identificar ese docker y lo arranca
                         //  sh "docker run -d --name curso -p 85:80 netcoredemocurso:${BUILDVERSION}"
                      sh "echo '################## --- Compilacion exitosa --- #################' "
                }
              }
        }

         stage("paso 4 - Cargar imagen docker a AWS ECR"){
            
              steps {
                  script {			
                    sh "echo '####################  --- Cargar imagen docker a AWS ECR --- ###########################'"      
                    sh "echo Login a AWS"
                    sh "aws sts get-caller-identity"
                    sh "echo Se loguea con las credenciales configuradas en el servidor para poder cargar la imagen al ECR"
                    sh "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 134383757275.dkr.ecr.us-east-1.amazonaws.com" 
                    //Si en el reposotirio ECR se tiene habilitado la opcion Tag immutability, se debe generar siempre un nuevo nombre o tag a la imagen
                    //Aca se toma la imagen creada en local y se tagea para que ecr la reconozca     
                    sh "docker tag netcoredemocurso:${BUILDVERSION} 134383757275.dkr.ecr.us-east-1.amazonaws.com/juantestrepo1:netcoredemocurso-${BUILDVERSION}"    
                    //Se carga la imagen al repo de AWS ECR, se identifica de acuerdo al tag generado    
                    sh "docker push 134383757275.dkr.ecr.us-east-1.amazonaws.com/juantestrepo1:netcoredemocurso-${BUILDVERSION}"
                    sh "echo '################# --- Carga al ECR exitosa --- #################' "
                    sh "echo '############################ Creacion o actualizacion del stack definicion de tareas ###############################'"
                    //El codigo se descarga del repo GIT 
                    try {
                        sh "echo aws cloudformation create-stack --stack-name mystacktestv1 --template-body file://infra.json --parameters ParameterKey=ParametroUno,ParameterValue='${ParametroUno}' ParameterKey=ParametroDos,ParameterValue=${ParametroDos}"
                        sh "aws cloudformation create-stack --stack-name mystacktestv1 --template-body file://infra.json --parameters ParameterKey=ParametroUno,ParameterValue='${ParametroUno}' ParameterKey=ParametroDos,ParameterValue='${ParametroDos}'"
                    } catch (Exception e) {
                        //Se actualiza la definicion de tareas con el nombre de la nueva imagen
                        sh "aws cloudformation update-stack --stack-name mystacktestv1 --template-body file://infra.json --parameters ParameterKey=ParametroUno,ParameterValue='${ParametroUno}' ParameterKey=ParametroDos,ParameterValue='${ParametroDos}'"
                    }   
                    //Se hace una espera de unos segundos mientras actualiza la informacion  
                    sh "sleep 30"     
                    sh "echo ################ -- ver nueva definicion de tarea con la nueva imagen con los cambios --####################"
                    task= sh(script: "aws cloudformation describe-stacks --stack-name mystacktestv1 --query Stacks[0].Outputs[0].OutputValue --output text", returnStdout: true).trim()
                    sh "echo task: ${task}"     
                }
              }
        }

        stage("paso 5 - Crear o actualiza el servicio ECS"){            
              steps {
                  script {			
                  sh "echo '####################  --- Actualizar servicio se pasa el valor de la nueva definicion de tareas --- ###########################'"      
                   try {
                     sh "echo aws cloudformation update-stack --stack-name ECS-Console-V2-Service-320872f3-1a3f-489b-af7a-bd36bf6b6e93 --template-body file://infra_service_albalancer_ecs.json --parameters ParameterKey=ParametroUno,ParameterValue='${task}' ParameterKey=ParametroDos,ParameterValue='${ParametroDos}'"
                     sh "aws cloudformation update-stack --stack-name ECS-Console-V2-Service-320872f3-1a3f-489b-af7a-bd36bf6b6e93 --template-body file://infra_service_albalancer_ecs.json --parameters ParameterKey=ParametroUno,ParameterValue='${task}'"
                     //Detener tareas actuales del servicio                    
                     taskRun = sh(script: "aws ecs list-tasks --cluster 'ClusterCurso' --service 'ServicioUnoCurso' --output text --query taskArns[0]", returnStdout: true).trim()
                     sh "aws ecs stop-task --cluster ClusterCurso --task ${taskRun}"

                  } catch (Exception e) {

                  }   
                                      
                      
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
