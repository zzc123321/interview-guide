package interview.guide.modules.voiceinterview.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DisplayName("语音面试提示词服务测试")
class VoiceInterviewPromptServiceTest {

    private final VoiceInterviewPromptService promptService = new VoiceInterviewPromptService();

    @Test
    @DisplayName("有 skillId 时应包含 Skill 工具加载指令和语音约束")
    void shouldIncludeSkillInstructionWhenSkillIdPresent() {
        String prompt = promptService.generateSystemPromptWithContext("java-backend", null);

        assertTrue(prompt.contains("你是一位 java-backend 方向的面试官。"));
        assertTrue(prompt.contains("调用 Skill 工具"));
        assertTrue(prompt.contains("command: java-backend"));
        assertTrue(prompt.contains("【语音面试输出约束】"));
    }

    @Test
    @DisplayName("没有 skillId 时不应包含 Skill 工具加载指令")
    void shouldNotIncludeSkillInstructionWhenSkillIdMissing() {
        String prompt = promptService.generateSystemPromptWithContext("  ", null);

        assertFalse(prompt.contains("调用 Skill 工具"));
        assertTrue(prompt.contains("【语音面试输出约束】"));
    }

    @Test
    @DisplayName("有简历文本时应追加简历上下文")
    void shouldAppendResumeContextWhenResumeTextPresent() {
        String resumeText = "5年 Java 后端经验，熟悉 Spring Boot 与 Redis。";

        String prompt = promptService.generateSystemPromptWithContext("java-backend", resumeText);

        assertTrue(prompt.contains("【实时语音面试 - 候选人简历内容】"));
        assertTrue(prompt.contains("你已查阅过候选人简历"));
        assertTrue(prompt.contains(resumeText));
    }

    @Test
    @DisplayName("没有简历文本时不应追加简历段落")
    void shouldNotAppendResumeContextWhenResumeTextMissing() {
        String prompt = promptService.generateSystemPromptWithContext("java-backend", "");

        assertFalse(prompt.contains("【实时语音面试 - 候选人简历内容】"));
        assertFalse(prompt.contains("【简历解析文本】"));
    }
}
