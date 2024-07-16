FROM openjdk:17-jdk-slim
WORKDIR /usr/app
COPY /target/*.jar eureka-service.jar
ENTRYPOINT ["java", "-jar", "eureka-service.jar"]