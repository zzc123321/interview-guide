package interview.guide.modules.auth.service;

import interview.guide.common.exception.BusinessException;
import interview.guide.common.exception.ErrorCode;
import interview.guide.modules.auth.model.AuthUserDTO;
import interview.guide.modules.auth.model.LoginRequest;
import interview.guide.modules.auth.model.UserEntity;
import interview.guide.modules.auth.model.UserStatus;
import interview.guide.modules.auth.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public static final String SESSION_USER_KEY = "AUTH_USER";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthUserDTO login(LoginRequest request, HttpSession session) {
        UserEntity user = userRepository.findByEmailIgnoreCase(request.email().trim())
            .orElseThrow(() -> new BusinessException(ErrorCode.UNAUTHORIZED, "邮箱或密码错误"));

        if (user.getStatus() == UserStatus.DISABLED) {
            throw new BusinessException(ErrorCode.FORBIDDEN, "账号已被禁用");
        }

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new BusinessException(ErrorCode.UNAUTHORIZED, "邮箱或密码错误");
        }

        AuthUserDTO authUser = AuthUserDTO.from(user);
        session.invalidate();
        HttpSession newSession = session;
        // invalidated session may still be referenced by container until request ends; use request session from controller
        return authUser;
    }

    public void storeUser(HttpSession session, AuthUserDTO user) {
        session.setAttribute(SESSION_USER_KEY, user);
    }

    public AuthUserDTO getCurrentUser(HttpSession session) {
        Object currentUser = session.getAttribute(SESSION_USER_KEY);
        if (currentUser instanceof AuthUserDTO authUser) {
            return authUser;
        }
        throw new BusinessException(ErrorCode.UNAUTHORIZED, "未登录");
    }

    public void logout(HttpSession session) {
        session.invalidate();
    }
}
