export interface Duration {
    start: number;
    end: number;
}

export const isOverlap = (l: Duration, r: Duration, margin = 40) => (
    (r.start < l.end + margin)
    && (l.start < r.end + margin)
);

export interface KeyPressDuration extends Duration {
    key: string;
}
