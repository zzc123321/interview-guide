package interview.guide.infrastructure.file;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@DisplayName("存储初始化启动器测试")
class StorageInitializationRunnerTest {

    @Test
    @DisplayName("应用启动时应确保存储桶存在")
    void shouldEnsureBucketExistsWhenApplicationStarts() throws Exception {
        FileStorageService fileStorageService = mock(FileStorageService.class);

        new StorageInitializationRunner(fileStorageService).run(null);

        verify(fileStorageService, times(1)).ensureBucketExists();
    }
}
