package com.uogproject.gamematch_service.controller;

import com.uogproject.gamematch_service.dto.AdminAddRequest;
import com.uogproject.gamematch_service.dto.AdminLoginRequest;
import com.uogproject.gamematch_service.dto.AdminLoginResponse;
import com.uogproject.gamematch_service.entity.AdminUser;
import com.uogproject.gamematch_service.entity.Companion;
import com.uogproject.gamematch_service.repository.CompanionRepository;
import com.uogproject.gamematch_service.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
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
    
    @Value("${file.upload-dir:./uploads}")
    private String uploadDir;

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
     * 根据ID获取管理员详情
     */
    @GetMapping("/admin/{id}")
    public ResponseEntity<AdminUser> getAdminById(@PathVariable Long id) {
        AdminUser admin = adminService.getAdminById(id);
        if (admin == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(admin);
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
            @RequestParam(required = false) String avatar,
            @RequestParam(required = false) MultipartFile avatarFile) {
        Map<String, Object> result = new HashMap<>();
        try {
            AdminUser admin = adminService.updateAdminWithAvatar(id, username, password, role, avatar, avatarFile);
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
     * 新增陪玩师（包含文件上传）
     */
    @PostMapping(value = "/companions", consumes = "multipart/form-data")
    public ResponseEntity<Map<String, Object>> addCompanion(
            @RequestParam String nickname,
            @RequestParam String gameTypes,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String tags,
            @RequestParam(required = false) String price,
            @RequestParam(required = false) String rating,
            @RequestParam(required = false) String ranks,
            @RequestParam(required = false) String servers,
            @RequestParam(required = false) MultipartFile avatarFile,
            @RequestParam(required = false) MultipartFile voiceIntroFile,
            @RequestParam(required = false) MultipartFile videoUrlFile) {
        Map<String, Object> result = new HashMap<>();
        try {
            // 创建陪玩师对象
            Companion companion = new Companion();
            companion.setNickname(nickname);
            companion.setGameTypes(gameTypes);
            companion.setDescription(description);
            companion.setTags(tags);
            companion.setPrice(price != null && !price.isEmpty() ? Double.parseDouble(price) : null);
            companion.setRating(rating != null && !rating.isEmpty() ? Double.parseDouble(rating) : 100.0);
            companion.setRanks(ranks);
            companion.setServers(servers);
            companion.setIsOnline(true);
            companion.setCreatedAt(LocalDateTime.now());
            companion.setUpdatedAt(LocalDateTime.now());
            
            // 先保存陪玩师（数据库自动生成ID）
            Companion savedCompanion = companionRepository.save(companion);
            Long companionId = savedCompanion.getId();
            
            // 处理头像文件
            if (avatarFile != null && !avatarFile.isEmpty()) {
                String avatarUrl = saveCompanionAvatar(avatarFile, companionId);
                if (avatarUrl != null) {
                    savedCompanion.setAvatar(avatarUrl);
                }
            }
            
            // 处理音频文件
            if (voiceIntroFile != null && !voiceIntroFile.isEmpty()) {
                String voiceIntroUrl = saveCompanionAudio(voiceIntroFile, companionId);
                if (voiceIntroUrl != null) {
                    savedCompanion.setVoiceIntro(voiceIntroUrl);
                }
            }
            
            // 处理视频文件
            if (videoUrlFile != null && !videoUrlFile.isEmpty()) {
                String videoUrl = saveCompanionVideo(videoUrlFile, companionId);
                if (videoUrl != null) {
                    savedCompanion.setVideoUrl(videoUrl);
                }
            }
            
            // 如果有文件更新，再次保存
            if (avatarFile != null || voiceIntroFile != null || videoUrlFile != null) {
                savedCompanion = companionRepository.save(savedCompanion);
            }
            
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
     * 更新陪玩师（包含文件上传）
     */
    @PutMapping(value = "/companions/{id}", consumes = "multipart/form-data")
    public ResponseEntity<Map<String, Object>> updateCompanion(
            @PathVariable Long id,
            @RequestParam(required = false) String nickname,
            @RequestParam(required = false) String gameTypes,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String tags,
            @RequestParam(required = false) String price,
            @RequestParam(required = false) String rating,
            @RequestParam(required = false) String ranks,
            @RequestParam(required = false) String servers,
            @RequestParam(required = false) MultipartFile avatarFile,
            @RequestParam(required = false) MultipartFile voiceIntroFile,
            @RequestParam(required = false) MultipartFile videoUrlFile) {
        Map<String, Object> result = new HashMap<>();
        try {
            Companion existingCompanion = companionRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("陪玩师不存在"));
            
            // 更新字段
            if (nickname != null) existingCompanion.setNickname(nickname);
            if (gameTypes != null) existingCompanion.setGameTypes(gameTypes);
            if (description != null) existingCompanion.setDescription(description);
            if (tags != null) existingCompanion.setTags(tags);
            if (price != null && !price.isEmpty()) existingCompanion.setPrice(Double.parseDouble(price));
            if (rating != null && !rating.isEmpty()) existingCompanion.setRating(Double.parseDouble(rating));
            if (ranks != null) existingCompanion.setRanks(ranks);
            if (servers != null) existingCompanion.setServers(servers);
            
            // 处理头像文件
            if (avatarFile != null && !avatarFile.isEmpty()) {
                String avatarUrl = saveCompanionAvatar(avatarFile, id);
                if (avatarUrl != null) {
                    existingCompanion.setAvatar(avatarUrl);
                }
            }
            
            // 处理音频文件
            if (voiceIntroFile != null && !voiceIntroFile.isEmpty()) {
                String voiceIntroUrl = saveCompanionAudio(voiceIntroFile, id);
                if (voiceIntroUrl != null) {
                    existingCompanion.setVoiceIntro(voiceIntroUrl);
                }
            }
            
            // 处理视频文件
            if (videoUrlFile != null && !videoUrlFile.isEmpty()) {
                String videoUrl = saveCompanionVideo(videoUrlFile, id);
                if (videoUrl != null) {
                    existingCompanion.setVideoUrl(videoUrl);
                }
            }
            
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
    
    /**
     * 保存陪玩师头像
     */
    private String saveCompanionAvatar(MultipartFile file, Long companionId) {
        try {
            // 验证文件大小（5MB）
            if (file.getSize() > 5 * 1024 * 1024) {
                throw new RuntimeException("图片文件大小不能超过5MB");
            }
            
            // 验证文件类型
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                return null;
            }

            // 读取图片
            BufferedImage originalImage = ImageIO.read(file.getInputStream());
            if (originalImage == null) {
                return null;
            }

            // 创建上传目录
            File uploadPath = new File(uploadDir);
            if (!uploadPath.exists()) {
                uploadPath.mkdirs();
            }

            // 生成文件名：companion_avatar{id}.jpg
            String filename = "companion_avatar" + companionId + ".jpg";
            Path filePath = Paths.get(uploadDir, filename);
            File outputFile = filePath.toFile();
            ImageIO.write(originalImage, "jpg", outputFile);

            String fileUrl = "/image/" + filename;
            return fileUrl;

        } catch (IOException e) {
            return null;
        }
    }
    
    /**
     * 保存陪玩师音频
     */
    private String saveCompanionAudio(MultipartFile file, Long companionId) {
        try {
            // 验证文件大小（10MB）
            if (file.getSize() > 10 * 1024 * 1024) {
                throw new RuntimeException("音频文件大小不能超过10MB");
            }
            
            // 验证文件类型
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("audio/")) {
                return null;
            }

            // 创建上传目录
            File audioDir = new File(uploadDir + "/audio");
            if (!audioDir.exists()) {
                audioDir.mkdirs();
            }

            // 获取文件扩展名
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            // 生成文件名：companion_voice{id}{extension}
            String filename = "companion_voice" + companionId + extension;
            Path filePath = Paths.get(audioDir.getPath(), filename);
            file.transferTo(filePath.toFile());

            String fileUrl = "/audio/" + filename;
            return fileUrl;

        } catch (IOException e) {
            return null;
        }
    }
    
    /**
     * 保存陪玩师视频
     */
    private String saveCompanionVideo(MultipartFile file, Long companionId) {
        try {
            // 验证文件大小（10MB）
            if (file.getSize() > 10 * 1024 * 1024) {
                throw new RuntimeException("视频文件大小不能超过10MB");
            }
            
            // 验证文件类型
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("video/")) {
                return null;
            }

            // 创建上传目录
            File videoDir = new File(uploadDir + "/video");
            if (!videoDir.exists()) {
                videoDir.mkdirs();
            }

            // 获取文件扩展名
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            // 生成文件名：companion_video{id}{extension}
            String filename = "companion_video" + companionId + extension;
            Path filePath = Paths.get(videoDir.getPath(), filename);
            file.transferTo(filePath.toFile());

            String fileUrl = "/video/" + filename;
            return fileUrl;

        } catch (IOException e) {
            return null;
        }
    }
}
