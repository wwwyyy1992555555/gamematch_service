package com.uogproject.gamematch_service.service;

import com.uogproject.gamematch_service.constant.AdminRole;
import com.uogproject.gamematch_service.constant.SystemConstants;
import com.uogproject.gamematch_service.dto.AdminAddRequest;
import com.uogproject.gamematch_service.dto.AdminLoginRequest;
import com.uogproject.gamematch_service.dto.AdminLoginResponse;
import com.uogproject.gamematch_service.entity.AdminUser;
import com.uogproject.gamematch_service.repository.AdminUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

/**
 * 管理员业务逻辑层
 */
@Slf4j
@Service
public class AdminService {

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Value("${app.upload-dir}")
    private String uploadDir;

    /**
     * 管理员登录验证
     *
     * @param request 登录请求参数
     * @return 登录响应信息（包含 Token）
     */
    public AdminLoginResponse login(AdminLoginRequest request) {
        // 1. 根据用户名查询管理员
        AdminUser admin = adminUserRepository.findByUsername(request.getUsername()).orElse(null);

        // 2. 校验管理员是否存在、密码是否正确、状态是否激活
        if (admin == null || !admin.getPassword().equals(request.getPassword()) || !admin.getIsActive()) {
            throw new RuntimeException(SystemConstants.ERROR_LOGIN_FAILED);
        }

        // 3. 生成简单的 Token（实际项目中建议使用 JWT）
        String token = "token_" + admin.getId() + "_" + System.currentTimeMillis();

        // 4. 构造返回结果
        AdminLoginResponse response = new AdminLoginResponse();
        response.setToken(token);
        response.setUsername(admin.getUsername());
        response.setAvatar(admin.getAvatar());
        response.setRole(admin.getRole());

        return response;
    }

    /**
     * 获取所有管理员列表（排除超级管理员）
     *
     * @return 普通管理员列表
     */
    public List<AdminUser> getAllAdmins() {
        // 过滤掉超级管理员（role = 1），只返回 role > 1 的管理员
        return adminUserRepository.findAll().stream()
                .filter(admin -> admin.getRole() != null && admin.getRole() > 1)
                .collect(java.util.stream.Collectors.toList());
    }

    /**
     * 根据用户名搜索管理员（排除超级管理员）
     *
     * @param username 用户名关键词
     * @return 匹配的管理员列表
     */
    public List<AdminUser> searchAdminsByUsername(String username) {
        return adminUserRepository.findAll().stream()
                .filter(admin -> admin.getRole() != null && admin.getRole() > 1)
                .filter(admin -> admin.getUsername() != null && admin.getUsername().toLowerCase().contains(username.toLowerCase()))
                .collect(java.util.stream.Collectors.toList());
    }

    /**
     * 根据ID获取管理员
     *
     * @param id 管理员ID
     * @return 管理员信息
     */
    public AdminUser getAdminById(Long id) {
        return adminUserRepository.findById(id).orElse(null);
    }

    /**
     * 新增管理员（包含头像上传）
     *
     * @param request 新增请求
     * @return 保存后的管理员信息
     */
    public AdminUser addAdminWithAvatar(AdminAddRequest request) {
        // 校验用户名是否为空
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            throw new RuntimeException("用户名不能为空");
        }

        // 校验密码不能为空
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            throw new RuntimeException("密码不能为空");
        }

        // 校验用户名是否已存在
        if (adminUserRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("用户名已存在");
        }

        // 先保存管理员（数据库自动生成ID）
        AdminUser admin = new AdminUser();
        admin.setUsername(request.getUsername());
        admin.setPassword(request.getPassword());
        admin.setRole(request.getRole() != null ? request.getRole() : AdminRole.ADMIN.getCode());
        admin.setIsActive(request.getIsActive() != null ? request.getIsActive() : true);
        
        admin = adminUserRepository.save(admin);
        
        // 获取自动生成的ID
        Long adminId = admin.getId();

        // 如果有头像文件，保存图片并更新头像路径
        MultipartFile avatarFile = request.getAvatarFile();
        if (avatarFile != null && !avatarFile.isEmpty()) {
            String avatarUrl = saveAdminAvatar(avatarFile, adminId);
            if (avatarUrl != null) {
                admin.setAvatar(avatarUrl);
                admin = adminUserRepository.save(admin);
            }
        }

        return admin;
    }

    /**
     * 保存管理员头像
     *
     * @param file 头像文件
     * @param adminId 管理员ID
     * @return 头像URL
     */
    private String saveAdminAvatar(MultipartFile file, Long adminId) {
        try {
            // 验证文件类型
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                log.warn("非图片文件，跳过头像保存");
                return null;
            }

            // 读取图片
            BufferedImage originalImage = ImageIO.read(file.getInputStream());
            if (originalImage == null) {
                log.warn("无效的图片文件，跳过头像保存");
                return null;
            }

            // 创建上传目录
            File uploadPath = new File(uploadDir);
            if (!uploadPath.exists()) {
                uploadPath.mkdirs();
            }

            // 生成文件名：admin_avatar{id}.jpg
            String filename = "admin_avatar" + adminId + ".jpg";
            Path filePath = Paths.get(uploadDir, filename);
            File outputFile = filePath.toFile();
            ImageIO.write(originalImage, "jpg", outputFile);

            String fileUrl = "/image/" + filename;
            log.info("管理员头像保存成功: {}", fileUrl);
            return fileUrl;

        } catch (IOException e) {
            log.error("保存管理员头像失败", e);
            return null;
        }
    }

    /**
     * 删除管理员
     *
     * @param id 管理员ID
     */
    public void deleteAdmin(Long id) {
        if (!adminUserRepository.existsById(id)) {
            throw new RuntimeException("管理员不存在");
        }
        adminUserRepository.deleteById(id);
    }

    /**
     * 更新管理员信息（包含头像上传）
     *
     * @param id 管理员ID
     * @param username 用户名（不可修改，仅用于显示）
     * @param password 新密码（可选，为空则不修改）
     * @param role 角色
     * @param avatarFile 头像文件（可选）
     * @return 更新后的管理员信息
     */
    public AdminUser updateAdminWithAvatar(Long id, String username, String password, Integer role, MultipartFile avatarFile) {
        // 校验管理员是否存在
        AdminUser admin = adminUserRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("管理员不存在"));

        // 如果提供了新密码，则更新密码
        if (password != null && !password.trim().isEmpty()) {
            admin.setPassword(password);
        }

        // 更新角色
        if (role != null) {
            admin.setRole(role);
        }

        // 如果有新的头像文件，更新头像
        if (avatarFile != null && !avatarFile.isEmpty()) {
            String avatarUrl = saveAdminAvatar(avatarFile, id);
            if (avatarUrl != null) {
                admin.setAvatar(avatarUrl);
            }
        }

        return adminUserRepository.save(admin);
    }
}
