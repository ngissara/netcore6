import groovy.json.JsonSlurperClassic

def jsonParse(def json) {
    new groovy.json.JsonSlurperClassic().parseText(json)
}

def ParametroUno
def ParametroDos
def task
def BUILDVERSION
def taskRun
String stringCode="";

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
                     
                     //sh "echo fecha: ${BUILDVERSION}"

                             
                      String a = "arn:aws:lambda:us-east-1:134383757275:function:test, arn:aws:lambda:us-east-1:134383757275:function:GreetingLambda, arn:aws:lambda:us-east-1:134383757275:function:ApagarEC2";
                      String[] str;
                      str = a.split(',');
                       int b=0;
                       for( String values : str ){
                           println(values);    
                           sh "aws lambda list-tags --resource ${values}|grep -o '\"id\": \"[^\"]*' |grep -o '[^\"]*\$'";                  
                           //stringCode=stringCode+';'+ values+'='+b;   
                           stringCode = stringCode.concat(";");
                           stringCode = stringCode.concat(values);
                           
                           b++;
                       }  
                       sh "echo ${stringCode}"
                       
                           
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


