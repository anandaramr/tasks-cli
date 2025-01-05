export function parseArgs(args: string[]) {
    const values: string[] = []
    const options: string[] = []

    args.forEach(item => {
        if(item.startsWith('--')) options.push(item.substring(2));
        else values.push(item)
    })

    return { values, options }
}