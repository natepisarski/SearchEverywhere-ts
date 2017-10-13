namespace Util {
    export function CountOf(index: string, content: string): number {
        let count: number = 0
        for (let item of content) {
            if (item === index) {
                count++;
            }
        }
        return count;
    }
}