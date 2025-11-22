export interface BuildPnpmOptions {
    /** 是否将依赖保存到 package.json。 */
    save?: boolean;
    /** 是否将依赖保存为开发依赖 (--save-dev) 而非生产依赖 (--save-prod)。仅在 save 为 true 时有效。 */
    is_dev?: boolean;
    /** 要安装的特定依赖包名 (例如: 'react@^18.0.0')。如果为空，则执行全局安装/更新。 */
    dependency?: string;
    /** ⚠️ [可选/保留] 原始逻辑中如果 all 为 true, 会提前返回 ['install']。 */
    all?: boolean;
}

const PNPM_OPTIONS = {
    INSTALL: 'install',
    SAVE_EXACT: '--save-exact',
    SAVE: '--save-prod',
    SAVE_DEV: '--save-dev',
    NO_SAVE: '--no-save'
} as const;

/**
 * 🛠️ 根据选项构建 PNPM 安装依赖的命令行参数数组。
 * @param options - 安装选项。
 * @returns 包含 PNPM 命令和参数的字符串数组。
 */
export function create_pnpm_options(options: BuildPnpmOptions) {
    const args: string[] = [PNPM_OPTIONS.INSTALL];

    if (options.all) return args;

    if (options.save) {
        args.push(PNPM_OPTIONS.SAVE_EXACT);

        const save_option = options.is_dev
            ? PNPM_OPTIONS.SAVE_DEV
            : PNPM_OPTIONS.SAVE;

        args.push(save_option);
    } else {
        args.push(PNPM_OPTIONS.NO_SAVE);
    }

    if (options.dependency) args.push(options.dependency);

    return args;
}