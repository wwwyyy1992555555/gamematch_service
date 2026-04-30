package com.uogproject.gamematch_service.controller;

import com.uogproject.gamematch_service.entity.Companion;
import com.uogproject.gamematch_service.repository.CompanionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class CompanionController {
    
    @Autowired
    private CompanionRepository companionRepository;
    
    @GetMapping("/companions")
    public ResponseEntity<Map<String, Object>> getCompanions(
            @RequestParam(required = false) String gameType,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        List<Companion> allCompanions;
        if (gameType != null && !gameType.isEmpty()) {
            // 使用包含查询，支持逗号分隔的多个游戏类型
            allCompanions = companionRepository.findByGameTypesContainingAndIsOnlineTrue(gameType);
        } else {
            allCompanions = companionRepository.findByIsOnlineTrue();
        }
        
        // 手动分页
        int total = allCompanions.size();
        int fromIndex = (page - 1) * size;
        int toIndex = Math.min(fromIndex + size, total);
        
        List<Companion> pagedCompanions;
        if (fromIndex < total) {
            pagedCompanions = allCompanions.subList(fromIndex, toIndex);
        } else {
            pagedCompanions = List.of(); // 空列表
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("message", "success");
        response.put("data", pagedCompanions);
        response.put("total", total);
        response.put("page", page);
        response.put("size", size);
        response.put("hasMore", toIndex < total);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/companions/{id}")
    public ResponseEntity<Map<String, Object>> getCompanionDetail(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Companion companion = companionRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("陪玩师不存在"));
            
            response.put("code", 200);
            response.put("message", "success");
            response.put("data", companion);
        } catch (Exception e) {
            response.put("code", 404);
            response.put("message", e.getMessage());
            response.put("data", null);
        }
        
        return ResponseEntity.ok(response);
    }
}
