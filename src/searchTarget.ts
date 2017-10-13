export class SearchTarget<T>
{
    public Tag: string;
    public Content: T;

    public constructor(tag: string, content: T) {
        this.Tag = tag;
        this.Content = content;
    }
}