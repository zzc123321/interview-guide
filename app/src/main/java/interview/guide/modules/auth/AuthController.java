package interview.guide.modules.auth;

import interview.guide.common.result.Result;
import interview.guide.modules.auth.model.AuthUserDTO;
import interview.guide.modules.auth.model.LoginRequest;
import interview.guide.modules.auth.service.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "认证", description = "登录、登出与当前用户")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/api/auth/login")
    public Result<AuthUserDTO> login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        AuthUserDTO authUser = authService.login(request, httpRequest.getSession());
        HttpSession newSession = httpRequest.getSession(true);
        authService.storeUser(newSession, authUser);
        return Result.success(authUser);
    }

    @GetMapping("/api/auth/me")
    public Result<AuthUserDTO> me(HttpSession session) {
        return Result.success(authService.getCurrentUser(session));
    }

    @PostMapping("/api/auth/logout")
    public Result<Void> logout(HttpSession session) {
        authService.logout(session);
        return Result.success();
    }
}
