package org.example.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Review {
    private Long reviewId;
    private Long reviewUserId;
    private Long reviewProductId;
    @Column(length = 100)
    private String reviewTitle;
    @Column(length = 500)
    private String reviewDescription;
    private double reviewRating;
    private boolean reviewVerifiedPurchase;
    private Date reviewCreationDate;
}
