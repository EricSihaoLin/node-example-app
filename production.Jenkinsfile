def label = "node-app-builder-${UUID.randomUUID().toString()}"

podTemplate(label: label, containers: [
  containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
],
volumes: [
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')
]) {
  node(label) {
    stage('Cloning production repository') {
      git branch: 'production', url: "https://github.com/EricSihaoLin/node-example-app"
    }

    stage('Create Docker image for production') {
      container('docker') {
        withCredentials([[$class: 'UsernamePasswordMultiBinding',
          credentialsId: 'mainlandhero-dockerhub',
          usernameVariable: 'DOCKER_HUB_USER',
          passwordVariable: 'DOCKER_HUB_PASSWORD']]) {
          sh """
            docker login -u ${DOCKER_HUB_USER} -p ${DOCKER_HUB_PASSWORD}
            docker build -t mainlandhero/node-example-app:production -f production.Dockerfile .
            docker push mainlandhero/node-example-app:production
            """
        }
      }
    }
  }
}
