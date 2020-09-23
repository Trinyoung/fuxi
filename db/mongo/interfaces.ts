import { Document } from 'mongoose';
export interface updateOption {
    upsert: boolean;
    multi: boolean,
    writeConcern: Document,
    collation: Document,
    arrayFilters: Document[];
    hint: Document | string
};

// export 