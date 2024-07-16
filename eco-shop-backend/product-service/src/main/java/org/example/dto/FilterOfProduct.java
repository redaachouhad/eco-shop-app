package org.example.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.util.Objects;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder

public class FilterOfProduct {
    Integer size;
    Integer page;
    Integer filterMinPrice;
    Integer filterMaxPrice;
    Integer filterCategory;
    Integer filterSortedBy;






}
