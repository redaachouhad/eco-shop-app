package org.example.respository;

import org.example.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByPropertyProductId(Long productId);

    @Transactional
    @Modifying
    @Query("DELETE from Property p where p.propertyProductId IN :idProductList")
    void deleteAllByPropertyProductIdList(List<Long> idProductList);


    @Transactional
    @Modifying
    @Query("DELETE from Property p where p.propertyProductId = :productId")
    void deleteAllPropertiesForOneProduct(Long productId);
}
