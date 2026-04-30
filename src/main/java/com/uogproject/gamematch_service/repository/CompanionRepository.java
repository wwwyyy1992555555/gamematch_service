package com.uogproject.gamematch_service.repository;

import com.uogproject.gamematch_service.entity.Companion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanionRepository extends JpaRepository<Companion, Long> {
    
    // 根据游戏类型查找（支持逗号分隔的多个类型）
    List<Companion> findByGameTypesContainingAndIsOnlineTrue(String gameType);
    
    // 查找所有在线陪玩师
    List<Companion> findByIsOnlineTrue();
    
    // 根据游戏类型查找（不过滤在线状态，用于管理员后台）
    List<Companion> findByGameTypesContaining(String gameType);
    
    // 根据昵称、标签、游戏类型模糊搜索（用于管理员后台）
    @org.springframework.data.jpa.repository.Query("SELECT c FROM Companion c WHERE " +
            "(:keyword IS NULL OR :keyword = '' OR " +
            "LOWER(c.nickname) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(c.tags) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(c.gameTypes) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Companion> searchByKeyword(@org.springframework.data.repository.query.Param("keyword") String keyword);
}
