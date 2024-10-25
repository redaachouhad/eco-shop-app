package org.example.repository;

import org.example.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Transactional
    @Modifying
    @Query("SELECT review from Review review where review.reviewProductId = :productId")
    List<Review> findAllByReviewProductId(Long productId);

    @Transactional
    @Modifying
    @Query("DELETE from Review review where review.reviewProductId = :productId")
    void deleteReviewsByProductId(Long productId);
}
