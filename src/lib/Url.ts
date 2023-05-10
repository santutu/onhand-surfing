export default class Url {

    public baseUrl: string;
    public qs: URLSearchParams
    constructor(url: string) {
        var [baseUrl, qs] = url.split("?");
        if (qs === undefined) {
            qs = ""
        }
        this.baseUrl = baseUrl;
        this.qs = new URLSearchParams(qs);
    }

    public toString(): string {
        return `${this.baseUrl}?${this.qs.toString()}`;
    }

    public navigate() {
        window.location.href = this.toString();
    }

}