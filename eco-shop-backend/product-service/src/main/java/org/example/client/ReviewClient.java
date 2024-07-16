package org.example.client;


import org.example.dto.ReviewWithUsers;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "review-service", path = "/reviews")
public interface ReviewClient {
    @GetMapping("/getAllReviewsByProductId")
    ResponseEntity<List<ReviewWithUsers>> getAllReviewsByProductId(@RequestParam("productId") Long productId);

    @DeleteMapping("/deleteReviewsByProductId")
    ResponseEntity<String> deleteReviewsByProductId(@RequestParam("productId") Long productId);
}
