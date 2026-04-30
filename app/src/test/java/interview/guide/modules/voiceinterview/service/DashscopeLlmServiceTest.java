package interview.guide.modules.voiceinterview.service;

import interview.guide.common.ai.LlmProviderRegistry;
import interview.guide.modules.resume.repository.ResumeRepository;
import interview.guide.modules.voiceinterview.config.VoiceInterviewProperties;
import interview.guide.modules.voiceinterview.model.VoiceInterviewSessionEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.ai.chat.client.ChatClient;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("Dashscope LLM 服务测试")
class DashscopeLlmServiceTest {

    @Mock
    private LlmProviderRegistry llmProviderRegistry;

    @Mock
    private VoiceInterviewPromptService promptService;

    @Mock
    private ResumeRepository resumeRepository;

    private DashscopeLlmService dashscopeLlmService;
    private VoiceInterviewSessionEntity mockSession;

    @BeforeEach
    void setUp() {
        VoiceInterviewProperties voiceInterviewProperties = new VoiceInterviewProperties();
        dashscopeLlmService = new DashscopeLlmService(
            llmProviderRegistry,
            promptService,
            resumeRepository,
            voiceInterviewProperties
        );

        mockSession = VoiceInterviewSessionEntity.builder()
            .id(1L)
            .roleType("ali-p8")
            .skillId("java-backend")
            .llmProvider("dashscope")
            .currentPhase(VoiceInterviewSessionEntity.InterviewPhase.INTRO)
            .build();

        lenient().when(promptService.generateSystemPromptWithContext(eq("java-backend"), any()))
            .thenReturn("System prompt");
    }

    @Test
    @DisplayName("提示词服务异常时应返回友好错误消息")
    void shouldReturnFriendlyMessageWhenPromptServiceFails() {
        when(promptService.generateSystemPromptWithContext(eq("java-backend"), any()))
            .thenThrow(new RuntimeException("提示词加载失败"));

        String result = dashscopeLlmService.chat("测试", mockSession, null);

        assertNotNull(result);
        assertTrue(result.contains("AI 服务") || result.contains("错误"));
    }

    @Test
    @DisplayName("认证错误时应映射为 API Key 提示")
    void shouldMapAuthenticationErrors() {
        when(llmProviderRegistry.getVoiceChatClient("dashscope"))
            .thenThrow(new RuntimeException("403 ACCESS_DENIED: Invalid API key"));

        String result = dashscopeLlmService.chat("测试", mockSession, null);

        assertEquals("AI 服务认证失败，请检查 API Key 配置", result);
        verify(promptService).generateSystemPromptWithContext(eq("java-backend"), any());
    }

    @Test
    @DisplayName("超时错误时应映射为超时提示")
    void shouldMapTimeoutErrors() {
        when(llmProviderRegistry.getVoiceChatClient("dashscope"))
            .thenThrow(new RuntimeException("Request timeout after 30000ms"));

        String result = dashscopeLlmService.chat("测试", mockSession, null);

        assertEquals("AI 服务响应超时，请稍后重试", result);
    }

    @Test
    @DisplayName("限流错误时应映射为频率限制提示")
    void shouldMapRateLimitErrors() {
        when(llmProviderRegistry.getVoiceChatClient("dashscope"))
            .thenThrow(new RuntimeException("429 rate limit exceeded"));

        String result = dashscopeLlmService.chat("测试", mockSession, null);

        assertEquals("AI 服务调用频率超限，请稍后重试", result);
    }

    @Test
    @DisplayName("网络错误时应映射为网络连接提示")
    void shouldMapNetworkErrors() {
        when(llmProviderRegistry.getVoiceChatClient("dashscope"))
            .thenThrow(new RuntimeException("connection refused: network error"));

        String result = dashscopeLlmService.chat("测试", mockSession, null);

        assertEquals("AI 服务网络连接失败，请检查网络", result);
    }

    @Test
    @DisplayName("流式调用异常时应沿用相同错误映射")
    void shouldReuseErrorMappingForStreamCalls() {
        when(llmProviderRegistry.getVoiceChatClient("dashscope"))
            .thenThrow(new RuntimeException("Unknown error occurred"));

        String result = dashscopeLlmService.chatStream("测试流式", token -> {}, mockSession, List.of("历史消息"));

        assertEquals("抱歉，AI 服务暂时不可用，请稍后重试", result);
    }
}
