package com.uogproject.gamematch_service.repository;

import com.uogproject.gamematch_service.entity.Companion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanionRepository extends JpaRepository<Companion, Long> {
    
    List<Companion> findByGameTypeAndIsOnlineTrue(String gameType);
    
    List<Companion> findByIsOnlineTrue();
}
