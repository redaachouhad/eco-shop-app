FROM openjdk:17-jdk-slim
WORKDIR /usr/app
COPY /target/*.jar product-service.jar
ENTRYPOINT ["java", "-jar", "product-service.jar"]