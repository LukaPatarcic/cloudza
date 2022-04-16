import { randomBytes } from 'crypto';

export class CommonHelper {
    public static timeIsLessThan15Minutes(time: number) {
        // 15-minute difference
        if (!time) return false;
        return (new Date().getTime() - time) / 60000 < 15;
    }

    public static generateToken() {
        return randomBytes(48).toString('hex');
    }
}
