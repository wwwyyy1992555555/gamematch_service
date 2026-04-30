package com.uogproject.gamematch_service.config;

import com.uogproject.gamematch_service.constant.AdminRole;
import com.uogproject.gamematch_service.constant.SystemConstants;
import com.uogproject.gamematch_service.entity.Companion;
import com.uogproject.gamematch_service.entity.AdminUser;
import com.uogproject.gamematch_service.repository.CompanionRepository;
import com.uogproject.gamematch_service.repository.AdminUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private CompanionRepository companionRepository;
    
    @Autowired
    private AdminUserRepository adminUserRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // 陪玩师数据已通过 init-data.sql 初始化，此处不再通过代码插入
        
        // 初始化管理员账号（如果不存在超级管理员）
        if (adminUserRepository.findByRole(AdminRole.SUPER_ADMIN.getCode()).isEmpty()) {
            initSuperAdmin();
        }
    }
    
    private void initSuperAdmin() {
        AdminUser superAdmin = new AdminUser();
        superAdmin.setUsername(SystemConstants.DEFAULT_SUPER_ADMIN_USERNAME);
        superAdmin.setPassword(SystemConstants.DEFAULT_SUPER_ADMIN_PASSWORD);
        superAdmin.setAvatar(SystemConstants.DEFAULT_SUPER_ADMIN_AVATAR);
        superAdmin.setRole(AdminRole.SUPER_ADMIN.getCode());
        superAdmin.setIsActive(true);
        adminUserRepository.save(superAdmin);
        
        log.info("{}{}", SystemConstants.SUPER_ADMIN_CREATED_MSG, SystemConstants.DEFAULT_SUPER_ADMIN_USERNAME);
        log.warn("{}", SystemConstants.PASSWORD_CHANGE_WARNING);
    }
}
