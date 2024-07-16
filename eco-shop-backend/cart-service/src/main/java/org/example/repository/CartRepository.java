package org.example.repository;

import org.example.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {



    @Transactional
    @Modifying
    @Query("SELECT cart from Cart cart where cart.userId = :userId")
    List<Cart> findAllByUserId(Long userId);

    @Transactional
    @Modifying
    @Query("DELETE from Cart cart where cart.cartId IN :listCartId")
    void deleteAllCartByCartIds(List<Long> listCartId);
}
