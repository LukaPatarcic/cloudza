export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export interface IServerError {
    statusCode: number;
    message: string;
    error: string;
}

export interface IResetPassword {
    email?: string;
    newPasswordToken?: string;
    currentPassword?: string;
    newPassword: string;
    passwordConfirm?: string;
}

export interface JwtPayload {
    id: number;
    email: string;
    name: string;
}

export interface PaginateQuery {
    page?: number;
    limit?: number;
    sortBy?: [string, string][];
    searchBy?: string[];
    search?: string;
    filter?: {
        [column: string]: string | string[];
    };
    path: string;
}
export declare const Paginate: (
    ...dataOrPipes: unknown[]
) => ParameterDecorator;
declare type Join<K, P> = K extends string
    ? P extends string
        ? `${K}${'' extends P ? '' : '.'}${P}`
        : never
    : never;
declare type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...0[]];
declare type Column<T, D extends number = 2> = [D] extends [never]
    ? never
    : T extends Record<string, any>
    ? {
          [K in keyof T]-?: K extends string
              ? T[K] extends Date
                  ? `${K}`
                  : T[K] extends Array<infer U>
                  ? `${K}` | Join<K, Column<U, Prev[D]>>
                  : `${K}` | Join<K, Column<T[K], Prev[D]>>
              : never;
      }[keyof T]
    : '';

declare type Order<T> = [Column<T>, 'ASC' | 'DESC'];
declare type SortBy<T> = Order<T>[];
export declare class Paginated<T> {
    data: T[];
    meta: {
        itemsPerPage: number;
        totalItems: number;
        currentPage: number;
        totalPages: number;
        sortBy: SortBy<T>;
        searchBy: Column<T>[];
        search: string;
        filter?: {
            [column: string]: string | string[];
        };
    };
    links: {
        first?: string;
        previous?: string;
        current: string;
        next?: string;
        last?: string;
    };
}

export declare enum FilterOperator {
    EQ = '$eq',
    GT = '$gt',
    GTE = '$gte',
    IN = '$in',
    NULL = '$null',
    LT = '$lt',
    LTE = '$lte',
    BTW = '$btw',
    NOT = '$not',
}
export declare function isOperator(value: unknown): value is FilterOperator;
export declare function getFilterTokens(raw: string): string[];
