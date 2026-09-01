export interface Note {
    id: string;           // UUID 
    text: string;        // o que tem no bdn
    userId: string;       // association User<->Nota
    createdAt: Date;
}
