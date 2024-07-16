package org.example.repository;

import org.example.entity.BoughtProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoughtProductRepository extends JpaRepository<BoughtProduct, Long> {
    @Query("SELECT boughtProduct FROM BoughtProduct boughtProduct WHERE boughtProduct.orderId = :orderId")
    List<BoughtProduct> findAllByOrderId(Long orderId);
}
