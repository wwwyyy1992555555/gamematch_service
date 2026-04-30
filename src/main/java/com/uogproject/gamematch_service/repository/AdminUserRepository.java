package com.uogproject.gamematch_service.repository;

import com.uogproject.gamematch_service.entity.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {
    
    Optional<AdminUser> findByUsername(String username);
    
    boolean existsByUsername(String username);
    
    boolean existsByUsernameAndIdNot(String username, Long id);
    
    java.util.List<AdminUser> findByRole(Integer role);
}
