import * as fsExtra from 'fs-extra';
import * as nodePath from 'path';

export function throwErrorWhenNotExists(absPath: string) {
    if (!fsExtra.existsSync(absPath)) {
        throw new Error(`${absPath} has not exists`);
    }
}

export function isDirectory(dir: string) {
    return fsExtra.statSync(dir).isDirectory();
}

export interface GetDirsOrFilesOptions {
    /** Include .dot files in normal matches */
    dot?: boolean;
    /** Exclude files in normal matches */
    excludeDirs?: string[];
}

const DEFAULT_OPTIONS: GetDirsOrFilesOptions = {
    dot: false
};
export async function getDirsAndFiles(path: string, options?: GetDirsOrFilesOptions) {
    options = {
        ...DEFAULT_OPTIONS,
        ...options
    };
    const dirs = await fsExtra.readdir(path);
    return dirs.filter(dir => {
        if (options.excludeDirs && options.excludeDirs.includes(dir)) {
            return false;
        }
        if (options.dot) {
            return true;
        } else {
            return !dir.startsWith('.');
        }
    });
}

export async function getDirs(path: string) {
    const dirs = await fsExtra.readdir(path);
    return dirs.filter(dir => {
        return isDirectory(nodePath.resolve(path, dir));
    });
}

export async function getFiles(path: string, options?: GetDirsOrFilesOptions) {
    const dirs = await getDirsAndFiles(path, options);
    return dirs.filter(dir => {
        return !isDirectory(nodePath.resolve(path, dir));
    });
}

export async function pathsExists(paths: string[]) {
    const result = [];
    let hasExists = false;
    let existsCount = 0;
    for (const path of paths) {
        const pathExists = await fsExtra.pathExists(path);
        if (pathExists) {
            hasExists = true;
            existsCount++;
        }
        result.push(pathExists);
    }
    return {
        result,
        allExists: existsCount === result.length,
        hasExists
    };
}

export async function ensureWriteFile(filePath: string, data: string, options?: fsExtra.WriteFileOptions | string) {
    await fsExtra.ensureFile(filePath);
    await fsExtra.writeFile(filePath, data);
}

export async function readFileContent(filePath: string, encoding: string = 'UTF-8') {
    return await fsExtra.readFile(filePath, encoding);
}

export * from 'fs-extra';
