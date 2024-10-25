package org.example.entity;

import jakarta.persistence.*;
import jdk.jfr.Enabled;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "reviews_table")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
