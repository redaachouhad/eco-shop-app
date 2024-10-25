package org.example.controller;


import lombok.AllArgsConstructor;
import org.example.dto.CartWithProduct;
import org.example.dto.OrderWithUserWithBoughtProducts;
import org.example.entity.Order;
import org.example.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/orders")
public class OrderController {
    private OrderService orderService;


    @GetMapping("/getAllOrderAdmin")
    public ResponseEntity<List<Order>> getAllOrderAdmin(){
        return ResponseEntity.status(HttpStatus.OK).body(orderService.getAllOrderAdmin());
    }

    @GetMapping("/getOrdersByUserId")
    public ResponseEntity<List<Order>> getOrdersByUserId(@RequestParam("userEmail") String userEmail){
        return ResponseEntity.status(HttpStatus.OK).body(orderService.getOrdersByUserId(userEmail));
    }


    @PostMapping("/makingOrder")
    public ResponseEntity<String> makingOrder(@RequestBody List<CartWithProduct> cartWithProductList){
        System.out.println(cartWithProductList);
        orderService.makingOrder(cartWithProductList);
        return ResponseEntity.status(HttpStatus.OK).body("the order is added successfully");
    }

    @GetMapping("/getOneOrderByOrderIdWithDetails")
    public ResponseEntity<OrderWithUserWithBoughtProducts> getOneOrderByOrderIdWithDetails(@RequestParam("orderId") Long orderId){
        return ResponseEntity.status(HttpStatus.OK).body(orderService.getOneOrderByOrderIdWithDetails(orderId));
    }
}
