import type { middleware } from "../types/workman";
declare const _default: (eventType?: string, config?: {
    urls: Array<string>;
}) => {
    use(middleware: middleware): void;
    listen(): void;
};
export default _default;
