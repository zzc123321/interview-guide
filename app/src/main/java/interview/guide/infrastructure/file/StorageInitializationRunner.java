package interview.guide.infrastructure.file;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

/**
 * 应用启动时初始化对象存储基础资源。
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class StorageInitializationRunner implements ApplicationRunner {

    private final FileStorageService fileStorageService;

    @Override
    public void run(ApplicationArguments args) {
        log.info("开始初始化对象存储桶");
        fileStorageService.ensureBucketExists();
    }
}
