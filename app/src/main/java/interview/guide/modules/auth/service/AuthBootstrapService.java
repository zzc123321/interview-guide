package interview.guide.modules.auth.service;

import interview.guide.modules.auth.config.AuthProperties;
import interview.guide.modules.auth.model.UserEntity;
import interview.guide.modules.auth.model.UserRole;
import interview.guide.modules.auth.model.UserStatus;
import interview.guide.modules.auth.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Slf4j
@Component
public class AuthBootstrapService implements ApplicationRunner {

    private final UserRepository userRepository;
    private final AuthProperties authProperties;
    private final PasswordEncoder passwordEncoder;

    public AuthBootstrapService(
        UserRepository userRepository,
        AuthProperties authProperties,
        PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.authProperties = authProperties;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (userRepository.count() > 0) {
            log.info("跳过初始化默认账号，用户表已存在数据");
            return;
        }

        var bootstrap = authProperties.getBootstrap();
        if (!StringUtils.hasText(bootstrap.getEmail()) || !StringUtils.hasText(bootstrap.getPassword())) {
            log.warn("未配置默认账号邮箱或密码，跳过初始化默认账号");
            return;
        }

        UserEntity user = new UserEntity();
        user.setEmail(bootstrap.getEmail().trim().toLowerCase());
        user.setPasswordHash(passwordEncoder.encode(bootstrap.getPassword()));
        user.setDisplayName(StringUtils.hasText(bootstrap.getName()) ? bootstrap.getName().trim() : "Administrator");
        user.setRole(UserRole.ADMIN);
        user.setStatus(UserStatus.ACTIVE);
        userRepository.save(user);
        log.info("已初始化默认管理员账号: email={}", user.getEmail());
    }
}
