import path from "path"
import strip_version from "./version";

export const get_full_path = (options: {
    install_path: string;
    dependency: string;
}): string => {
    const { install_path, dependency } = options;
    const stripped_dependency = strip_version(dependency);
    return path.join(install_path, 'node_modules', stripped_dependency);
};