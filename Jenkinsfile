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
                       //int b=0;
                       for( String values : str ){
                           //Values es el arn de cada lambda
                           println(values);                               
                           def codeVersion = sh(script: "aws lambda list-tags --resource ${values}|grep -o '\"id\": \"[^\"]*' |grep -o '[^\"]*\$'", returnStdout: true).trim()
                           //sh "aws lambda list-tags --resource ${values}|grep -o '\"id\": \"[^\"]*' |grep -o '[^\"]*\$'";                             
                           def valor=values+'='+codeVersion+';';   
                           println(valor);
                           stringCode = stringCode+valor;
                           //Supongo que aca se actualiza las lambdas cuando se hace deploy de la infra
                           def codeFuncionUpdate="1.0.0";
                           sh "aws lambda tag-resource --resource ${values} --tags VersionCode=${codeFuncionUpdate}"
                           //b++;
                       }  
                       sh "echo Termina ejecucion"
                        println(stringCode);
                       //sh "echo ${stringCode}"
                      
                       sh "echo 'Se espera a que se validen los datos actuales'"
                       sh "sleep 190"
                       
                       
                           
                  } catch (Exception e) {
                     sh "echo error capturando arn definicion de tareas"
                     sh 'Handle the exception!'
                  }
                  //sh 'Handle the exception!'
                }
              }
        }
       
            stage("Paso lectura TAGs lambdas  mas Codigo tag"){          
              steps {
                  script {			
                  sh "echo 'Inicio lectura de TAGS'"
                   try {     
                      String a = stringCode;
                      String[] str;
                      str = a.split(';');                       
                       for( String values : str ){
                           println('Lambda arn mas codigo:'+values);    
                           //Se realiza un split para separar arn y codigo
                           String[] strArnCode;
                           strArnCode = values.split('=');
                           def arnFuncion=strArnCode[0];
                           def codeFuncion=strArnCode[1];
                           println("Funcion:"+arnFuncion);
                           println("Code:"+codeFuncion);                           
                           //Lanzar codigo actualizar lambda code     
                           sh "aws lambda tag-resource --resource ${arnFuncion} --tags VersionCode=${codeFuncion}"
                           
                       }  
                       sh "echo Termina ejecucion update lambdacodeversion"                                           
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


