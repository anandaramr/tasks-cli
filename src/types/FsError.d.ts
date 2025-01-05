export interface FsError extends Error {
    errno: number,
    code: string,
    syscall: string,
    path: string
}