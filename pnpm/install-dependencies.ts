import { type InstallDependencyOptions } from "./install-dependency"
import { execute_command } from "./execute-command"
import { create_pnpm_options } from "./create-pnpm-options"
import { get_full_path } from "./get-full-path"

export interface InstallDependenciesOptions extends Omit<InstallDependencyOptions, 'dependency'> {
    dependencies: string[];
}

export async function install_dependencies(options: InstallDependenciesOptions) {
    const {
        dependencies = [],
        install_path,
        silent = false,
        use_shell = false
    } = options;

    const should_global_Install = dependencies.length === 0;

    const command_args: string[] = create_pnpm_options({
        ...options,
        all: should_global_Install
    });

    const command_options = {
        command_args: [...command_args, ...(dependencies ?? [])],
        path: install_path,
        silent: silent,
        use_shell: use_shell
    };

    const dest: string[] = should_global_Install
        ? []
        : dependencies.map((dependency) => get_full_path({ install_path, dependency }));

    await execute_command(command_options);

    return { dest };
}