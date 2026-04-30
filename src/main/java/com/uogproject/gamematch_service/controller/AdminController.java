package com.uogproject.gamematch_service.controller;

import com.uogproject.gamematch_service.dto.AdminAddRequest;
import com.uogproject.gamematch_service.dto.AdminLoginRequest;
import com.uogproject.gamematch_service.dto.AdminLoginResponse;
import com.uogproject.gamematch_service.entity.AdminUser;
import com.uogproject.gamematch_service.entity.Companion;
import com.uogproject.gamematch_service.repository.CompanionRepository;
import com.uogproject.gamematch_service.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 管理员控制器
 */
@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    
    @Autowired
    private CompanionRepository companionRepository;

    /**
     * 管理员登录接口
     *
     * @param request 登录请求参数
     * @return 登录响应结果
     */
    @PostMapping("/login")
    public ResponseEntity<AdminLoginResponse> login(@RequestBody AdminLoginRequest request) {
        try {
            AdminLoginResponse response = adminService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(null);
        }
    }

    /**
     * 获取管理员列表
     */
    @GetMapping("/admins")
    public ResponseEntity<List<AdminUser>> getAdmins(
            @RequestParam(required = false) String username) {
        List<AdminUser> admins;
        if (username != null && !username.isEmpty()) {
            // 按用户名模糊搜索
            admins = adminService.searchAdminsByUsername(username);
        } else {
            // 获取所有管理员
            admins = adminService.getAllAdmins();
        }
        return ResponseEntity.ok(admins);
    }

    /**
     * 新增管理员（包含头像上传）
     */
    @PostMapping(value = "/admin", consumes = "multipart/form-data")
    public ResponseEntity<Map<String, Object>> addAdmin(AdminAddRequest request) {
        Map<String, Object> result = new HashMap<>();
        try {
            AdminUser admin = adminService.addAdminWithAvatar(request);
            result.put("success", true);
            result.put("message", "添加成功");
            result.put("data", admin);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(result);
        }
    }

    /**
     * 删除管理员
     */
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Map<String, Object>> deleteAdmin(@PathVariable Long id) {
        Map<String, Object> result = new HashMap<>();
        try {
            adminService.deleteAdmin(id);
            result.put("success", true);
            result.put("message", "删除成功");
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(result);
        }
    }

    /**
     * 更新管理员（包含头像上传）
     */
    @PutMapping(value = "/admin/{id}", consumes = "multipart/form-data")
    public ResponseEntity<Map<String, Object>> updateAdmin(
            @PathVariable Long id,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String password,
            @RequestParam(required = false) Integer role,
            @RequestParam(required = false) MultipartFile avatarFile) {
        Map<String, Object> result = new HashMap<>();
        try {
            AdminUser admin = adminService.updateAdminWithAvatar(id, username, password, role, avatarFile);
            result.put("success", true);
            result.put("message", "更新成功");
            result.put("data", admin);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(result);
        }
    }
    
    /**
     * 新增陪玩师
     */
    @PostMapping("/companions")
    public ResponseEntity<Map<String, Object>> addCompanion(@RequestBody Companion companion) {
        Map<String, Object> result = new HashMap<>();
        try {
            // 设置默认值
            if (companion.getRating() == null) {
                companion.setRating(100.0);
            }
            if (companion.getIsOnline() == null) {
                companion.setIsOnline(true);
            }
            companion.setCreatedAt(LocalDateTime.now());
            companion.setUpdatedAt(LocalDateTime.now());
            
            Companion savedCompanion = companionRepository.save(companion);
            result.put("code", 200);
            result.put("message", "添加成功");
            result.put("data", savedCompanion);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("code", 500);
            result.put("message", "添加失败: " + e.getMessage());
            return ResponseEntity.badRequest().body(result);
        }
    }
    
    /**
     * 更新陪玩师
     */
    @PutMapping("/companions/{id}")
    public ResponseEntity<Map<String, Object>> updateCompanion(
            @PathVariable Long id,
            @RequestBody Companion companion) {
        Map<String, Object> result = new HashMap<>();
        try {
            Companion existingCompanion = companionRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("陪玩师不存在"));
            
            // 更新字段
            existingCompanion.setNickname(companion.getNickname());
            existingCompanion.setPrice(companion.getPrice());
            existingCompanion.setGameTypes(companion.getGameTypes());
            existingCompanion.setRanks(companion.getRanks());
            existingCompanion.setServers(companion.getServers());
            existingCompanion.setRating(companion.getRating());
            existingCompanion.setAvatar(companion.getAvatar());
            existingCompanion.setIsOnline(companion.getIsOnline());
            existingCompanion.setTags(companion.getTags());
            existingCompanion.setDescription(companion.getDescription());
            existingCompanion.setVoiceIntro(companion.getVoiceIntro());
            existingCompanion.setVideoUrl(companion.getVideoUrl());
            existingCompanion.setUpdatedAt(LocalDateTime.now());
            
            Companion updatedCompanion = companionRepository.save(existingCompanion);
            result.put("code", 200);
            result.put("message", "更新成功");
            result.put("data", updatedCompanion);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("code", 500);
            result.put("message", "更新失败: " + e.getMessage());
            return ResponseEntity.badRequest().body(result);
        }
    }
    
    /**
     * 删除陪玩师
     */
    @DeleteMapping("/companions/{id}")
    public ResponseEntity<Map<String, Object>> deleteCompanion(@PathVariable Long id) {
        Map<String, Object> result = new HashMap<>();
        try {
            Companion companion = companionRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("陪玩师不存在"));
            
            companionRepository.delete(companion);
            result.put("code", 200);
            result.put("message", "删除成功");
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("code", 500);
            result.put("message", "删除失败: " + e.getMessage());
            return ResponseEntity.badRequest().body(result);
        }
    }
    
    /**
     * 管理员专用：分页获取所有陪玩师列表（包含离线）
     */
    @GetMapping("/companions")
    public ResponseEntity<Map<String, Object>> getAdminCompanions(
            @RequestParam(required = false) String gameType,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        List<Companion> allCompanions;
        if (gameType != null && !gameType.isEmpty()) {
            // 按游戏类型筛选（包含查询）
            allCompanions = companionRepository.findByGameTypesContaining(gameType);
        } else {
            // 查询所有陪玩师
            allCompanions = companionRepository.findAll();
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
}
