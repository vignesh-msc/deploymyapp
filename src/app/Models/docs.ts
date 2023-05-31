export class document {
    _id:string;
    docname:string;
    orginalname:string;
    path:string;
    constructor(_id: string, docname: string,orginalname: string, path: string) {
        this._id = _id;
        this.docname = docname;
        this.orginalname = orginalname;
        this.path = path;
    }

}