pipeline {
    agent any

    environment {
        APP_NAME       = 'logitics-hdt-frontend'
        DOCKER_IMAGE   = "kiakitakk/${APP_NAME}"
        KUSTOMIZE_FILE = 'apps/logitics-hdt/frontend/overlays/sit/kustomization.yaml'
        
        DOCKER_CRED_ID = 'docker-hub-kiakitakk'
        GITOPS_CRED_ID = 'gitlab-token'
        GITOPS_BRANCH  = 'main'
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def branchName = env.BRANCH_NAME ?: sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                    env.IMAGE_TAG = "${branchName}-${env.BUILD_NUMBER}"
                    sh "docker build -t ${DOCKER_IMAGE}:${env.IMAGE_TAG} ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: DOCKER_CRED_ID,
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                        echo "\$DOCKER_PASS" | docker login -u "\$DOCKER_USER" --password-stdin
                        docker push ${DOCKER_IMAGE}:${env.IMAGE_TAG}
                        docker logout
                    """
                }
            }
        }

        stage('Update GitOps') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: GITOPS_CRED_ID,
                    usernameVariable: 'GIT_USER',
                    passwordVariable: 'GIT_TOKEN'
                )]) {
                    sh """
                        rm -rf gitops-tmp
                        if command -v python3 >/dev/null 2>&1; then
                            ENCODED_TOKEN=\$(python3 -c "import urllib.parse, sys; print(urllib.parse.quote(sys.argv[1]))" "\$GIT_TOKEN")
                        elif command -v python >/dev/null 2>&1; then
                            ENCODED_TOKEN=\$(python -c "import urllib, sys; print urllib.quote(sys.argv[1])" "\$GIT_TOKEN")
                        else
                            ENCODED_TOKEN="\${GIT_TOKEN//#/%23}"
                            ENCODED_TOKEN="\${ENCODED_TOKEN//@/%40}"
                            ENCODED_TOKEN="\${ENCODED_TOKEN//:/%3A}"
                        fi
                        git clone https://\${GIT_USER}:\${ENCODED_TOKEN}@git.dnt.group/k8s/k8s-gitops.git gitops-tmp
                        cd gitops-tmp
                        yq e '.images[0].newTag = "${env.IMAGE_TAG}"' -i ${KUSTOMIZE_FILE}
                        git config user.email "jenkins@phuchoangmai.xyz"
                        git config user.name "Jenkins CI"
                        git add ${KUSTOMIZE_FILE}
                        git diff --cached --quiet || git commit -m "ci: update ${APP_NAME} to ${env.IMAGE_TAG}"
                        git push origin main
                        cd ..
                        rm -rf gitops-tmp
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Build thành công: ${DOCKER_IMAGE}:${env.IMAGE_TAG}"
            echo "⏳ ArgoCD sẽ tự Sync trong vài phút..."
        }
        failure { echo "❌ Build thất bại! Xem log ở trên." }
        always  { sh "docker rmi ${DOCKER_IMAGE}:${env.IMAGE_TAG} || true" }
    }
}
