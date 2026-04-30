package interview.guide.modules.auth;

import interview.guide.modules.auth.config.AuthProperties;
import interview.guide.modules.auth.repository.UserRepository;
import interview.guide.modules.auth.service.AuthBootstrapService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@DisplayName("默认管理员账号初始化测试")
class AuthBootstrapServiceTest {

    @Test
    @DisplayName("非生产环境缺少默认账号配置时应跳过初始化")
    void shouldSkipBootstrapWhenCredentialsMissingOutsideProd() {
        UserRepository userRepository = mock(UserRepository.class);
        PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
        Environment environment = mock(Environment.class);
        AuthProperties authProperties = new AuthProperties();

        when(userRepository.count()).thenReturn(0L);
        when(environment.acceptsProfiles(any(Profiles.class))).thenReturn(false);

        AuthBootstrapService service = new AuthBootstrapService(
            userRepository,
            authProperties,
            passwordEncoder,
            environment
        );

        assertDoesNotThrow(() -> service.run(null));
        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("生产环境缺少默认账号配置时应快速失败")
    void shouldFailInProdWhenCredentialsMissing() {
        UserRepository userRepository = mock(UserRepository.class);
        PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
        Environment environment = mock(Environment.class);
        AuthProperties authProperties = new AuthProperties();

        when(userRepository.count()).thenReturn(0L);
        when(environment.acceptsProfiles(any(Profiles.class))).thenReturn(true);

        AuthBootstrapService service = new AuthBootstrapService(
            userRepository,
            authProperties,
            passwordEncoder,
            environment
        );

        IllegalStateException exception = assertThrows(IllegalStateException.class, () -> service.run(null));
        assertEquals("生产环境必须显式配置 APP_AUTH_BOOTSTRAP_EMAIL 和 APP_AUTH_BOOTSTRAP_PASSWORD", exception.getMessage());
        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("配置了默认账号且用户表为空时应创建管理员账号")
    void shouldCreateBootstrapUserWhenConfigPresentAndTableEmpty() {
        UserRepository userRepository = mock(UserRepository.class);
        PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
        Environment environment = mock(Environment.class);
        AuthProperties authProperties = new AuthProperties();
        authProperties.getBootstrap().setEmail("admin@example.com");
        authProperties.getBootstrap().setPassword("ChangeMe123!");
        authProperties.getBootstrap().setName("Administrator");

        when(userRepository.count()).thenReturn(0L);
        when(environment.acceptsProfiles(any(Profiles.class))).thenReturn(true);
        when(passwordEncoder.encode("ChangeMe123!")).thenReturn("encoded-password");

        AuthBootstrapService service = new AuthBootstrapService(
            userRepository,
            authProperties,
            passwordEncoder,
            environment
        );

        assertDoesNotThrow(() -> service.run(null));
        verify(userRepository).save(any());
    }
}
