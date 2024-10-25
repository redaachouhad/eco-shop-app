package org.example.service;

import lombok.AllArgsConstructor;
import org.example.client.CartClient;
import org.example.client.UserClient;
import org.example.dto.*;
import org.example.entity.BoughtProduct;
import org.example.entity.Order;
import org.example.repository.BoughtProductRepository;
import org.example.repository.OrderRepository;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;


import java.math.BigDecimal;
import java.util.*;


@AllArgsConstructor
@Service
public class OrderService {
    private OrderRepository orderRepository;
    private BoughtProductRepository boughtProductRepository;
    private CartClient cartClient;
    private UserClient userClient;
    private final KafkaTemplate<String, OrderWithUserWithBoughtProducts> kafkaTemplate;

    public void makingOrder(List<CartWithProduct> cartWithProductList) {
        BigDecimal totalAmount = BigDecimal.ZERO;
        for (CartWithProduct item : cartWithProductList) {
            totalAmount = totalAmount.add(
                    item.getCart().getPricePerUnit().multiply(new BigDecimal(item.getCart().getSelectedProductQuantity()))
            );
        }


        Order order = Order.builder()
                .userId(cartWithProductList.get(0).cart.getUserId())
                .orderDateCreation(new Date())
                .orderTotalAmount(totalAmount)
                .build();
        Order savedOrder = orderRepository.save(order);
        Long idOfSavedOrder = savedOrder.getOrderId();

        List<BoughtProduct> boughtProductList = new ArrayList<>();
        List<Cart> cartList = new ArrayList<>();

        for (CartWithProduct item : cartWithProductList) {
            BoughtProduct boughtProduct = BoughtProduct.builder()
                    .orderId(idOfSavedOrder)
                    .productId(item.getProduct().getProductId())
                    .boughtProductQuantity(item.getCart().getSelectedProductQuantity())
                    .boughtProductPricePerUnit(item.getProduct().getProductPrice())
                    .productName(item.getProduct().getProductTitle())
                    .build();
            boughtProductList.add(boughtProduct);
            cartList.add(item.cart);
        }
        cartClient.deleteListOfProductOfCart(cartList);


        UserEntity userEntity = userClient.getUserById(savedOrder.getUserId()).getBody();

        OrderWithUserWithBoughtProducts orderWithUserWithBoughtProducts = OrderWithUserWithBoughtProducts.builder()
                .userEntity(userEntity)
                .order(savedOrder)
                .boughtProductList(boughtProductList)
                .build();

        kafkaTemplate.send("orderPlacedTopic", orderWithUserWithBoughtProducts);

        boughtProductRepository.saveAll(boughtProductList);
    }

    public List<Order> getOrdersByUserId(String userEmail) {
        Long userId = Objects.requireNonNull(userClient.getUser(userEmail).getBody()).getUserId();
        return orderRepository.findByUserId(userId);
    }

    public OrderWithUserWithBoughtProducts getOneOrderByOrderIdWithDetails(Long orderId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isEmpty()) {
            return OrderWithUserWithBoughtProducts.builder().build();
        }
        UserEntity userEntity = userClient.getUserById(orderOptional.get().getUserId()).getBody();
        List<BoughtProduct> boughtProductList = boughtProductRepository.findAllByOrderId(orderId);
        if (boughtProductList.isEmpty()) {
            return OrderWithUserWithBoughtProducts.builder().build();
        }

        return OrderWithUserWithBoughtProducts.builder()
                .userEntity(userEntity)
                .order(orderOptional.get())
                .boughtProductList(boughtProductList)
                .build();
    }

    public List<Order> getAllOrderAdmin() {
        return orderRepository.findAllOrders();
    }
}
