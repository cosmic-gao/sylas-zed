import { execute_command } from "./execute-command"
import { type BuildPnpmOptions, create_pnpm_options } from "./create-pnpm-options"
import { get_full_path } from "./get-full-path"

export interface InstallDependencyOptions extends BuildPnpmOptions {
    /** 要安装的特定依赖包名 (例如: 'react@^18.0.0')。 */
    dependency: string;
    /** 依赖安装的工作目录。 */
    install_path: string;
    /** 是否静默执行 (忽略子进程输出)。 */
    silent?: boolean;
    /** 💡 [新增] 是否需要通过系统 Shell 执行 (例如，命令使用了管道或通配符)。默认为 false (最安全)。 */
    use_shell?: boolean;
}

/**
 * 🚀 执行 PNPM 依赖安装，并将依赖保存到指定路径。
 *
 * @param options - 完整的安装选项，包含依赖名、路径和 PNPM 标志。
 * @returns 包含依赖安装后本地完整路径的对象。
 */
export const install_dependency = async (
    options: InstallDependencyOptions
): Promise<{ dest: string }> => {
    const {
        dependency,
        install_path,
        silent = false,
        use_shell = false
    } = options;

    const command_args: string[] = create_pnpm_options(options);

    const command_options = {
        command_args: command_args,
        path: install_path,
        silent: silent,
        use_shell: use_shell
    };

    const dest: string = get_full_path({ install_path, dependency });

    await execute_command(command_options);

    return { dest };
};

async function run_examples() {
    const project_root = '/sylas-zed';

    console.log('--- 示例 1: 安装生产依赖 (axios@1.0.0) ---');
    const options_prod: InstallDependencyOptions = {
        dependency: 'axios@1.0.0',
        install_path: project_root,
        save: true,
        is_dev: false, // 生产依赖

    };

    try {
        const result_prod = await install_dependency(options_prod);
        console.log(`✨ 依赖安装完成！目标路径: ${result_prod.dest}`);
    } catch (error) {
        console.error('安装失败:', error);
    }

    console.log('\n' + '-'.repeat(40) + '\n');

    console.log('--- 示例 2: 安装开发依赖 (typescript@5.3.3) ---');
    const options_dev: InstallDependencyOptions = {
        dependency: 'typescript@5.3.3',
        install_path: project_root,
        save: true,
        is_dev: true, // 开发依赖
        silent: true // 静默模式
    };

    try {
        const result_dev = await install_dependency(options_dev);
        console.log(`✨ 依赖安装完成！目标路径: ${result_dev.dest}`);
    } catch (error) {
        console.error('安装失败:', error);
    }
}

// 运行示例
run_examples();