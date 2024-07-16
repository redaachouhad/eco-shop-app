package org.example.client;

import org.example.dto.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigInteger;
import java.util.List;

@FeignClient(name = "product-service", path = "/products")
public interface ProductClient {
    @PostMapping("/getAllSimpleProductById")
    ResponseEntity<List<Product>> getAllSimpleProductById(@RequestBody List<Long> listOfIds);

    @PostMapping("/changingRemainingQuantity")
    ResponseEntity<Integer> changingRemainingQuantity(@RequestParam("productId") Long productId, @RequestParam("operation") Integer operation, @RequestBody BigInteger quantityToOrder);
}
