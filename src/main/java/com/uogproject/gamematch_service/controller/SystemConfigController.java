package com.uogproject.gamematch_service.controller;

import com.uogproject.gamematch_service.service.SystemConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/config")
public class SystemConfigController {
    
    @Autowired
    private SystemConfigService systemConfigService;
    
    /**
     * 获取所有系统配置
     */
    @GetMapping
    public ResponseEntity<Map<String, String>> getAllConfigs() {
        Map<String, String> configs = systemConfigService.getAllConfigs();
        return ResponseEntity.ok(configs);
    }
    
    /**
     * 批量更新系统配置
     */
    @PostMapping
    public ResponseEntity<String> updateConfigs(@RequestBody Map<String, String> configs) {
        try {
            systemConfigService.updateConfigs(configs);
            return ResponseEntity.ok("配置更新成功");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("配置更新失败: " + e.getMessage());
        }
    }
}
