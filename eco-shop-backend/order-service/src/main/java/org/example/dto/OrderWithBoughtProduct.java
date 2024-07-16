package org.example.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.entity.BoughtProduct;
import org.example.entity.Order;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class OrderWithBoughtProduct {
    private Order order;
    private List<BoughtProduct> boughtProductList;
}
