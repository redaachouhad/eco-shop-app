package org.example;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.example.dto.BoughtProduct;
import org.example.dto.OrderWithUserWithBoughtProducts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.math.BigDecimal;
import java.util.List;


@EnableDiscoveryClient
@SpringBootApplication

public class NotificationServiceApplication {
    @Autowired
    private JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    public NotificationServiceApplication(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }


    public static void main(String[] args) {
        SpringApplication.run(NotificationServiceApplication.class, args);
    }
    @KafkaListener(topics = "orderPlacedTopic", groupId = "orderPlacedId")
    public void handleNotification(OrderWithUserWithBoughtProducts orderPlaced) throws MessagingException{

        Context context = new Context();
        String htmlBody = templateEngine.process("template", context);
        htmlBody = htmlBody.replace("orderId", orderPlaced.getOrder().getOrderId().toString());
        htmlBody = htmlBody.replace("orderDate", orderPlaced.getOrder().getOrderDateCreation().toString());
        htmlBody = htmlBody.replace("givenName", orderPlaced.getUserEntity().getGivenName());
        htmlBody = htmlBody.replace("familyName", orderPlaced.getUserEntity().getFamilyName());
        htmlBody = htmlBody.replace("totalPrice", orderPlaced.getOrder().getOrderTotalAmount().toString());
        htmlBody = htmlBody.replace("boughtProductList", generateHtmlForBoughtProducts(orderPlaced));
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(orderPlaced.getUserEntity().getUserEmail());
        helper.setSubject("Order placed successfully");
        helper.setText(htmlBody, true);
        System.out.println("email is sent !");
        mailSender.send(message);

    }


    public String generateHtmlForBoughtProducts(OrderWithUserWithBoughtProducts orderPlaced){
        List<BoughtProduct> boughtProductList = orderPlaced.getBoughtProductList();
        String htmlContentForBoughtProduct = "";
        for (BoughtProduct item:boughtProductList){
            htmlContentForBoughtProduct = htmlContentForBoughtProduct.concat(
                    "<tr>\n" +
                    "                                <td style='border: 1px solid black; padding: 8px; border-radius: 6px;'>\n" +
                    "                                    <p style='font-size: 1.125rem; font-weight: bold'>" + item.getProductName() + "</p>\n" +
                    "                                    <table border='0' cellpadding='0' cellspacing='0' width='100%' style='font-size: 0.875rem;'>\n" +
                    "                                        <tr>\n" +
                    "                                            <td style='text-align: left'>Quantity: <strong>"+item.getBoughtProductQuantity()+"</strong></td>\n" +
                    "                                            <td style='text-align: center'>Price per unit: <strong>"+item.getBoughtProductPricePerUnit()+" $</strong></td>\n" +
                    "                                            <td style='text-align: right'>Total price: <strong>"+item.getBoughtProductPricePerUnit().multiply(new BigDecimal(item.getBoughtProductQuantity()))+" $</strong></td>\n" +
                    "                                        </tr>\n" +
                    "                                    </table>\n" +
                    "                                </td>\n" +
                    "                            </tr>");
        }
        return htmlContentForBoughtProduct ;

    }



}