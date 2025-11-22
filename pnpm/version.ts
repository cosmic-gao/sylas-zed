import path from 'path';

/**
 * 🛠️ 从可能包含版本信息的依赖字符串中，移除版本号。
 * * 示例:
 * - 'lodash@4.17.21' -> 'lodash'
 * - '@scope/package@1.0.0' -> '@scope/package'
 * * @param dependency - 完整的依赖路径/字符串。
 * @returns 移除版本号后的依赖路径/字符串。
 */
export default function strip_version(dependency: string): string {
    const { dir, base } = path.parse(dependency);

    const start = base.startsWith('@') ? base.indexOf('/') + 1 : 0;
    const versionIndex = base.indexOf('@', start);

    const pure = versionIndex === -1 ? base : base.slice(0, versionIndex);
    return path.join(dir, pure);
}