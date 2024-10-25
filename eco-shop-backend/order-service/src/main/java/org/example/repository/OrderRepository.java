package org.example.repository;

import org.example.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {


    @Query("SELECT order1 FROM Order order1 WHERE order1.userId = :userId ORDER BY order1.orderDateCreation DESC")
    List<Order> findByUserId(Long userId);

    @Query("SELECT order1 FROM Order order1 ORDER BY order1.orderDateCreation DESC")
    List<Order> findAllOrders();
}
