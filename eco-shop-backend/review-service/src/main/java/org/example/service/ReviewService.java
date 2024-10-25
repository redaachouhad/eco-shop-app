package org.example.service;

import lombok.AllArgsConstructor;
import org.example.client.ProductClient;
import org.example.client.UserClient;
import org.example.dto.ReviewWithUsers;
import org.example.dto.UserEntity;
import org.example.entity.Review;
import org.example.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ReviewService {
    private ReviewRepository reviewRepository;
    private UserClient userClient;
    private ProductClient productClient;

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public void addReview(Long productId, String userEmail, Review review) {
        UserEntity userEntity = userClient.getUser(userEmail).getBody();
        Review reviewUpdated = Review.builder()
                .reviewUserId(userEntity.getUserId())
                .reviewProductId(productId)
                .reviewTitle(review.getReviewTitle())
                .reviewDescription(review.getReviewDescription())
                .reviewRating(review.getReviewRating())
                .reviewVerifiedPurchase(review.isReviewVerifiedPurchase())
                .reviewCreationDate(new Date())
                .build();
        reviewRepository.save(reviewUpdated);
        computeRatingProduct(productId);
    }

    public void deleteReviewById(Long reviewId) {
        Long productId = reviewRepository.findById(reviewId).get().getReviewProductId();
        reviewRepository.deleteById(reviewId);
        computeRatingProduct(productId);
    }

    public List<ReviewWithUsers> getAllReviewsByProductId(Long productId) {
        List<ReviewWithUsers> reviewWithUsersList = new ArrayList<>();
        List<Review> reviews = reviewRepository.findAllByReviewProductId(productId);
        List<Long> usersIds = reviews.stream().map(Review::getReviewUserId).toList();
        List<UserEntity> users = userClient.getUsersByIdsList(usersIds).getBody();
        if (users == null) {
            return reviewWithUsersList;
        }
        Map<Long, UserEntity> userMap = users.stream().collect(Collectors.toMap(UserEntity::getUserId, user -> user));
        for (Review review : reviews) {
            ReviewWithUsers reviewWithUsers = ReviewWithUsers.builder()
                    .review(review)
                    .userEntity(userMap.get(review.getReviewUserId()))
                    .build();

            reviewWithUsersList.add(reviewWithUsers);
        }
        return reviewWithUsersList;
    }


    public void deleteReviewsByProductId(Long productId) {
        reviewRepository.deleteReviewsByProductId(productId);
    }

    public boolean updateReview(Review review) {
        Review reviewToUpdated = Review.builder()
                .reviewId(review.getReviewId())
                .reviewUserId(review.getReviewUserId())
                .reviewProductId(review.getReviewProductId())
                .reviewTitle(review.getReviewTitle())
                .reviewDescription(review.getReviewDescription())
                .reviewCreationDate(new Date())
                .reviewVerifiedPurchase(review.isReviewVerifiedPurchase())
                .reviewRating(review.getReviewRating())
                .build();
        reviewRepository.save(reviewToUpdated);
        computeRatingProduct(review.getReviewProductId());
        return true;
    }

    public void computeRatingProduct(Long productId){
        List<Review> reviews = reviewRepository.findAllByReviewProductId(productId);
        double productRating = 0.0;
        if (!reviews.isEmpty()){
            for(Review review: reviews){
                productRating += review.getReviewRating();
            }
            productRating = productRating/(reviews.size()*1.0);
        }
        productClient.changingRatingProduct(productId, productRating);
    }
}
