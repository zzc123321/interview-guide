package interview.guide.modules.auth.model;

public record AuthUserDTO(
    Long id,
    String email,
    String displayName,
    UserRole role
) {
    public static AuthUserDTO from(UserEntity user) {
        return new AuthUserDTO(user.getId(), user.getEmail(), user.getDisplayName(), user.getRole());
    }
}
