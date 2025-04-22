export interface RandomUserApiResponse<TResults> {
    results: TResults;
    info: {
        seed: string;
        results: number;
        page: number;
        version: string;
    };
}
