import spawn from 'cross-spawn';

export interface ExecuteCommandOptions {
    /** 传递给主程序的参数列表 (例如: ['install', 'lodash']) */
    command_args: string[];
    /** 命令执行的工作目录 */
    path: string;
    /** 是否静默执行 (忽略子进程输出) */
    silent?: boolean;
    /** 💡 [新增] 是否需要通过系统 Shell 执行 (例如，命令使用了管道或通配符)。默认为 false (最安全)。 */
    use_shell?: boolean;
}

const EXECUTABLE = 'pnpm';

/**
 * 🛠️ 执行外部命令，并返回一个 Promise，用于异步处理结果。
 * * @param options - 命令执行选项。
 * @returns 当子进程成功退出时 resolve，否则 reject 并附带错误信息。
 */
export function execute_command(options: ExecuteCommandOptions): Promise<void> {
    const { command_args, path, silent = false, use_shell = false } = options;

    const full_command = `${EXECUTABLE} ${command_args.join(' ')}`;

    const child_process = spawn(EXECUTABLE, command_args, {
        cwd: path,
        stdio: silent ? 'ignore' : 'inherit',
        shell: use_shell
    });

    return new Promise<void>((resolve, reject) => {
        child_process.on('error', (error) => {
            const message = (error as NodeJS.ErrnoException).code === 'ENOENT'
                ? `Executable '${EXECUTABLE}' not found (is it in PATH?) or path '${path}' does not exist.`
                : error.message;

            reject(new Error(`Failed to start command "${full_command}" in ${path}. Error: ${message}`));
        });

        child_process.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Command "${full_command}" failed with exit code ${code} in ${path}`));
            } else {
                resolve();
            }
        });
    });
};