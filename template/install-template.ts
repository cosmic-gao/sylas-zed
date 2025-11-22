import { type InstallDependencyOptions, install_dependency } from "../pnpm"

export interface InstallTemplateOptions {
    compiler: string;
    component_path: string;
}

export async function install_template(options: InstallTemplateOptions) {
    const { component_path, compiler } = options

    const pnpm_options: InstallDependencyOptions = {
        save: true,
        is_dev: true,
        install_path: component_path,
        dependency: compiler
    }

    try {
        const result = await install_dependency(pnpm_options);
        console.log(result)

    } catch (e) {

    }
}
