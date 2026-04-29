package com.uogproject.gamematch_service.config;

import com.uogproject.gamematch_service.entity.Companion;
import com.uogproject.gamematch_service.repository.CompanionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private CompanionRepository companionRepository;
    
    @Override
    public void run(String... args) throws Exception {
        if (companionRepository.count() == 0) {
            initCompanions();
        }
    }
    
    private void initCompanions() {
        Companion c1 = new Companion();
        c1.setNickname("小仙女");
        c1.setAvatar("/images/avatar1.jpg");
        c1.setGameType("王者荣耀");
        c1.setRank("荣耀王者50星");
        c1.setServer("微信区");
        c1.setPrice(30.0);
        c1.setRating(4.9);
        c1.setDescription("擅长辅助和法师，声音甜美，耐心教学，带你上分带你飞~");
        c1.setTags("声音甜美,技术流,耐心");
        c1.setIsOnline(true);
        
        Companion c2 = new Companion();
        c2.setNickname("野王哥哥");
        c2.setAvatar("/images/avatar2.jpg");
        c2.setGameType("王者荣耀");
        c2.setRank("巅峰赛2200");
        c2.setServer("QQ区");
        c2.setPrice(50.0);
        c2.setRating(5.0);
        c2.setDescription("主玩打野，意识超群，节奏大师，带你体验躺赢的感觉！");
        c2.setTags("打野大神,意识流,carry全场");
        c2.setIsOnline(true);
        
        Companion c3 = new Companion();
        c3.setNickname("LOL高手");
        c3.setAvatar("/images/avatar3.jpg");
        c3.setGameType("英雄联盟");
        c3.setRank("最强王者");
        c3.setServer("艾欧尼亚");
        c3.setPrice(60.0);
        c3.setRating(4.8);
        c3.setDescription("十年老玩家，精通各个位置，教学一流，包教包会！");
        c3.setTags("全能选手,教学型,经验丰富");
        c3.setIsOnline(true);
        
        companionRepository.save(c1);
        companionRepository.save(c2);
        companionRepository.save(c3);
        
        System.out.println("初始化测试数据完成！");
    }
}
