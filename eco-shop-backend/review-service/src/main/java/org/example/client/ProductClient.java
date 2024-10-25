package org.example.client;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;



@FeignClient(name = "product-service", path = "/products")
public interface ProductClient {
    @PutMapping("/changingRatingProduct")
    ResponseEntity<String> changingRatingProduct(@RequestParam("productId") Long productId,@RequestParam("productRating") double productRating);
}
