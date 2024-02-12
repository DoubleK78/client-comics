export default interface PagingRequest {
    PageNumber: number;
    PageSize: number;
    SearchTerm?: string;
    SortColumn?: string;
    SortDirection?: string;
    TopType?: string;
}