package com.uogproject.gamematch_service.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1/admin/upload")
public class FileUploadController {
    
    @Value("${app.upload-dir}")
    private String uploadDirConfig;
    
    private String uploadDir;
    
    @PostConstruct
    public void init() {
        // 转换为绝对路径
        File dir = new File(uploadDirConfig);
        if (!dir.isAbsolute()) {
            dir = new File(System.getProperty("user.dir"), uploadDirConfig);
        }
        this.uploadDir = dir.getAbsolutePath();
        log.info("FileUploadController 文件上传目录: {}", this.uploadDir);
    }
    
    /**
     * 上传图片文件（统一转换为JPG格式）
     */
    @PostMapping("/image")
    public ResponseEntity<Map<String, Object>> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "fieldName", required = false) String fieldName) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // 验证文件是否为空
            if (file.isEmpty()) {
                result.put("success", false);
                result.put("message", "请选择要上传的文件");
                return ResponseEntity.badRequest().body(result);
            }
            
            // 验证文件类型
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                result.put("success", false);
                result.put("message", "只支持上传图片文件");
                return ResponseEntity.badRequest().body(result);
            }
            
            // 创建上传目录
            File uploadPath = new File(uploadDir + "/image");
            if (!uploadPath.exists()) {
                uploadPath.mkdirs();
            }
            
            // 读取图片
            BufferedImage originalImage = ImageIO.read(file.getInputStream());
            if (originalImage == null) {
                result.put("success", false);
                result.put("message", "无效的图片文件");
                return ResponseEntity.badRequest().body(result);
            }
            
            // 生成文件名：如果有fieldName则使用fieldName作为文件名，否则使用UUID
            String filename;
            if (fieldName != null && !fieldName.isEmpty()) {
                // 使用fieldName作为文件名，统一使用jpg扩展名
                filename = fieldName + ".jpg";
            } else {
                // 否则使用UUID生成唯一文件名，统一使用jpg扩展名
                filename = UUID.randomUUID().toString() + ".jpg";
            }
            
            // 保存原始文件（统一保存为JPG格式）
            Path filePath = Paths.get(uploadPath.getPath(), filename);
            File outputFile = filePath.toFile();
            ImageIO.write(originalImage, "jpg", outputFile);
            
            // 返回文件访问路径（不再生成缩略图，由前端使用Canvas生成临时预览）
            String fileUrl = "/image/" + filename;
            result.put("success", true);
            result.put("message", "上传成功");
            result.put("url", fileUrl);
            result.put("filename", filename);
            
            log.info("图片上传成功: {}", fileUrl);
            
        } catch (IOException e) {
            log.error("图片上传失败", e);
            result.put("success", false);
            result.put("message", "上传失败: " + e.getMessage());
            return ResponseEntity.status(500).body(result);
        }
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * 上传音频文件
     */
    @PostMapping("/audio")
    public ResponseEntity<Map<String, Object>> uploadAudio(
            @RequestParam("file") MultipartFile file) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // 验证文件是否为空
            if (file.isEmpty()) {
                result.put("success", false);
                result.put("message", "请选择要上传的文件");
                return ResponseEntity.badRequest().body(result);
            }
            
            // 验证文件类型
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("audio/")) {
                result.put("success", false);
                result.put("message", "只支持上传音频文件");
                return ResponseEntity.badRequest().body(result);
            }
            
            // 创建上传目录
            String audioDir = uploadDir + File.separator + "audio";
            File uploadPath = new File(audioDir);
            if (!uploadPath.exists()) {
                uploadPath.mkdirs();
            }
            
            // 生成文件名：使用UUID生成唯一文件名，保留原始扩展名
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String filename = UUID.randomUUID().toString() + extension;
            
            // 保存文件
            Path filePath = Paths.get(audioDir, filename);
            Files.write(filePath, file.getBytes());
            
            // 返回文件访问路径
            String fileUrl = "/audio/" + filename;
            result.put("success", true);
            result.put("message", "上传成功");
            result.put("url", fileUrl);
            result.put("filename", filename);
            
            log.info("音频上传成功: {}", fileUrl);
            
        } catch (IOException e) {
            log.error("音频上传失败", e);
            result.put("success", false);
            result.put("message", "上传失败: " + e.getMessage());
            return ResponseEntity.status(500).body(result);
        }
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * 上传视频文件
     */
    @PostMapping("/video")
    public ResponseEntity<Map<String, Object>> uploadVideo(
            @RequestParam("file") MultipartFile file) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // 验证文件是否为空
            if (file.isEmpty()) {
                result.put("success", false);
                result.put("message", "请选择要上传的文件");
                return ResponseEntity.badRequest().body(result);
            }
            
            // 验证文件类型
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("video/")) {
                result.put("success", false);
                result.put("message", "只支持上传视频文件");
                return ResponseEntity.badRequest().body(result);
            }
            
            // 创建上传目录
            String videoDir = uploadDir + File.separator + "video";
            File uploadPath = new File(videoDir);
            if (!uploadPath.exists()) {
                uploadPath.mkdirs();
            }
            
            // 生成文件名：使用UUID生成唯一文件名，保留原始扩展名
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String filename = UUID.randomUUID().toString() + extension;
            
            // 保存文件
            Path filePath = Paths.get(videoDir, filename);
            Files.write(filePath, file.getBytes());
            
            // 返回文件访问路径
            String fileUrl = "/video/" + filename;
            result.put("success", true);
            result.put("message", "上传成功");
            result.put("url", fileUrl);
            result.put("filename", filename);
            
            log.info("视频上传成功: {}", fileUrl);
            
        } catch (IOException e) {
            log.error("视频上传失败", e);
            result.put("success", false);
            result.put("message", "上传失败: " + e.getMessage());
            return ResponseEntity.status(500).body(result);
        }
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * 批量生成缩略图（保存配置时调用）
     */
    @PostMapping("/generate-thumbnails")
    public ResponseEntity<Map<String, Object>> generateThumbnails(@RequestBody Map<String, String> imageUrls) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            int successCount = 0;
            int failCount = 0;
            
            for (Map.Entry<String, String> entry : imageUrls.entrySet()) {
                String fieldName = entry.getKey();
                String imageUrl = entry.getValue();
                
                if (imageUrl == null || imageUrl.isEmpty()) {
                    continue;
                }
                
                // 从URL中提取文件名
                String filename = imageUrl.replace("/image/", "");
                String previewFilename = getPreviewFilename(filename);
                
                // 检查原图是否存在
                Path originalPath = Paths.get(uploadDir, filename);
                if (!Files.exists(originalPath)) {
                    log.warn("原图不存在: {}", filename);
                    failCount++;
                    continue;
                }
                
                // 读取原图
                BufferedImage originalImage = ImageIO.read(originalPath.toFile());
                if (originalImage == null) {
                    log.warn("无法读取原图: {}", filename);
                    failCount++;
                    continue;
                }
                
                // 生成缩略图
                Path previewPath = Paths.get(uploadDir, previewFilename);
                BufferedImage thumbnail = createThumbnail(originalImage, 300, 300);
                ImageIO.write(thumbnail, "jpg", previewPath.toFile());
                
                successCount++;
                log.info("生成缩略图成功: {} -> {}", filename, previewFilename);
            }
            
            result.put("success", true);
            result.put("message", String.format("缩略图生成完成: 成功%d个，失败%d个", successCount, failCount));
            result.put("successCount", successCount);
            result.put("failCount", failCount);
            
        } catch (IOException e) {
            log.error("生成缩略图失败", e);
            result.put("success", false);
            result.put("message", "生成缩略图失败: " + e.getMessage());
            return ResponseEntity.status(500).body(result);
        }
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * 获取预览文件名
     */
    private String getPreviewFilename(String originalFilename) {
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex > 0) {
            String name = originalFilename.substring(0, dotIndex);
            String extension = originalFilename.substring(dotIndex);
            return name + "_thumb" + extension;
        }
        return originalFilename + "_thumb.jpg";
    }
    
    /**
     * 创建缩略图
     */
    private BufferedImage createThumbnail(BufferedImage originalImage, int targetWidth, int targetHeight) {
        int originalWidth = originalImage.getWidth();
        int originalHeight = originalImage.getHeight();
        
        // 计算缩放比例
        double scale = Math.min((double) targetWidth / originalWidth, (double) targetHeight / originalHeight);
        int newWidth = (int) (originalWidth * scale);
        int newHeight = (int) (originalHeight * scale);
        
        // 创建缩略图
        BufferedImage thumbnail = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = thumbnail.createGraphics();
        
        // 设置渲染质量
        g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g2d.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        
        // 绘制缩略图
        g2d.drawImage(originalImage, 0, 0, newWidth, newHeight, null);
        g2d.dispose();
        
        return thumbnail;
    }
}
