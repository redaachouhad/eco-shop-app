package org.example.client;

import org.example.dto.Cart;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


@FeignClient(name = "cart-service", path = "/carts")
public interface CartClient {
    @PostMapping("/deleteListOfCart")
    ResponseEntity<String> deleteListOfProductOfCart(@RequestBody List<Cart> listCarts);
}