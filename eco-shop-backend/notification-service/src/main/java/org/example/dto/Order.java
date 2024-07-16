package org.example.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder

public class Order {
    private Long orderId;
    private Long userId;
    private Date orderDateCreation;
    private BigDecimal orderTotalAmount;
}
