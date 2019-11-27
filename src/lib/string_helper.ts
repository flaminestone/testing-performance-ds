export class StringHelper {
    static random() {
        return Math.random().toString().replace('0.', '')
    }
}