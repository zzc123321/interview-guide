package interview.guide.modules.auth.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import interview.guide.common.exception.ErrorCode;
import interview.guide.common.result.Result;
import interview.guide.modules.auth.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AuthSessionInterceptor implements HandlerInterceptor {

    private final ObjectMapper objectMapper;

    public AuthSessionInterceptor(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String method = request.getMethod();
        String uri = request.getRequestURI();

        if ("OPTIONS".equalsIgnoreCase(method)
            || uri.startsWith("/api/auth/")
            || "/api/resumes/health".equals(uri)) {
            return true;
        }

        Object currentUser = request.getSession(false) == null
            ? null
            : request.getSession(false).getAttribute(AuthService.SESSION_USER_KEY);

        if (currentUser != null) {
            return true;
        }

        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        objectMapper.writeValue(response.getWriter(), Result.error(ErrorCode.UNAUTHORIZED));
        return false;
    }
}
