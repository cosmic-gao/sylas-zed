import { type InstallDependencyOptions, install_dependency } from "../pnpm"

export interface InstallTemplateOptions {
    compiler: string;
    component_path: string;
}

export async function install_template(options: InstallTemplateOptions) {
    const { component_path } = options

    const pnpm_options: InstallDependencyOptions = {
        save: true,
        is_dev: true,
        dependency: component_path
    }

    try {
        const result = await install_dependency(pnpm_options);
        console.log(result)
    } catch (e) {

    }
}

install_template({component_path: "react"})