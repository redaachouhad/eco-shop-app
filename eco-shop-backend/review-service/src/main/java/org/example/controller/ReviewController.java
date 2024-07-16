package org.example.controller;

import lombok.AllArgsConstructor;
import org.example.dto.ReviewWithUsers;
import org.example.entity.Review;
import org.example.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private ReviewService reviewService;

    @GetMapping("/getAllReviews")
    public ResponseEntity<List<Review>> getAllReviews() {
        return ResponseEntity.status(HttpStatus.OK).body(reviewService.getAllReviews());
    }

    @GetMapping("/getAllReviewsByProductId")
    public ResponseEntity<List<ReviewWithUsers>> getAllReviewsByProductId(@RequestParam("productId") Long productId){
        return ResponseEntity.status(HttpStatus.OK).body(reviewService.getAllReviewsByProductId(productId));
    }

    @PostMapping("/addReview")
    public ResponseEntity<String> addReview(@RequestParam("productId") Long productId, @RequestParam("userEmail") String userEmail, @RequestBody Review review) {
        System.out.println(review);
        reviewService.addReview(productId, userEmail, review);
        return ResponseEntity.status(HttpStatus.OK).body("The review is added successfully");
    }

    @DeleteMapping("/deleteReviewById")
    public ResponseEntity<String> deleteReviewById(@RequestParam("reviewId") Long reviewId){
        reviewService.deleteReviewById(reviewId);
        return ResponseEntity.status(HttpStatus.OK).body("The review with the id : "+reviewId+" is deleted successfully");
    }

    @DeleteMapping("/deleteReviewsByProductId")
    public ResponseEntity<String> deleteReviewsByProductId(@RequestParam("productId") Long productId){
        reviewService.deleteReviewsByProductId(productId);
        return ResponseEntity.status(HttpStatus.OK).body("successfully deleted");
    }

    @PutMapping("/updateReview")
    public ResponseEntity<String> updateReview(@RequestBody Review review){
        boolean updated = reviewService.updateReview(review);
        if (updated) {
            return ResponseEntity.status(HttpStatus.OK).body("the review is successfully updated");
        }
        return ResponseEntity.status(HttpStatus.OK).body("the review is not updated");
    }

}
