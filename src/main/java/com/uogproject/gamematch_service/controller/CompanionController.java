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
            @RequestParam(required = false) String gameType) {
        
        List<Companion> companions;
        if (gameType != null && !gameType.isEmpty()) {
            companions = companionRepository.findByGameTypeAndIsOnlineTrue(gameType);
        } else {
            companions = companionRepository.findByIsOnlineTrue();
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("message", "success");
        response.put("data", companions);
        
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
